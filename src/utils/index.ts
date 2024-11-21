import domtoimage from "dom-to-image";

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

export const captureScreen = async () => {
    const data = await domtoimage.toJpeg(document.body, {
        quality: 1,
        bgcolor: "white",
        width: document.body.clientWidth,
        height: document.body.clientHeight,
        style: {
            color: "black",
        },
    });
    downloadBase64Image(data, "Arknights生成器.jpg");
};
