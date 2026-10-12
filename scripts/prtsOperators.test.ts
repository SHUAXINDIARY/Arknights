import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import puppeteer, { type Browser } from 'puppeteer';
import { getPrtsOperators } from './prtsOperators';

let browser: Browser;
before(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    defaultViewport: { width: 1920, height: 1080 },
  });
});
after(async () => {
  await browser?.close();
});

/** 控件延迟出现，选中页码先改变，列表稍后更新，模拟站点初始化/翻页竞态。 */
const fixture = (total: number, duplicateControls = false, missingPage = 0) => `
  <div id="app"></div>
  <script>
    setTimeout(() => {
      const total = ${total};
      let size = 50;
      let number = 1;
      let timer;
      const app = document.querySelector('#app');
      app.innerHTML = '<div class="paginations-container"><select name="length"><option value="50">50</option><option value="200">200</option></select><div>共${total}条</div><div class="checkbox-container"></div></div><div id="filter-result"></div>';
      if (${duplicateControls}) app.appendChild(app.firstElementChild.cloneNode(true));
      function renderRows() {
        const rows = [];
        for (let i = (number - 1) * size; i < Math.min(number * size, total); i++) {
          rows.push('<div class="long-container"><img src="https://example.invalid/avatar-' + i + '.png"><img src="https://example.invalid/稀有度_黄_5.png"><img src="https://example.invalid/图标_职业_近卫.png"><div class="name"><a>干员' + i + '</a></div><div class="sex">女</div><div class="position">近战位</div></div>');
        }
        document.querySelector('#filter-result').innerHTML = rows.join('');
      }
      function renderPagination() {
        document.querySelectorAll('.paginations-container').forEach(pagination => {
          pagination.querySelector('select').value = String(size);
          const buttons = pagination.querySelector('.checkbox-container');
          buttons.replaceChildren();
          for (let i = 1; i <= Math.ceil(total / size); i++) {
            if (i === ${missingPage}) continue;
            const button = document.createElement('div');
            button.className = 'checkbox-container' + (i === number ? ' selected' : '');
            button.textContent = String(i);
            button.onclick = () => {
              number = i;
              renderPagination();
              clearTimeout(timer);
              timer = setTimeout(renderRows, 150);
            };
            buttons.appendChild(button);
          }
        });
      }
      document.querySelectorAll('select').forEach(select => {
        select.onchange = () => {
          size = Number(select.value);
          number = 1;
          renderPagination();
          clearTimeout(timer);
          timer = setTimeout(renderRows, 150);
        };
      });
      renderRows();
      renderPagination();
    }, 150);
  </script>
`;

for (const { total, duplicateControls } of [
  { total: 401, duplicateControls: false },
  { total: 400, duplicateControls: true },
]) {
  test(`等待动态控件/翻页渲染，完整读取 ${total} 条（${duplicateControls ? '双' : '单'}下拉框）`, async () => {
    const page = await browser.newPage();
    try {
      await page.setRequestInterception(true);
      page.on('request', (request) => void request.abort());
      await page.setContent(fixture(total, duplicateControls));
      const data = await getPrtsOperators(page);
      assert.equal(data.length, total);
      assert.deepEqual(data.map((row) => row.name), Array.from({ length: total }, (_, i) => `干员${i}`));
      assert.equal(data[0].level, 6);
      assert.equal(data[0].career, '近卫');
    } finally {
      await page.close();
    }
  });
}

test('缺失中间页时明确报错，避免输出不完整的数据', async () => {
  const page = await browser.newPage();
  try {
    await page.setRequestInterception(true);
    page.on('request', (request) => void request.abort());
    await page.setContent(fixture(401, false, 2));
    await assert.rejects(getPrtsOperators(page), /未找到 PRTS 干员第 2 页按钮/);
  } finally {
    await page.close();
  }
});

test('当前 PRTS 站点完整抓取（仅设置 PRTS_LIVE_TEST=1 时运行，不写数据文件）', {
  skip: process.env.PRTS_LIVE_TEST !== '1',
}, async () => {
  const page = await browser.newPage();
  try {
    page.on('pageerror', (error) => console.error('PRTS 页面脚本错误：', error));
    await page.goto('https://prts.wiki/w/%E5%B9%B2%E5%91%98%E4%B8%80%E8%A7%88', {
      waitUntil: 'domcontentloaded',
      timeout: 120_000,
    });
    const data = await getPrtsOperators(page);
    assert.ok(data.length > 400);
    console.log(`PRTS 实测：${data.length} 条，首项 ${data[0].name}，末项 ${data.at(-1)?.name}`);
  } catch (error) {
    console.error('PRTS 页面状态：', await page.evaluate(() => ({
      url: document.URL,
      selectCount: document.querySelectorAll('select[name="length"]').length,
      rows: document.querySelector('#filter-result')?.children.length,
      firstRow: document.querySelector('#filter-result')?.firstElementChild?.outerHTML.slice(0,1000),
    })));
    throw error;
  } finally {
    await page.close();
  }
});
