import dotenv from "dotenv";
dotenv.config();

const api = "https://api.openweathermap.org/data/2.5/";


function Daily (list, days = 2) {
    const byDate = list.reduce((acc, item) => {
        const date = item.dt_txt.split(" ")[0];
        (acc[date] ||= []).push(item);
        return acc;
    }, {});
    const currentDay = new Date().toISOString().split("T")[0];
    const futureDates = Object.keys(byDate).sort().filter(d => d > currentDay).slice(0, days);

    return futureDates.map(date => {
        const slices = byDate[date];
        const noon = slices.find(s => s.dt_txt.endsWith( "12:00:00")) || slices[Math.floor(slices.length / 2)];
        return {
            date,
            temp: Math.round(noon.main.temp),
            conditions: noon.weather?.[0]?.description ?? "",
            icon: noon.weather?.[0]?.icon ?? "",
        };
    });
}

export async function weatherInfo({ city, units = "metric"}) {
    const apikey = process.env.OPENWEATHER_KEY;
    if (!apikey) throw new Error("missing openweather api key");


    const currentUrl = `${api}/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${apikey}`;
    const forecastUrl = `${api}/forecast?q=${encodeURIComponent(city)}&units=${units}&appid=${apikey}`;
    const [currentResp, forecastResp] = await Promise.all([fetch(currentUrl), fetch(forecastUrl)]);

    if (!currentResp.ok)  {
        const text = await currentResp.text();
        const err = new Error(text || "current weather failed");
        err.status = currentResp.status;
        throw err;
    }
    if (!forecastResp.ok)  {
        const text = await forecastResp.text();
        const err = new Error(text || "Forecast failed");
        err.status = forecastResp.status;
        throw err;
    }

    const current = await currentResp.json();
    const forecast = await forecastResp.json();

    return {
        location: `${current.name}, ${current.sys?.country || ""}`,
        now: {
            time: current.dt * 1000,
            temp: Math.round(current.main.temp),
            conditions: current.weather?.[0]?.description ??"",
            icon: current.weather?.[0]?.icon ?? "",
            timezone: current.timezone,
        },
        nextDays: Daily(forecast.list, 2),
        units,
    }


}