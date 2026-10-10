import { memberNameAvatarMap } from "../data/NameAvatar";
import LazyLoadAvatar from "./LazyLoadAvatar";
import SelectAutocomplete from "./SelectAutocomplete";
import i18n, { getT } from "../utils/I18n/i18n";

interface MemberSelectProps {
  name?: string;
  label?: string;
  data?: (typeof memberNameAvatarMap)[0][];
  onSave?: (val: string) => void;
  formValue?: string;
}

export default function MemberSelect({ name, label, data, onSave, formValue }: MemberSelectProps) {
  const items = data || memberNameAvatarMap;

  return (
    <div className="flex w-full flex-wrap justify-center gap-4 md:flex-nowrap">
      <SelectAutocomplete
        items={items}
        value={formValue}
        label={label}
        placeholder={name}
        itemHeight={52}
        getKey={(item) => item.avatar}
        getText={(item) => {
          switch (i18n.language) {
            case "en": return item.enName || item.name;
            case "jp": return item.jpName || item.name;
            default: return item.name;
          }
        }}
        renderItem={(item) => {
          const operatorName = i18n.language === "en" ? item.enName : i18n.language === "jp" ? item.jpName : item.name;
          return (
            <div className="flex items-center">
              <LazyLoadAvatar url={item.avatar} useAvatar />
              <span className="ml-3">{operatorName || item.name}</span>
            </div>
          );
        }}
        emptyText={getT("Nothing found")}
        onChange={onSave}
      />
    </div>
  );
}

