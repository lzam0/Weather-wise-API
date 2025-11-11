import { Link } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";
import ProtectedPages from "../components/ProtectedPages";
import "../styles/Dashboard.css";
import { getText } from "../utils/contentLoader";

function Dashboard() {
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
            <WeatherCard />
            <WeatherCard />
          </div>
        </div>
      )}
</ProtectedPages>
  );
}


export default Dashboard;
