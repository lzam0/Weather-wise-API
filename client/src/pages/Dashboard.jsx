import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./Dashboard.css";
import "./Home.css";

function Dashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:5000/api/dashboard", {
        method: "GET",
        credentials: "include", // send cookies
      });

      if (response.status === 401) {
        // Not authorised then redirect to login
        navigate("/");
      } else {
        const data = await response.json();
        setMessage(data.message); 
      }
    }

    fetchData();
  }, [navigate]);

  return (
    <div className="home">
      <h1>Dashboard</h1>
      <p className="description">{message}</p>
    </div>
  );
}

export default Dashboard;