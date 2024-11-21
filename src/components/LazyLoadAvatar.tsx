import { Avatar, Image } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useInViewport } from "ahooks";
const LazyLoadAvatar = (props: {
  className?: string;
  url: string;
  useAvatar: boolean;
}) => {
  const ref = useRef(null);
  const [inViewport] = useInViewport(ref);

  const [source, setSource] = useState("");

  useEffect(() => {
    if (inViewport && !source) {
      setSource(props.url);
    }
  }, [inViewport]);
  if (props.useAvatar) {
    return (
      <Avatar className={props.className || ""} ref={ref} src={source}></Avatar>
    );
  }
  return <Image ref={ref} src={source}></Image>;
};

export default LazyLoadAvatar;
