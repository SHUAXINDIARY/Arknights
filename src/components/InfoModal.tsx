import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { useEffect } from "react";
import XHS from "../assets/img_v3_02gq_7ed31f29-4562-44e3-b3e9-fc76fea30ecg.jpeg";
import { THook } from "../i18n";
import { useLocalData } from "../hooks";
import { INIT_MODAL, ONE_HOUR } from "../utils/constant";

const InfoModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = THook();
  // 持久化modal开启状态
  const { localData: needOpen, setLocalData } = useLocalData(INIT_MODAL, {
    openState: true,
    time: Date.now(),
  });
  // 控制modal
  const handleIsOpenModal = () => {
    const _Now = Date.now();
    if (needOpen.openState || _Now - needOpen.time > ONE_HOUR) {
      onOpen();
    }
  };
  useEffect(() => {
    handleIsOpenModal();
  }, []);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {t("modalTitle")}
            </ModalHeader>
            <ModalBody>
              <p>
                {t("inspirationText")}
                <a
                  target="_blank"
                  href="https://www.xiaohongshu.com/user/profile/62d47a26000000000e00d3cd?xhsshare=CopyLink&appuid=617ce3ac000000000201bc2c&apptime=1732271959&share_id=16d16c386cd64b92a6a2b7a5d09231ae"
                >
                  随便吧丶不如跳舞
                </a>
                {t("careerImage")}
                <img className="w-1/5 h-1/2 m-auto" src={XHS} alt="cover" />
              </p>
              <p>
                {t("dataSource")}
                <a
                  target="_blank"
                  href="https://m.prts.wiki/w/%E9%A6%96%E9%A1%B5"
                >
                  prts
                </a>
                、
                <a
                  target="_blank"
                  href="https://wiki.biligame.com/arknights/%E9%A6%96%E9%A1%B5"
                >
                  {t("bilibili")}WIKI
                </a>
              </p>
              <p>
                {t("devContact")}
                <a
                  target="_blank"
                  href="https://www.xiaohongshu.com/user/profile/617ce3ac000000000201bc2c?xhsshare=CopyLink&appuid=617ce3ac000000000201bc2c&apptime=1652512227"
                >
                  {t("xhs")}
                </a>
                、
                <a target="_blank" href="https://github.com/SHUAXINDIARY">
                  Github
                </a>
                、
                <a
                  target="_blank"
                  href="https://space.bilibili.com/6517765?spm_id_from=333.1007.0.0"
                >
                  {t("bilibili")}
                </a>
                、
                <a
                  target="_blank"
                  href="mailto:https://www.skland.com/article?id=2406441"
                >
                  {t("skland")}
                </a>
                、
                <a target="_blank" href="shuaxinjs@qq.com">
                  shuaxinjs@qq.com
                </a>
              </p>
              <p>{t("copyright")}</p>
              <p>{t("haveFun")}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
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
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default InfoModal;
