import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
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
        <div>
          <Link isBlock color="foreground" className="text-sm" onPress={onOpen}>
            {t("more")}
          </Link>
          <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left">
            <DrawerContent>
              {(onClose) => (
                <>
                  <DrawerHeader className="flex flex-col gap-1">
                    {t("moreActions")}
                  </DrawerHeader>
                  <DrawerBody className="w-1/2">
                    <Button>{t("siteRepo")}</Button>
                    {/* <Button>{t("dataSource")}</Button> */}
                    <Select
                      className="max-w-xs"
                      label={t("selectLanguage")}
                      size="sm"
                      onChange={(e) => {
                        console.log(e.target.value);
                        i18n.changeLanguage(e.target.value);
                      }}
                    >
                      {["zh", "en", "jp"].map((lang) => (
                        <SelectItem key={lang}>{lang}</SelectItem>
                      ))}
                    </Select>
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
