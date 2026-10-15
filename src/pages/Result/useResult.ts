import { useRef, useState, useCallback, useMemo, useEffect } from "react";
import { FormField, RESULT_DATA_KEY } from "../../utils/constant";
import { AlbumList } from "../../data/Album";
import { savePngByCanvas, savePngByHtmlInCanvas } from "../../utils";
import { THook } from "../../utils/I18n/i18n";
import { useLocalData } from "../../hooks";
import { useNavigate } from "react-router";
import { useReducedMotion } from "framer-motion";
import { TOAST_DURATION_MS } from "./resultMotion";

export function useResult() {
    const shouldReduceMotion = useReducedMotion();
    const { localData: data } = useLocalData<Record<string, string>>(
        RESULT_DATA_KEY,
        {},
    );
    const goto = useNavigate();
    const { t } = THook();
    const [isSaving, setIsSaving] = useState(false);
    /** 是否显示导出成功的 toast */
    const [showSuccess, setShowSuccess] = useState(false);
    /** 两条导出链路共用的结果区域 */
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!showSuccess) return;
        const timer = setTimeout(
            () => setShowSuccess(false),
            TOAST_DURATION_MS,
        );
        return () => clearTimeout(timer);
    }, [showSuccess]);

    const handleSave = useCallback(async () => {
        if (isSaving) return;

        setIsSaving(true);
        try {
            const target = ref.current;
            if (!target) throw new Error("结果页尚未就绪");
            const savedByHtmlInCanvas = await savePngByHtmlInCanvas(target);
            if (!savedByHtmlInCanvas) {
                await savePngByCanvas(target);
            }
            setShowSuccess(true);
        } catch (error) {
            alert(error);
        } finally {
            setIsSaving(false);
        }
    }, [isSaving]);

    const skin: Record<string, string | undefined> = useMemo(
        () => ({
            firstSkin: data.firstSkin,
            favoriteSkin: data.favoriteSkin,
        }),
        [data.firstSkin, data.favoriteSkin],
    );

    const activity: Record<string, string | undefined> = useMemo(
        () => ({
            firstActivity: data.firstActivity,
            favoriteDrama: data.favoriteDrama,
            favoriteMedalGroup: data.favoriteMedalGroup,
        }),
        [data.firstActivity, data.favoriteDrama, data.favoriteMedalGroup],
    );

    const text: Record<string, string | undefined> = useMemo(
        () => ({
            customAvatar: data.customAvatar,
            favoriteMode: data.favoriteMode,
            favoriteEP: data.favoriteEP,
            hopeMember: data.hopeMember,
            name: data.name,
        }),
        [
            data.customAvatar,
            data.favoriteMode,
            data.favoriteEP,
            data.hopeMember,
            data.name,
        ],
    );

    const filterData = useMemo(
        () =>
            Object.keys(data).reduce(
                (total, key) => {
                    const _key = key as FormField;
                    if (_key !== 'favoriteAlbum' && !skin[_key] && !activity[_key] && !text[_key]) {
                        total[_key] = data[_key];
                    }
                    return total;
                },
                {} as Record<string, string | undefined>,
            ),
        [data, skin, activity, text],
    );

    const favoriteAlbum = AlbumList.find((album) => album.img === data.favoriteAlbum || album.sourceImg === data.favoriteAlbum);

    /** 关闭动画时的降级配置 */
    const motionProps = shouldReduceMotion
        ? { initial: undefined, animate: undefined, variants: undefined }
        : {};

    return { data, skin, activity, text, filterData, favoriteAlbum, ref, isSaving, handleSave, showSuccess, goto, t, shouldReduceMotion, motionProps };
}

export type ResultModel = ReturnType<typeof useResult>;
