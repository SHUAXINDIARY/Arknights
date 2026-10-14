import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import puppeteer, { type Browser } from 'puppeteer';
import { getSirenAlbums } from './sirenAlbums';

let browser: Browser;
before(async () => {
  browser = await puppeteer.launch({ args: ['--no-sandbox'] });
});
after(async () => { await browser?.close(); });

test('读取隐藏分页、保留前导零 ID、修剪名称，并按 ID 去重而不合并同名专辑', async () => {
  const page = await browser.newPage();
  try {
    await page.setRequestInterception(true);
    page.on('request', (request) => void request.abort());
    await page.setContent(`
      <div><div data-album-slider-id="8913"><img src="https://example.invalid/first.jpg" alt="昨日海OST"></div></div>
      <div style="display:none">
        <div data-album-slider-id="0227"><img src="https://example.invalid/last.jpg" alt=" 大地之盐 "></div>
        <div data-album-slider-id="0001"><img src="https://example.invalid/other.jpg" alt="大地之盐"></div>
        <div data-album-slider-id="8913"><img src="https://example.invalid/first.jpg" alt="昨日海OST"></div>
      </div>
    `);
    assert.deepEqual(await getSirenAlbums(page), [
      { id: '8913', name: '昨日海OST', img: 'https://example.invalid/first.jpg' },
      { id: '0227', name: '大地之盐', img: 'https://example.invalid/last.jpg' },
      { id: '0001', name: '大地之盐', img: 'https://example.invalid/other.jpg' },
    ]);
  } finally { await page.close(); }
});

test('存在损坏条目时拒绝保存不完整的列表', async () => {
  const page = await browser.newPage();
  try {
    await page.setContent('<div data-album-slider-id="0227"><img alt="大地之盐"></div>');
    await assert.rejects(getSirenAlbums(page), /数据不完整.*0227/);
  } finally { await page.close(); }
});

test('封面不是 HTTP 图片地址时拒绝保存', async () => {
  const page = await browser.newPage();
  try {
    await page.setContent('<div data-album-slider-id="0227"><img src="data:," alt="大地之盐"></div>');
    await assert.rejects(getSirenAlbums(page), /封面地址无效.*0227/);
  } finally { await page.close(); }
});
