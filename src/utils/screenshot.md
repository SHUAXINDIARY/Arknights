# screenshot.ts 实现说明

## 目标与背景

`src/utils/screenshot.ts` 负责页面结果图导出，当前采用“双链路”策略：

- 新链路：`html-in-canvas`（优先尝试）
- 旧链路：`dom-to-image + OffscreenCanvas`（兼容兜底）

这样可以在支持新特性的环境获得更好的渲染一致性，同时在不支持或受限场景保证功能可用。

## 导出 API

对外暴露 3 个方法：

- `isApple()`：识别 iOS / Safari 环境，用于旧链路特殊处理。
- `savePngByHtmlInCanvas(targetElement?)`：新截图实现，成功返回 `true`，失败返回 `false`（由上层决定是否回退）。
- `savePngByCanvas(isDown?)`：旧截图实现。

## 核心常量

- `EXPORT_FILENAME`：导出文件名，默认 `Arknights.png`
- `HTML_IN_CANVAS_SCALE`：新链路超采样倍率，默认 `3`
- `HTML_IN_CANVAS_TIMEOUT_MS`：`onpaint` 兜底触发间隔，默认 `240ms`
- `IMAGE_READY_TIMEOUT_MS`：克隆图加载超时，默认 `4000ms`
- `IMAGE_DATA_URL_CACHE`：远程图转 `data:` 结果缓存

## 新链路：`savePngByHtmlInCanvas` 详细流程

### 1) 能力检测

先通过 `hasHtmlInCanvasSupport()` 检测 `CanvasRenderingContext2D.drawElementImage` 是否存在：

- 不支持：直接返回 `false`
- 支持：继续执行新链路

### 2) 建立离屏渲染环境

- 计算 `targetElement` 的尺寸
- 创建离屏 `host` 容器（不可见、不可交互）
- 创建 `<canvas layoutsubtree>`，设置逻辑尺寸和像素尺寸（乘以超采样倍率）
- 将目标节点深拷贝为 `clone` 并挂到 canvas 下

### 3) 处理跨域图片空白问题

`html-in-canvas` 对跨域敏感内容有保护，直接绘制可能得到空白图。  
为避免该问题，执行 `inlineCloneImages(sourceRoot, cloneRoot)`：

- 遍历克隆树中的 `img`
- 若图片 URL 为跨域 `http(s)`：
  - 通过 `fetch -> blob -> FileReader` 转成 `data URL`
  - 回写到克隆图 `src`，并移除 `srcset`
- 本次会等待每个图节点就绪（`load/error/timeout`）
- 若仍存在跨域 URL（`hasCrossOriginImages`），返回 `false` 触发上层回退

### 4) 执行绘制

- 连续等待 2 帧，确保布局稳定
- 监听 `canvas.onpaint`，并尝试 `requestPaint()`
- 兜底 `setTimeout(draw, HTML_IN_CANVAS_TIMEOUT_MS)`，防止事件不触发
- `draw()` 中完成：
  - 重置 transform、清空画布、填充背景色（跟随深浅色主题）
  - `scale(...)` 以超采样绘制
  - 调用 `drawElementImage(clone, 0, 0, targetWidth, targetHeight)`

### 5) 导出与清理

- 将 canvas 转为 PNG Blob（`canvasToPngBlob`）
- `saveAs(...)` 下载文件
- `finally` 中清理 `onpaint` 与离屏节点，避免内存泄漏

## 旧链路：`savePngByCanvas` 说明

旧链路仍保留，用于新链路失败时兜底：

1. `domtoimage.toSvg(document.body)` 生成 SVG
2. 用 `Image` 加载 SVG
3. 绘制到 `OffscreenCanvas`
4. 导出 PNG

兼容点：

- 在 `isApple()` 环境下，沿用旧策略做多帧等待后再下载（规避 Safari 时序问题）

## 上层调用建议

推荐上层按以下方式调用：

1. 先 `await savePngByHtmlInCanvas(target)`
2. 若返回 `false`，再调用 `savePngByCanvas(...)`

这样可以保持“新方案优先、旧方案可回退”的稳定行为。

## 已知限制

- 新链路依赖实验特性（`drawElementImage`），需浏览器支持
- 部分图片源若禁止抓取或转换失败，会触发回退
- 大量远程图转 `data URL` 会增加一次性内存占用（有缓存但非持久化）

## 后续可优化方向

- 增加可配置开关（强制新链路 / 强制旧链路）
- 为 `fetch` 增加并发限制，避免大页面瞬时请求过多
- 对失败 URL 做统计上报，辅助排查特定源站兼容性
