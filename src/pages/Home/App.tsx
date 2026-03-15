import "./App.css";
import {
  Button,
  Chip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Progress,
} from "@heroui/react";
import { FormMap } from "../../components/FormRender";
import { RESULT_DATA_KEY } from "../../utils/constant";
import { useMemo, useRef, useState } from "react";
import Footer from "../../components/Footer";
import { testData } from "../../data/testData";
import { THook } from "../../utils/I18n/i18n";
import { useNavigate } from "react-router";
import { useLocalData, useToTop } from "../../hooks";
import InfoModal from "../../components/InfoModal";
import {
  motion,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

/** 页面各区域的入场编排延迟基数（秒） */
const STAGGER_BASE = 0.12;

/** ease-out-quart 缓动曲线 */
const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1];

/** 进度百分比阈值 */
const PROGRESS_THRESHOLDS = {
  QUARTER: 25,
  HALF: 50,
  ALMOST: 80,
  COMPLETE: 100,
} as const;

/** 进度阶段对应的色彩配置：进度条颜色 + 鼓励文案颜色 */
const PROGRESS_STAGE_COLORS = {
  start: { bar: "primary", text: "text-primary-400/70" },
  quarter: { bar: "primary", text: "text-primary-300" },
  half: { bar: "warning", text: "text-warning-400" },
  almost: { bar: "secondary", text: "text-secondary-400" },
  complete: { bar: "success", text: "text-success-400 font-medium" },
} as const;

/** 区域入场动画 variants */
const sectionVariants = {
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

/** 表单项入场 variants（视口内触发） */
const formItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASE_OUT_QUART,
    },
  },
};

/** 按钮微交互配置 */
const buttonMotionProps = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.15, ease: EASE_OUT_QUART },
};

/** 进度条完成时的庆祝脉冲动画 */
const celebrateVariants = {
  idle: { scale: 1 },
  celebrate: {
    scale: [1, 1.04, 1],
    transition: {
      duration: 0.5,
      ease: EASE_OUT_QUART,
    },
  },
};

/** 鼓励文案淡入淡出 */
const encourageVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT_QUART } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
};

function App() {
  useToTop();
  const shouldReduceMotion = useReducedMotion();
  const [isShowPopover, setIsShowPopover] = useState(false);
  /** 生成按钮点击后的短暂成功反馈 */
  const [isGenerating, setIsGenerating] = useState(false);
  const generateTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const { t } = THook();
  const goto = useNavigate();
  const { localData, setLocalData } = useLocalData<Record<string, string>>(
    RESULT_DATA_KEY,
    {}
  );

  /** 已填写的表单项数量 */
  const filledCount = localData
    ? Object.values(localData).filter(Boolean).length
    : 0;
  /** 表单项总数 */
  const totalCount = FormMap.length;
  /** 进度百分比 */
  const progressPercent = (filledCount / totalCount) * 100;
  /** 是否全部完成 */
  const isComplete = filledCount === totalCount;

  /** 根据进度返回阶段 key（同时决定鼓励文案和色彩） */
  const progressStage = useMemo(() => {
    if (progressPercent >= PROGRESS_THRESHOLDS.COMPLETE) return "complete";
    if (progressPercent >= PROGRESS_THRESHOLDS.ALMOST) return "almost";
    if (progressPercent >= PROGRESS_THRESHOLDS.HALF) return "half";
    if (progressPercent >= PROGRESS_THRESHOLDS.QUARTER) return "quarter";
    return "start";
  }, [progressPercent]);

  /** 当前阶段的 i18n key */
  const encourageKey = `progress_${progressStage}` as const;
  /** 当前阶段的色彩配置 */
  const stageColors = PROGRESS_STAGE_COLORS[progressStage];

  /** 关闭动画时的降级配置 */
  const noMotion = shouldReduceMotion
    ? { initial: undefined, animate: undefined, variants: undefined }
    : {};

  /** 处理生成按钮点击：有数据时播放短暂反馈后跳转 */
  const handleGenerate = () => {
    if (!localData || Object.values(localData).length === 0) {
      setIsShowPopover((old) => !old);
      return;
    }
    if (isGenerating) return;
    setIsGenerating(true);
    clearTimeout(generateTimerRef.current);
    generateTimerRef.current = setTimeout(() => {
      goto("/result");
    }, 400);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-b from-background via-background to-primary-950/[0.06]">
      <motion.div
        className="max-w-md mx-auto"
        initial="hidden"
        animate="visible"
        {...noMotion}
      >
        {/* 页头 */}
        <motion.div variants={sectionVariants} custom={0}>
          <Footer />
        </motion.div>

        <motion.div className="mb-8" variants={sectionVariants} custom={1}>
          <Chip
            size="lg"
            variant="flat"
            classNames={{
              base: "bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/10",
              content: "text-primary-300 font-medium",
            }}
          >
            {t("Arknights Career Generator")}
          </Chip>
        </motion.div>

        {/* 进度 */}
        <motion.div
          className="mb-6"
          variants={sectionVariants}
          custom={2}
        >
          <motion.div
            variants={shouldReduceMotion ? undefined : celebrateVariants}
            animate={isComplete && !shouldReduceMotion ? "celebrate" : "idle"}
          >
            <Progress
              size="sm"
              value={progressPercent}
              color={stageColors.bar}
              showValueLabel
              label={`${filledCount}/${totalCount}`}
              classNames={{
                label: "text-xs text-default-500",
                value: "text-xs text-default-500",
              }}
            />
          </motion.div>
          <div className="h-5 mt-1.5 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={encourageKey}
                className={`text-xs text-center ${stageColors.text}`}
                {...(shouldReduceMotion ? {} : encourageVariants)}
              >
                {t(encourageKey)}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 表单区域 — 每项在视口内时淡入，hover 时边框微发光 */}
        <div className="space-y-4 mb-8">
          {Object.values(FormMap).map((item) => {
            const Com = item.components;
            const { params } = item;
            if (!Com) {
              return null;
            }
            const onSave = (val: string) => {
              setLocalData({
                ...localData,
                [item.field]: val,
              });
            };

            return (
              <motion.div
                key={item.field + item.name}
                className="w-fit mx-auto rounded-xl transition-shadow duration-200 hover:shadow-[0_0_12px_-3px_hsl(var(--heroui-primary)/0.3)]"
                variants={formItemVariants}
                initial={shouldReduceMotion ? undefined : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={{ once: true, margin: "-40px" }}
              >
                <Com
                  {...((params || {}) as typeof Com)}
                  formValue={localData ? localData[item.field] : ""}
                  onSave={(val: string) => {
                    onSave(val);
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* 操作按钮 */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          initial={shouldReduceMotion ? undefined : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-20px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          <motion.div
            variants={formItemVariants}
            {...(shouldReduceMotion ? {} : buttonMotionProps)}
          >
            <Popover
              placement="top"
              isOpen={isShowPopover}
              onOpenChange={handleGenerate}
            >
              <PopoverTrigger>
                <Button
                  color={isGenerating ? "success" : "primary"}
                  isLoading={isGenerating}
                  className={isGenerating ? "" : "shadow-md shadow-primary/20"}
                >
                  {isGenerating ? "✓" : t("generate")}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-2 py-1">
                  <p className="text-small font-semibold">{t("prompt")}</p>
                  <p className="text-tiny text-default-500">
                    {t("selectOrFillOne")}
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </motion.div>

          <motion.div
            variants={formItemVariants}
            {...(shouldReduceMotion ? {} : buttonMotionProps)}
          >
            <Button
              color="secondary"
              variant="flat"
              onPress={() => {
                setLocalData(testData);
                goto("/result");
              }}
            >
              {t("previewExample")}
            </Button>
          </motion.div>

          <motion.div
            variants={formItemVariants}
            {...(shouldReduceMotion ? {} : buttonMotionProps)}
          >
            <Button
              variant="bordered"
              className="border-default-300 text-default-500 hover:border-primary-400 hover:text-primary-300"
              onPress={() => goto("/questionnaire")}
            >
              {t("questionnaire")}
            </Button>
          </motion.div>
        </motion.div>
        <InfoModal />
      </motion.div>
    </div>
  );
}

export default App;
