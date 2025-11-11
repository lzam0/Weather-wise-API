import { useEffect, useState } from "react";
import WeatherCard from "../components/WeatherCard";
import "../styles/Home.css"
import Navbar from "../components/Navbar";
import { getText } from "../utils/contentLoader";

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

                if (!res.ok) throw new Error(json.error || getText("home2", "weatherError"));
                setData(json);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchWeather();
    }, [city]);

    return (
        <div className = "home">

            <Navbar onSearch={(searchedCity) => setCity(searchedCity)} />
            <div className="home-content">
                <h1>{getText("home2", "title")}</h1>


                {error && <p className="error">{error}</p>}
                {!data && !error && <p>{getText("home2", "loading")}</p>}

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

            <p className="description">{getText("home2", "description")}</p>
            </div>
        </div>
    );
}

export default Home;