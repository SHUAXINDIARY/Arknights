import type { Page } from 'puppeteer';

export interface PrtsMedalGroup {
  name: string;
  img: string;
}

/** 在浏览器上下文执行，首个子元素是散章列表，其余子元素才是套组。 */
export const readPrtsMedalGroups = (): PrtsMedalGroup[] | false => {
  const header = Array.from(document.querySelectorAll('.n-collapse-item__header-main'))
    .find((element) => /^活动奖章(?:[（(]\d+[）)])?$/.test(element.textContent?.replace(/\s/g, '') || ''));
  const section = header?.closest('.n-collapse-item');
  if (!section) return false;

  const container = Array.from(section.querySelectorAll('.n-flex')).find((element) =>
    Array.from(element.children).slice(1).some((child) =>
      child.querySelector('.n-card img[data-preview-src*="/medal_diy/"], .n-card img[src*="/medal_diy/"]'),
    ),
  );
  if (!container) return false;

  const data: PrtsMedalGroup[] = [];
  const seen = new Set<string>();
  for (const child of Array.from(container.children).slice(1)) {
    const card = child.matches('.n-card') ? child : child.querySelector('.n-card');
    if (!card) continue;
    const name = card.querySelector('h3')?.textContent?.replace(/\s+/g, ' ').trim();
    const image = card.querySelector('img[data-preview-src*="/medal_diy/"], img[src*="/medal_diy/"]');
    const src = image?.getAttribute('data-preview-src') || image?.getAttribute('src');
    // 等待所有套组的标题和图片地址就绪，避免存下部分结果。
    if (!name || !src) return false;
    let img: string;
    try {
      const url = new URL(src, document.baseURI);
      if (!['https:', 'http:'].includes(url.protocol) || !url.pathname.includes('/medal_diy/')) return false;
      img = url.href;
    } catch { return false; }
    if (seen.has(img)) continue;
    seen.add(img);
    data.push({ name, img });
  }
  return data.length ? data : false;
};

/** 按标题展开活动奖章，等待 Vue 挂载完成，不依赖折叠项的序号或固定延迟。 */
export const getPrtsMedalGroups = async (page: Page, timeout = 60_000): Promise<PrtsMedalGroup[]> => {
  const header = await page.waitForFunction(() =>
    Array.from(document.querySelectorAll<HTMLElement>('.n-collapse-item__header-main'))
      .find((element) => /^活动奖章(?:[（(]\d+[）)])?$/.test(element.textContent?.replace(/\s/g, '') || '')),
  { timeout, polling: 'mutation' });
  try {
    await header.evaluate((element) => {
      if (!element?.closest('.n-collapse-item')?.classList.contains('n-collapse-item--active')) {
        element?.click();
      }
    });
  } finally { await header.dispose(); }

  const result = await page.waitForFunction(readPrtsMedalGroups, { timeout, polling: 'mutation' })
    .catch((error: unknown) => {
      throw new Error('活动奖章套组未完整加载，请检查套组容器、标题或图片地址', { cause: error });
    });
  try {
    const data = await result.jsonValue();
    if (!data) throw new Error('未提取到活动奖章套组');
    return data;
  } finally { await result.dispose(); }
};
