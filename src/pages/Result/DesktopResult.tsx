import { motion } from "framer-motion";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui";
import { FieldNameMapForI18n, type FormField } from "../../utils/constant";
import { sectionVariants, EASE_OUT_QUART } from "./resultMotion";
import type { ResultModel } from "./useResult";
import "./DesktopResult.css";

function SectionHeading({ number, title, caption }: { number: string; title: string; caption: string }) {
    return (
        <div className="desktop-result__section-heading">
            <span aria-hidden="true" className="desktop-result__section-number">{number}</span>
            <h2>{title}</h2>
            <span aria-hidden="true" className="desktop-result__section-caption">{caption}</span>
        </div>
    );
}

/** PC 档案展板：个人索引、干员陈列与活动 / 收藏双栏。 */
export default function DesktopResult({ result }: { result: ResultModel }) {
    const {
        data, skin, activity, text, filterData, favoriteAlbum, ref,
        isSaving, handleSave, goto, t, shouldReduceMotion, motionProps,
    } = result;
    const labels = FieldNameMapForI18n();
    const operators = Object.entries(filterData).filter((entry) => Boolean(entry[1]));
    const activities = Object.entries(activity).filter((entry) => Boolean(entry[1]));
    const skins = Object.entries(skin).filter((entry) => Boolean(entry[1]));
    const personal = Object.entries(text).filter(([key]) => key !== "customAvatar" && key !== "name");
    const avatar = text.customAvatar || data.main;
    const hasCollection = Boolean(data.favoriteAlbum || skins.length);

    return (
        <div className="desktop-result">
            <div className="desktop-result__toolbar">
                <div className="desktop-result__wordmark"><span aria-hidden="true">A /</span> ARKNIGHTS</div>
                <div className="desktop-result__settings"><Footer /></div>
            </div>

            <motion.div
                ref={ref}
                data-export-motion
                className="desktop-result__sheet"
                initial="hidden"
                animate="visible"
                {...motionProps}
            >
                <motion.header data-export-motion variants={sectionVariants} custom={0} className="desktop-result__header">
                    <div className="desktop-result__masthead">
                        <p>{t("Arknights Career Generator")}</p>
                        <span aria-hidden="true">PERSONAL ARCHIVE / TERRA</span>
                    </div>
                    <div className="desktop-result__profile">
                        <div className="desktop-result__identity">
                            {avatar ? <img src={avatar} alt="" className="desktop-result__avatar" /> : null}
                            <div className="min-w-0">
                                <p className="desktop-result__eyebrow">{t("resultArchive")}</p>
                                <h1 className="desktop-result__name">{data.name || t("Arknights Career Generator")}</h1>
                            </div>
                        </div>
                        <dl className="desktop-result__preferences">
                            {personal.map(([key, value]) => (
                                <div key={key}>
                                    <dt>{labels[key as FormField]}</dt>
                                    <dd>{value || "—"}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </motion.header>

                {operators.length ? (
                    <motion.section data-export-motion variants={sectionVariants} custom={1} className="desktop-result__roster-section">
                        <SectionHeading number="01" title={t("resultOperators")} caption="OPERATORS" />
                        <div className="desktop-result__roster">
                            {operators.map(([key, url]) => (
                                <motion.figure
                                    data-export-motion
                                    key={key}
                                    className="desktop-result__operator"
                                    whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                                    transition={{ duration: 0.2, ease: EASE_OUT_QUART }}
                                >
                                    <div className="desktop-result__portrait"><img src={url} alt={labels[key as FormField]} /></div>
                                    <figcaption>{labels[key as FormField]}</figcaption>
                                </motion.figure>
                            ))}
                        </div>
                    </motion.section>
                ) : null}

                {activities.length || hasCollection ? (
                    <div className={`desktop-result__content${!activities.length || !hasCollection ? " desktop-result__content--single" : ""}`}>
                        {activities.length ? (
                            <motion.section data-export-motion variants={sectionVariants} custom={2} className="desktop-result__activities">
                                <SectionHeading number="02" title={t("resultMemories")} caption="MEMORIES" />
                                <div className="desktop-result__events">
                                    {activities.map(([key, url], index) => (
                                        <figure key={key} className={`desktop-result__event${key === "favoriteMedalGroup" ? " desktop-result__event--medals" : ""}`}>
                                            <div className="desktop-result__event-image"><img src={url} alt={labels[key as FormField]} /></div>
                                            <figcaption>
                                                <span>{labels[key as FormField]}</span>
                                                <span aria-hidden="true" className="desktop-result__event-index">0{index + 1} /</span>
                                            </figcaption>
                                        </figure>
                                    ))}
                                </div>
                            </motion.section>
                        ) : null}

                        {hasCollection ? (
                            <motion.section data-export-motion variants={sectionVariants} custom={3} className="desktop-result__collection">
                                <SectionHeading number="03" title={t("resultCollection")} caption="COLLECTION" />
                                {data.favoriteAlbum ? (
                                    <figure className="desktop-result__album">
                                        <div className="desktop-result__album-sleeve">
                                            <img src={favoriteAlbum?.img || data.favoriteAlbum} alt={favoriteAlbum?.name || t("favoriteAlbum")} width={176} height={176} />
                                        </div>
                                        <figcaption>
                                            <p className="desktop-result__eyebrow">{t("favoriteAlbum")}</p>
                                            {favoriteAlbum ? <h3>{favoriteAlbum.name}</h3> : null}
                                            <p className="desktop-result__record-label">MONSTER SIREN<br />RECORDS</p>
                                            <svg aria-hidden="true" className="desktop-result__record-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor">
                                                <circle cx="16" cy="16" r="14" /><circle cx="16" cy="16" r="4" />
                                                <path d="M7 16a9 9 0 0 1 9-9m0 18a9 9 0 0 0 9-9" />
                                            </svg>
                                        </figcaption>
                                    </figure>
                                ) : null}
                                {skins.length ? (
                                    <div className="desktop-result__skins">
                                        {skins.map(([key, url]) => (
                                            <figure key={key} className="desktop-result__skin">
                                                <div className="desktop-result__skin-image"><img src={url} alt={labels[key as FormField]} /></div>
                                                <figcaption>{labels[key as FormField]}</figcaption>
                                            </figure>
                                        ))}
                                    </div>
                                ) : null}
                            </motion.section>
                        ) : null}
                    </div>
                ) : null}

                <div className="desktop-result__colophon" aria-hidden="true">
                    <span>ARKNIGHTS</span><span>END OF ARCHIVE / RHODES ISLAND</span>
                </div>
            </motion.div>

            <div className="desktop-result__actions">
                <Button variant="flat" onPress={() => goto("/")}>{t("edit")}</Button>
                <Button color="primary" onPress={handleSave} isDisabled={isSaving} isLoading={isSaving}>
                    {isSaving ? t("saving...") : t("export_result")}
                </Button>
            </div>
        </div>
    );
}
