import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

function Navbar(){
    const [query, setQuery] = useState("")

    const handelSearch = (e) =>{
        e.preventDfault();
        console.log("searching for: ",query)
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="logo">WeatherWise</h1>

                <Link to="/login">
                    <h2>Login</h2>
                </Link>

                <form className="search-form" onSubmit={handelSearch}>
                    <input type="text" placeholder="Searchi City" value={query} onChange={(e) => setQuery(e.target.value)}/>
                    <button type="submit"> 🔎 </button>
                </form>
            </div>
        </nav>
    );
}
export default Navbar;