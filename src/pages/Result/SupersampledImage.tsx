import { useEffect, useRef, useState } from "react";

/** 仅转换已知 PRTS 缩略图格式，其他地址（含 data URL）保持原样。 */
function getOriginalImageUrl(src: string) {
    return src.trim().replace(
        /^(https:\/\/media\.prts\.wiki)\/thumb\/([a-f\d]\/[a-f\d]{2}\/[^/]+)\/\d+px-[^/?#]+$/i,
        "$1/$2",
    );
}

/** 从原图生成高密度、等比例的展示图；输出仍为 img，兼容结果截图。 */
export default function SupersampledImage({ src, alt }: { src: string; alt: string }) {
    const ref = useRef<HTMLImageElement>(null);
    const [sample, setSample] = useState<{ src: string; url: string } | null>(null);
    const [failedSource, setFailedSource] = useState<string | null>(null);
    const original = getOriginalImageUrl(src);
    const displaySource = failedSource === src ? src : original;

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        let disposed = false;
        let frame = 0;
        let lastSize = "";
        const image = new Image();
        // 跨域不支持时保留普通 img，避免污染 canvas 导致导出失败。
        image.crossOrigin = "anonymous";
        const render = () => {
            if (disposed || !image.naturalWidth || !image.naturalHeight) return;
            const { width, height } = element.getBoundingClientRect();
            if (!width || !height) return;
            const density = Math.min(3, Math.max(2, window.devicePixelRatio || 1));
            // 不放大原始像素；采样面板最多使用原图分辨率。
            const scale = Math.min(1, width * density / image.naturalWidth, height * density / image.naturalHeight);
            const targetWidth = Math.max(1, Math.round(image.naturalWidth * scale));
            const targetHeight = Math.max(1, Math.round(image.naturalHeight * scale));
            const size = `${targetWidth}x${targetHeight}`;
            if (lastSize === size) return;
            lastSize = size;
            if (scale === 1) {
                setSample(null);
                return;
            }
            try {
                const canvas = document.createElement("canvas");
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                const context = canvas.getContext("2d");
                if (!context) return;
                context.imageSmoothingEnabled = true;
                context.imageSmoothingQuality = "high";
                context.drawImage(image, 0, 0, targetWidth, targetHeight);
                const url = canvas.toDataURL("image/png");
                if (!disposed) setSample({ src: displaySource, url });
            } catch {
                // 原图始终可见，采样失败无需中断页面展示。
            }
        };
        const observer = new ResizeObserver(() => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(render);
        });
        observer.observe(element);
        image.onload = render;
        image.src = displaySource;
        return () => {
            disposed = true;
            cancelAnimationFrame(frame);
            observer.disconnect();
            image.onload = null;
            image.onerror = null;
        };
    }, [displaySource]);

    return (
        <img
            ref={ref}
            src={sample?.src === displaySource ? sample.url : displaySource}
            alt={alt}
            onError={() => {
                setSample(null);
                setFailedSource(src);
            }}
        />
    );
}
