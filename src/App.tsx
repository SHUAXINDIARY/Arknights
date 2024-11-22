import "./App.css";
import { Button, Chip } from "@nextui-org/react";
import { FieldNameMap, FormMap } from "./components/FormRender";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import ShowRes from "./components/ShowResult";
import { generateData } from "./utils";
import { testData } from "./data/testData";
import InfoModal from "./components/InfoModal";

function App() {
  const [formState, setFormState] = useState<typeof FieldNameMap>();
  const [showRes, setShowRes] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showRes]);
  if (showRes) {
    return (
      <div className="max-w-96 text-center">
        <ShowRes
          data={formState!}
          onClose={() => {
            setShowRes(false);
          }}
        />
      </div>
    );
  }
  return (
    <div>
      <InfoModal />
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
              onSave={(val: string) => {
                onSave(val);
              }}
            />
            <br />
          </div>
        );
      })}
      <Button
        className="w-52 h-14"
        onPress={async () => {
          // setFormState(await generateData(formState));
          setFormState(await generateData(testData));
          setShowRes(true);
        }}
      >
        生成
      </Button>
    </div>
  );
}

export default App;
