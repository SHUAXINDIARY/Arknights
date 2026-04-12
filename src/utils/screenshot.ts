import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { UAParser } from "ua-parser-js";

/** 用户设备信息 */
const userDevice = UAParser(window.navigator.userAgent);
/** 导出图片文件名 */
const EXPORT_FILENAME = "Arknights.png";
/** html-in-canvas 导出超采样倍率 */
const HTML_IN_CANVAS_SCALE = 3;
/** html-in-canvas paint 兜底等待时间（毫秒） */
const HTML_IN_CANVAS_TIMEOUT_MS = 240;
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
    dHeight?: number
  ) => DOMMatrix;
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
    userDevice.browser.name?.includes("Safari") ||
    window.navigator.userAgent.includes("Safari")
  );
};

/** 获取当前系统主题 */
const getColorScheme = () => {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
};

/** 等待指定帧数 */
const waitFrames = (frameCount: number, callback: () => void) => {
  let currentFrame = 0;

  const frameStep = () => {
    currentFrame++;
    if (currentFrame >= frameCount) {
      callback();
    } else {
      requestAnimationFrame(frameStep);
    }
  };

  requestAnimationFrame(frameStep);
};

/** 等待下一帧，确保离屏节点完成布局 */
const waitNextFrame = async () => {
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
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

  const response = await fetch(url);
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
    new Promise<void>((resolve) => setTimeout(resolve, IMAGE_READY_TIMEOUT_MS)),
  ]);
};

/** 为克隆树中的跨域图片尝试内联 data URL，并同步等待图片加载完成 */
const inlineCloneImages = async (sourceRoot: HTMLElement, cloneRoot: HTMLElement) => {
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
          const dataUrl = await convertRemoteImageToDataUrl(sourceUrl);
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
    })
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
  const testContext = testCanvas.getContext("2d") as Canvas2DWithDrawElementImage | null;
  return Boolean(testContext?.drawElementImage);
};

/** 使用 html-in-canvas 导出当前结果图，失败时返回 false 以回退旧逻辑 */
export const savePngByHtmlInCanvas = async (
  targetElement: HTMLElement = document.body
) => {
  if (!hasHtmlInCanvasSupport()) {
    return false;
  }

  /** 截图区域宽度（CSS 像素） */
  const targetWidth = Math.max(
    1,
    Math.round(targetElement.getBoundingClientRect().width || targetElement.clientWidth)
  );
  /** 截图区域高度（CSS 像素） */
  const targetHeight = Math.max(
    1,
    Math.round(targetElement.getBoundingClientRect().height || targetElement.clientHeight)
  );

  /** 离屏容器节点 */
  const host = document.createElement("div");
  host.style.position = "fixed";
  host.style.left = "-99999px";
  host.style.top = "0";
  host.style.pointerEvents = "none";
  host.style.opacity = "0";
  host.style.zIndex = "-1";
  host.style.width = `${targetWidth}px`;
  host.style.height = `${targetHeight}px`;

  /** 承载 html-in-canvas 绘制的 canvas */
  const canvas = document.createElement("canvas") as HtmlInCanvasElement;
  canvas.setAttribute("layoutsubtree", "");
  canvas.layoutSubtree = true;
  canvas.style.width = `${targetWidth}px`;
  canvas.style.height = `${targetHeight}px`;
  canvas.width = targetWidth * HTML_IN_CANVAS_SCALE;
  canvas.height = targetHeight * HTML_IN_CANVAS_SCALE;

  /** 待绘制的 DOM 克隆节点 */
  const clone = targetElement.cloneNode(true) as HTMLElement;
  clone.style.margin = "0";
  clone.style.width = `${targetWidth}px`;
  clone.style.height = `${targetHeight}px`;

  canvas.appendChild(clone);
  host.appendChild(canvas);
  document.body.appendChild(host);

  try {
    const context = canvas.getContext("2d") as Canvas2DWithDrawElementImage | null;
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
          context.fillStyle = getColorScheme() === "dark" ? "#000" : "#fff";
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.scale(HTML_IN_CANVAS_SCALE, HTML_IN_CANVAS_SCALE);
          context.drawElementImage!(clone, 0, 0, targetWidth, targetHeight);
          resolve();
        } catch (error) {
          reject(error);
        }
      };

      canvas.onpaint = () => draw();
      try {
        canvas.requestPaint?.();
      } catch {
        // 忽略 requestPaint 异常，依赖兜底定时器触发绘制
      }

      setTimeout(draw, HTML_IN_CANVAS_TIMEOUT_MS);
    });

    saveAs(await canvasToPngBlob(canvas), EXPORT_FILENAME);
    return true;
  } catch {
    return false;
  } finally {
    canvas.onpaint = null;
    host.remove();
  }
};

/** 老截图逻辑：dom-to-image + OffscreenCanvas */
export const savePngByCanvas = async (isDown = false) => {
  const svgString = await domtoimage.toSvg(document.body!, {
    bgcolor: getColorScheme() === "dark" ? "black" : "white",
  });

  return new Promise((res, rej) => {
    /** 超采样倍率 */
    const scaleFactor = 3;
    /** 离屏 Canvas 元素 */
    const canvas = new OffscreenCanvas(
      document.body.clientWidth * scaleFactor,
      document.body.clientHeight * scaleFactor
    );
    const ctx = canvas.getContext("2d");
    ctx?.scale(scaleFactor, scaleFactor);
    /** SVG 渲染图像对象 */
    const img = new Image();
    img.id = "result";
    img.onload = async (e) => {
      try {
        if (e.target) {
          ctx!.drawImage(img, 0, 0);
          if (isApple()) {
            waitFrames(5, async () => {
              if (isDown) {
                saveAs(await canvas.convertToBlob(), EXPORT_FILENAME);
              }
            });
          } else {
            saveAs(await canvas.convertToBlob(), EXPORT_FILENAME);
          }

          res(true);
        }
        res(true);
      } catch (error) {
        rej(`图片保存失败${String(error)}`);
      }
    };

    img.onerror = (error) => {
      rej(`图片导出失败：渲染失败,${String(error)}`);
    };

    // 加载 SVG 数据到图像对象
    img.src = svgString;
  });
};
