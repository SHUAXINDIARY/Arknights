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
} from "@nextui-org/react";
import { skinList } from "../data/Skin";
import LazyLoadAvatar from "./LazyLoadAvatar";
import { useEffect, useState } from "react";
import { useThrottleFn } from "ahooks";

interface SkinSelectProps {
  label?: string;
  onSave?: (val: string) => void;
}

export default function SkinSelect({ label, onSave }: SkinSelectProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [currentSelect, setCurrentSelect] = useState<(typeof skinList)[0]>();
  // 页面数据
  const [pageData, setPageData] = useState(skinList);
  // 搜索数据
  const [search, setSearch] = useState("");
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
    if (currentSelect?.img) {
      onSave?.(currentSelect?.img);
      onClose();
    }
  }, [currentSelect]);

  return (
    <div className="flex w-full justify-center">
      <div className="w-[208px] h-14">
        <Button className="w-full h-full" onPress={onOpen}>
          {currentSelect?.name || label || "选择皮肤"}
          {"\n"}
          {currentSelect ? currentSelect.skinName : ""}
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
                <div className="p-2 flex">
                  <Input
                    defaultValue={search}
                    placeholder="输入皮肤或干员名搜索"
                    className="mr-4"
                    onValueChange={(val) => {
                      updateSearch(val);
                      updatePageData(
                        skinList.filter(
                          (item) =>
                            item.name.includes(val) ||
                            item.skinName.includes(val)
                        )
                      );
                    }}
                    onClear={() => {
                      updatePageData(skinList);
                    }}
                  />
                </div>
                <div className="flex justify-center flex-wrap gap-2">
                  {pageData.map((item) => {
                    return (
                      <div
                        key={item.img}
                        onClick={() => {
                          setCurrentSelect?.(item);
                        }}
                      >
                        <Card className="py-4 h-36 w-20">
                          <CardBody className="overflow-visible py-2 h-full w-full">
                            <LazyLoadAvatar useAvatar={false} url={item.img} />
                          </CardBody>
                        </Card>
                      </div>
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
    </div>
  );
}
