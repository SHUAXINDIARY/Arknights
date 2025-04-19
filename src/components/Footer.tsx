import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  Link,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import i18n, { THook } from "../i18n";

const Footer = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = THook();
  return (
    <div className="max-w-md mb-7">
      <div className="flex h-5 items-center space-x-4">
        <div>
          <Link
            isBlock
            showAnchorIcon
            href="https://www.xiaohongshu.com/user/profile/617ce3ac000000000201bc2c?xhsshare=CopyLink&appuid=617ce3ac000000000201bc2c&apptime=1652512227"
            color="foreground"
            target="_blank"
            className="text-sm"
          >
            {t("siteAuthor")}
          </Link>
        </div>
        <Divider orientation="vertical" />
        <div>
          <Link
            isBlock
            showAnchorIcon
            href="https://www.xiaohongshu.com/user/profile/62d47a26000000000e00d3cd?xhsshare=CopyLink&appuid=617ce3ac000000000201bc2c&apptime=1732271959&share_id=16d16c386cd64b92a6a2b7a5d09231ae"
            color="foreground"
            target="_blank"
            className="text-sm"
          >
            {t("formAuthor")}
          </Link>
        </div>
        <Divider orientation="vertical" />
        <div>
          <Link isBlock color="foreground" className="text-sm" onPress={onOpen}>
            {t("Language")}
          </Link>
          <Drawer
            className="w-1/2"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="left"
          >
            <DrawerContent>
              {(onClose) => (
                <>
                  <DrawerBody className="h-auto">
                    <h1 className="text-xl font-medium">{t("Language")}</h1>
                    <Select
                      defaultSelectedKeys={[i18n.language]}
                      className="max-w-xs"
                      label={t("selectLanguage")}
                      size="sm"
                      onChange={(e) => {
                        console.log(e.target.value);
                        i18n.changeLanguage(e.target.value);
                      }}
                    >
                      {[
                        {
                          label: "中文",
                          value: "zh",
                        },
                        {
                          label: "日本语",
                          value: "jp",
                        },
                        {
                          label: "English",
                          value: "en",
                        },
                      ].map((lang) => (
                        <SelectItem key={lang.value}>{lang.label}</SelectItem>
                      ))}
                    </Select>
                    <h1 className="text-xl font-medium">{t("more")}</h1>
                    <Link
                      href="https://github.com/SHUAXINDIARY/Arknights"
                      target="_blank"
                    >
                      {t("siteRepo")}
                    </Link>
                    <Link
                      href="https://prts.wiki/w/%E9%A6%96%E9%A1%B5"
                      target="_blank"
                    >
                      prts
                    </Link>
                    <Link
                      href="https://github.com/ArknightsAssets/ArknightsGamedata"
                      target="_blank"
                    >
                      ArknightsGamedata
                    </Link>

                    <Link href="https://arknights.wikiru.jp/" target="_blank">
                      arknights.wikiru
                    </Link>
                    <Link href="https://arknights.wiki.gg/" target="_blank">
                      arknights.wiki.gg
                    </Link>
                  </DrawerBody>
                  <DrawerFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      {t("close")}
                    </Button>
                  </DrawerFooter>
                </>
              )}
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <Divider className="my-4" />
    </div>
  );
};

export default Footer;
