import { useEffect, useState } from "react";
import WeatherCard from "../components/WeatherCard";
import "../styles/Home.css"

// function Home(){
//     return(
//         <div className="home">
//             <div className="home-content">
//                 <h1> Your Weather Companion </h1>
//                 <WeatherCard/>
//                 <WeatherCard/>
//                 <WeatherCard/>
//                 <p className="description">
//                     Daily accurate forecast tailored for you
//                 </p>
//             </div>
//         </div>
//     )
// }

// export default Home;

function Home(){
    const [city, setCity] = useState("London");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchWeather() {
            try {
                setError("");
                setData(null);

                const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}&units=metric`);
                const json = await res.json();

                if (!res.ok) throw new Error(json.error || "Failed to load up the weather");
                setData(json);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchWeather();
    }, [city]);

    return (
        <div className = "home">
            <div className="home-content">
                <h1> Your Weather Companion </h1>

                <input
                type="text"
                value= {city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter a city..."
                className="city-input"
                />

                {error && <p className="error">{error}</p>}
                {!data && !error && <p>Loading</p>}

                {data && (
                <>
                    {/* Now card */}
                    <WeatherCard
                    location={data.location}
                    time= {new Date(data.now.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})}
                    temperature={`${data.now.temp}°C`}
                    condition={data.now.conditions} />

                 {/* Tomorrow */}
                {data.nextDays[0] && (
                    <WeatherCard
                    location={data.location}
                    time= {data.nextDays[0].date}
                    temperature={`${data.nextDays[0].temp}°C`}
                    condition= {data.nextDays[0].conditions}
                    />
                )}

                 {/* Day after tomorrow */}
                {data.nextDays[1] && (
                    <WeatherCard
                    location={data.location}
                    time= {data.nextDays[1].date}
                    temperature={`${data.nextDays[1].temp}°C`}
                    condition= {data.nextDays[1].conditions}
                    />
                )}
                </>
            )}

            <p className="description"> Daily accurate forecast tailred for you</p>
            </div>
        </div>
    );
}

export default Home;