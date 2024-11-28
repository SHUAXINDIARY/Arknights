import { ActivityList } from "../data/ActivityImg";
import { AvatarList } from "../data/Avatar";
import { MedalDataListMap, MedalGroupList } from "../data/Medal";
import {
  getSortData,
  MEMBER_SORT_KEY,
  memberNameAvatarMap,
} from "../data/NameAvatar";
import ActivitySelect from "./ActivitySelect";
import CustomInput from "./CustomInput";
import MemberSelect from "./MemberSelect";
import SkinSelect, { SkinSelectProps } from "./SkinSelect";
import { SelectProps, InputProps } from "@nextui-org/react";

type MemberInfo = (typeof memberNameAvatarMap)[0];

type SelectPropsExtra = SelectProps & {
  data?: MemberInfo[];
};

export const FormMap = [
  {
    name: "第一个购入的皮肤",
    field: "firstSkin",
    components: SkinSelect,
    params: {
      label: "选择第一个购入的皮肤",
    } as SelectPropsExtra,
  },
  {
    name: "最喜欢的皮肤",
    field: "favoriteSkin",
    components: SkinSelect,
    params: {
      label: "选择最喜欢的皮肤",
    } as SelectPropsExtra,
  },
  {
    name: "主推",
    field: "main",
    components: MemberSelect,
    params: {
      label: "主推",
      name: "请选择干员",
    } as SelectPropsExtra,
  },
  {
    name: "第一个6星",
    field: "firstSix",
    components: MemberSelect,
    params: {
      label: "第一个6星",
      name: "请选择干员",
      data: getSortData(MEMBER_SORT_KEY.six),
    } as SelectPropsExtra,
  },
  {
    name: "新手之友干员",
    field: "firstMember",
    components: MemberSelect,
    params: {
      label: "新手之友干员",
      name: "请选择干员",
    } as SelectPropsExtra,
  },
  {
    name: "最喜欢用的干员",
    field: "favoriteMember",
    components: MemberSelect,
    params: {
      label: "最喜欢用的干员",
      name: "请选择干员",
    } as SelectPropsExtra,
  },
  {
    name: "最喜欢的6星干员",
    field: "favoriteSixMember",
    components: MemberSelect,
    params: {
      label: "最喜欢的6星干员",
      name: "请选择干员",
      data: getSortData(MEMBER_SORT_KEY.six),
    } as SelectPropsExtra,
  },
  {
    name: "最喜欢的5星干员",
    field: "favoriteFiveMember",
    components: MemberSelect,
    params: {
      label: "最喜欢的5星干员",
      name: "请选择干员",
      data: getSortData(MEMBER_SORT_KEY.five),
    } as SelectPropsExtra,
  },
  {
    name: "最喜欢的4星干员",
    field: "favoriteFourMember",
    components: MemberSelect,
    params: {
      label: "最喜欢的4星干员",
      name: "请选择干员",
      data: getSortData(MEMBER_SORT_KEY.four),
    } as SelectPropsExtra,
  },
  {
    name: "最喜欢的3星干员",
    field: "favoriteThreeMember",
    components: MemberSelect,
    params: {
      label: "最喜欢的3星干员",
      name: "请选择干员",
      data: getSortData(MEMBER_SORT_KEY.three),
    } as SelectPropsExtra,
  },
  {
    name: "最喜欢的先锋",
    field: "favoriteXF",
    components: MemberSelect,
    params: {
      label: "最喜欢的先锋",
      name: "请选择干员",
      data: getSortData(MEMBER_SORT_KEY.XF),
    } as SelectPropsExtra,
  },
  {
    name: "最喜欢的近卫",
    field: "favoriteJW",
    components: MemberSelect,
    params: {
      label: "最喜欢的近卫",
      name: "请选择干员",
      data: getSortData(MEMBER_SORT_KEY.JW),
    } as SelectPropsExtra,
  },
  {
    name: "最喜欢的狙击",
    field: "favoriteJJ",
    components: MemberSelect,
    params: {
      label: "最喜欢的狙击",
      name: "请选择干员",
      data: getSortData(MEMBER_SORT_KEY.JJ),
    } as SelectPropsExtra,
  },
  {
    name: "最喜欢的医疗",
    field: "favoriteYL",
    components: MemberSelect,
    params: {
      label: "最喜欢的医疗",
      name: "请选择干员",
      data: getSortData(MEMBER_SORT_KEY.YL),
    } as SelectPropsExtra,
  },
  {
    name: "最喜欢的重装",
    field: "favoriteZZ",
    components: MemberSelect,
    params: {
      label: "最喜欢的重装",
      name: "请选择干员",
      data: getSortData(MEMBER_SORT_KEY.ZZ),
    } as SelectPropsExtra,
  },
  {
    name: "最喜欢的术师",
    field: "favoriteSS",
    components: MemberSelect,
    params: {
      label: "最喜欢的术师",
      name: "请选择干员",
      data: getSortData(MEMBER_SORT_KEY.SS),
    } as SelectPropsExtra,
  },
  {
    name: "最喜欢的辅助",
    field: "favoriteFZ",
    components: MemberSelect,
    params: {
      label: "最喜欢的辅助",
      name: "请选择干员",
      data: getSortData(MEMBER_SORT_KEY.FZ),
    } as SelectPropsExtra,
  },
  {
    name: "最喜欢的特种",
    field: "favoriteTZ",
    components: MemberSelect,
    params: {
      label: "最喜欢的特种",
      name: "请选择干员",
      data: getSortData(MEMBER_SORT_KEY.TZ),
    } as SelectPropsExtra,
  },

  {
    name: "最欧出卡",
    field: "lucky",
    components: MemberSelect,
    params: {
      label: "最欧出卡",
      name: "请选择干员",
    } as SelectPropsExtra,
  },
  {
    name: "最非出卡",
    field: "Unfortunate",
    components: MemberSelect,
    params: {
      label: "最非出卡",
      name: "请选择干员",
    } as SelectPropsExtra,
  },
  {
    name: "最喜欢的男干员",
    field: "favoriteBoy",
    components: MemberSelect,
    params: {
      label: "最喜欢的男干员",
      name: "请选择干员",
      data: getSortData(MEMBER_SORT_KEY.MAN),
    } as SelectPropsExtra,
  },
  {
    name: "最喜欢的女干员",
    field: "favoriteGirl",
    components: MemberSelect,
    params: {
      label: "最喜欢的女干员",
      name: "请选择干员",
      data: getSortData(MEMBER_SORT_KEY.WOMAN),
    } as SelectPropsExtra,
  },
  {
    name: "入坑活动",
    field: "firstActivity",
    components: ActivitySelect,
    params: {
      label: "入坑活动",
      name: "请选择活动",
      data: ActivityList,
    } as SelectPropsExtra & {
      data: (typeof ActivityList)[0][];
    },
  },
  {
    name: "最喜欢的剧情",
    field: "favoriteDrama",
    components: ActivitySelect,
    params: {
      label: "最喜欢的剧情",
      name: "请选择活动",
      data: ActivityList,
    } as SelectPropsExtra & {
      data: (typeof ActivityList)[0][];
    },
  },
  {
    name: "最喜欢的蚀刻章套组",
    field: "favoriteMedalGroup",
    components: ActivitySelect,
    params: {
      label: "最喜欢的蚀刻章套组",
      name: "请选择蚀刻章套组",
      data: MedalGroupList,
    } as SelectPropsExtra & {
      data: (typeof MedalGroupList)[0][];
    },
  },
  {
    name: "最喜欢的常驻模式",
    field: "favoriteMode",
    components: CustomInput,
    params: {
      placeholder: "请输入最喜欢的常驻模式",
      label: "最喜欢的常驻模式",
    } as InputProps,
  },
  {
    name: "最喜欢的EP",
    field: "favoriteEP",
    components: CustomInput,
    params: {
      placeholder: "请输入最喜欢的EP",
      label: "最喜欢的EP",
    } as InputProps,
  },
  {
    name: "最期待的卫星",
    field: "hopeMember",
    components: CustomInput,
    params: {
      placeholder: "请输入最期待的卫星",
      label: "最期待的卫星",
    } as InputProps,
  },
  {
    name: "您的游戏名称",
    field: "name",
    components: CustomInput,
    params: {
      placeholder: "请输入您的游戏名称",
      label: "您的游戏名称",
    } as InputProps,
  },
  {
    name: "自定义头像",
    field: "customAvatar",
    components: SkinSelect,
    params: {
      placeholder: "输入头像名或干员名称选择",
      label: "选择自定义头像",
      useAvatarShowImg: true,
      useCardShow: false,
      data: [...AvatarList, ...memberNameAvatarMap, ...MedalDataListMap].map(
        (
          item:
            | (typeof AvatarList)[0]
            | (typeof memberNameAvatarMap)[0]
            | (typeof MedalDataListMap)[0]
        ) => {
          return {
            img: "img" in item ? item.img : item.avatar,
            name: item.name,
            skinName: item.name,
          };
        }
      ),
    } as SkinSelectProps,
  },
  // {
  //   name: "最喜欢的宣传图",
  //   field: "favoriteImg",
  //   components: CustomInput,
  //   params: {
  //     placeholder: "请输入最喜欢的宣传图",
  //     label: "请输入最喜欢的宣传图",
  //   } as InputProps,
  // },
  // {
  //   name: "最喜欢的CP",
  //   field: "favoriteCP",
  //   components: CustomInput,
  //   params: {
  //     placeholder: "请输入最喜欢的CP",
  //     label: "请输入最喜欢的CP",
  //   } as InputProps,
  // },
] as const;
