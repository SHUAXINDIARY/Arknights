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
import { FieldNameMap } from "./utils/constant";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import ShowRes from "./components/ShowResult";
import { testData } from "./data/testData";
import { THook } from "./i18n";

function App() {
  const [formState, setFormState] = useState<typeof FieldNameMap | null>();
  const [showRes, setShowRes] = useState(false);
  const [isShowPopover, setIsShowPopover] = useState(false);
  const { t } = THook();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showRes]);

  if (showRes) {
    return (
      <div className="max-w-96 text-center">
        <ShowRes
          data={formState!}
          onClear={() => {
            setFormState(null);
          }}
          onClose={() => {
            setShowRes(false);
          }}
        />
      </div>
    );
  }
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
          setFormState((old: typeof formState) => {
            return {
              ...old,
              [item.field]: val,
            };
          });
        };
        return (
          <div key={item.field + item.name}>
            <Com
              {...((params || {}) as typeof Com)}
              formValue={formState ? formState[item.field] : ""}
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
            if (!formState || Object.values(formState).length === 0) {
              setIsShowPopover((old) => !old);
            } else {
              setShowRes(true);
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
            setFormState(testData);
            setShowRes(true);
          }}
        >
          {t("previewExample")}
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default App;
