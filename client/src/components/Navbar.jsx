import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

function Navbar() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          WeatherWise
        </Link>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search City"
            value={query}
            onChange={(e) => setQuery(e.target.value)}/>
          <button type="submit">🔎</button>
        </form>
        <div className={`hamburger ${menuOpen?"open" :""}`}onClick={() =>setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`menu-dropdown ${menuOpen ? "show" : ""}`}>
          <Link to="/login" onClick={()=> setMenuOpen(false)}>
            Login
          </Link>
        </div>

        <div className={`menu-dropdown ${menuOpen ? "show" : ""}`}>
        <Link to="/login" onClick={() => setMenuOpen(false)}>
            Login
        </Link>
        
        <Link to="/register" onClick={() => setMenuOpen(false)}>
            Register
        </Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;