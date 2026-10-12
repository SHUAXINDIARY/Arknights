# 结果页 PNG 导出

结果页传入同一个 `ref.current` 给两条导出链路。截图范围是完整的结果容器，包含头像、活动、皮肤、文字和操作区域，不受当前滚动位置限制。

## 共享准备

- 等待字体和图片加载，再读取容器实际宽度及完整高度。
- 克隆元素并冻结每个节点的计算样式，保留文字对齐、主题色及图片尺寸。
- 标有 `data-export-motion` 的节点使用最终可见状态，关闭克隆节点的动画与过渡。
- 标有 `data-export-label` 的按钮恢复静态文案，避免把“保存中”及加载图标写入图片。
- 尝试将远程图片缓存为 data URL，降低重复请求并避免跨域像素擦除。
- 使用页面实际背景色和 3 倍分辨率。

## 实验原生链路

`savePngByHtmlInCanvas(targetElement)` 检测 `drawElementImage`，使用 `layoutsubtree` / `content="drawable"` canvas 和带 `drawable` 属性的克隆节点。

绘制仅发生在 `paint` 事件内。离屏容器不设置透明度，也不继承页面转场。超过 1 秒未收到事件、跨域图片无法内联、绘制失败或像素检查发现空白时返回 `false`，由页面回退。

API 仍是实验功能；属性与绘制事件约束见 [Chrome 官方介绍](https://developer.chrome.com/blog/html-in-canvas-origin-trial) 和 [2026 年 API 变更说明](https://groups.google.com/g/html-in-canvas-developer-newsletter/c/k2lTZN8n6bs)。

## 回退链路

`savePngByCanvas(targetElement)` 使用相同的计算样式克隆，经 `dom-to-image.toSvg` 得到内联 SVG。等待 SVG 图像完成加载和解码后，在普通 HTMLCanvasElement 上绘制，再转成 PNG Blob 下载。

不再截图整个 body，也不再通过多次调用或设备识别决定下载时序。保存完成才返回；绘制空白或失败时抛出错误，页面不会显示成功提示。

## 像素检查与限制

两条链路在下载前将画布缩小至 64×64 采样。全透明或纯色画布判定为没有结果内容。该检查用于拒绝空白截图，不能证明每一个图片资源都正确渲染。

回退链路依赖 SVG foreignObject；不同浏览器可能存在渲染差异，尤其需要在 Safari 真机上验证。远程图片还需服务器允许跨域读取。
