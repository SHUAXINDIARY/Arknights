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
      return <img className={`h-10 w-10 rounded-full object-cover ${props.className || ""}`} ref={ref} src={url} alt="avatar" />;
    }
    return <img className={`max-w-full object-cover ${props.className || ""}`} ref={ref} src={url} alt="" />;
  } else {
    if (props.useAvatar) {
      return (
        <img className={`h-10 w-10 rounded-full object-cover ${props.className || ""}`} ref={ref} src={source} alt="avatar" />
      );
    }
    return <img className={`max-w-full object-cover ${props.className || ""}`} ref={ref} src={source} alt="" />;
  }
};

export default LazyLoadAvatar;
