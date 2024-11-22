import domtoimage from "dom-to-image";
import { FieldNameMap, FormField } from "../components/FormRender";

export const downloadBase64Image = (base64Data: string, filename: string) => {
    // 创建一个临时链接元素
    const link = document.createElement("a");

    // 将 Base64 数据设置为链接的 href
    link.href = base64Data;
    link.download = filename; // 设置下载文件名

    // 触发下载
    link.click();

    // 清理临时元素（可选）
    link.remove();
}
const getColorScheme = () => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'; // 当前是深色模式
    } else {
        return 'light'; // 当前是浅色模式
    }
}

export const savePngByCanvas = async () => {
    const svgString = await domtoimage.toSvg(document.body!, {
        bgcolor: getColorScheme() === 'dark' ? 'black' : "white",
    });

    return new Promise((res) => {
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
        img.crossOrigin = 'anonymous'; // 设置跨域
        console.log(svgString)
        img.onload = async () => {
            // 将图像绘制到 Canvas 上
            ctx!.drawImage(img!, 0, 0);
            const a = document.createElement('a'); // 创建 a 标签
            console.log(img.src)
            a.href = URL.createObjectURL(await canvas.convertToBlob()); // 设置图片的 URL
            a.download = 'Arknights.png'; // 设置文件名
            document.body.appendChild(a); // 将 a 标签临时添加到 DOM
            a.click(); // 自动触发点击事件
            document.body.removeChild(a); // 移除 a 标签
            res(true);
        };

        img.onerror = () => {
            alert('下载失败')
        }

        // 加载 SVG 数据到图像对象
        img.src = svgString;
    })
}

const imageUrlToBase64 = (url: string) => {
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
}

export const generateData = async (data: typeof FieldNameMap) => {
    const newData = {} as typeof FieldNameMap;
    for (const key in data) {
        const _key = key as FormField;
        const item = data[_key as FormField];
        // 判断是否是图片
        if (item.includes('https')) {
            // 转换图片为base64
            const imgData = await imageUrlToBase64(item);
            newData[_key] = imgData as string;
        } else {
            newData[_key] = item;
        }
    }
    return newData
}