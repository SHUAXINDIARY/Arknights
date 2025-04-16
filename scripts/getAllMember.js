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
            level: Number(levelArr[levelArr.length - 1]),
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
