import "./App.css";
import ActivitySelect from "./components/ActivitySelect";
import MemberSelect from "./components/MemberSelect";
import SkinSelect from "./components/SkinSelect";
import { Chip } from "@nextui-org/react";

const FormMap = [
  {
    name: "主推",
    field: "main",
    components: MemberSelect,
  },
  {
    name: "第一个6星",
    field: "firstSix",
    components: MemberSelect,
  },

  {
    name: "入坑活动",
    field: "firstActivity",
    components: ActivitySelect,
  },
  {
    name: "新手之友干员",
    field: "firstMember",
    components: MemberSelect,
  },
  {
    name: "最喜欢用的干员",
    field: "favoriteMember",
    components: MemberSelect,
  },
  {
    name: "最喜欢的6星干员",
    field: "favoriteSixMember",
    components: MemberSelect,
  },
  {
    name: "最喜欢的5星干员",
    field: "favoriteFiveMember",
    components: MemberSelect,
  },
  {
    name: "最喜欢的4星干员",
    field: "favoriteFourMember",
    components: MemberSelect,
  },
  {
    name: "最喜欢的3星干员",
    field: "favoriteThreeMember",
    components: MemberSelect,
  },
  {
    name: "最喜欢的先锋",
    field: "favoriteXF",
    components: MemberSelect,
  },
  {
    name: "最喜欢的近卫",
    field: "favoriteJW",
    components: MemberSelect,
  },
  {
    name: "最喜欢的狙击",
    field: "favoriteJJ",
    components: MemberSelect,
  },
  {
    name: "最喜欢的医疗",
    field: "favoriteYL",
    components: MemberSelect,
  },
  {
    name: "最喜欢的重装",
    field: "favoriteZZ",
    components: MemberSelect,
  },
  {
    name: "最喜欢的术师",
    field: "favoriteSS",
    components: MemberSelect,
  },
  {
    name: "最喜欢的辅助",
    field: "favoriteFZ",
    components: MemberSelect,
  },
  {
    name: "最喜欢的特种",
    field: "favoriteTZ",
    components: MemberSelect,
  },
  {
    name: "第一个购入的皮肤",
    field: "firstSkin",
    components: SkinSelect,
  },
  {
    name: "最喜欢的皮肤",
    field: "favoriteSkin",
    components: SkinSelect,
  },
  {
    name: "最喜欢的剧情",
    field: "favoriteDrama",
    components: ActivitySelect,
  },
  {
    name: "最欧出卡",
    field: "lucky",
    components: MemberSelect,
  },
  {
    name: "最非出卡",
    field: "Unfortunate",
    components: MemberSelect,
  },
  {
    name: "最喜欢的常驻模式",
    field: "favoriteMode",
  },
  {
    name: "最喜欢的EP",
    field: "favoriteEP",
  },
  {
    name: "最期待的卫星",
    field: "hopeMember",
  },
  {
    name: "最喜欢的宣传图",
    field: "favoriteImg",
  },
  {
    name: "最喜欢的CP",
    field: "favoriteCP",
  },
];

function App() {
  return (
    <>
      <div className="mb-10">
        <Chip size="lg" color="primary">
          明日方舟生涯生成器
        </Chip>
      </div>
      {Object.values(FormMap).map((item) => {
        const Com = item.components;
        if (!Com) {
          return <div>占位</div>;
        }
        return (
          <>
            <Com />
            <br />
          </>
        );
      })}
    </>
  );
}

export default App;
