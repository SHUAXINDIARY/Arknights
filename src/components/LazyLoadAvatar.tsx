import { Avatar, Image } from "@heroui/react";
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
      return (
        <div className="media-container">
          <figure className="media">
            <Avatar className={props.className || ""} ref={ref} src={url} />
          </figure>
        </div>
      );
    }
    return (
      <div className="media-container">
        <figure className="media">
          <Image ref={ref} src={url} />
        </figure>
      </div>
    );
  } else {
    if (props.useAvatar) {
      return (
        <div className="media-container">
          <figure className="media">
            <Avatar className={props.className || ""} ref={ref} src={source} />
          </figure>
        </div>
      );
    }
    return (
      <div className="media-container">
        <figure className="media">
          <Image ref={ref} src={source} />
        </figure>
      </div>
    );
  }
};

export default LazyLoadAvatar;
