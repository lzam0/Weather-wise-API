export function localTimeString(dt, timezone, locale = 'en-GB') {
    const localTime = dt * 1000 + timezone * 1000;
    const dateDay = new Date(localTime);
    return dateDay.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
}


export function localWeekdayLabel(dt, timezone, locale = 'en-GB' ) {
    const timeLocal = dt*1000 + timezone * 1000;
    const date = new Date(timeLocal);
    return date.toLocaleDateString(locale, { weekday: 'short'});
}