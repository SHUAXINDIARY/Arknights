import { FormMap } from "../components/FormRender";

export type FormField = (typeof FormMap)[number]["field"];

export const FieldNameMap = Object.values(FormMap).reduce((total, item) => {
    total[item.field as FormField] = item.name;
    return total;
}, {} as Record<FormField, string>);