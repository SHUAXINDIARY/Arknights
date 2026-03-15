import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Link,
  Card,
  CardBody,
  Avatar,
} from "@heroui/react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import XHS from "../assets/img_v3_02gq_7ed31f29-4562-44e3-b3e9-fc76fea30ecg.jpeg";
import { THook } from "../utils/I18n/i18n";
import { useLocalData } from "../hooks";
import { INIT_MODAL, ONE_HOUR } from "../utils/constant";

/** 数据来源链接 */
const DATA_SOURCES = [
  {
    name: "PRTS Wiki",
    href: "https://m.prts.wiki/w/%E9%A6%96%E9%A1%B5",
    accent: "primary" as const,
  },
  {
    name: "Bilibili Wiki",
    href: "https://wiki.biligame.com/arknights/%E9%A6%96%E9%A1%B5",
    accent: "danger" as const,
  },
];

/** 联系方式：统一使用 HeroUI 主题色 */
const CONTACT_LINKS = [
  {
    key: "xhs",
    href: "https://www.xiaohongshu.com/user/profile/617ce3ac000000000201bc2c?xhsshare=CopyLink&appuid=617ce3ac000000000201bc2c&apptime=1652512227",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
    bg: "bg-danger-500/15",
    text: "text-danger-400",
  },
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/SHUAXINDIARY",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    bg: "bg-default-500/15",
    text: "text-default-400",
  },
  {
    key: "bilibili",
    href: "https://space.bilibili.com/6517765?spm_id_from=333.1007.0.0",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
      </svg>
    ),
    bg: "bg-secondary-500/15",
    text: "text-secondary-400",
  },
  {
    key: "douyin",
    href: "https://www.douyin.com/user/MS4wLjABAAAAtka9uHYCko-H1WT23fHjsVcTDwbAdjP-qfZqm6-Q4-c",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
    bg: "bg-default-500/15",
    text: "text-default-400",
  },
  {
    key: "skland",
    href: "https://www.skland.com/article?id=2406441",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    bg: "bg-primary-500/15",
    text: "text-primary-400",
  },
  {
    key: "email",
    label: "Email",
    href: "mailto:shuaxinjs@qq.com",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    bg: "bg-warning-500/15",
    text: "text-warning-400",
  },
];

/** ease-out-quart 缓动曲线 */
const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1];

/** 内容区各部分交错入场延迟基数（秒） */
const STAGGER_BASE = 0.08;

/** 区域入场动画 */
const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * STAGGER_BASE,
      duration: 0.4,
      ease: EASE_OUT_QUART,
    },
  }),
};

/** 联系方式图标交错入场 */
const contactContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: STAGGER_BASE * 4,
    },
  },
};

const contactItemVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: EASE_OUT_QUART },
  },
};

const InfoModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = THook();
  /** 持久化 modal 开启状态 */
  const { localData: needOpen, setLocalData } = useLocalData(INIT_MODAL, {
    openState: true,
    time: Date.now(),
  });
  /** 首次加载或超过一小时后显示 */
  useEffect(() => {
    const _Now = Date.now();
    if (needOpen.openState || _Now - needOpen.time > ONE_HOUR) {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="lg"
      classNames={{
        base: "bg-gradient-to-br from-background via-background to-primary-950/[0.08] overflow-hidden",
        header: "border-b border-primary-500/10",
        footer: "border-t border-primary-500/10",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <motion.div
            initial="hidden"
            animate="visible"
          >
            {/* Header — 更大的渐变图标 + 更强的排版层次 */}
            <ModalHeader className="flex items-center gap-4 py-5">
              <motion.div variants={sectionVariants} custom={0}>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
                  <span className="text-2xl">🎮</span>
                </div>
              </motion.div>
              <motion.div variants={sectionVariants} custom={1}>
                <h2 className="text-xl font-bold tracking-tight">{t("modalTitle")}</h2>
                <p className="text-xs text-primary-400/60 mt-0.5">{t("Arknights Career Generator")}</p>
              </motion.div>
            </ModalHeader>

            <ModalBody className="py-6 space-y-6">
              {/* 灵感来源 — Hero 卡片：更饱和的渐变、更大头像、更强存在感 */}
              <motion.div variants={sectionVariants} custom={2}>
                <Card
                  shadow="none"
                  className="bg-gradient-to-br from-secondary-500/15 via-primary-500/10 to-warning-500/10 border border-secondary-500/20 overflow-hidden"
                >
                  <CardBody className="p-5">
                    <div className="flex items-start gap-4">
                      <Avatar
                        src={XHS}
                        className="w-20 h-20 flex-shrink-0 ring-2 ring-secondary-400/40 shadow-lg shadow-secondary-500/20"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-default-600 leading-relaxed">
                          {t("inspirationText")}
                          <Link
                            href="https://www.xiaohongshu.com/user/profile/62d47a26000000000e00d3cd?xhsshare=CopyLink&appuid=617ce3ac000000000201bc2c&apptime=1732271959&share_id=16d16c386cd64b92a6a2b7a5d09231ae"
                            target="_blank"
                            className="text-sm font-semibold text-secondary-400 hover:text-secondary-300 transition-colors"
                          >
                            {t("inspirationAuthor")}
                          </Link>
                          {t("careerImage")}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* 数据来源 — 更鲜明的彩色胶囊按钮 */}
              <motion.div variants={sectionVariants} custom={3}>
                <h3 className="text-sm font-semibold text-default-600 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-primary-500/15 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                  </span>
                  {t("dataSource")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {DATA_SOURCES.map((source) => (
                    <Link
                      key={source.name}
                      href={source.href}
                      target="_blank"
                    >
                      <Button
                        size="sm"
                        color={source.accent}
                        variant="flat"
                        className="font-medium"
                      >
                        {source.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* 品牌色渐变分隔线 */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />
                <div className="w-1 h-1 rounded-full bg-secondary-400/40" />
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary-500/20 to-transparent" />
              </div>

              {/* 联系方式 — 主题色图标 + 交错入场 */}
              <motion.div variants={sectionVariants} custom={4}>
                <h3 className="text-sm font-semibold text-default-600 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-success-500/15 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-success-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </span>
                  {t("devContact")}
                </h3>
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={contactContainerVariants}
                >
                  {CONTACT_LINKS.map((link) => (
                    <motion.div key={link.key} variants={contactItemVariants}>
                      <Link
                        href={link.href}
                        target="_blank"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-default-100/50 hover:bg-default-200/70 transition-all duration-200 group"
                      >
                        <span className={`w-7 h-7 rounded-lg ${link.bg} flex items-center justify-center ${link.text}`}>
                          {link.icon}
                        </span>
                        <span className="text-sm text-default-500 group-hover:text-default-300 transition-colors">
                          {link.label || t(link.key as "xhs")}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* 品牌色渐变分隔线 */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary-500/20 to-transparent" />
                <div className="w-1 h-1 rounded-full bg-primary-400/40" />
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />
              </div>

              {/* 版权和祝福 — 更有层次感 */}
              <motion.div
                className="text-center space-y-2"
                variants={sectionVariants}
                custom={5}
              >
                <p className="text-xs text-default-500/60">{t("copyright")}</p>
                <p className="text-sm font-semibold text-primary-300/80">{t("haveFun")}</p>
              </motion.div>
            </ModalBody>

            <ModalFooter>
              <motion.div className="w-full" variants={sectionVariants} custom={6}>
                <Button
                  color="primary"
                  className="w-full shadow-md shadow-primary-500/20 font-medium"
                  onPress={() => {
                    onClose?.();
                    setLocalData({
                      openState: false,
                      time: Date.now(),
                    });
                  }}
                >
                  {t("confirm")}
                </Button>
              </motion.div>
            </ModalFooter>
          </motion.div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default InfoModal;
