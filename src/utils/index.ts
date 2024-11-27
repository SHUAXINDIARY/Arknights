/* eslint-disable @typescript-eslint/no-explicit-any */
import domtoimage from "dom-to-image";
import { FieldNameMap, FormField } from "../utils/constant";
import { saveAs } from "file-saver";
import { UAParser } from "ua-parser-js";

const userDevice = UAParser(window.navigator.userAgent);

export const isApple = () => {
    return (
        userDevice.os.name === "iOS" ||
        userDevice.browser.name?.includes("Safari") ||
        window.navigator.userAgent.includes("Safari")
    );
};

export const downloadImage = (base64Data: string, filename: string) => {
    // 创建一个临时链接元素
    const link = document.createElement("a");

    // 将 Base64 数据设置为链接的 href
    link.href = base64Data;
    link.download = filename; // 设置下载文件名

    // 触发下载
    link.click();
    link.remove();
};
const getColorScheme = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark"; // 当前是深色模式
    } else {
        return "light"; // 当前是浅色模式
    }
};

const waitFrames = (frameCount: number, callback: () => void) => {
    let currentFrame = 0;

    const frameStep = () => {
        currentFrame++;
        if (currentFrame >= frameCount) {
            callback(); // 达到指定帧数后执行回调
        } else {
            requestAnimationFrame(frameStep); // 继续下一帧
        }
    };

    requestAnimationFrame(frameStep); // 开始第一帧
};

export const savePngByCanvas = async (isDown = false) => {
    const svgString = await domtoimage.toSvg(document.body!, {
        bgcolor: getColorScheme() === "dark" ? "black" : "white",
    });

    return new Promise((res, rej) => {
        // 超采样倍率
        const scaleFactor = 3;
        // 创建 Canvas 元素
        const canvas = new OffscreenCanvas(
            document.body.clientWidth * scaleFactor,
            document.body.clientHeight * scaleFactor
        );
        const ctx = canvas.getContext("2d");
        ctx?.scale(scaleFactor, scaleFactor);
        // 创建图像对象
        const img = new Image();
        img.id = "result";
        // img.crossOrigin = "anonymous"; // 设置跨域
        img.onload = async (e) => {
            try {
                if (e.target) {
                    ctx!.drawImage(img, 0, 0);
                    if (isApple()) {
                        waitFrames(5, async () => {
                            if (isDown) {
                                saveAs(await canvas.convertToBlob(), "Arknights.png");
                            }
                        });
                    } else {
                        saveAs(await canvas.convertToBlob(), "Arknights.png");
                    }

                    res(true);
                }
                res(true);
            } catch (error: any) {
                rej(`图片保存失败${error.toString()}`)
            }
        };

        img.onerror = (err) => {
            rej(`图片导出失败：渲染失败,${err.toString()}`)
        };

        // 加载 SVG 数据到图像对象
        img.src = svgString;
    });
};

export const imageUrlToBase64 = (url: string) => {
    return new Promise((resolve, reject) => {
        // 创建一个 XMLHttpRequest 对象
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "blob"; // 设置响应类型为 Blob

        xhr.onload = function () {
            if (xhr.status === 200) {
                const reader = new FileReader();

                // 读取 Blob 数据为 Base64
                reader.onloadend = function () {
                    resolve(reader.result); // 返回 Base64 数据
                };

                reader.onerror = function () {
                    reject(new Error("读取图片数据失败"));
                };

                reader.readAsDataURL(xhr.response);
            } else {
                reject(new Error(`图片下载失败，状态码: ${xhr.status}`));
            }
        };

        xhr.onerror = function () {
            reject(new Error("图片下载时发生网络错误"));
        };

        xhr.send();
    });
};

export const generateData = async (data: typeof FieldNameMap) => {
    const newData = {} as typeof FieldNameMap;
    for (const key in data) {
        const _key = key as FormField;
        const item = data[_key as FormField];
        // 判断是否是图片
        if (item.includes("https")) {
            // 转换图片为base64
            const imgData = await imageUrlToBase64(item);
            newData[_key] = imgData as string;
        } else {
            newData[_key] = item;
        }
    }
    return newData;
};
