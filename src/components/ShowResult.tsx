/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useRef, useState } from "react";
import Footer from "./Footer";
import { FieldNameMap, FormField } from "./FormRender";
import LazyLoadAvatar from "./LazyLoadAvatar";
import RenderTextCard from "./RenderTextCard";
import { ButtonGroup, Button, Spinner } from "@nextui-org/react";
import { testData } from "../data/testData";
import { savePngByCanvas } from "../utils";
interface ShowRes {
  data: typeof FieldNameMap;
  onClose?: () => void;
}

const ShowRes = (props: ShowRes) => {
  const { data = testData } = props;
  // console.log(data);
  const [isCapture, setIsCapture] = useState(false);
  const skin = {
    firstSkin: data.firstSkin,
    favoriteSkin: data.favoriteSkin,
  } as Partial<ShowRes["data"]>;

  const activity = {
    firstActivity: data.firstActivity,
    favoriteDrama: data.favoriteDrama,
  } as Partial<ShowRes["data"]>;

  const text = {
    favoriteMode: data.favoriteMode,
    favoriteEP: data.favoriteEP,
    hopeMember: data.hopeMember,
    name: data.name,
  } as Partial<ShowRes["data"]>;

  const filterData = Object.keys(data).reduce((total, key) => {
    const _key = key as FormField;
    if (!skin[_key] && !activity[_key] && !text[_key]) {
      total[_key] = data[_key];
    }
    return total;
  }, {} as Partial<ShowRes["data"]>);

  const ref = useRef(null);
  return (
    <div ref={ref}>
      {/* {BrowserJs.getParser(window.navigator.userAgent).parsedResult.engine.name} */}
      <Footer />
      <h2 className="text-2xl mb-5">明日方舟生涯表</h2>
      {/* 渲染干员 */}
      <div className="flex flex-wrap gap-2 justify-center mb-5 mt-5">
        {Object.keys(filterData).map((key) => {
          const _key = key as FormField;
          return (
            <div key={filterData[_key] + _key} className="w-16">
              <div className="text-center flex flex-col justify-center items-center">
                <div>
                  <LazyLoadAvatar
                    useLazyLoad={false}
                    className="w-full h-full"
                    useAvatar
                    url={filterData[_key]!}
                  />
                </div>
                <div className="text-sm">{FieldNameMap[_key]}</div>
              </div>
            </div>
          );
        })}
      </div>
      {/* 渲染活动 */}
      <div>
        {Object.keys(activity).map((key) => {
          const _key = key as FormField;
          return (
            <div key={_key + activity[_key]} className="mb-5">
              <div>
                <LazyLoadAvatar
                  useLazyLoad={false}
                  useAvatar={false}
                  url={activity[_key]!}
                />
              </div>
              <div className="mt-2">{FieldNameMap[_key]}</div>
            </div>
          );
        })}
      </div>
      {/* 渲染皮肤 */}
      <div className="flex justify-between">
        {Object.keys(skin).map((key) => {
          const _key = key as FormField;
          return (
            <div key={_key + skin[_key]} className="p-5">
              <div>
                <LazyLoadAvatar
                  useLazyLoad={false}
                  useAvatar={false}
                  url={skin[_key]!}
                />
              </div>
              <div className="mt-2">{FieldNameMap[_key]}</div>
            </div>
          );
        })}
      </div>
      <RenderTextCard avatarUrl={data.main!} name={data.name!} text={text} />
      <ButtonGroup
        className="mt-5"
        style={{
          visibility: !isCapture ? "visible" : "hidden",
        }}
      >
        <Button
          isDisabled={isCapture}
          color="success"
          onPress={async () => {
            setIsCapture(true);
            await savePngByCanvas();
            // window.navigator.userAgent.includes("Chrome")
            //   ? await savePngByCanvas()
            //   : await savePngByBlob();
            setIsCapture(false);
          }}
        >
          {isCapture ? <Spinner color="primary" size="sm" /> : "截图分享"}
        </Button>
        <Button
          color="warning"
          onPress={() => {
            props.onClose?.();
          }}
        >
          编辑
        </Button>
        <Button
          color="danger"
          onPress={() => {
            props.onClose?.();
          }}
        >
          返回
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default ShowRes;
