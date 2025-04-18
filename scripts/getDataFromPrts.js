// 爬取prts干员信息
// https://prts.wiki/w/%E5%B9%B2%E5%91%98%E4%B8%80%E8%A7%88
const getPageSelectMemberList = () => {
  let arr = document.querySelector("#filter-result").children;
  const list = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const name = item.children[1].children[0].children[0].textContent;
    const sex = item.children[5].children[0].textContent;
    const position = item.children[5].children[1].textContent;
    const [avatar, level, career] = item.querySelectorAll("img");
    const [levelText, _] = level.src.split(".png");
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
  return list;
};
getPageSelectMemberList();

// 获取皮肤列表数据
// https://prts.wiki/w/%E6%97%B6%E8%A3%85%E5%9B%9E%E5%BB%8A
const getSkinList = () => {
  const list = document.querySelectorAll(
    ".halfimgcontainer .charskinbtn-container"
  );
  const skinList = [];
  list.forEach((item) => {
    const imgDom = item.querySelector(".ls-is-cached");
    const skinNameDom = item.querySelector(".charnameEn");
    // 解析url参数获取干员名称
    const url = imgDom && imgDom.src && decodeURIComponent(imgDom.src);
    const obj = {
      // name: null,
      // img: null,
      skinName: skinNameDom.textContent,
    };
    if (url) {
      const [_, name, _2] = url.split("_");
      obj.name = name;
    }
    if (imgDom && imgDom.src) {
      obj.img = imgDom.src;
    }
    // 数据完整才塞入
    Object.values(obj).length === 3 && skinList.push(obj);
  });
  return skinList;
};
getSkinList();

// 获取活动列表 https://prts.wiki/w/%E6%B4%BB%E5%8A%A8%E4%B8%80%E8%A7%88
const getActivityList = () => {
  const data = [];
  const rowArr = document.querySelector(".wikitable").children[0].children;
  let i = 0;
  while (i < rowArr.length) {
    const item = rowArr[i];
    const name = item.children[1];
    const imgDom = item.children[3];
    const img = imgDom?.querySelector?.("img");
    const nameVal = name?.textContent?.split?.(" ")?.[0];
    const imgVal = img?.getAttribute?.("data-srcset")?.split?.("1.5x,")?.[0];
    nameVal &&
      imgVal &&
      data.push({
        name: nameVal,
        img: imgVal,
      });
    i++;
  }
  console.log(data);
};
getActivityList();

// 获取蚀刻章列表 - 套组
// https://prts.wiki/w/%E5%85%89%E8%8D%A3%E4%B9%8B%E8%B7%AF
const getMedalGroupList = () => {
  const data = [];
  document.querySelectorAll("img").forEach((item) => {
    const url = item.getAttribute("data-preview-src");
    if (url && url.includes("/medalGroupActivity")) {
      const name =
        item.parentElement.parentElement.parentElement.textContent.split(
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
};

getMedalList();

// 获取蚀刻章列表 - 单个
const getMedalList = () => {
  document.querySelectorAll(".n-collapse-item__header-main").forEach((item) => {
    item?.click?.();
  });
  const data = [];
  document.querySelectorAll(".n-card__content").forEach((item) => {
    const nameDom = item?.querySelector?.("span");
    const imgDom = item?.querySelector?.("img");
    nameDom.textContent &&
      imgDom?.getAttribute?.("data-preview-src") &&
      data.push({
        name: nameDom.textContent,
        img: imgDom.getAttribute("data-preview-src"),
      });
  });
  console.log(data);
};

// 获取头像 https://prts.wiki/w/%E4%B8%AA%E4%BA%BA%E5%90%8D%E7%89%87%E5%A4%B4%E5%83%8F%E4%B8%80%E8%A7%88
const getAatar = () => {
  const [defaultA, ...other] = document.querySelectorAll(".wikitable");
  const data = [];
  // 初始化默认头像
  const name = [],
    img = [];
  defaultA.querySelectorAll("td").forEach((item) => {
    item.textContent && name.push(item.textContent.replaceAll("\n", ""));
  });
  defaultA.querySelectorAll("th img").forEach((item) => {
    const url = item.getAttribute("data-srcset").split(" ")[0];
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
};
