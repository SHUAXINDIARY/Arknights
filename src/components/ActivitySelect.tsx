import { Select, SelectItem } from "@nextui-org/react";
import { ActivityList } from "../data/ActivityImg";
import { useState } from "react";
import LazyLoadAvatar from "./LazyLoadAvatar";

interface ActivitySelectProps {
  name?: string;
  label?: string;
}

export default function ActivitySelect({ name, label }: ActivitySelectProps) {
  const [select, setSelect] = useState<(typeof ActivityList)[0]["name"]>();
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        label={label || "活动"}
        placeholder={name || "选择活动"}
        className="w-52 "
        inputMode="search"
        value={select}
        onChange={(e) => {
          setSelect(e.target.value);
        }}
      >
        {ActivityList.map((item) => (
          <SelectItem textValue={item.name} key={item.name}>
            <div className="text-center">
              <LazyLoadAvatar url={item.img!} useAvatar={false} />
              <span className="mt-2">{item.name}</span>
            </div>
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
