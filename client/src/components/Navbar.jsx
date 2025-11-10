import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css"
import { getText } from "../utils/contentLoader";

function Navbar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
    setQuery("")
    console.log("Searching for:", query);
  };

const handleLogout = async () => {
  try {
    const response = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      navigate("/login");
    } else {
      console.error("Logout failed");
    }
  } catch (err) {
    console.error(err)
  }
};

const isProtectedPage =
  location.pathname === "/dashboard" || location.pathname === "/profile";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          {getText("navbar", "logoText")}
        </Link>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder={getText("navbar", "searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}/>
          <button type="submit">🔎</button>
        </form>
        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`menu-dropdown ${menuOpen ? "show" : ""}`}>
          {isProtectedPage ? (
            <button className="logout-btn" onClick={handleLogout}>
              {getText("navbar", "logout")}
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                {getText("navbar", "login")}
              </Link>

              <Link to="/register" onClick={() => setMenuOpen(false)}>
                {getText("navbar", "register")}
              </Link>
              </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
