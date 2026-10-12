import { ActivityList } from "../data/ActivityImg";
import LazyLoadAvatar from "./LazyLoadAvatar";
import SelectAutocomplete from "./SelectAutocomplete";
import i18n from "../utils/I18n/i18n";

interface ActivitySelectProps {
  name?: string;
  label?: string;
  onSave?: (val: string) => void;
  formValue?: string;
  data?: (typeof ActivityList)[0][];
}

const ActivitySelect = ({ name, label, onSave, formValue, data = ActivityList }: ActivitySelectProps) => (
  <div className="flex w-full flex-wrap justify-center gap-4 md:flex-nowrap">
    <SelectAutocomplete
      items={data}
      value={formValue}
      label={label}
      placeholder={name}
      itemHeight={100}
      getKey={(item) => item.img}
      getText={(item) => item.name}
      renderItem={(item) => (
        <div className="text-center">
          <LazyLoadAvatar url={item.img} useAvatar={false} />
          {i18n.language === "zh" ? <span>{item.name.split(" ")[0]}</span> : null}
        </div>
      )}
      emptyText={i18n.t("Nothing found")}
      onChange={onSave}
    />
  </div>
);

export default ActivitySelect;

