import "./WeatherCard.css"

function WeatherCard({ location, time, temperature, condition }){
    return (
        <div className="weather-card">
            <h2>{location}</h2>
            <p className="time">{time}</p>
            <div className="temp">{temperature}</div>
            <p className="condition">{condition}</p>
        </div>
    )
}
export default WeatherCard;