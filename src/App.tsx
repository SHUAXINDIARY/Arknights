import "./App.css";
import { Button, Chip } from "@nextui-org/react";
import { FormMap } from "./components/FormRender";
import { useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [formState, setFormState] = useState({});
  const [showRes, setShowRes] = useState(false);
  return (
    <>
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
          setFormState((old) => {
            return {
              ...old,
              [item.field]: val,
            };
          });
        };
        return (
          <div key={item.field + item.name}>
            <Com
              {...(params || {})}
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
        onPress={() => {
          console.log(formState);
        }}
      >
        生成
      </Button>
      <Footer />
    </>
  );
}

export default App;
