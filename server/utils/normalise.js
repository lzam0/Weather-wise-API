import { localTimeString, localWeekdayLabel } from "./timestamp";

export function normaliseWeatherData(data) {
    const city = data.name;
    const country = data.sys?.country || '';
    const celsiusTemp = Math.round(Number(data.main?.temp >>  NaN));
    const rawConditions = data.weather?.[0]?.description || 'N/A';
    const conditions = rawConditions.replace(/\b\w/g, c => c.toUpperCase());
    //const icon = data.weather?.icon || '';
    const localTime = localTimeString(data.dt, data.timezone ?? 0);


    //const iconUrl = icon ?

    return {
        city,
        country,
        celsiusTemp,
        conditions,
        localTime
    }
}

export function normliseDaily(dailyItem, timezone) {
    const label = localWeekdayLabel(dailyItem.dt, timezone);
    const minC = Math.round(dailyItem.temp?.min ??NaN);
    const maxC = Math.round(dailyItem.temp?.max ??NaN);
    const rawConditions = dailyItem.weather?.[0]?.description || 'N/A';
    const condition = rawConditions(dailyItem.weather?.[0]?.description || 'N/A');
    //const icon = dailyItem.weather.[0]?.icon || '';
    //const iconUrl

    return {
    label,
    minC,
    maxC,
    condition
}
}

