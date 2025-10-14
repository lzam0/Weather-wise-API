import "./WeatherCard.css"

function WeatherCard(){
    const weatherData = {
        location: "London, UK",
        time: new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),
        temperature:"18C",
        condition:"Partially Cloudy",
    };
    return (
        <div className="weather-card">
            <h2>{weatherData.location}</h2>
            <p className="time">{weatherData.time}</p>
            <div className="temp">{weatherData.temperature}</div>
            <p className="condition">{weatherData.condition}</p>
        </div>
    )
}
export default WeatherCard;