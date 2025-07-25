import { useLocalStorageState } from "ahooks"

export const RESULT_DATA_CACHE = 'RESULT_DATA_CACHE';

export const useDataCache = <T>(key: string, data?: T) => {
    const [localData, setLocalData] = useLocalStorageState<T>(key, {
        defaultValue: data || {} as T
    })
    return {
        localData,
        setLocalData
    }
}