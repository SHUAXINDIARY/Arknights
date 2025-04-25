export const mergeUnique = (arr1, arr2, key = 'id') => {
    const map = new Map();

    [...arr1, ...arr2].forEach(item => {
        if (typeof item === 'object' && item !== null) {
            map.set(item[key], item);
        } else {
            // 对非对象的情况，用值本身做 key
            map.set(item, item);
        }
    });

    return Array.from(map.values());
}