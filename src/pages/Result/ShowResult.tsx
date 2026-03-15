import { useRef, useState, useCallback, useMemo } from "react";
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
import { motion, useReducedMotion } from "framer-motion";

/** 页面各区域的入场编排延迟基数（ms） */
const STAGGER_BASE = 0.12;

/** 区域入场动画 variants */
const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * STAGGER_BASE,
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    },
  }),
};

/** 干员头像交错入场 variants */
const avatarContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: STAGGER_BASE * 2,
    },
  },
};

const avatarItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

/** 活动/皮肤图片入场 variants */
const imageItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const ShowRes = () => {
  useToTop();
  const shouldReduceMotion = useReducedMotion();
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

  const skin: Record<string, string | undefined> = useMemo(
    () => ({
      firstSkin: data.firstSkin,
      favoriteSkin: data.favoriteSkin,
    }),
    [data.firstSkin, data.favoriteSkin]
  );

  const activity: Record<string, string | undefined> = useMemo(
    () => ({
      firstActivity: data.firstActivity,
      favoriteDrama: data.favoriteDrama,
      favoriteMedalGroup: data.favoriteMedalGroup,
    }),
    [data.firstActivity, data.favoriteDrama, data.favoriteMedalGroup]
  );

  const text: Record<string, string | undefined> = useMemo(
    () => ({
      customAvatar: data.customAvatar,
      favoriteMode: data.favoriteMode,
      favoriteEP: data.favoriteEP,
      hopeMember: data.hopeMember,
      name: data.name,
    }),
    [data.customAvatar, data.favoriteMode, data.favoriteEP, data.hopeMember, data.name]
  );

  const filterData = useMemo(
    () =>
      Object.keys(data).reduce((total, key) => {
        const _key = key as FormField;
        if (!skin[_key] && !activity[_key] && !text[_key]) {
          total[_key] = data[_key];
        }
        return total;
      }, {} as Record<string, string | undefined>),
    [data, skin, activity, text]
  );

  /** 关闭动画时的降级配置 */
  const motionProps = shouldReduceMotion
    ? { initial: undefined, animate: undefined, variants: undefined }
    : {};

  const ref = useRef(null);

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <motion.div
        ref={ref}
        className="max-w-md mx-auto"
        initial="hidden"
        animate="visible"
        {...motionProps}
      >
        {/* 页头 */}
        <motion.div variants={sectionVariants} custom={0}>
          <Footer />
        </motion.div>

        <motion.div className="mb-6" variants={sectionVariants} custom={1}>
          <Chip size="lg" color="primary" variant="flat">
            {t("Arknights Career Generator")}
          </Chip>
        </motion.div>

        {/* 干员区域 — 头像交错弹出 */}
        <motion.div
          className="flex flex-wrap justify-center mb-6"
          variants={avatarContainerVariants}
        >
          {Object.keys(filterData).map((key) => {
            const _key = key as FormField;
            if (!filterData[_key]) return null;
            return (
              <motion.div
                key={filterData[_key] + _key}
                className="w-20 flex flex-col items-center"
                variants={avatarItemVariants}
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
              </motion.div>
            );
          })}
        </motion.div>

        {/* 活动区域 — 依次滑入 */}
        <motion.div
          className="space-y-4 mb-6"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: STAGGER_BASE * 3,
              },
            },
          }}
        >
          {Object.keys(activity).map((key) => {
            const _key = key as FormField;
            if (!activity[_key]) return null;
            return (
              <motion.div key={_key + activity[_key]} variants={imageItemVariants}>
                <LazyLoadAvatar
                  useLazyLoad={false}
                  useAvatar={false}
                  url={activity[_key]!}
                />
                <p className="text-sm text-default-600 text-center mt-2">
                  {FieldNameMapForI18n()[_key]}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 皮肤区域 — 左右交替滑入 */}
        <motion.div
          className="grid grid-cols-2 gap-4 mb-6"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
                delayChildren: STAGGER_BASE * 4,
              },
            },
          }}
        >
          {Object.keys(skin).map((key, index) => {
            const _key = key as FormField;
            if (!skin[_key]) return null;
            return (
              <motion.div
                key={_key + skin[_key]}
                variants={{
                  hidden: { opacity: 0, x: index % 2 === 0 ? -20 : 20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.45,
                      ease: [0.25, 1, 0.5, 1],
                    },
                  },
                }}
              >
                <LazyLoadAvatar
                  useLazyLoad={false}
                  useAvatar={false}
                  url={skin[_key]!}
                />
                <p className="text-sm text-default-600 text-center mt-2">
                  {FieldNameMapForI18n()[_key]}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 文字信息卡片 */}
        <motion.div className="mb-6" variants={sectionVariants} custom={5}>
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
        </motion.div>

        <motion.div variants={sectionVariants} custom={6}>
          <Divider className="my-6" />
        </motion.div>

        {/* 操作按钮 */}
        <motion.div
          className="flex flex-wrap gap-2"
          variants={sectionVariants}
          custom={7}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.25, 1, 0.5, 1] }}
          >
            <Button
              color="primary"
              onPress={handleSave}
              isDisabled={isSaving}
              isLoading={isSaving}
            >
              {isSaving ? t("saving...") : t("export_result")}
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.25, 1, 0.5, 1] }}
          >
            <Button color="warning" variant="flat" onPress={() => goto("/")}>
              {t("edit")}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ShowRes;
