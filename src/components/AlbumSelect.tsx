import { AlbumList } from '../data/Album';
import SelectAutocomplete from './SelectAutocomplete';
import { THook } from '../utils/I18n/i18n';

interface AlbumSelectProps {
  onSave?: (value: string) => void;
  formValue?: string;
}

export default function AlbumSelect({ onSave, formValue }: AlbumSelectProps) {
  const { t } = THook();
  const selectedAlbum = AlbumList.find((album) => album.img === formValue || album.sourceImg === formValue);
  return (
    <SelectAutocomplete
      items={AlbumList}
      value={selectedAlbum?.img ?? formValue}
      label={t('favoriteAlbum')}
      placeholder={t('selectAlbum')}
      itemHeight={80}
      getKey={(album) => album.img}
      getText={(album) => album.name}
      renderItem={(album) => (
        <div className="flex min-h-[72px] items-center gap-3">
          <img
            src={album.img}
            alt=""
            loading="lazy"
            className="h-14 w-14 shrink-0 rounded-lg object-cover"
          />
          <span title={album.name} className="line-clamp-3 min-w-0 break-words text-sm leading-5 text-slate-700 dark:text-slate-100">
            {album.name}
          </span>
        </div>
      )}
      emptyText={t('Nothing found')}
      onChange={onSave}
    />
  );
}
