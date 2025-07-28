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
import { FieldNameMap, RESULT_DATA_KEY } from "./utils/constant";
import { useState } from "react";
import Footer from "./components/Footer";
import { testData } from "./data/testData";
import { THook } from "./i18n";
import { useNavigate } from "react-router";
import { useLocalData } from "./hooks";
import InfoModal from "./components/InfoModal";

function App() {
  // const [formState, setFormState] = useState<typeof FieldNameMap | null>();
  // const [showRes, setShowRes] = useState(false);
  const [isShowPopover, setIsShowPopover] = useState(false);
  const { t } = THook();
  const goto = useNavigate();
  const { localData, setLocalData } = useLocalData<typeof FieldNameMap>(
    RESULT_DATA_KEY,
    {}
  );
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [showRes]);

  // if (showRes) {
  //   return (
  //     <div className="max-w-96 text-center">
  //       <ShowRes
  //         data={formState!}
  //         onClear={() => {
  //           setFormState(null);
  //         }}
  //         onClose={() => {
  //           setShowRes(false);
  //         }}
  //       />
  //     </div>
  //   );
  // }
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
          // setFormState((old: typeof formState) => {
          //   return {
          //     ...old,
          //     [item.field]: val,
          //   };
          // });
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
              goto("/result");
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
            // setFormState(testData);
            setLocalData(testData);
            // setShowRes(true);
            goto("/result");
          }}
        >
          {t("previewExample")}
        </Button>
      </ButtonGroup>
      <InfoModal />
    </div>
  );
}

export default App;
