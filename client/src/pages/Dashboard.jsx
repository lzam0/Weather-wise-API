import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";
import ProtectedPages from "../components/ProtectedPages";
import "../styles/Dashboard.css";
import { getText } from "../utils/contentLoader";

function Dashboard() {
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

        if (!res.ok) throw new Error(json.error || "Failed to load weather");
        setData(json);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchWeather();
  }, [city]);

  return (
    <ProtectedPages>
      {(user) => (
        <div className="dashboard">
          <div className="dashboard-card">
            <h1>{getText("dashboard", "title")}</h1>
            <p className="welcome-text">
              {getText("dashboard", "welcome")} <span>{user.fname + " " + user.lname}</span>!
            </p>

            <div className="dashboard-links">
              <Link to="/profile" className="dashboard-btn">
                {getText("dashboard", "profileBtn")}
              </Link>
              {/* <Link to="/" className="dashboard-btn secondary">
                {getText("dashboard", "homeBtn")}
              </Link> */}
            </div>
          </div>
          <div className="dashboard-weather">
            {error && <p className="error">{error}</p>}
            {!data && !error && <p>Loading weather data...</p>}

            {data && (
              <>
                <WeatherCard
                  location={data.location}
                  time={new Date(data.now.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})}
                  temperature={`${data.now.temp}°C`}
                  condition={data.now.conditions}
                />

                {data.nextDays.map((day, index) => (
                  <WeatherCard
                    key={index}
                    location={data.location}
                    time={day.date}
                    temperature={`${day.temp}°C`}
                    condition={day.conditions}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </ProtectedPages>
  );
}

export default Dashboard;
