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
import { useState } from "react";
import Footer from "../../components/Footer";
import { testData } from "../../data/testData";
import { THook } from "../../utils/I18n/i18n";
import { useNavigate } from "react-router";
import { useLocalData, useToTop } from "../../hooks";
import InfoModal from "../../components/InfoModal";
import { motion, useReducedMotion } from "framer-motion";

/** 页面各区域的入场编排延迟基数（秒） */
const STAGGER_BASE = 0.12;

/** ease-out-quart 缓动曲线 */
const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1];

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

function App() {
  useToTop();
  const shouldReduceMotion = useReducedMotion();
  const [isShowPopover, setIsShowPopover] = useState(false);
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

  /** 关闭动画时的降级配置 */
  const noMotion = shouldReduceMotion
    ? { initial: undefined, animate: undefined, variants: undefined }
    : {};

  return (
    <div className="min-h-screen p-4 sm:p-8">
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
          <Chip size="lg" color="primary" variant="flat">
            {t("Arknights Career Generator")}
          </Chip>
        </motion.div>

        {/* 进度 */}
        <motion.div className="mb-6" variants={sectionVariants} custom={2}>
          <Progress
            size="sm"
            value={(filledCount / totalCount) * 100}
            color="primary"
            showValueLabel
            label={`${filledCount}/${totalCount}`}
            classNames={{
              label: "text-xs text-default-500",
              value: "text-xs text-default-500",
            }}
          />
        </motion.div>

        {/* 表单区域 — 每项在视口内时淡入 */}
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
          className="flex flex-wrap gap-2 justify-center"
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
              onOpenChange={() => {
                if (!localData || Object.values(localData).length === 0) {
                  setIsShowPopover((old) => !old);
                } else {
                  goto("/result");
                }
              }}
            >
              <PopoverTrigger>
                <Button color="primary">{t("generate")}</Button>
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
            <Button variant="bordered" onPress={() => goto("/questionnaire")}>
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
