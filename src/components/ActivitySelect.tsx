/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  // Select,
  // SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { ActivityList } from "../data/ActivityImg";
import LazyLoadAvatar from "./LazyLoadAvatar";

interface ActivitySelectProps {
  name?: string;
  label?: string;
  onSave?: (val: string) => void;
  formValue?: string;
}

export default function ActivitySelect({
  name,
  label,
  onSave,
  formValue,
}: ActivitySelectProps) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center">
      <Autocomplete
        defaultSelectedKey={formValue}
        label={label}
        placeholder={name}
        className="w-52 "
        defaultItems={ActivityList}
        onSelectionChange={(val: any) => {
          onSave?.(val);
        }}
        listboxProps={{
          emptyContent: "暂无搜索项",
        }}
      >
        {(item) => (
          <AutocompleteItem key={item.img} textValue={item.name}>
            <div className="text-center">
              <LazyLoadAvatar url={item.img!} useAvatar={false} />
              <span className="mt-2">{item.name}</span>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
}
