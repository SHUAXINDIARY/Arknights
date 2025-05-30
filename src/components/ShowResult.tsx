import { useRef, useEffect } from "react";
import Footer from "./Footer";
import {
  FieldNameMap,
  FieldNameMapForI18n,
  FormField,
} from "../utils/constant";
import LazyLoadAvatar from "./LazyLoadAvatar";
import RenderTextCard from "./RenderTextCard";
import { ButtonGroup, Button } from "@heroui/react";
import { isApple, savePngByCanvas } from "../utils";
import QRcode from "qrcode";
import { THook } from "../i18n";
interface ShowRes {
  data: typeof FieldNameMap;
  onClose?: () => void;
  onClear?: () => void;
}

const ShowRes = (props: ShowRes) => {
  const { data } = props;
  const { t } = THook();
  const skin = {
    firstSkin: data.firstSkin,
    favoriteSkin: data.favoriteSkin,
  } as Partial<ShowRes["data"]>;

  const activity = {
    firstActivity: data.firstActivity,
    favoriteDrama: data.favoriteDrama,
    favoriteMedalGroup: data.favoriteMedalGroup,
  } as Partial<ShowRes["data"]>;

  const text = {
    customAvatar: data.customAvatar,
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
  // const [qrCodeUrl, setQrCodeUrl] = useState("");
  useEffect(() => {
    (async () => {
      const data = await QRcode.toDataURL(window.location.href);
      console.log(data);
      // setQrCodeUrl(data);
    })();
  }, []);
  console.log("调试FieldNameMap", FieldNameMapForI18n());
  return (
    <div ref={ref}>
      <Footer />
      <h2 className="text-2xl mb-5">{t("Arknights Career Generator")}</h2>
      {/* 渲染干员 */}
      <div className="flex flex-wrap gap-2 justify-center mb-5 mt-5">
        {Object.keys(filterData).map((key) => {
          const _key = key as FormField;
          if (!filterData[_key]) {
            return "";
          }
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
                <div className="text-sm">{FieldNameMapForI18n()[_key]}</div>
              </div>
            </div>
          );
        })}
      </div>
      {/* 渲染活动 */}
      <div>
        {Object.keys(activity).map((key) => {
          const _key = key as FormField;
          if (!activity[_key]) {
            return "";
          }
          return (
            <div key={_key + activity[_key]} className="mt-5">
              <div>
                <LazyLoadAvatar
                  useLazyLoad={false}
                  useAvatar={false}
                  url={activity[_key]!}
                />
              </div>
              <div className="mt-2">{FieldNameMapForI18n()[_key]}</div>
            </div>
          );
        })}
      </div>
      {/* 渲染皮肤 */}
      <div className="flex justify-between">
        {Object.keys(skin).map((key) => {
          const _key = key as FormField;
          if (!skin[_key]) {
            return "";
          }
          return (
            <div key={_key + skin[_key]} className="p-5">
              <div>
                <LazyLoadAvatar
                  className="min-h-52"
                  useLazyLoad={false}
                  useAvatar={false}
                  url={skin[_key]!}
                />
              </div>
              <div className="mt-2">{FieldNameMapForI18n()[_key]}</div>
            </div>
          );
        })}
      </div>
      <RenderTextCard
        avatarUrl={text.customAvatar || data.main!}
        name={data.name!}
        text={Object.keys(text).reduce((total, item) => {
          if (item !== "customAvatar") {
            total[item] = (text as Record<string, string>)[item];
          }
          return total;
        }, {} as Record<string, string>)}
      />
      {/* <div className="mt-5">
        {qrCodeUrl ? (
          <div className="flex justify-center">
            <div>
              <img src={qrCodeUrl} className="m-auto mb-2" />
              {t("scan_to_fill")}
            </div>
          </div>
        ) : (
          ""
        )}
      </div> */}
      <ButtonGroup className="mt-5">
        <Button
          onPress={async () => {
            try {
              if (isApple()) {
                await savePngByCanvas();
                await savePngByCanvas();
                await savePngByCanvas(true);
              } else {
                await savePngByCanvas(true);
              }
            } catch (error) {
              alert(error);
            }
          }}
        >
          {t("export_result")}
        </Button>
        <Button
          color="warning"
          onPress={() => {
            props.onClose?.();
          }}
        >
          {t("edit")}
        </Button>
        <Button
          color="danger"
          onPress={() => {
            props.onClose?.();
            props.onClear?.();
          }}
        >
          {t("go_back")}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default ShowRes;
