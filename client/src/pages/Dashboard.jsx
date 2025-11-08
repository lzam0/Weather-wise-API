import { Link } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";
import ProtectedPages from "../components/ProtectedPages";
import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <ProtectedPages>
      {(user) => (
        <div className="dashboard">
          <div className="dashboard-card">
            <h1>Dashboard</h1>
            <p className="welcome-text">
              Welcome back, <span>{user.fname + " " + user.lname}</span>!
            </p>

            <div className="dashboard-links">
              <Link to="/profile" className="dashboard-btn">
                Check Profile
              </Link>
              <Link to="/" className="dashboard-btn secondary">
                Return Home
              </Link>
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