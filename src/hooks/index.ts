import { useLocalStorageState } from "ahooks"
import { useEffect } from "react"

export const useLocalData = <T>(
    key: string,
    data?: T
) => {
    const [localData, setLocalData] = useLocalStorageState<T>(key, {
        defaultValue: data
    })
    return {
        localData,
        setLocalData
    }
}


export const useToTop = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
}