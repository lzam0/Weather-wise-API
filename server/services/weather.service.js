import axios from 'axios';
import NodeCache from 'node-cache';
import { normaliseWeatherData, normaliseDaily } from '../utils/normalise.js';
import { localTimeString, localWeekdayLabel } from '../utils/timestamp.js';

const cache = new NodeCache({ stdTTL: 300});


const CURRENT_URL = 'https://api.openweathermap.org/data/2.5/weather';
const CALL_URL = 'https://api.openweathermap.org/data/3.0/onecall';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';


function apiKey() {
    const key = process.env.OPENWEATHER_API_KEY;
    if (!key) {
        const error = new Error('Missing api key');
        error.status = 500;
        throw error;
    }
    return key;

}

async function fetchCurrentWeatherData(weather) {
    const apiId = apiKey();
    const {data} = await axios.get(CURRENT_URL, {
        params: {weather, units: 'metric', apiId },
        timeout: 8000
    });
}


async function dailyWeather(lats, long) {
    const appId = apiKey()
    const { data } = await axios.get(CALL_URL, {
        params: {
            lats, long, units: 'metric', exclude: 'minutely, hourly, alerts', appId
        },
        timeout: 8000
    });
    return data;
}