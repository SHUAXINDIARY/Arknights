import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)



export const resources = {
    en: {
        translation: {
            "Language": "Language",
            "modalTitle": "Disclaimer",
            "inspirationText": "Inspired by",
            "careerImage": "Career Chart made by",
            "dataSource": "Data Source",
            "prts": "PRTS",
            "wiki": "Arknights Wiki on Bilibili",
            "devContact": "Site developed by me, contact info:",
            "xhs": "Xiaohongshu",
            "github": "GitHub",
            "bilibili": "Bilibili",
            "skland": "Skland",
            "email": "shuaxinjs@qq.com",
            "copyright":
                "All assets in this repository belong to Hypergryph. Not for commercial use. Do not infringe the rights of the copyright holder.",
            "haveFun": "Have fun!",
            "selectSkin": "Select Skin",
            "inputSkinOrOperator": "Enter skin or operator name to search",
            "cancel": "Cancel",
            "confirm": "Confirm",
            "Nothing found": "Nothing found",
            "Arknights Career Generator": "Arknights Career Generator",
            "generate": "Generate",
            "prompt": "Prompt",
            "selectOrFillOne": "Please select or fill in at least one of the above options",
            "previewExample": "Preview Example",
            "firstPurchasedSkin": "First Purchased Skin",
            "favoriteSkin": "Favorite Skin",
            "mainOperator": "Main Operator",
            "firstSixStar": "First 6★ Operator",
            "beginnerFriendOperator": "Beginner-Friendly Operator",
            "favoriteOperator": "Favorite Operator",
            "favoriteSixStarOperator": "Favorite 6★ Operator",
            "favoriteFiveStarOperator": "Favorite 5★ Operator",
            "favoriteFourStarOperator": "Favorite 4★ Operator",
            "favoriteThreeStarOperator": "Favorite 3★ Operator",
            "favoriteVanguard": "Favorite Vanguard",
            "favoriteGuard": "Favorite Guard",
            "favoriteSniper": "Favorite Sniper",
            "favoriteMedic": "Favorite Medic",
            "favoriteDefender": "Favorite Defender",
            "favoriteCaster": "Favorite Caster",
            "favoriteSupporter": "Favorite Supporter",
            "favoriteSpecialist": "Favorite Specialist",
            "luckiestPull": "Luckiest Pull",
            "unluckiestPull": "Unluckiest Pull",
            "favoriteMaleOperator": "Favorite Male Operator",
            "favoriteFemaleOperator": "Favorite Female Operator",
            "firstEvent": "First Event",
            "favoriteStory": "Favorite Story",
            "favoriteMedalGroup": "Favorite Medal Group",
            "favoritePermanentMode": "Favorite Permanent Mode",
            "favoriteEP": "Favorite EP",
            "mostAnticipatedSatellite": "Most Anticipated Operator",
            "inGameName": "In-Game Name",
            "customAvatar": "Custom Avatar",
            "selectFirstSkin": "Select First Purchased Skin",
            "selectFavoriteSkin": "Select Favorite Skin",
            "selectOperator": "Please select an operator",
            "selectActivity": "Please select an event",
            "selectMedalGroup": "Please select a medal group",
            "inputFavoriteMode": "Enter your favorite permanent mode",
            "inputFavoriteEP": "Enter your favorite EP",
            "inputHopeMember": "Enter your most anticipated operator",
            "inputGameName": "Enter your in-game name",
            "inputOrSearchAvatar": "Enter or search by avatar or operator name",
            "selectCustomAvatar": "Select Custom Avatar",
            "siteAuthor": "Site Author",
            "formAuthor": "Form Author",
            "more": "More",
            "moreActions": "More Actions",
            "siteRepo": "Site Repository",
            "selectLanguage": "Select Language",
            "close": "Close",
            "arknights_generator_title": "Arknights Career Generator",
            "render_operator": "Render Operator",
            "render_activity": "Render Activity",
            "render_skin": "Render Skin",
            "scan_to_fill": "Scan to Fill",
            "export_result": "Export Result",
            "edit": "Edit",
            "go_back": "Go Back"
        }
    },
    jp: {
        translation: {
            "Language": "言語",
            "modalTitle": "免責事項",
            "inspirationText": "インスピレーション提供者：",
            "careerImage": "が作成したキャリア図：",
            "dataSource": "データ提供元",
            "prts": "PRTS",
            "wiki": "BilibiliのアークナイツWiki",
            "devContact": "このサイトはすべて私自身が開発しました。連絡先は以下：",
            "xhs": "小紅書（RED）",
            "github": "GitHub",
            "bilibili": "ビリビリ",
            "skland": "スカイランド",
            "email": "shuaxinjs@qq.com",
            "copyright":
                "このリポジトリに含まれる全素材の著作権はHypergryphに帰属します。商用利用不可、著作権者の利益を侵害しないでください。",
            "haveFun": "楽しんでくださいね～！",
            "confirm": "確認",
            "selectSkin": "スキンを選択",
            "inputSkinOrOperator": "スキン名またはオペレーター名を入力して検索",
            "cancel": "キャンセル",
            "Nothing found": "見つかりませんでした",
            "Arknights Career Generator": "アークナイツ キャリアジェネレーター",
            "generate": "生成",
            "prompt": "ヒント",
            "selectOrFillOne": "上記のいずれかを選択または入力してください",
            "previewExample": "プレビュー例",
            "firstPurchasedSkin": "最初に購入したスキン",
            "favoriteSkin": "お気に入りのスキン",
            "mainOperator": "推しオペレーター",
            "firstSixStar": "最初の★6オペレーター",
            "beginnerFriendOperator": "初心者向けオペレーター",
            "favoriteOperator": "よく使うオペレーター",
            "favoriteSixStarOperator": "お気に入りの★6オペレーター",
            "favoriteFiveStarOperator": "お気に入りの★5オペレーター",
            "favoriteFourStarOperator": "お気に入りの★4オペレーター",
            "favoriteThreeStarOperator": "お気に入りの★3オペレーター",
            "favoriteVanguard": "お気に入りの先鋒",
            "favoriteGuard": "お気に入りの前衛",
            "favoriteSniper": "お気に入りの狙撃",
            "favoriteMedic": "お気に入りの医療",
            "favoriteDefender": "お気に入りの重装",
            "favoriteCaster": "お気に入りの術師",
            "favoriteSupporter": "お気に入りの補助",
            "favoriteSpecialist": "お気に入りの特殊",
            "luckiestPull": "最も運が良かったガチャ",
            "unluckiestPull": "最も運が悪かったガチャ",
            "favoriteMaleOperator": "お気に入りの男性オペレーター",
            "favoriteFemaleOperator": "お気に入りの女性オペレーター",
            "firstEvent": "初めてのイベント",
            "favoriteStory": "お気に入りのストーリー",
            "favoriteMedalGroup": "お気に入りの勲章セット",
            "favoritePermanentMode": "お気に入りの常設モード",
            "favoriteEP": "お気に入りのEP",
            "mostAnticipatedSatellite": "最も期待しているオペレーター",
            "inGameName": "ゲーム内の名前",
            "customAvatar": "カスタムアバター",
            "selectFirstSkin": "最初に購入したスキンを選択",
            "selectFavoriteSkin": "お気に入りのスキンを選択",
            "selectOperator": "オペレーターを選択してください",
            "selectActivity": "イベントを選択してください",
            "selectMedalGroup": "勲章セットを選択してください",
            "inputFavoriteMode": "お気に入りの常設モードを入力",
            "inputFavoriteEP": "お気に入りのEPを入力",
            "inputHopeMember": "最も期待しているオペレーターを入力",
            "inputGameName": "ゲーム内の名前を入力",
            "inputOrSearchAvatar": "アバター名またはオペレーター名で検索",
            "selectCustomAvatar": "カスタムアバターを選択",
            "siteAuthor": "サイト作者",
            "formAuthor": "フォーム作者",
            "more": "もっと見る",
            "moreActions": "その他の操作",
            "siteRepo": "サイトのリポジトリ",
            "selectLanguage": "言語を選択",
            "close": "閉じる",
            "arknights_generator_title": "アークナイツキャリアジェネレーター",
            "render_operator": "オペレーターを表示",
            "render_activity": "イベントを表示",
            "render_skin": "スキンを表示",
            "scan_to_fill": "スキャンして記入",
            "export_result": "結果をエクスポート",
            "edit": "編集",
            "go_back": "戻る"
        }
    },
    zh: {
        translation: {
            "Language": "语言",
            "modalTitle": "提前声明",
            "inspirationText": "灵感来自",
            "careerImage": "制作的生涯图：",
            "dataSource": "数据来源",
            "prts": "prts",
            "wiki": "B站明日方舟WIKI",
            "devContact": "网站开发均为本人，联系方式如下：",
            "xhs": "小红书",
            "github": "Github",
            "bilibili": "B站",
            "skland": "森空岛",
            "email": "shuaxinjs@qq.com",
            "copyright":
                "本仓库中所有素材其版权归属 上海鹰角网络有限公司 所有。不得用于商业用途，不得损害版权方的利益",
            "haveFun": "最后玩的开心~！",
            "selectSkin": "选择皮肤",
            "inputSkinOrOperator": "输入皮肤或干员名搜索",
            "cancel": "取消",
            "confirm": "确定",
            "Nothing found": "暂无搜索项",
            "Arknights Career Generator": "明日方舟生涯生成器",
            generate: "生成",
            prompt: "提示",
            selectOrFillOne: "请至少选择或填写上述其中的一项",
            previewExample: "预览示例",
            firstPurchasedSkin: "第一个购入的皮肤",
            favoriteSkin: "最喜欢的皮肤",
            mainOperator: "主推",
            firstSixStar: "第一个6星",
            beginnerFriendOperator: "新手之友干员",
            favoriteOperator: "最喜欢用的干员",
            favoriteSixStarOperator: "最喜欢的6星干员",
            favoriteFiveStarOperator: "最喜欢的5星干员",
            favoriteFourStarOperator: "最喜欢的4星干员",
            favoriteThreeStarOperator: "最喜欢的3星干员",
            favoriteVanguard: "最喜欢的先锋",
            favoriteGuard: "最喜欢的近卫",
            favoriteSniper: "最喜欢的狙击",
            favoriteMedic: "最喜欢的医疗",
            favoriteDefender: "最喜欢的重装",
            favoriteCaster: "最喜欢的术师",
            favoriteSupporter: "最喜欢的辅助",
            favoriteSpecialist: "最喜欢的特种",
            luckiestPull: "最欧出卡",
            unluckiestPull: "最非出卡",
            favoriteMaleOperator: "最喜欢的男干员",
            favoriteFemaleOperator: "最喜欢的女干员",
            firstEvent: "入坑活动",
            favoriteStory: "最喜欢的剧情",
            favoriteMedalGroup: "最喜欢的蚀刻章套组",
            favoritePermanentMode: "最喜欢的常驻模式",
            favoriteEP: "最喜欢的EP",
            mostAnticipatedSatellite: "最期待的卫星",
            inGameName: "您的游戏名称",
            customAvatar: "自定义头像",
            selectFirstSkin: "选择第一个购入的皮肤",
            selectFavoriteSkin: "选择最喜欢的皮肤",
            selectOperator: "请选择干员",
            selectActivity: "请选择活动",
            selectMedalGroup: "请选择蚀刻章套组",
            inputFavoriteMode: "请输入最喜欢的常驻模式",
            inputFavoriteEP: "请输入最喜欢的EP",
            inputHopeMember: "请输入最期待的卫星",
            inputGameName: "请输入您的游戏名称",
            inputOrSearchAvatar: "输入头像名或干员名称选择",
            selectCustomAvatar: "选择自定义头像",
            siteAuthor: "站点作者",
            formAuthor: "表格作者",
            more: "更多",
            moreActions: "更多操作",
            siteRepo: "站点仓库",
            selectLanguage: "选择语言",
            close: "关闭",
            "arknights_generator_title": "Arknights Career Generator",
            "render_operator": "渲染干员",
            "render_activity": "渲染活动",
            "render_skin": "渲染皮肤",
            "scan_to_fill": "扫码填写",
            "export_result": "导出结果",
            "edit": "编辑",
            "go_back": "返回"
        }
    }
} as const;

const language = navigator.language || navigator.language;
console.log(language); // 例如 "en-US", "zh-CN", "ja", etc.

const langMap = {
    'zh-CN': 'zh',
    'zh-TW': 'zh',
    'zh-HK': 'zh',
    'zh': 'zh',
    'ja': 'jp',
}

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: langMap[language] || "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export const getT = (key: keyof typeof resources.en.translation) => i18n.t(key)

export const THook = () => {
    const { t } = useTranslation()
    return {
        t: (key: keyof typeof resources.en.translation) => t(key)
    }
}

export default i18n;