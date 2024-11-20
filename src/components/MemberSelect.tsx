import { Select, SelectItem } from "@nextui-org/react";
import { memberNameAvatarMap } from "../data/NameAvatar";
import { useState } from "react";
import LazyLoadAvatar from "./LazyLoadAvatar";

interface MemberSelectProps {
  name?: string;
  label?: string;
  data?: (typeof memberNameAvatarMap)[0][];
}

export default function MemberSelect({ name, label, data }: MemberSelectProps) {
  const [select, setSelect] =
    useState<(typeof memberNameAvatarMap)[0]["name"]>();
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        label={label || "主推"}
        placeholder={name || "选择干员"}
        className="w-52 "
        inputMode="search"
        value={select}
        onChange={(e) => {
          setSelect(e.target.value);
        }}
      >
        {(data || memberNameAvatarMap).map((item) => (
          <SelectItem key={item.name} textValue={item.name}>
            <div className="flex items-center">
              <LazyLoadAvatar url={item.avatar} useAvatar />
              <span className="ml-3">{item.name}</span>
            </div>
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
