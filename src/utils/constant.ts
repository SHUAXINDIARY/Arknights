import { FormMap } from "../components/FormRender";

export type FormField = (typeof FormMap)[number]["field"];

export const FieldNameMap = () => {
    return (
        Object.values(FormMap).reduce((total, item) => {
            total[item.field as FormField] = item.name;
            return total;
        }, {} as Record<FormField, string>)
    )
};


// 国际化动态切文案 所以动态执行下
export const FieldNameMapForI18n = () => (Object.values(FormMap).reduce((total, item) => {
    total[item.field as FormField] = item.name;
    return total;
}, {} as Record<FormField, string>));

// 结果key
export const RESULT_DATA_KEY = 'RESULT_DATA_KEY';

// 弹窗key
export const INIT_MODAL = 'INIT_MODAL';

export const ONE_HOUR = 3600000;
