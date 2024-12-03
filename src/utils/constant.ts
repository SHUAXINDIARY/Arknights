import { FormMap } from "../components/FormRender";

export type FormField = (typeof FormMap)[number]["field"];

export const FieldNameMap = Object.values(FormMap).reduce((total, item) => {
    total[item.field as FormField] = item.name;
    return total;
}, {} as Record<FormField, string>);

// 当前支持语言
export const langMap = {
    JA: 'ja',
    ZH: 'zh',
    EN: 'en'
}

// 获取用户设备语言
export const getUserLanguage = () => {
    if (window.navigator.language) {
        const [ln] = window.navigator.language.split('-');
        const _ln = ln.toLocaleLowerCase();
        for (const key in langMap) {
            if (langMap[key] === _ln) {
                return langMap[key]
            }
        }
    }
}
