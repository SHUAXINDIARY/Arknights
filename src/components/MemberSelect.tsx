/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  // Select,
  // SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { memberNameAvatarMap } from "../data/NameAvatar";
import LazyLoadAvatar from "./LazyLoadAvatar";

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
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center">
      <Autocomplete
        defaultSelectedKey={formValue}
        label={label}
        placeholder={name}
        className="w-52 "
        defaultItems={data || memberNameAvatarMap}
        onSelectionChange={(val: any) => {
          onSave?.(val);
        }}
        listboxProps={{
          emptyContent: "暂无搜索项",
        }}
      >
        {(item) => (
          <AutocompleteItem key={item.avatar} textValue={item.name}>
            <div className="flex items-center">
              <LazyLoadAvatar url={item.avatar!} useAvatar />
              <span className="ml-3">{item.name}</span>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
}
