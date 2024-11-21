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
}

export default function ActivitySelect({
  name,
  label,
  onSave,
}: ActivitySelectProps) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center">
      <Autocomplete
        label={label}
        placeholder={name}
        className="w-52 "
        defaultItems={ActivityList}
        onSelectionChange={(val: any) => {
          onSave?.(val);
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
  // return (
  //   <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center">
  //     <Select
  //       label={label || "活动"}
  //       placeholder={name || "选择活动"}
  //       className="w-52 "
  //       inputMode="search"
  //       onChange={(e) => {
  //         onSave?.(e.target.value);
  //       }}
  //     >
  //       {ActivityList.map((item) => (
  //         <SelectItem textValue={item.name} key={item.img}>
  //           <div className="text-center">
  //             <LazyLoadAvatar url={item.img!} useAvatar={false} />
  //             <span className="mt-2">{item.name}</span>
  //           </div>
  //         </SelectItem>
  //       ))}
  //     </Select>
  //   </div>
  // );
}
