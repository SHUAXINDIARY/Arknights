/** 页面各区域的入场编排延迟基数（秒） */
export const STAGGER_BASE = 0.12;

/** ease-out-quart 缓动曲线 */
export const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1];

/** 导出成功提示自动消失时间（毫秒） */
export const TOAST_DURATION_MS = 2200;

/** 区域入场动画 variants */
export const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * STAGGER_BASE,
            duration: 0.5,
            ease: EASE_OUT_QUART,
        },
    }),
};

/** 干员头像交错入场 variants */
export const avatarContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.06,
            delayChildren: STAGGER_BASE * 2,
        },
    },
};

export const avatarItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.35,
            ease: EASE_OUT_QUART,
        },
    },
};

/** 活动/皮肤图片入场 variants */
export const imageItemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: EASE_OUT_QUART,
        },
    },
};

/** 成功 Toast 动画 */
export const toastVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.35, ease: EASE_OUT_QUART },
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.95,
        transition: { duration: 0.25, ease: EASE_OUT_QUART },
    },
};

/** 对勾绘制动画的 SVG 路径 */
export const checkmarkPath = "M6 13l4 4L18 7";

