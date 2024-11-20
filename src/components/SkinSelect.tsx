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
} from "@nextui-org/react";
import { skinList } from "../data/Skin";
import LazyLoadAvatar from "./LazyLoadAvatar";

export default function SkinSelect() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="w-[208px] h-[56px]">
        <Button className="w-full h-full" onPress={onOpen}>
          选择皮肤
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="h-2/3 ">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                选择皮肤
              </ModalHeader>
              <ModalBody className="overflow-y-scroll">
                <div className="flex flex-wrap gap-2">
                  {skinList.map((item) => {
                    return (
                      <Card className="py-4 overflow-scroll h-36 w-20">
                        <CardBody className="overflow-visible py-2 h-full w-full">
                          <LazyLoadAvatar useAvatar={false} url={item.img} />
                        </CardBody>
                      </Card>
                    );
                  })}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button color="primary" onPress={onClose}>
                  确定
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
