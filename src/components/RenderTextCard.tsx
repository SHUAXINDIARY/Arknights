import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Chip,
} from "@nextui-org/react";
import { FieldNameMap, FormField } from "./FormRender";

interface RenderTextCardProps {
  avatarUrl: string;
  name: string;
  text: Partial<typeof FieldNameMap>;
}

export default function RenderTextCard(props: RenderTextCardProps) {
  //   const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={props.avatarUrl} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {props.name}
            </h4>
            {/* <h5 className="text-small tracking-tight text-default-400">
              @zoeylang
            </h5> */}
          </div>
        </div>
        {/* <Button
          className={
            isFollowed
              ? "bg-transparent text-foreground border-default-200"
              : ""
          }
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button> */}
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400 text-center">
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
                  <Chip color="primary">{props.text[_key] || '-'}</Chip>
                </div>
              </div>
            </div>
          );
        })}
      </CardBody>
      <CardFooter className="gap-3">
        {/* <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className=" text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Followers</p>
        </div> */}
      </CardFooter>
    </Card>
  );
}
