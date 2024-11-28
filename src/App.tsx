import "./App.css";
import {
  Button,
  ButtonGroup,
  Chip,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { FormMap } from "./components/FormRender";
import { FieldNameMap } from "./utils/constant";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import ShowRes from "./components/ShowResult";
import { testData } from "./data/testData";

function App() {
  const [formState, setFormState] = useState<typeof FieldNameMap | null>();
  const [showRes, setShowRes] = useState(false);
  const [isShowPopover, setIsShowPopover] = useState(false);

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
          明日方舟生涯生成器
        </Chip>
      </div>
      {Object.values(FormMap).map((item) => {
        const Com = item.components;
        const { params } = item;
        if (!Com) {
          return <div key={item.field + item.name}>占位</div>;
        }
        const onSave = (val: string) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setFormState((old: any) => {
            return {
              ...old,
              [item.field]: val,
            };
          });
        };
        return (
          <div key={item.field + item.name}>
            <Com
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...((params || {}) as any)}
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
            <Button color="primary">生成</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">提示</div>
              <div className="text-tiny">请至少选择或填写上述其中的一项</div>
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
          预览示例
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default App;
