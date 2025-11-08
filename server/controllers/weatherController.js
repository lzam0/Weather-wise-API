import { weatherInfo } from "../services/weather.service.js";
import { getFromCache, setInCache } from "../models/cache.js";

export async function getWeather(req, res) {
    try {
        const city = req.query.city || "London";
        const units = req.query.units || "metric";
        const cacheKey= `${city}:${units}`;

        const cached = getFromCache(cacheKey);
        if (cached) return res.json(cached);

        const payload =  await weatherInfo({ city, units});

        setInCache(cacheKey, payload);
        res.json(payload);
    } catch (err) {
        console.error(err);
        const status = err.status || 500;
        res.status(status).json({ error: err.message || "Weather fetch failed"});
    }

}