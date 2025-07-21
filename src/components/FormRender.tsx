import { ActivityList } from "../data/ActivityImg";
import { AvatarList } from "../data/Avatar";
import { MedalDataListMap, MedalGroupList } from "../data/Medal";
import {
  getSortData,
  MEMBER_SORT_KEY,
  memberNameAvatarMap,
} from "../data/NameAvatar";
import { getT } from "../i18n";
import ActivitySelect from "./ActivitySelect";
import CustomInput from "./CustomInput";
import MemberSelect from "./MemberSelect";
import SkinSelect, { SkinSelectProps } from "./SkinSelect";
import { SelectProps, InputProps } from "@heroui/react";

type MemberInfo = (typeof memberNameAvatarMap)[0];

type SelectPropsExtra = SelectProps & {
  data?: MemberInfo[];
};

const ActivityTypes = ["主线", "支线", "故事", "集成战略"];

console.log(ActivityList);

export const FormMap = [
  {
    get name() {
      return getT("firstPurchasedSkin");
    },
    field: "firstSkin",
    components: SkinSelect,
    params: {
      get label() {
        return getT("selectFirstSkin");
      },
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("favoriteSkin");
    },
    field: "favoriteSkin",
    components: SkinSelect,
    params: {
      get label() {
        return getT("selectFavoriteSkin");
      },
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("mainOperator");
    },
    field: "main",
    components: MemberSelect,
    params: {
      get label() {
        return getT("mainOperator");
      },
      get name() {
        return getT("selectOperator");
      },
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("firstSixStar");
    },
    field: "firstSix",
    components: MemberSelect,
    params: {
      get label() {
        return getT("firstSixStar");
      },
      get name() {
        return getT("selectOperator");
      },
      data: getSortData(MEMBER_SORT_KEY.six),
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("beginnerFriendOperator");
    },
    field: "firstMember",
    components: MemberSelect,
    params: {
      get label() {
        return getT("beginnerFriendOperator");
      },
      get name() {
        return getT("selectOperator");
      },
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("favoriteOperator");
    },
    field: "favoriteMember",
    components: MemberSelect,
    params: {
      get label() {
        return getT("favoriteOperator");
      },
      get name() {
        return getT("selectOperator");
      },
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("favoriteSixStarOperator");
    },
    field: "favoriteSixMember",
    components: MemberSelect,
    params: {
      get label() {
        return getT("favoriteSixStarOperator");
      },
      get name() {
        return getT("selectOperator");
      },
      data: getSortData(MEMBER_SORT_KEY.six),
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("favoriteFiveStarOperator");
    },
    field: "favoriteFiveMember",
    components: MemberSelect,
    params: {
      get label() {
        return getT("favoriteFiveStarOperator");
      },
      get name() {
        return getT("selectOperator");
      },
      data: getSortData(MEMBER_SORT_KEY.five),
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("favoriteFourStarOperator");
    },
    field: "favoriteFourMember",
    components: MemberSelect,
    params: {
      get label() {
        return getT("favoriteFourStarOperator");
      },
      get name() {
        return getT("selectOperator");
      },
      data: getSortData(MEMBER_SORT_KEY.four),
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("favoriteThreeStarOperator");
    },
    field: "favoriteThreeMember",
    components: MemberSelect,
    params: {
      get label() {
        return getT("favoriteThreeStarOperator");
      },
      get name() {
        return getT("selectOperator");
      },
      data: getSortData(MEMBER_SORT_KEY.three),
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("favoriteVanguard");
    },
    field: "favoriteXF",
    components: MemberSelect,
    params: {
      get label() {
        return getT("favoriteVanguard");
      },
      get name() {
        return getT("selectOperator");
      },
      data: getSortData(MEMBER_SORT_KEY.XF),
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("favoriteGuard");
    },
    field: "favoriteJW",
    components: MemberSelect,
    params: {
      get label() {
        return getT("favoriteGuard");
      },
      get name() {
        return getT("selectOperator");
      },
      data: getSortData(MEMBER_SORT_KEY.JW),
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("favoriteSniper");
    },
    field: "favoriteJJ",
    components: MemberSelect,
    params: {
      get label() {
        return getT("favoriteSniper");
      },
      get name() {
        return getT("selectOperator");
      },
      data: getSortData(MEMBER_SORT_KEY.JJ),
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("favoriteMedic");
    },
    field: "favoriteYL",
    components: MemberSelect,
    params: {
      get label() {
        return getT("favoriteMedic");
      },
      get name() {
        return getT("selectOperator");
      },
      data: getSortData(MEMBER_SORT_KEY.YL),
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("favoriteDefender");
    },
    field: "favoriteZZ",
    components: MemberSelect,
    params: {
      get label() {
        return getT("favoriteDefender");
      },
      get name() {
        return getT("selectOperator");
      },
      data: getSortData(MEMBER_SORT_KEY.ZZ),
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("favoriteCaster");
    },
    field: "favoriteSS",
    components: MemberSelect,
    params: {
      get label() {
        return getT("favoriteCaster");
      },
      get name() {
        return getT("selectOperator");
      },
      data: getSortData(MEMBER_SORT_KEY.SS),
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("favoriteSupporter");
    },
    field: "favoriteFZ",
    components: MemberSelect,
    params: {
      get label() {
        return getT("favoriteSupporter");
      },
      get name() {
        return getT("selectOperator");
      },
      data: getSortData(MEMBER_SORT_KEY.FZ),
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("favoriteSpecialist");
    },
    field: "favoriteTZ",
    components: MemberSelect,
    params: {
      get label() {
        return getT("favoriteSpecialist");
      },
      get name() {
        return getT("selectOperator");
      },
      data: getSortData(MEMBER_SORT_KEY.TZ),
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("luckiestPull");
    },
    field: "lucky",
    components: MemberSelect,
    params: {
      get label() {
        return getT("luckiestPull");
      },
      get name() {
        return getT("selectOperator");
      },
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("unluckiestPull");
    },
    field: "Unfortunate",
    components: MemberSelect,
    params: {
      get label() {
        return getT("unluckiestPull");
      },
      get name() {
        return getT("selectOperator");
      },
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("favoriteMaleOperator");
    },
    field: "favoriteBoy",
    components: MemberSelect,
    params: {
      get label() {
        return getT("favoriteMaleOperator");
      },
      get name() {
        return getT("selectOperator");
      },
      data: getSortData(MEMBER_SORT_KEY.MAN),
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("favoriteFemaleOperator");
    },
    field: "favoriteGirl",
    components: MemberSelect,
    params: {
      get label() {
        return getT("favoriteFemaleOperator");
      },
      get name() {
        return getT("selectOperator");
      },
      data: getSortData(MEMBER_SORT_KEY.WOMAN),
    } as SelectPropsExtra,
  },
  {
    get name() {
      return getT("firstEvent");
    },
    field: "firstActivity",
    components: ActivitySelect,
    params: {
      get label() {
        return getT("firstEvent");
      },
      get name() {
        return getT("selectActivity");
      },
      data: ActivityList,
    } as SelectPropsExtra & {
      data: (typeof ActivityList)[0][];
    },
  },
  {
    get name() {
      return getT("favoriteStory");
    },
    field: "favoriteDrama",
    components: ActivitySelect,
    params: {
      get label() {
        return getT("favoriteStory");
      },
      get name() {
        return getT("selectActivity");
      },
      // data:ActivityList
      data: ActivityList.filter((item) => {
        const isExist = ActivityTypes.filter((typeItem) =>
          item?.type?.includes?.(typeItem)
        );
        return isExist.length;
      }),
    } as SelectPropsExtra & {
      data: (typeof ActivityList)[0][];
    },
  },
  {
    get name() {
      return getT("favoriteMedalGroup");
    },
    field: "favoriteMedalGroup",
    components: ActivitySelect,
    params: {
      get label() {
        return getT("favoriteMedalGroup");
      },
      get name() {
        return getT("selectMedalGroup");
      },
      data: MedalGroupList,
    } as SelectPropsExtra & {
      data: (typeof MedalGroupList)[0][];
    },
  },
  {
    get name() {
      return getT("favoritePermanentMode");
    },
    field: "favoriteMode",
    components: CustomInput,
    params: {
      get placeholder() {
        return getT("inputFavoriteMode");
      },
      get label() {
        return getT("favoritePermanentMode");
      },
    } as InputProps,
  },
  {
    get name() {
      return getT("favoriteEP");
    },
    field: "favoriteEP",
    components: CustomInput,
    params: {
      get placeholder() {
        return getT("inputFavoriteEP");
      },
      get label() {
        return getT("favoriteEP");
      },
    } as InputProps,
  },
  {
    get name() {
      return getT("mostAnticipatedSatellite");
    },
    field: "hopeMember",
    components: CustomInput,
    params: {
      get placeholder() {
        return getT("inputHopeMember");
      },
      get label() {
        return getT("mostAnticipatedSatellite");
      },
    } as InputProps,
  },
  {
    get name() {
      return getT("inGameName");
    },
    field: "name",
    components: CustomInput,
    params: {
      get placeholder() {
        return getT("inputGameName");
      },
      get label() {
        return getT("inGameName");
      },
    } as InputProps,
  },
  {
    get name() {
      return getT("customAvatar");
    },
    field: "customAvatar",
    components: SkinSelect,
    params: {
      get placeholder() {
        return getT("inputOrSearchAvatar");
      },
      get label() {
        return getT("selectCustomAvatar");
      },
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
];
