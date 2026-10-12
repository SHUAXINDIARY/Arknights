import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { UAParser } from "ua-parser-js";

/** 用户设备信息 */
const userDevice = UAParser(window.navigator.userAgent);
/** 导出图片文件名 */
const EXPORT_FILENAME = "Arknights.png";
/** html-in-canvas 导出超采样倍率 */
const HTML_IN_CANVAS_SCALE = 3;
/** 等不到 paint 时回退，不在事件外强行绘制 */
const HTML_IN_CANVAS_TIMEOUT_MS = 1000;
/** 克隆图片等待加载超时（毫秒） */
const IMAGE_READY_TIMEOUT_MS = 4000;
/** 远程图片转 data URL 的缓存 */
const IMAGE_DATA_URL_CACHE = new Map<string, string>();

/** html-in-canvas 扩展的 2D 上下文 */
interface Canvas2DWithDrawElementImage extends CanvasRenderingContext2D {
    /** 将元素快照绘制到 canvas（实验 API） */
    drawElementImage?: (
        element: Element,
        dx: number,
        dy: number,
        dWidth?: number,
        dHeight?: number,
    ) => DOMMatrix | undefined;
}

/** html-in-canvas 扩展 canvas 类型 */
interface HtmlInCanvasElement extends HTMLCanvasElement {
    /** 触发布局子树渲染（实验 API） */
    layoutSubtree?: boolean;
    /** html-in-canvas paint 事件句柄 */
    onpaint: ((this: GlobalEventHandlers, ev: Event) => void) | null;
    /** 主动请求一次 paint（实验 API） */
    requestPaint?: () => void;
}

/** 是否为苹果平台 / Safari 环境 */
export const isApple = () => {
    return (
        userDevice.os.name === "iOS" ||
        Boolean(userDevice.browser.name?.includes("Safari"))
    );
};

/** 使用页面实际背景色，避免系统主题与页面主题不一致 */
const getBackgroundColor = (target: HTMLElement) => {
    for (let node: HTMLElement | null = target; node; node = node.parentElement) {
        const color = getComputedStyle(node).backgroundColor;
        if (color !== "transparent" && color !== "rgba(0, 0, 0, 0)") return color;
    }
    return "#fff";
};

/** 等待下一帧，确保离屏节点完成布局 */
const waitNextFrame = async () => {
    await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
    );
};

/** 将 HTMLCanvasElement 转为 PNG Blob */
const canvasToPngBlob = async (canvas: HTMLCanvasElement) => {
    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error("canvas 转换失败"));
                return;
            }
            resolve(blob);
        }, "image/png");
    });
};

/** 缩小采样检查内容，拒绝全透明或纯背景的 PNG */
const hasRenderedContent = (canvas: HTMLCanvasElement) => {
    const sample = document.createElement("canvas");
    sample.width = 64;
    sample.height = 64;
    const context = sample.getContext("2d", { willReadFrequently: true });
    if (!context) throw new Error("无法检查截图内容");
    context.drawImage(canvas, 0, 0, 64, 64);
    const pixels = context.getImageData(0, 0, 64, 64).data;
    for (let i = 4; i < pixels.length; i += 4) {
        for (let channel = 0; channel < 4; channel++) {
            if (Math.abs(pixels[i + channel] - pixels[channel]) > 3) return true;
        }
    }
    return false;
};

/** 冻结计算样式和入场动画，保持离屏克隆与结果页布局一致 */
const createSnapshotClone = (target: HTMLElement) => {
    const clone = target.cloneNode(true) as HTMLElement;
    const sources = [target, ...target.querySelectorAll("*")];
    const clones = [clone, ...clone.querySelectorAll("*")];
    sources.forEach((source, index) => {
        const destination = clones[index];
        if (!(destination instanceof HTMLElement || destination instanceof SVGElement)) return;
        const computed = getComputedStyle(source);
        for (let i = 0; i < computed.length; i++) {
            const property = computed[i];
            destination.style.setProperty(property, computed.getPropertyValue(property));
        }
        destination.style.animation = "none";
        destination.style.transition = "none";
        if (source.hasAttribute("data-export-motion")) {
            destination.style.opacity = "1";
            destination.style.transform = "none";
        }
    });
    for (const control of clone.querySelectorAll<HTMLElement>("[data-export-label]")) {
        control.textContent = control.getAttribute("data-export-label");
        control.removeAttribute("disabled");
        control.style.opacity = "1";
    }
    clone.style.margin = "0";
    clone.style.transform = "none";
    return clone;
};

const waitForExportResources = async (target: HTMLElement) => {
    await document.fonts.ready;
    await Promise.all(Array.from(target.querySelectorAll("img")).map(waitImageReady));
    await waitNextFrame();
};

/** 判断 URL 是否是跨域 http(s) 资源 */
const isCrossOriginHttpUrl = (url: string) => {
    try {
        const parsed = new URL(url, window.location.href);
        return (
            (parsed.protocol === "http:" || parsed.protocol === "https:") &&
            parsed.origin !== window.location.origin
        );
    } catch {
        return false;
    }
};

/** 将远程图片转换为 data URL，避免 html-in-canvas 的跨域像素擦除 */
const convertRemoteImageToDataUrl = async (url: string) => {
    const cached = IMAGE_DATA_URL_CACHE.get(url);
    if (cached) return cached;

    const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) {
        throw new Error(`图片请求失败: ${response.status}`);
    }

    const blob = await response.blob();
    const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result !== "string") {
                reject(new Error("图片转换失败"));
                return;
            }
            resolve(reader.result);
        };
        reader.onerror = () => reject(new Error("图片读取失败"));
        reader.readAsDataURL(blob);
    });

    IMAGE_DATA_URL_CACHE.set(url, dataUrl);
    return dataUrl;
};

/** 等待单个图片节点就绪（加载成功或失败均结束） */
const waitImageReady = async (image: HTMLImageElement) => {
    if (image.complete) return;

    await Promise.race([
        new Promise<void>((resolve) => {
            image.addEventListener("load", () => resolve(), { once: true });
            image.addEventListener("error", () => resolve(), { once: true });
        }),
        new Promise<void>((resolve) =>
            setTimeout(resolve, IMAGE_READY_TIMEOUT_MS),
        ),
    ]);
};

/** 为克隆树中的跨域图片尝试内联 data URL，并同步等待图片加载完成 */
const inlineCloneImages = async (
    sourceRoot: HTMLElement,
    cloneRoot: HTMLElement,
) => {
    /** 源节点中的图片数组（按 DOM 顺序） */
    const sourceImages = Array.from(sourceRoot.querySelectorAll("img"));
    /** 克隆节点中的图片数组（按 DOM 顺序） */
    const cloneImages = Array.from(cloneRoot.querySelectorAll("img"));

    await Promise.all(
        cloneImages.map(async (cloneImage, index) => {
            const sourceImage = sourceImages[index];
            const sourceUrl =
                sourceImage?.currentSrc ||
                sourceImage?.getAttribute("src") ||
                cloneImage.currentSrc ||
                cloneImage.getAttribute("src") ||
                "";
            if (!sourceUrl) return;

            try {
                if (isCrossOriginHttpUrl(sourceUrl)) {
                    const dataUrl =
                        await convertRemoteImageToDataUrl(sourceUrl);
                    cloneImage.removeAttribute("srcset");
                    cloneImage.src = dataUrl;
                } else {
                    cloneImage.removeAttribute("srcset");
                    cloneImage.src = sourceUrl;
                }
            } catch {
                // 转换失败时保留原始地址，后续由能力检测决定是否回退旧截图逻辑
                cloneImage.removeAttribute("srcset");
                cloneImage.src = sourceUrl;
            }
        }),
    );

    await Promise.all(cloneImages.map(async (image) => waitImageReady(image)));
};

/** 检查克隆树中是否仍存在跨域图片（存在则应回退旧逻辑） */
const hasCrossOriginImages = (root: HTMLElement) => {
    const images = Array.from(root.querySelectorAll("img"));
    return images.some((image) => {
        const source = image.currentSrc || image.getAttribute("src") || "";
        return source ? isCrossOriginHttpUrl(source) : false;
    });
};

/** 判断当前环境是否支持 html-in-canvas 核心 API */
const hasHtmlInCanvasSupport = () => {
    const testCanvas = document.createElement("canvas") as HtmlInCanvasElement;
    const testContext = testCanvas.getContext(
        "2d",
    ) as Canvas2DWithDrawElementImage | null;
    return Boolean(testContext?.drawElementImage);
};

/** 使用 html-in-canvas 导出当前结果图，失败时返回 false 以回退旧逻辑 */
export const savePngByHtmlInCanvas = async (
    targetElement: HTMLElement = document.body,
) => {
    if (!hasHtmlInCanvasSupport()) {
        return false;
    }
    await waitForExportResources(targetElement);

    /** 截图区域宽度（CSS 像素） */
    const targetWidth = Math.max(
        1,
        Math.ceil(targetElement.clientWidth),
    );
    /** 截图区域高度（CSS 像素） */
    const targetHeight = Math.max(
        1,
        Math.ceil(Math.max(targetElement.scrollHeight, targetElement.clientHeight)),
    );

    /** 离屏容器节点 */
    const host = document.createElement("div");
    host.style.position = "fixed";
    host.style.left = "-99999px";
    host.style.top = "0";
    host.style.pointerEvents = "none";
    host.style.width = `${targetWidth}px`;
    host.style.height = `${targetHeight}px`;

    /** 承载 html-in-canvas 绘制的 canvas */
    const canvas = document.createElement("canvas") as HtmlInCanvasElement;
    canvas.setAttribute("layoutsubtree", "");
    canvas.setAttribute("content", "drawable");
    canvas.layoutSubtree = true;
    canvas.style.width = `${targetWidth}px`;
    canvas.style.height = `${targetHeight}px`;
    canvas.width = targetWidth * HTML_IN_CANVAS_SCALE;
    canvas.height = targetHeight * HTML_IN_CANVAS_SCALE;

    /** 待绘制的 DOM 克隆节点 */
    const clone = createSnapshotClone(targetElement);
    clone.setAttribute("drawable", "");
    clone.style.width = `${targetWidth}px`;
    clone.style.height = `${targetHeight}px`;

    canvas.appendChild(clone);
    host.appendChild(canvas);
    /** 已冻结计算样式，挂到 body 避免继承页面转场的透明度/变换 */
    document.body.appendChild(host);

    try {
        const context = canvas.getContext(
            "2d",
        ) as Canvas2DWithDrawElementImage | null;
        if (!context?.drawElementImage) {
            return false;
        }

        await inlineCloneImages(targetElement, clone);
        if (hasCrossOriginImages(clone)) {
            return false;
        }

        await waitNextFrame();
        await waitNextFrame();

        await new Promise<void>((resolve, reject) => {
            /** 是否已完成一次有效绘制 */
            let settled = false;
            /** 执行一次 html-in-canvas 绘制 */
            const draw = () => {
                if (settled) return;
                settled = true;
                try {
                    context.setTransform(1, 0, 0, 1, 0, 0);
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.fillStyle = getBackgroundColor(targetElement);
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    context.scale(HTML_IN_CANVAS_SCALE, HTML_IN_CANVAS_SCALE);
                    context.drawElementImage!(
                        clone,
                        0,
                        0,
                    );
                    clearTimeout(timeout);
                    resolve();
                } catch (error) {
                    clearTimeout(timeout);
                    reject(error);
                }
            };

            const timeout = setTimeout(() => {
                if (settled) return;
                settled = true;
                reject(new Error("截图未收到 paint 事件"));
            }, HTML_IN_CANVAS_TIMEOUT_MS);
            canvas.onpaint = () => draw();
            try {
                canvas.requestPaint?.();
            } catch {
                // 等待 paint 事件或超时回退
            }
        });

        if (!hasRenderedContent(canvas)) return false;
        saveAs(await canvasToPngBlob(canvas), EXPORT_FILENAME);
        return true;
    } catch {
        return false;
    } finally {
        canvas.onpaint = null;
        host.remove();
    }
};

/** 回退链路：同一结果区域的样式快照 → SVG → 普通 Canvas */
export const savePngByCanvas = async (targetElement: HTMLElement = document.body) => {
    await waitForExportResources(targetElement);
    const width = Math.ceil(targetElement.clientWidth);
    const height = Math.ceil(Math.max(targetElement.scrollHeight, targetElement.clientHeight));
    if (!width || !height) throw new Error("结果区域尺寸无效");

    const clone = createSnapshotClone(targetElement);
    clone.style.width = `${width}px`;
    clone.style.height = `${height}px`;
    const host = document.createElement("div");
    host.style.cssText = `position:fixed;left:-99999px;top:0;width:${width}px;pointer-events:none;`;
    host.setAttribute("aria-hidden", "true");
    host.appendChild(clone);
    document.body.appendChild(host);

    try {
        await inlineCloneImages(targetElement, clone);
        const svgString = await domtoimage.toSvg(clone, {
            width,
            height,
            bgcolor: getBackgroundColor(targetElement),
        });
        const img = new Image();
        await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(new Error("截图 SVG 渲染失败"));
            img.src = svgString;
        });
        await img.decode();
        await waitNextFrame();

        const canvas = document.createElement("canvas");
        canvas.width = width * HTML_IN_CANVAS_SCALE;
        canvas.height = height * HTML_IN_CANVAS_SCALE;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("无法创建截图画布");
        context.scale(HTML_IN_CANVAS_SCALE, HTML_IN_CANVAS_SCALE);
        context.drawImage(img, 0, 0, width, height);
        if (!hasRenderedContent(canvas)) throw new Error("截图内容为空，请重试导出");
        saveAs(await canvasToPngBlob(canvas), EXPORT_FILENAME);
    } finally {
        host.remove();
    }
};
