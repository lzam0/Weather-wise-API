import { Link } from "react-router-dom";

import ProtectedPages from "../components/ProtectedPages";

import "../styles/Login.css";

function Dashboard() {
  return (
    <ProtectedPages>
      {(user) => (
        <div className="login">
          <h1>Dashboard</h1>
          <p>Welcome, {user.fname + " " + user.lname}!</p>
        
        <Link to="/profile">
            <h2>Check Profile</h2>
        </Link>
        </div>
      )}
    </ProtectedPages>
  );
}


export default Dashboard;