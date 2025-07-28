import { useLocalStorageState } from "ahooks"

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