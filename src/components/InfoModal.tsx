import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect } from "react";
import XHS from "../assets/img_v3_02gq_7ed31f29-4562-44e3-b3e9-fc76fea30ecg.jpeg";
import { useTranslation } from "react-i18next";

const InfoModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation();
  useEffect(() => {
    onOpen();
  }, []);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {/* 提前声明 */}
              {t("Advance Declaration")}
            </ModalHeader>
            <ModalBody>
              <p>
                {/* 灵感来自 */}
                {t("InspiredBy")}
                <a
                  target="_blank"
                  href="https://www.xiaohongshu.com/user/profile/62d47a26000000000e00d3cd?xhsshare=CopyLink&appuid=617ce3ac000000000201bc2c&apptime=1732271959&share_id=16d16c386cd64b92a6a2b7a5d09231ae"
                >
                  随便吧丶不如跳舞
                </a>
                {/* 制作的生涯图： */}
                {t("CareerChartCreated")}
                <img className="w-1/5 h-1/2 m-auto" src={XHS} alt="cover" />
              </p>
              <p>
                {/* 数据来自 */}
                {t("DataSourcedFrom")}:
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
                  Bilibili Arknights WIKI
                </a>
              </p>
              <p>
                {/* 网站开发均为本人，联系方式如下 */}
                {t(
                  "The website development is done by me, and my contact information is as follows:"
                )}
                <a
                  target="_blank"
                  href="https://www.xiaohongshu.com/user/profile/617ce3ac000000000201bc2c?xhsshare=CopyLink&appuid=617ce3ac000000000201bc2c&apptime=1652512227"
                >
                  小红书
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
                  B站
                </a>
                、
                <a
                  target="_blank"
                  href="mailto:https://www.skland.com/article?id=2406441"
                >
                  森空岛
                </a>
                、
                <a target="_blank" href="shuaxinjs@qq.com">
                  shuaxinjs@qq.com
                </a>
                （
                <i>
                  {/* 可点击 */}
                  {t("Clickable")}
                </i>
                ）
              </p>
              <p>
                {/* 没有官方、prts授权等，也没有打算用来做任何商业推广等，纯粹自己做的玩图一乐，官方相关工作的同学看到如果需要下架什么的私戳上述联系方式，看到第一时间处理🙏🏻 */}
                {t("InfoModalDes")}🙏🏻
              </p>
              <p>
                {/* 最后感谢你的喜欢，希望给你带来一点快乐~！ */}
                {t("InfoModalHope")}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                {/* 确认 */}
                {t("OK")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default InfoModal;
