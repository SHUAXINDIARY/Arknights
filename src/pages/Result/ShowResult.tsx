import { useRef, useState, useCallback } from "react";
import Footer from "../../components/Footer";
import {
  FieldNameMapForI18n,
  FormField,
  RESULT_DATA_KEY,
} from "../../utils/constant";
import LazyLoadAvatar from "../../components/LazyLoadAvatar";
import RenderTextCard from "../../components/RenderTextCard";
import { Button, Chip, Divider } from "@heroui/react";
import { isApple, savePngByCanvas } from "../../utils";
import { THook } from "../../utils/I18n/i18n";
import { useLocalData, useToTop } from "../../hooks";
import { useNavigate } from "react-router";

const ShowRes = () => {
  useToTop();
  const { localData: data } = useLocalData<Record<string, string>>(
    RESULT_DATA_KEY,
    {}
  );
  const goto = useNavigate();
  const { t } = THook();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = useCallback(async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      if (isApple()) {
        await savePngByCanvas();
        await savePngByCanvas();
        await savePngByCanvas(true);
      } else {
        await savePngByCanvas(true);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsSaving(false);
    }
  }, [isSaving]);

  const skin: Record<string, string | undefined> = {
    firstSkin: data.firstSkin,
    favoriteSkin: data.favoriteSkin,
  };

  const activity: Record<string, string | undefined> = {
    firstActivity: data.firstActivity,
    favoriteDrama: data.favoriteDrama,
    favoriteMedalGroup: data.favoriteMedalGroup,
  };

  const text: Record<string, string | undefined> = {
    customAvatar: data.customAvatar,
    favoriteMode: data.favoriteMode,
    favoriteEP: data.favoriteEP,
    hopeMember: data.hopeMember,
    name: data.name,
  };

  const filterData = Object.keys(data).reduce((total, key) => {
    const _key = key as FormField;
    if (!skin[_key] && !activity[_key] && !text[_key]) {
      total[_key] = data[_key];
    }
    return total;
  }, {} as Record<string, string | undefined>);

  const ref = useRef(null);

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div ref={ref} className="max-w-md mx-auto">
        {/* 页头 */}
        <Footer />
        <div className="mb-6">
          <Chip size="lg" color="primary" variant="flat">
            {t("Arknights Career Generator")}
          </Chip>
        </div>

        {/* 干员区域 */}
        <div className="flex flex-wrap justify-center mb-6">
          {Object.keys(filterData).map((key) => {
            const _key = key as FormField;
            if (!filterData[_key]) return null;
            return (
              <div
                key={filterData[_key] + _key}
                className="w-20 flex flex-col items-center"
              >
                <LazyLoadAvatar
                  useLazyLoad={false}
                  useAvatar
                  url={filterData[_key]!}
                  className="w-16 h-16"
                />
                <p className="text-xs text-default-500 mt-2 text-center">
                  {FieldNameMapForI18n()[_key]}
                </p>
              </div>
            );
          })}
        </div>

        {/* 活动区域 */}
        <div className="space-y-4 mb-6">
          {Object.keys(activity).map((key) => {
            const _key = key as FormField;
            if (!activity[_key]) return null;
            return (
              <div key={_key + activity[_key]}>
                <LazyLoadAvatar
                  useLazyLoad={false}
                  useAvatar={false}
                  url={activity[_key]!}
                />
                <p className="text-sm text-default-600 text-center mt-2">
                  {FieldNameMapForI18n()[_key]}
                </p>
              </div>
            );
          })}
        </div>

        {/* 皮肤区域 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {Object.keys(skin).map((key) => {
            const _key = key as FormField;
            if (!skin[_key]) return null;
            return (
              <div key={_key + skin[_key]}>
                <LazyLoadAvatar
                  useLazyLoad={false}
                  useAvatar={false}
                  url={skin[_key]!}
                />
                <p className="text-sm text-default-600 text-center mt-2">
                  {FieldNameMapForI18n()[_key]}
                </p>
              </div>
            );
          })}
        </div>

        {/* 文字信息卡片 */}
        <div className="mb-6">
          <RenderTextCard
            avatarUrl={text.customAvatar || data.main!}
            name={data.name!}
            text={Object.keys(text).reduce((total, item) => {
              if (item !== "customAvatar") {
                total[item] = (text as Record<string, string>)[item];
              }
              return total;
            }, {} as Record<string, string>)}
          />
        </div>

        <Divider className="my-6" />

        {/* 操作按钮 */}
        <div className="flex flex-wrap gap-2">
          <Button
            color="primary"
            onPress={handleSave}
            isDisabled={isSaving}
            isLoading={isSaving}
          >
            {isSaving ? t("saving...") : t("export_result")}
          </Button>
          <Button color="warning" variant="flat" onPress={() => goto("/")}>
            {t("edit")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShowRes;
