const cache = new Map();
const time = 10 * 60 * 1000;

 function setInCache(key, data) {
    cache.set( key, { data, expires: Date.now() + time});
}


 function getFromCache(cacheKey) {
    const entry = cache.get(cacheKey);
    if (!entry) return null;
    if (Date.now() > entry.expires) {
        cache.delete(cacheKey);
        return null;
    }
    return entry.data;
}

module.exports = {setInCache, getFromCache};