import { useSyncExternalStore } from "react";
import { useToTop } from "../../hooks";
import MobileResult from "./MobileResult";
import DesktopResult from "./DesktopResult";
import ResultToast from "./ResultToast";
import { useResult } from "./useResult";

const DESKTOP_QUERY = "(min-width: 1024px)";
const subscribe = (onChange: () => void) => {
    const media = window.matchMedia(DESKTOP_QUERY);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
};
const getSnapshot = () => window.matchMedia(DESKTOP_QUERY).matches;
const getServerSnapshot = () => false;

/** 只挂载当前布局，共享数据与导出状态，避免隐藏内容进入截图。 */
export default function ShowResult() {
    useToTop();
    const result = useResult();
    const isDesktop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    return (
        <>
            {isDesktop ? <DesktopResult result={result} /> : <MobileResult result={result} />}
            <ResultToast result={result} />
        </>
    );
}
