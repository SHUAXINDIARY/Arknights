import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  CardBody,
  Input,
} from "./ui";
import { skinList } from "../data/Skin";
import LazyLoadAvatar from "./LazyLoadAvatar";
import { useEffect, useState } from "react";
import { useThrottleFn } from "ahooks";
import i18n, { THook } from "../utils/I18n/i18n";

export interface SkinSelectProps {
  label?: string;
  onSave?: (val: string) => void;
  formValue?: string;
  data?: (typeof skinList)[0][];
  useAvatarShowImg?: boolean;
  useCardShow?: boolean;
  placeholder?: string;
}

export default function SkinSelect({
  label,
  onSave,
  formValue,
  data = skinList,
  useCardShow = true,
  useAvatarShowImg = false,
  placeholder,
}: SkinSelectProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [currentSelect, setCurrentSelect] = useState<(typeof skinList)[0]>();
  // 页面数据
  const [pageData, setPageData] = useState(data);
  // 搜索数据
  const [search, setSearch] = useState("");
  const { t } = THook();
  const { run: updateSearch } = useThrottleFn(
    (val) => {
      setSearch(val);
    },
    { wait: 500 }
  );
  const { run: updatePageData } = useThrottleFn(
    (val) => {
      setPageData(val);
    },
    { wait: 500 }
  );

  useEffect(() => {
    if (formValue) {
      const [initVal] = data.filter((item) => item.img === formValue);
      setCurrentSelect(initVal);
    }
  }, []);

  useEffect(() => {
    if (currentSelect?.img) {
      onSave?.(currentSelect?.img);
      onClose();
    }
  }, [currentSelect]);

  return (
    <div className="flex w-full justify-center">
      <div className="w-[208px] h-14">
        <Button className="w-full h-full" onPress={onOpen}>
          {currentSelect?.name || label || t("selectSkin")}
          {"\n"}
          {currentSelect ? currentSelect.skinName : ""}
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="h-[min(44rem,calc(100dvh-2rem))]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {currentSelect?.name || label || t("selectSkin")}
              </ModalHeader>
              <ModalBody>
                <div className="p-2 flex">
                  <Input
                    defaultValue={search}
                    placeholder={placeholder || t("inputSkinOrOperator")}
                    className="mr-4"
                    onValueChange={(val) => {
                      updateSearch(val);
                      updatePageData(
                        data.filter((item) => {
                          let operatorName = item.name;
                          let skinName = item.skinName;
                          switch (i18n.language) {
                            case "en":
                              operatorName = item?.enName;
                              skinName = item.enSkinName;
                              break;
                            case "jp":
                              operatorName = item?.jpName;
                              skinName = item?.jpSkinName;
                              break;
                            default:
                              break;
                          }
                          console.log("operatorName", operatorName);
                          return (
                            (operatorName || item.name).includes(val) ||
                            (skinName || item.skinName).includes(val)
                          );
                        })
                      );
                    }}
                    onClear={() => {
                      updatePageData(data);
                    }}
                  />
                </div>
                <div className="flex justify-center flex-wrap gap-2">
                  {pageData.map((item) => {
                    return (
                      <div
                        key={item.skinName + item.img}
                        className="cursor-pointer rounded-2xl transition-shadow duration-150 hover:ring-2 hover:ring-blue-400/70"
                        onClick={() => {
                          setCurrentSelect?.(item);
                        }}
                      >
                        {useCardShow ? (
                          <Card className="skin-preview h-36 w-20 overflow-hidden">
                            <CardBody className="flex h-full w-full items-center justify-center p-2">
                              <LazyLoadAvatar
                                className={useAvatarShowImg ? undefined : "h-full w-full"}
                                useAvatar={useAvatarShowImg}
                                url={item.img}
                              />
                            </CardBody>
                          </Card>
                        ) : (
                          <LazyLoadAvatar
                            useAvatar={useAvatarShowImg}
                            url={item.img}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {t("cancel")}
                </Button>
                <Button color="primary" onPress={onClose}>
                  {t("confirm")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
