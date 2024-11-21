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
}

export default function MemberSelect({
  name,
  label,
  data,
  onSave,
}: MemberSelectProps) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center">
      <Autocomplete
        label={label}
        placeholder={name}
        className="w-52 "
        defaultItems={data || memberNameAvatarMap}
        onSelectionChange={(val: any) => {
          onSave?.(val);
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
  // return (
  //   <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center">
  //     <Select
  //       label={label || "主推"}
  //       placeholder={name || "选择干员"}
  //       className="w-52 "
  //       inputMode="search"
  //       onChange={(e) => {
  //         onSave?.(e.target.value);
  //       }}
  //     >
  //       {(data || memberNameAvatarMap).map((item) => (
  //         <SelectItem key={item.avatar} textValue={item.name}>
  //           <div className="flex items-center">
  //             <LazyLoadAvatar url={item.avatar} useAvatar />
  //             <span className="ml-3">{item.name}</span>
  //           </div>
  //         </SelectItem>
  //       ))}
  //     </Select>
  //   </div>
  // );
}
