import { Avatar, Image } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useInViewport } from "ahooks";

const LazyLoadAvatar = (props: {
  className?: string;
  url: string;
  useAvatar: boolean;
  useLazyLoad?: boolean;
}) => {
  const { useLazyLoad = true, url } = props;
  const ref = useRef(null);
  const [inViewport] = useInViewport(ref);

  const [source, setSource] = useState("");

  useEffect(() => {
    if (inViewport && !source) {
      setSource(url);
    }
  }, [inViewport]);

  if (!useLazyLoad) {
    if (props.useAvatar) {
      return <Avatar className={props.className || ""} ref={ref} src={url} />;
    }
    return <Image ref={ref} src={url} />;
  } else {
    if (props.useAvatar) {
      return (
        <Avatar className={props.className || ""} ref={ref} src={source} />
      );
    }
    return <Image ref={ref} src={source} />;
  }
};

export default LazyLoadAvatar;
