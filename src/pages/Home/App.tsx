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

function App() {
  useToTop();
  const [isShowPopover, setIsShowPopover] = useState(false);
  const { t } = THook();
  const goto = useNavigate();
  const { localData, setLocalData } = useLocalData<Record<string, string>>(
    RESULT_DATA_KEY,
    {}
  );

  // 计算已填写的表单项数量
  const filledCount = localData
    ? Object.values(localData).filter(Boolean).length
    : 0;
  const totalCount = FormMap.length;

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-md mx-auto">
        {/* 页头 */}
        <Footer />
        <div className="mb-8">
          <Chip size="lg" color="primary" variant="flat">
            {t("Arknights Career Generator")}
          </Chip>
        </div>

        {/* 进度 */}
        <div className="mb-6">
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
        </div>

        {/* 表单区域 */}
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
              <div key={item.field + item.name}>
                <Com
                  {...((params || {}) as typeof Com)}
                  formValue={localData ? localData[item.field] : ""}
                  onSave={(val: string) => {
                    onSave(val);
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-wrap gap-2 justify-center">
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

          <Button variant="bordered" onPress={() => goto("/questionnaire")}>
            {t("questionnaire")}
          </Button>
        </div>
        <InfoModal />
      </div>
    </div>
  );
}

export default App;
