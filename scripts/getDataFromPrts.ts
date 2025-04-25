/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import fs from 'fs'
import puppeteer, { Browser } from 'puppeteer'
import { saveOperator, saveSkin } from './filterData'

const getSkinList = async () => {
  // 执行原始提取逻辑
  const list = document.querySelectorAll(
    ".halfimgcontainer .charskinbtn-container"
  );
  const skinList = [] as Partial<{ name: string, img: string, skinName: string }>[];
  list.forEach((item) => {
    const imgDom = item.querySelector("img");
    console.log(imgDom)
    const skinNameDom = item.querySelector(".charnameEn");
    const src = imgDom?.getAttribute?.('data-src');

    const url = src && decodeURIComponent(src);
    const obj = {
      skinName: skinNameDom?.textContent?.trim().replaceAll(' ', '_'),
    } as Partial<{
      name: string
      img: string
    }>;

    if (url) {
      const [_, name, _2] = url.split("_");
      obj.name = name;
    }
    if (src) {
      obj.img = src;
    }

    if (Object.keys(obj).length === 3) {
      skinList.push(obj);
    }
  });
  return skinList;
};


const getMedalList = async () => {
  await document.querySelectorAll(".n-collapse-item__header-main").forEach((item: Element & {
    click?: () => void
  }) => {
    item?.click?.();
  });
  const data = [] as Partial<{
    name: string,
    img: string,
  }>[];
  document.querySelectorAll(".n-card__content").forEach((item) => {
    const nameDom = item?.querySelector?.("span");
    const imgDom = item?.querySelector?.("img");
    nameDom?.textContent &&
      imgDom?.getAttribute?.("data-preview-src") &&
      data.push({
        name: nameDom.textContent,
        img: imgDom.getAttribute("data-preview-src") || '',
      });
  });
  console.log(data);
  return data
};

const getMedalGroupList = async () => {
  const data = [] as Partial<{
    img: string,
    name: string,
  }>[];
  document.querySelectorAll("img").forEach((item) => {
    const url = item.getAttribute("data-preview-src");
    if (url && url.includes("/medalGroupActivity")) {
      const name =
        item?.parentElement?.parentElement?.parentElement?.textContent?.split?.(
          " "
        )[0];
      url &&
        name &&
        data.push({
          img: url,
          name,
        });
    }
  });
  console.log(data);
  return data
};

const getAatar = () => {
  const [defaultA, ...other] = document.querySelectorAll(".wikitable");
  const data = [] as Partial<{
    name: string,
    img: string,
  }>[];
  // 初始化默认头像
  const name = [] as string[],
    img = [] as string[];
  defaultA.querySelectorAll("td").forEach((item) => {
    item?.textContent && name.push(item?.textContent?.replaceAll?.("\n", ""));
  });
  defaultA.querySelectorAll("th img").forEach((item) => {
    const url = item?.getAttribute?.("data-srcset")?.split?.(" ")?.[0];
    url && img.push(url);
  });
  data.push(
    ...name.map((item, i) => {
      return {
        name: item,
        img: img[i],
      };
    })
  );
  // 初始化其他
  other.forEach((table) => {
    const name = table
      ?.querySelectorAll?.("th")?.[1]
      ?.textContent?.replaceAll("\n", "");
    const img = table
      ?.querySelectorAll("th img")?.[0]
      ?.getAttribute("data-srcset")
      ?.split(" ")[0];
    name && img && data.push({ name, img });
  });
  console.log(data);
  return data
};

const getPageSelectMemberList = async () => {
  const arr = document?.querySelector?.("#filter-result")?.children;
  const list = [] as Partial<{
    avatar: string | null,
    name: string | null,
    sex: string | null,
    level: number,
    career: string | null,
    position: string | null,
  }>[];
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      const name = item?.children?.[1].children?.[0].children?.[0]?.textContent;
      const sex = item?.children?.[5].children?.[0]?.textContent;
      const position = item?.children?.[5].children?.[1]?.textContent;
      const [avatar, level, career] = item.querySelectorAll("img");
      const [levelText, _] = level?.src?.split?.(".png") || [];
      const levelArr = decodeURIComponent(levelText).split("_");
      const [careerText, _2] = career.src.split(".png");
      const careerArr = decodeURIComponent(careerText).split("_");
      list.push({
        avatar: avatar.getAttribute("data-src"),
        name,
        sex,
        level: Number(levelArr[levelArr.length - 1]) + 1,
        career: careerArr[careerArr.length - 1] || "",
        position,
      });
    }
  }
  return list;
};

// 获取活动列表 https://prts.wiki/w/%E6%B4%BB%E5%8A%A8%E4%B8%80%E8%A7%88
const getActivityList = async () => {
  const data = [] as Partial<{
    name: string,
    img: string,
  }>[];
  document?.querySelectorAll(".wikitable").forEach(item => {
    const Table = item.children[0];
    const trArr = Table.children
    for (let i = 0; i < trArr.length; i++) {
      if (i) {
        const dataItem = trArr[i];
        const name = dataItem.children[1].textContent?.split('\n')?.[0]
        const img = dataItem.querySelector('img')?.getAttribute('data-srcset')?.split(' ')?.[0]
        name && img && data.push({
          name,
          img
        })
      }

    }
  })
  return data
};

const task = [
  {
    dataKey: 'MedalDataListMap',
    url: 'https://prts.wiki/w/%E5%85%89%E8%8D%A3%E4%B9%8B%E8%B7%AF',
    name: '蚀刻章全量',
    fun: getMedalList
  },
  {
    dataKey: 'MedalGroupList',
    url: 'https://prts.wiki/w/%E5%85%89%E8%8D%A3%E4%B9%8B%E8%B7%AF',
    name: '蚀刻章套组',
    fun: getMedalGroupList,
    customFun: async (browser: Browser, params: typeof task[0]) => {
      const { url, fun } = params;
      const page = await browser.newPage();
      await page.goto(url);
      const arr = await page.$$(".n-collapse-item__header-main")
      await arr[arr.length - 2]?.click()
      const data = await page.evaluate(fun)
      await page.close();
      return data;
    }
  },
  {
    dataKey: '_skinList',
    name: "皮肤",
    url: 'https://prts.wiki/w/%E6%97%B6%E8%A3%85%E5%9B%9E%E5%BB%8A',
    fun: getSkinList
  },
  {
    dataKey: 'AvatarList',
    name: '头像',
    url: 'https://prts.wiki/w/%E4%B8%AA%E4%BA%BA%E5%90%8D%E7%89%87%E5%A4%B4%E5%83%8F%E4%B8%80%E8%A7%88',
    fun: getAatar
  },
  {
    dataKey: 'memberNameAvatarMap',
    name: '干员',
    url: 'https://prts.wiki/w/%E5%B9%B2%E5%91%98%E4%B8%80%E8%A7%88',
    customFun: async (browser: Browser) => {
      const data = [] as any[];
      let i = 0
      while (i < 2) {
        if (i === 0) {
          const page = await browser.newPage();
          await page.goto('https://prts.wiki/w/%E5%B9%B2%E5%91%98%E4%B8%80%E8%A7%88')
          const selectHandles = await page.$$(`select[name="length"]`);
          await selectHandles[1].select('200');
          const _data = await page.evaluate(getPageSelectMemberList)
          data.push(...(_data || []))
          await page.close()
        } else {
          const page = await browser.newPage();
          await page.goto('https://prts.wiki/w/%E5%B9%B2%E5%91%98%E4%B8%80%E8%A7%88')
          const selectHandles = await page.$$(`select[name="length"]`);
          await selectHandles[1].select('200');
          const pageDom = await page.$$('.checkbox-container');
          await pageDom[pageDom.length - 1]?.click?.()
          const _data = await page.evaluate(getPageSelectMemberList)
          data.push(...(_data || []))
          await page.close()
        }
        i++
      }
      return data
    }
  },
  {
    dataKey: 'ActivityList',
    name: '活动',
    url: 'https://prts.wiki/w/%E6%B4%BB%E5%8A%A8%E4%B8%80%E8%A7%88',
    fun: getActivityList,
  },
] as const;

(async () => {
  const dataMap = {} as any;
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  });
  for (let i = 0; i < task.length; i++) {
    // @ts-ignore
    const { url, fun, name, customFun, dataKey } = task[i];
    if (customFun) {
      const data = await customFun?.(browser, task[i])
      console.log(name, data.length)
      dataMap[dataKey] = data
      console.log(`${name} page 关闭`)
    } else {
      const page = await browser.newPage();
      await page.goto(url);
      const data = await page.evaluate(fun)
      console.log(name, data.length)
      dataMap[dataKey] = data
      await page.close();
      console.log(`${name} page 关闭`)
    }
  }
  await browser.close();
  const operator = saveOperator(dataMap.memberNameAvatarMap);
  const skin = saveSkin(dataMap._skinList);
  dataMap.memberNameAvatarMap = operator;
  dataMap._skinList = skin;
  await fs.writeFileSync('./src/data/AutoGenerateData.ts', `export const dataMap = ${JSON.stringify(dataMap)}`)
})();
