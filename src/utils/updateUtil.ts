export const mergeUnique = (arr1, arr2, key = 'id') => {
    const map = new Map();

    [...arr1, ...arr2].forEach(item => {
        if (typeof item === 'object' && item !== null) {
            if (map.get(item[key])) {
                const one = Object.values(map.get(item[key]));
                const two = Object.values(item);
                if (two.length > one.length) {
                    map.set(item[key], two)
                }
            } else {
                map.set(item[key], item);
            }
        } else {
            // 对非对象的情况，用值本身做 key
            map.set(item, item);
        }
    });

    return Array.from(map.values());
}