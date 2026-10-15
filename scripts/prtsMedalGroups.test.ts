import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import puppeteer, { type Browser } from 'puppeteer';
import { getPrtsMedalGroups } from './prtsMedalGroups';

let browser: Browser;
before(async () => { browser = await puppeteer.launch({ args: ['--no-sandbox'] }); });
after(async () => { await browser?.close(); });

const card = (name: string, image: string, attribute = 'data-preview-src') =>
  `<div class="n-config-provider"><div class="n-card"><h3>${name}</h3><img ${attribute}="https://torappu.prts.wiki/assets/medal_diy/${image}"></div></div>`;
const groups = `<div class="n-flex">
  <div class="n-flex">${card('不应包含的散章', 'single.png')}</div>
  ${card('<span>矢量突破</span>  <span>蚀刻章套组#3 拟生态</span>', 'newGroup.png')}
  ${card('昨日海蚀刻章套组', 'medalGroupActivity52side.png', 'src')}
  ${card('重复图片', 'newGroup.png')}
</div>`;

test('按标题展开并等待延迟挂载，跳过首个散章子元素，保留多段标题及非旧前缀图片', async () => {
  const page = await browser.newPage();
  try {
    await page.setRequestInterception(true);
    page.on('request', (request) => void request.abort());
    await page.setContent(`<div class="n-collapse-item"><div class="n-collapse-item__header-main">其他奖章</div>${groups}</div>
      <div class="n-collapse-item" id="activity"><div class="n-collapse-item__header-main">活动奖章 (786)</div></div>
      <div class="n-collapse-item"><div class="n-collapse-item__header-main">最后一个分类</div></div>`);
    await page.evaluate((html) => {
      const section = document.querySelector('#activity')!;
      section.querySelector('.n-collapse-item__header-main')!.addEventListener('click', () => {
        section.classList.add('n-collapse-item--active');
        setTimeout(() => section.insertAdjacentHTML('beforeend', html), 80);
      });
    }, groups);
    const expected = [
      { name: '矢量突破 蚀刻章套组#3 拟生态', img: 'https://torappu.prts.wiki/assets/medal_diy/newGroup.png' },
      { name: '昨日海蚀刻章套组', img: 'https://torappu.prts.wiki/assets/medal_diy/medalGroupActivity52side.png' },
    ];
    assert.deepEqual(await getPrtsMedalGroups(page, 2000), expected);
    // 已展开时不可再次点击，否则真实页面会收起列表。
    await page.evaluate(() => document.querySelector('#activity .n-collapse-item__header-main')!.addEventListener('click', () => {
      document.querySelector('#activity .n-flex')!.remove();
    }));
    assert.deepEqual(await getPrtsMedalGroups(page, 2000), expected);
  } finally { await page.close(); }
});

test('存在未加载完整的套组时拒绝返回部分列表', async () => {
  const page = await browser.newPage();
  try {
    await page.setContent(`<div class="n-collapse-item n-collapse-item--active"><div class="n-collapse-item__header-main">活动奖章</div>
      <div class="n-flex"><div>散章</div>${card('完整套组', 'one.png')}<div class="n-card"><h3>缺少图片</h3></div></div></div>`);
    await assert.rejects(getPrtsMedalGroups(page, 150), /套组未完整加载/);
  } finally { await page.close(); }
});
