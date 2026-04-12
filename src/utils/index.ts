import { FieldNameMap, FormField } from "./constant";
export { isApple, savePngByCanvas, savePngByHtmlInCanvas } from "./screenshot";

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



