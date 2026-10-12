import type { Page } from 'puppeteer';

const PAGE_SIZE = 200;
const READY_TIMEOUT_MS = 60_000;
const LENGTH_SELECTOR = '.paginations-container select[name="length"]';
const ROW_SELECTOR = '#filter-result > .long-container';

export interface PrtsOperator {
  avatar: string;
  name: string;
  sex: string;
  level: number;
  career: string;
  position: string;
}

/** 导航结束不代表 Vue 列表已初始化，先等待分页和数据行。 */
export const getPrtsOperators = async (page: Page): Promise<PrtsOperator[]> => {
  const lengthSelect = await page.waitForSelector(LENGTH_SELECTOR, {
    timeout: READY_TIMEOUT_MS,
  });
  if (!lengthSelect) throw new Error('PRTS 干员分页控件未加载');
  await page.waitForSelector(ROW_SELECTOR, { timeout: READY_TIMEOUT_MS });

  const total = await lengthSelect.evaluate((select) => {
    const match = select.parentElement?.textContent?.match(/共\s*(\d+)\s*条/);
    return match ? Number(match[1]) : 0;
  });
  if (!total) throw new Error('无法读取 PRTS 干员总数');
  const selected = await lengthSelect.select(String(PAGE_SIZE));
  if (!selected.includes(String(PAGE_SIZE))) {
    throw new Error(`PRTS 分页控件不支持每页 ${PAGE_SIZE} 条`);
  }
  await lengthSelect.dispose();

  const data: PrtsOperator[] = [];
  let previousFirstName = '';
  for (let pageNumber = 1; pageNumber <= Math.ceil(total / PAGE_SIZE); pageNumber++) {
    if (pageNumber > 1) {
      // 只查分页按钮，避免误点筛选区的同名 checkbox-container。
      const buttons = await page.$$('.paginations-container > .checkbox-container > .checkbox-container');
      let clicked = false;
      try {
        for (const button of buttons) {
          const text = await button.evaluate((element) => element.textContent?.trim());
          if (text === String(pageNumber)) {
            await button.click();
            clicked = true;
            break;
          }
        }
      } finally {
        await Promise.all(buttons.map((button) => button.dispose()));
      }
      if (!clicked) throw new Error(`未找到 PRTS 干员第 ${pageNumber} 页按钮`);
    }

    const expectedRows = Math.min(PAGE_SIZE, total - (pageNumber - 1) * PAGE_SIZE);
    const ready = await page.waitForFunction(
      (number, rowCount, previousName) => {
        const pagination = document.querySelector('.paginations-container');
        const rows = document.querySelectorAll('#filter-result > .long-container');
        return pagination?.querySelector('select')?.value === '200'
          && pagination.querySelector('.selected')?.textContent?.trim() === String(number)
          && rows.length === rowCount
          && rows[0]?.querySelector('.name a')?.textContent?.trim() !== previousName;
      },
      { timeout: READY_TIMEOUT_MS },
      pageNumber,
      expectedRows,
      previousFirstName,
    );
    await ready.dispose();

    const records = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('#filter-result > .long-container')).map((row) => {
        const [avatar, rarity, career] = row.querySelectorAll('img');
        const name = row.querySelector('.name a')?.textContent?.trim();
        const rarityMatch = decodeURIComponent(rarity?.src || '').match(/_(\d+)\.png/);
        const careerMatch = decodeURIComponent(career?.src || '').match(/_职业_([^/.]+)\.png/);
        const avatarUrl = avatar?.getAttribute('data-src') || avatar?.getAttribute('src');
        if (!name || !avatarUrl || !rarityMatch || !careerMatch) {
          throw new Error(`PRTS 干员行结构异常：${name || '未知干员'}`);
        }
        return {
          avatar: new URL(avatarUrl, document.baseURI).href,
          name,
          sex: row.querySelector('.sex')?.textContent?.trim() || '',
          level: Number(rarityMatch[1]) + 1,
          career: careerMatch[1],
          position: row.querySelector('.position')?.textContent?.trim() || '',
        };
      });
    });
    data.push(...records);
    previousFirstName = records[0].name;
  }

  if (data.length !== total || new Set(data.map((record) => record.name)).size !== total) {
    throw new Error(`PRTS 干员分页数据不完整或重复：预期 ${total} 条，实际 ${data.length} 条`);
  }
  return data;
};
