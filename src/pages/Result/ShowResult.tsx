import { useRef, useState, useCallback } from "react";
import Footer from "../../components/Footer";
import {
  FieldNameMapForI18n,
  FormField,
  RESULT_DATA_KEY,
} from "../../utils/constant";
import LazyLoadAvatar from "../../components/LazyLoadAvatar";
import RenderTextCard from "../../components/RenderTextCard";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
} from "@heroui/react";
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

  // 检查是否有数据
  const hasOperators = Object.keys(filterData).some((key) => filterData[key as FormField]);
  const hasActivities = Object.keys(activity).some((key) => activity[key as FormField]);
  const hasSkins = Object.keys(skin).some((key) => skin[key as FormField]);

  return (
    <div className="min-h-screen bg-gradient-to-b py-6 px-4 sm:py-8 sm:px-6">
      <div
        ref={ref}
        className="max-w-md mx-auto w-full"
      >
        {/* 页头 */}
        <div className="text-center mb-6 sm:mb-8">
          <Footer />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
            <span className="text-lg">🎮</span>
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("Arknights Career Generator")}
            </h1>
          </div>
        </div>

        {/* 干员区域 */}
        {hasOperators && (
          <Card className="mb-4 sm:mb-6 bg-default-50/50 backdrop-blur-sm border border-default-200/50">
            <CardBody className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-base sm:text-lg font-semibold text-default-800">
                  {t("favoriteOperator") || "干员"}
                </h2>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
                {Object.keys(filterData).map((key) => {
                  const _key = key as FormField;
                  if (!filterData[_key]) return null;
                  return (
                    <div
                      key={filterData[_key] + _key}
                      className="flex flex-col items-center group"
                    >
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 overflow-hidden transition-all duration-200">
                        <LazyLoadAvatar
                          useLazyLoad={false}
                          className="w-full h-full object-cover"
                          useAvatar
                          url={filterData[_key]!}
                        />
                      </div>
                      <span className="mt-1.5 text-[10px] sm:text-xs text-default-500 text-center line-clamp-2 leading-tight">
                        {FieldNameMapForI18n()[_key]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        )}

        {/* 活动区域 */}
        {hasActivities && (
          <Card className="mb-4 sm:mb-6 bg-default-50/50 backdrop-blur-sm border border-default-200/50">
            <CardBody className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h2 className="text-base sm:text-lg font-semibold text-default-800">
                  活动
                </h2>
              </div>
              <div className="space-y-4">
                {Object.keys(activity).map((key) => {
                  const _key = key as FormField;
                  if (!activity[_key]) return null;
                  return (
                    <div key={_key + activity[_key]} className="group">
                      <div className="relative rounded-xl overflow-hidden ring-1 ring-default-200 group-hover:ring-primary/50 transition-all duration-200">
                        <LazyLoadAvatar
                          useLazyLoad={false}
                          useAvatar={false}
                          url={activity[_key]!}
                          className="w-full"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                          <Chip
                            size="sm"
                            variant="flat"
                            className="bg-white/20 text-white text-xs backdrop-blur-sm"
                          >
                            {FieldNameMapForI18n()[_key]}
                          </Chip>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        )}

        {/* 皮肤区域 */}
        {hasSkins && (
          <Card className="mb-4 sm:mb-6 bg-default-50/50 backdrop-blur-sm border border-default-200/50">
            <CardBody className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 className="text-base sm:text-lg font-semibold text-default-800">
                  {t("favoriteSkin") || "皮肤"}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {Object.keys(skin).map((key) => {
                  const _key = key as FormField;
                  if (!skin[_key]) return null;
                  return (
                    <div key={_key + skin[_key]} className="group">
                      <div className="relative rounded-xl overflow-hidden ring-1 ring-default-200 group-hover:ring-primary/50 transition-all duration-200">
                        <LazyLoadAvatar
                          className="w-full h-auto"
                          useLazyLoad={false}
                          useAvatar={false}
                          url={skin[_key]!}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 sm:p-3">
                          <span className="text-xs sm:text-sm text-white font-medium">
                            {FieldNameMapForI18n()[_key]}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        )}

        {/* 文字信息卡片 */}
        <Card className="mb-6 sm:mb-8 bg-default-50/50 backdrop-blur-sm border border-default-200/50">
          <CardBody className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
                <h2 className="text-base sm:text-lg font-semibold text-default-800">
                  个人信息
                </h2>
            </div>
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
          </CardBody>
        </Card>

        <Divider className="my-4 sm:my-6" />

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button
            className="flex-1 h-12 sm:h-14 font-semibold text-base"
            color="primary"
            variant="shadow"
            onPress={handleSave}
            isDisabled={isSaving}
            startContent={
              !isSaving && (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              )
            }
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {t("saving...")}
              </span>
            ) : (
              t("export_result")
            )}
          </Button>
          <Button
            className="flex-1 h-12 sm:h-14 font-semibold text-base"
            color="warning"
            variant="flat"
            onPress={() => goto("/")}
            startContent={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            }
          >
            {t("edit")}
          </Button>
        </div>

        {/* 底部装饰 */}
        <div className="mt-8 flex items-center justify-center gap-2 opacity-50">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-default-300" />
          <span className="text-xs text-default-400">Rhodes Island</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-default-300" />
        </div>
      </div>
    </div>
  );
};

export default ShowRes;
