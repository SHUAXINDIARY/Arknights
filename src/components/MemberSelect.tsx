/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  // Select,
  // SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import { memberNameAvatarMap } from "../data/NameAvatar";
import LazyLoadAvatar from "./LazyLoadAvatar";
import { useState } from "react";
import i18n, { getT } from "../utils/I18n/i18n";

interface MemberSelectProps {
  name?: string;
  label?: string;
  // 数据源
  data?: (typeof memberNameAvatarMap)[0][];
  // 保存到表单
  onSave?: (val: string) => void;
  formValue?: string;
}

export default function MemberSelect({
  name,
  label,
  data,
  onSave,
  formValue,
}: MemberSelectProps) {
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center">
      <Autocomplete
        defaultSelectedKey={formValue}
        label={label}
        placeholder={name}
        className="w-52"
        itemHeight={52}
        defaultItems={data || memberNameAvatarMap}
        onBlur={() => {
          setIsOpenSearch(false);
        }}
        onClick={(e) => {
          // @ts-ignore
          if (e.target.tagName === "INPUT") {
            setIsOpenSearch(true);
          }
          e.stopPropagation();
        }}
        inputMode={isOpenSearch ? "search" : "none"}
        onSelectionChange={(val: any) => {
          onSave?.(val);
        }}
        listboxProps={{
          // emptyContent: "暂无搜索项",
          get emptyContent() {
            return getT("Nothing found");
          },
        }}
      >
        {(item) => {
          let operatorName = item.name;
          switch (i18n.language) {
            case "en":
              operatorName = item.enName;
              break;
            case "jp":
              operatorName = item.jpName;
              break;
            default:
              break;
          }
          return (
            <AutocompleteItem
              key={item.avatar}
              textValue={operatorName || item.name}
              className="h-auto"
            >
              <div className="flex items-center">
                <LazyLoadAvatar url={item.avatar!} useAvatar />
                <span className="ml-3">{operatorName || item.name}</span>
              </div>
            </AutocompleteItem>
          );
        }}
      </Autocomplete>
    </div>
  );
}
