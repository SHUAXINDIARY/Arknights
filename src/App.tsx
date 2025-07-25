import "./App.css";
import {
  Button,
  ButtonGroup,
  Chip,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import { FormMap } from "./components/FormRender";
import { useState } from "react";
import Footer from "./components/Footer";
import { testData } from "./data/testData";
import { THook } from "./i18n";
import { RESULT_DATA_CACHE, useDataCache } from "./utils/dataCache";
import { FieldNameMap } from "./utils/constant";
import { useNavigate } from "react-router";

function App() {
  const [isShowPopover, setIsShowPopover] = useState(false);
  const n = useNavigate();
  const { localData, setLocalData } =
    useDataCache<typeof FieldNameMap>(RESULT_DATA_CACHE);
  const { t } = THook();

  return (
    <div>
      <Footer />
      <div className="mb-10">
        <Chip size="lg" color="primary">
          {t("Arknights Career Generator")}
        </Chip>
      </div>
      {Object.values(FormMap).map((item) => {
        const Com = item.components;
        const { params } = item;
        if (!Com) {
          return <div key={item.field + item.name}>占位</div>;
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
            <br />
          </div>
        );
      })}
      <ButtonGroup>
        <Popover
          placement="top"
          isOpen={isShowPopover}
          onOpenChange={() => {
            if (!localData || Object.values(localData).length === 0) {
              setIsShowPopover((old) => !old);
            } else {
              // setShowRes(true);
            }
          }}
        >
          <PopoverTrigger>
            <Button color="primary">{t("generate")}</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">{t("prompt")}</div>
              <div className="text-tiny">{t("selectOrFillOne")}</div>
            </div>
          </PopoverContent>
        </Popover>
        <Button
          color="secondary"
          onPress={async () => {
            setLocalData(testData);
            n("/result");
            // setFormState(testData);
            // setShowRes(true);
          }}
        >
          {t("previewExample")}
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default App;
