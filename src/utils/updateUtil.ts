// ✅ 基础类型重载（string / number / boolean）
export function mergeUnique<T extends string | number | boolean>(
    arr1: T[],
    arr2: T[]
): T[];

// ✅ 对象类型重载（需要 key）
export function mergeUnique<T extends object, K extends keyof T>(
    arr1: T[],
    arr2: T[],
    key: K
): T[];

// ✅ 实现体（不含 any）
export function mergeUnique<T>(
    arr1: T[],
    arr2: T[],
    key?: keyof T
): T[] {
    const map = new Map<unknown, T>();

    for (const item of [...arr1, ...arr2]) {
        if (typeof item === 'object' && item !== null && key) {
            const obj = item as Record<string, unknown>;
            const k = obj[key as string];
            if (map.has(k)) {
                const existing = map.get(k)!;
                const existingLen = Object.keys(existing as object).length;
                const currentLen = Object.keys(item as object).length;
                if (currentLen > existingLen) {
                    map.set(k, item);
                }
            } else {
                map.set(k, item);
            }
        } else {
            map.set(item, item);
        }
    }

    return Array.from(map.values());
}
