import { AnimatePresence, motion } from "framer-motion";
import { toastVariants, checkmarkPath, EASE_OUT_QUART } from "./resultMotion";
import type { ResultModel } from "./useResult";

export default function ResultToast({ result }: { result: ResultModel }) {
    const { showSuccess, t, shouldReduceMotion } = result;
    return (
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        data-export-motion
                        className="fixed bottom-8 left-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-success-50 dark:bg-success-100/10 shadow-lg border border-success-200 dark:border-success-500/20"
                        style={{ x: "-50%" }}
                        variants={toastVariants}
                        initial={shouldReduceMotion ? false : "hidden"}
                        animate="visible"
                        exit="exit"
                    >
                        <svg
                            className="w-5 h-5 text-success-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <motion.path
                                d={checkmarkPath}
                                initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.15,
                                    ease: EASE_OUT_QUART,
                                }}
                            />
                        </svg>
                        <span className="text-sm font-medium text-success-700 dark:text-success-400">
                            {t("save_success")}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
    );
}
