/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  // Select,
  // SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import LazyLoadAvatar from "./LazyLoadAvatar";
import { ActivityList } from "../data/ActivityImg";
import { useState } from "react";

interface ActivitySelectProps {
  name?: string;
  label?: string;
  onSave?: (val: string) => void;
  formValue?: string;
  data?: (typeof ActivityList)[0][];
}

const ActivitySelect = ({
  name,
  label,
  onSave,
  formValue,
  data,
}: ActivitySelectProps) => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center">
      <Autocomplete
        defaultSelectedKey={formValue}
        label={label}
        placeholder={name}
        className="w-52 "
        defaultItems={data!}
        inputMode={isOpenSearch ? "search" : "none"}
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
};

export default ActivitySelect;
