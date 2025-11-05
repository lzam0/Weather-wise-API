import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css"

function Navbar(){
    const [query, setQuery] = useState("")
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = (e) =>{
        e.preventDefault();
        console.log("searching for: ",query)
    };

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok){
                navigate("/login"); // redirect to login page
            }else{
                console.error("Logout Failed"); // logout error message
            }
        } catch (err){
            console.error(err); // error message
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="logo">WeatherWise</h1>

                <Link to="/login">
                    <h2>Login</h2>
                </Link>

                {location.pathname === "/dashboard" || location.pathname === "/profile" && (
                    <button onClick={handleLogout}>Logout</button>
                )}

                <form className="search-form" onSubmit={handleSearch}>
                    <input type="text" placeholder="Search City" value={query} onChange={(e) => setQuery(e.target.value)}/>
                    <button type="submit"> 🔎 </button>
                </form>
            </div>
        </nav>
    );
}
export default Navbar;