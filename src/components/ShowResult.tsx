import { useEffect, useRef } from "react";
import Footer from "./Footer";
import { FieldNameMap, FormField } from "./FormRender";
import LazyLoadAvatar from "./LazyLoadAvatar";
import RenderTextCard from "./RenderTextCard";
import { ButtonGroup, Button } from "@nextui-org/react";
import { captureScreen } from "../utils";

interface ShowRes {
  data: typeof FieldNameMap;
  onClose?: () => void;
}

const testData = {
  firstSkin:
    "https://media.prts.wiki/9/98/%E5%8D%8A%E8%BA%AB%E5%83%8F_%E8%8A%AC_skin1.png",
  favoriteSkin:
    "https://media.prts.wiki/9/91/%E5%8D%8A%E8%BA%AB%E5%83%8F_%E5%B9%BD%E7%81%B5%E9%B2%A8_skin1.png",
  main: "https://media.prts.wiki/f/f2/头像_黍.png",
  firstSix: "https://media.prts.wiki/a/ad/头像_能天使.png",
  firstMember: "https://media.prts.wiki/2/28/头像_幽灵鲨.png",
  favoriteMember: "https://media.prts.wiki/6/66/头像_维什戴尔.png",
  favoriteSixMember: "https://media.prts.wiki/f/f2/头像_黍.png",
  favoriteFiveMember: "https://media.prts.wiki/0/00/头像_菲莱.png",
  favoriteFourMember: "https://media.prts.wiki/9/92/头像_深靛.png",
  favoriteThreeMember: "https://media.prts.wiki/b/b9/头像_克洛丝.png",
  favoriteXF: "https://media.prts.wiki/7/79/头像_忍冬.png",
  favoriteJW: "https://media.prts.wiki/e/e1/头像_史尔特尔.png",
  favoriteJJ: "https://media.prts.wiki/6/66/头像_维什戴尔.png",
  favoriteYL: "https://media.prts.wiki/9/94/头像_焰影苇草.png",
  favoriteZZ: "https://media.prts.wiki/f/f2/头像_黍.png",
  favoriteSS: "https://media.prts.wiki/a/aa/头像_林.png",
  favoriteFZ: "https://media.prts.wiki/0/05/头像_塑心.png",
  favoriteTZ: "https://media.prts.wiki/7/76/头像_阿斯卡纶.png",
  lucky: "https://media.prts.wiki/e/e5/头像_麒麟R夜刀.png",
  Unfortunate: "https://media.prts.wiki/0/0f/头像_锏.png",
  favoriteBoy: "https://media.prts.wiki/e/e0/头像_左乐.png",
  favoriteGirl: "https://media.prts.wiki/f/f2/头像_黍.png",
  firstActivity:
    "https://media.prts.wiki/thumb/1/16/%E6%B4%BB%E5%8A%A8%E9%A2%84%E5%91%8A_%E8%90%BD%E5%8F%B6%E9%80%90%E7%81%AB_01.jpg/650px-%E6%B4%BB%E5%8A%A8%E9%A2%84%E5%91%8A_%E8%90%BD%E5%8F%B6%E9%80%90%E7%81%AB_01.jpg",
  favoriteDrama:
    "https://media.prts.wiki/thumb/d/dc/%E6%B4%BB%E5%8A%A8%E9%A2%84%E5%91%8A_%E4%BA%94%E5%91%A8%E5%B9%B4%E5%BA%86%E5%85%B8_02.JPG/650px-%E6%B4%BB%E5%8A%A8%E9%A2%84%E5%91%8A_%E4%BA%94%E5%91%A8%E5%B9%B4%E5%BA%86%E5%85%B8_02.JPG",
  favoriteMode: "萨卡兹肉鸽",
  favoriteEP: "All",
  hopeMember: "克莱莎",
  name: "刷新",
} as Partial<ShowRes["data"]>;

const ShowRes = (props: ShowRes) => {
  const { data = testData } = props;
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  const skin = {
    firstSkin: data.firstSkin,
    favoriteSkin: data.favoriteSkin,
  } as Partial<ShowRes["data"]>;

  const activity = {
    firstActivity: data.firstActivity,
    favoriteDrama: data.favoriteDrama,
  } as Partial<ShowRes["data"]>;

  const text = {
    favoriteMode: data.favoriteMode,
    favoriteEP: data.favoriteEP,
    hopeMember: data.hopeMember,
    name: data.name,
  } as Partial<ShowRes["data"]>;

  const filterData = Object.keys(data).reduce((total, key) => {
    const _key = key as FormField;
    if (!skin[_key] && !activity[_key] && !text[_key]) {
      total[_key] = data[_key];
    }
    return total;
  }, {} as Partial<ShowRes["data"]>);

  const ref = useRef(null);
  return (
    <div ref={ref}>
      <h2 className="text-2xl mb-5">明日方舟生涯表</h2>

      {/* 渲染干员 */}
      <div className="flex flex-wrap gap-2 justify-center mb-5 mt-5">
        {Object.keys(filterData).map((key) => {
          const _key = key as FormField;
          return (
            <div key={filterData[_key] + _key} className="w-16">
              <div className="text-center flex flex-col justify-center items-center">
                <div>
                  <LazyLoadAvatar
                    className="w-full h-full"
                    useAvatar
                    url={filterData[_key]!}
                  />
                </div>
                <div className="text-sm">{FieldNameMap[_key]}</div>
              </div>
            </div>
          );
        })}
      </div>
      {/* 渲染活动 */}
      <div>
        {Object.keys(activity).map((key) => {
          const _key = key as FormField;
          return (
            <div key={_key + activity[_key]} className="mb-5">
              <div>
                <LazyLoadAvatar useAvatar={false} url={activity[_key]!} />
              </div>
              <div className="mt-2">{FieldNameMap[_key]}</div>
            </div>
          );
        })}
      </div>
      {/* 渲染皮肤 */}
      <div className="flex justify-between">
        {Object.keys(skin).map((key) => {
          const _key = key as FormField;
          return (
            <div key={_key + skin[_key]} className="p-5">
              <div>
                <LazyLoadAvatar useAvatar={false} url={skin[_key]!} />
              </div>
              <div className="mt-2">{FieldNameMap[_key]}</div>
            </div>
          );
        })}
      </div>
      <RenderTextCard
        avatarUrl={data.favoriteMember!}
        name={data.name!}
        text={text}
      />
      <ButtonGroup className="mt-5">
        <Button
          color="success"
          onPress={() => {
            captureScreen();
          }}
        >
          截图分享
        </Button>
        <Button
          color="warning"
          onPress={() => {
            props.onClose?.();
          }}
        >
          返回
        </Button>
      </ButtonGroup>
      <Footer />
    </div>
  );
};

export default ShowRes;
