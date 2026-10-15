import Footer from "../../components/Footer";
import { FieldNameMapForI18n, FormField } from "../../utils/constant";
import LazyLoadAvatar from "../../components/LazyLoadAvatar";
import RenderTextCard from "../../components/RenderTextCard";
import { Button, Chip } from "../../components/ui";
import { motion } from "framer-motion";
import { sectionVariants, avatarContainerVariants, avatarItemVariants, imageItemVariants, EASE_OUT_QUART, STAGGER_BASE } from "./resultMotion";
import type { ResultModel } from "./useResult";

const MobileResult = ({ result }: { result: ResultModel }) => {
    const { data, skin, activity, text, filterData, favoriteAlbum, ref, isSaving, handleSave, goto, t, shouldReduceMotion, motionProps } = result;
    return (
        <div className="min-h-screen p-4 sm:p-8 relative">
            <motion.div
                data-export-motion
                ref={ref}
                className="max-w-md mx-auto"
                initial="hidden"
                animate="visible"
                {...motionProps}
            >
                {/* 页头 */}
                <motion.div data-export-motion className="flow-root" variants={sectionVariants} custom={0}>
                    <Footer />
                </motion.div>

                <motion.div
                    data-export-motion
                    className="mb-6"
                    variants={sectionVariants}
                    custom={1}
                >
                    <Chip size="lg" color="primary" variant="flat">
                        {t("Arknights Career Generator")}
                    </Chip>
                </motion.div>

                {/* 干员区域 — 头像交错弹出 + hover 上浮 */}
                <motion.div
                    data-export-motion
                    className="flex flex-wrap justify-center mb-6"
                    variants={avatarContainerVariants}
                >
                    {Object.keys(filterData).map((key) => {
                        const _key = key as FormField;
                        if (!filterData[_key]) return null;
                        return (
                            <motion.div
                                data-export-motion
                                key={filterData[_key] + _key}
                                className="w-20 flex flex-col items-center cursor-default"
                                variants={avatarItemVariants}
                                whileHover={
                                    shouldReduceMotion
                                        ? undefined
                                        : {
                                              y: -4,
                                              transition: {
                                                  duration: 0.2,
                                                  ease: EASE_OUT_QUART,
                                              },
                                          }
                                }
                            >
                                <div className="relative">
                                    <LazyLoadAvatar
                                        useLazyLoad={false}
                                        useAvatar
                                        url={filterData[_key]!}
                                        className="w-16 h-16"
                                    />
                                </div>
                                <p className="text-xs text-default-500 mt-2 text-center">
                                    {FieldNameMapForI18n()[_key]}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* 活动区域 — 依次滑入 + hover 缩放 */}
                <motion.div
                    data-export-motion
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
                            <motion.div
                                data-export-motion
                                key={_key + activity[_key]}
                                variants={imageItemVariants}
                                whileHover={
                                    shouldReduceMotion
                                        ? undefined
                                        : {
                                              scale: 1.02,
                                              transition: {
                                                  duration: 0.25,
                                                  ease: EASE_OUT_QUART,
                                              },
                                          }
                                }
                                className="overflow-hidden rounded-xl"
                            >
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

                {data.favoriteAlbum ? (
                    <motion.div
                        data-export-motion
                        className="mb-6 border-y border-default-200 py-5"
                        variants={imageItemVariants}
                    >
                        <p className="mb-4 flex items-center gap-2 text-sm font-medium text-default-600">
                            <svg
                                aria-hidden="true"
                                className="h-4 w-4 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="9" />
                                <circle cx="12" cy="12" r="2" />
                                <path d="M7 12a5 5 0 0 1 5-5m0 10a5 5 0 0 0 5-5" />
                            </svg>
                            {t('favoriteAlbum')}
                        </p>
                        <figure className="flex items-center gap-4 sm:gap-5">
                            <img
                                src={favoriteAlbum?.img || data.favoriteAlbum}
                                alt={favoriteAlbum?.name || t('favoriteAlbum')}
                                width={144}
                                height={144}
                                className="h-28 w-28 shrink-0 rounded-md bg-default-100 object-cover sm:h-36 sm:w-36"
                            />
                            <figcaption className="min-w-0 flex-1">
                                <p className="mb-2 text-[10px] font-medium tracking-[0.18em] text-default-500">
                                    MONSTER SIREN RECORDS
                                </p>
                                {favoriteAlbum ? (
                                    <p className="break-words text-lg font-semibold leading-snug text-default-800 sm:text-xl">
                                        {favoriteAlbum.name}
                                    </p>
                                ) : null}
                                <div aria-hidden="true" className="mt-4 h-px w-8 bg-default-300" />
                            </figcaption>
                        </figure>
                    </motion.div>
                ) : null}

                {/* 皮肤区域 — 左右交替滑入 + hover 缩放 */}
                <motion.div
                    data-export-motion
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
                                data-export-motion
                                key={_key + skin[_key]}
                                className="overflow-hidden rounded-xl"
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        x: index % 2 === 0 ? -20 : 20,
                                    },
                                    visible: {
                                        opacity: 1,
                                        x: 0,
                                        transition: {
                                            duration: 0.45,
                                            ease: EASE_OUT_QUART,
                                        },
                                    },
                                }}
                                whileHover={
                                    shouldReduceMotion
                                        ? undefined
                                        : {
                                              scale: 1.03,
                                              transition: {
                                                  duration: 0.25,
                                                  ease: EASE_OUT_QUART,
                                              },
                                          }
                                }
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
                <motion.div
                    data-export-motion
                    className="mb-6"
                    variants={sectionVariants}
                    custom={5}
                >
                    <RenderTextCard
                        avatarUrl={text.customAvatar || data.main!}
                        name={data.name!}
                        text={Object.keys(text).reduce(
                            (total, item) => {
                                if (item !== "customAvatar") {
                                    total[item] = (
                                        text as Record<string, string>
                                    )[item];
                                }
                                return total;
                            },
                            {} as Record<string, string>,
                        )}
                    />
                </motion.div>

                {/* 装饰性渐变分割线 */}
                <motion.div
                    data-export-motion
                    variants={sectionVariants}
                    custom={6}
                    className="my-6 flex items-center gap-3"
                >
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-default-300 to-transparent" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-default-300 to-transparent" />
                </motion.div>

                {/* 操作按钮 */}
                <motion.div
                    data-export-motion
                    className="flex flex-wrap gap-2"
                    variants={sectionVariants}
                    custom={7}
                >
                    <motion.div
                        data-export-motion
                        whileHover={
                            shouldReduceMotion ? undefined : { scale: 1.03 }
                        }
                        whileTap={
                            shouldReduceMotion ? undefined : { scale: 0.97 }
                        }
                        transition={{ duration: 0.15, ease: EASE_OUT_QUART }}
                    >
                        <Button
                            color="primary"
                            data-export-label={t("export_result")}
                            onPress={handleSave}
                            isDisabled={isSaving}
                            isLoading={isSaving}
                        >
                            {isSaving ? t("saving...") : t("export_result")}
                        </Button>
                    </motion.div>
                    <motion.div
                        data-export-motion
                        whileHover={
                            shouldReduceMotion ? undefined : { scale: 1.03 }
                        }
                        whileTap={
                            shouldReduceMotion ? undefined : { scale: 0.97 }
                        }
                        transition={{ duration: 0.15, ease: EASE_OUT_QUART }}
                    >
                        <Button
                            color="warning"
                            variant="flat"
                            onPress={() => goto("/")}
                        >
                            {t("edit")}
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.div>

        </div>
    );
};

export default MobileResult;
