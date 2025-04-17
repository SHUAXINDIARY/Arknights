import { FormMap } from "../components/FormRender";

export type FormField = (typeof FormMap)[number]["field"];

export const FieldNameMap = Object.values(FormMap).reduce((total, item) => {
    total[item.field as FormField] = item.name;
    return total;
}, {} as Record<FormField, string>);


// 国际化冬天切文案 所以动态执行下
export const FieldNameMapForI18n = () => (Object.values(FormMap).reduce((total, item) => {
    total[item.field as FormField] = item.name;
    return total;
}, {} as Record<FormField, string>));