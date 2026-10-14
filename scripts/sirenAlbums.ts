import type { Page } from 'puppeteer';

export interface SirenAlbum {
  id: string;
  name: string;
  img: string;
}

export const SIREN_MUSIC_URL = 'https://monster-siren.hypergryph.com/music';

/** Read every slider page, including pages outside the visible viewport. */
export const getSirenAlbums = async (page: Page): Promise<SirenAlbum[]> => {
  await page.waitForSelector('[data-album-slider-id] img', { timeout: 60_000 });
  return page.evaluate(() => {
    const albums: { id: string; name: string; img: string }[] = [];
    const seen = new Set<string>();
    const cards = document.querySelectorAll('[data-album-slider-id]');
    if (!cards.length) throw new Error('塞壬唱片专辑列表为空，停止保存');

    for (const card of cards) {
      const id = card.getAttribute('data-album-slider-id')?.trim();
      const image = card.querySelector('img');
      const name = image?.getAttribute('alt')?.trim();
      const source = image?.getAttribute('data-src') || image?.getAttribute('src');
      if (!id || !name || !source?.trim()) {
        throw new Error(`塞壬唱片专辑数据不完整（ID: ${id || '未知'}），停止保存`);
      }
      const url = new URL(source.trim(), document.baseURI);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw new Error(`塞壬唱片专辑封面地址无效（ID: ${id}），停止保存`);
      }
      if (seen.has(id)) continue;
      seen.add(id);
      albums.push({ id, name, img: url.href });
    }
    return albums;
  });
};
