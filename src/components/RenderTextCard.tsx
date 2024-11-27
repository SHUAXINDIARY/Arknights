import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
} from "@nextui-org/react";
import { FieldNameMap, FormField } from "../utils/constant";
import LazyLoadAvatar from "./LazyLoadAvatar";

interface RenderTextCardProps {
  avatarUrl: string;
  name: string;
  text: Partial<typeof FieldNameMap>;
}

export default function RenderTextCard(props: RenderTextCardProps) {
  return (
    <Card className="shadow-none border">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <LazyLoadAvatar useAvatar useLazyLoad={false} url={props.avatarUrl} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {props.name}
            </h4>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400 text-center">
        <div>
          {Object.keys(props.text).map((key) => {
            const _key = key as FormField;
            if (_key === "name") {
              return "";
            }
            return (
              <div key={_key + props.text[_key]} className="mb-3">
                <div>
                  <span>{FieldNameMap[_key]}</span>
                  <div className="mt-2">
                    <Chip color="primary">{props.text[_key] || "-"}</Chip>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>
      <CardFooter className="gap-3"></CardFooter>
    </Card>
  );
}
