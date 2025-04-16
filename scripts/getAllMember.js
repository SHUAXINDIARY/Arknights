// 爬取prts干员信息
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

// 获取活动列表
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

// 获取蚀刻章列表
// https://prts.wiki/w/%E5%85%89%E8%8D%A3%E4%B9%8B%E8%B7%AF
const getMedalList = () => {
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
