const cache = new Map();
const time = 10 * 60 * 1000;

export function setInCache(key, data) {
    cache.set( key, { data, expires: Date.now() + time});
}


export function getFromCache(cacheKey) {
    const entry = cache.get(cacheKey);
    if (!entry) return null;
    if (Date.now() > entry.expires) {
        cache.delete(cacheKey);
        return null;
    }
    return entry.data;
}