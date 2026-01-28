import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Link,
  Select,
  SelectItem,
  useDisclosure,
  Card,
  CardBody,
} from "@heroui/react";
import i18n, { THook } from "../utils/I18n/i18n";

// 语言选项
const LANGUAGES = [
  { label: "中文", value: "zh", flag: "🇨🇳" },
  { label: "日本語", value: "jp", flag: "🇯🇵" },
  { label: "English", value: "en", flag: "🇺🇸" },
];

// 资源链接
const RESOURCE_LINKS = [
  {
    key: "siteRepo",
    href: "https://github.com/SHUAXINDIARY/Arknights",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    key: "prts",
    label: "PRTS Wiki",
    href: "https://prts.wiki/w/%E9%A6%96%E9%A1%B5",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    key: "gamedata",
    label: "Gamedata",
    href: "https://github.com/ArknightsAssets/ArknightsGamedata",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    key: "wikiru",
    label: "Wikiru (JP)",
    href: "https://arknights.wikiru.jp/",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    key: "wikigg",
    label: "Wiki.gg (EN)",
    href: "https://arknights.wiki.gg/",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
];

const Footer = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = THook();

  return (
    <div className="w-full max-w-lg mb-6">
      {/* 主要链接区域 */}
      <div className="flex items-center justify-center gap-3 mb-4">
        {/* 站点作者 */}
        <Link
          href="https://www.xiaohongshu.com/user/profile/617ce3ac000000000201bc2c?xhsshare=CopyLink&appuid=617ce3ac000000000201bc2c&apptime=1652512227"
          target="_blank"
          className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-default-100/50 hover:bg-default-200/70 transition-all duration-200"
        >
          <span className="text-lg">👤</span>
          <span className="text-sm text-default-600 group-hover:text-default-800 transition-colors">
            {t("siteAuthor")}
          </span>
        </Link>

        {/* 分隔点 */}
        <div className="w-1 h-1 rounded-full bg-default-300" />

        {/* 表单作者 */}
        <Link
          href="https://www.xiaohongshu.com/user/profile/62d47a26000000000e00d3cd?xhsshare=CopyLink&appuid=617ce3ac000000000201bc2c&apptime=1732271959&share_id=16d16c386cd64b92a6a2b7a5d09231ae"
          target="_blank"
          className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-default-100/50 hover:bg-default-200/70 transition-all duration-200"
        >
          <span className="text-lg">📝</span>
          <span className="text-sm text-default-600 group-hover:text-default-800 transition-colors">
            {t("formAuthor")}
          </span>
        </Link>

        {/* 分隔点 */}
        <div className="w-1 h-1 rounded-full bg-default-300" />

        {/* 语言和更多设置 */}
        <Button
          variant="light"
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-default-100/50 hover:bg-default-200/70 min-w-0 h-auto"
          onPress={onOpen}
        >
          <span className="text-lg">🌐</span>
          <span className="text-sm text-default-600">{t("Language")}</span>
        </Button>
      </div>

      {/* 设置抽屉 */}
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="left"
        size="sm"
        classNames={{
          base: "max-w-[320px]",
        }}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 border-b border-default-200">
                <h2 className="text-xl font-semibold">{t("Language")}</h2>
                <p className="text-sm text-default-500">{t("selectLanguage")}</p>
              </DrawerHeader>

              <DrawerBody className="py-6 space-y-6">
                {/* 语言选择 */}
                <Card shadow="none" className="bg-default-50">
                  <CardBody className="p-4">
                    <Select
                      defaultSelectedKeys={[i18n.language]}
                      label={t("selectLanguage")}
                      size="md"
                      variant="bordered"
                      classNames={{
                        trigger: "bg-white dark:bg-default-100",
                      }}
                      onChange={(e) => {
                        i18n.changeLanguage(e.target.value);
                      }}
                      startContent={
                        <span className="text-lg">
                          {LANGUAGES.find((l) => l.value === i18n.language)?.flag}
                        </span>
                      }
                    >
                      {LANGUAGES.map((lang) => (
                        <SelectItem
                          key={lang.value}
                          startContent={<span>{lang.flag}</span>}
                        >
                          {lang.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </CardBody>
                </Card>

                {/* 资源链接 */}
                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <span>📚</span>
                    {t("more")}
                  </h3>
                  <div className="space-y-2">
                    {RESOURCE_LINKS.map((link) => (
                      <Link
                        key={link.key}
                        href={link.href}
                        target="_blank"
                        className="flex items-center gap-3 p-3 rounded-xl bg-default-50 hover:bg-default-100 transition-colors w-full text-default-700 hover:text-primary"
                      >
                        <span className="text-default-500">{link.icon}</span>
                        <span className="text-sm font-medium">
                          {link.label || t(link.key as "siteRepo")}
                        </span>
                        <svg
                          className="w-3.5 h-3.5 ml-auto text-default-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              </DrawerBody>

              <DrawerFooter className="border-t border-default-200">
                <Button
                  color="default"
                  variant="flat"
                  onPress={onClose}
                  className="w-full"
                >
                  {t("close")}
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      {/* 底部装饰线 */}
      <div className="flex items-center justify-center gap-2">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-default-200" />
        <div className="w-1.5 h-1.5 rounded-full bg-default-300" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-default-200" />
      </div>
    </div>
  );
};

export default Footer;
