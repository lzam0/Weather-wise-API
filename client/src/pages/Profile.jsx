import ProtectedPages from "../components/ProtectedPages";
import "../styles/Profile.css";
import { Link } from "react-router-dom";
import { getText } from "../utils/contentLoader";

function Profile() {
  return (
    <ProtectedPages>
      {(user) => (
        <div className="profile-page">
          <h1>{getText("profile", "title")}</h1>
          <p><strong>{getText("profile", "name")}:</strong> {user.fname + " " + user.lname}</p>
          <p><strong>{getText("profile", "email")}:</strong> {user.email}</p>
          <p><strong>{getText("profile", "location")}:</strong> {user.location}</p>
          <p><strong>{getText("profile", "unit")}:</strong> {user.unit_preference}</p>
          <p><strong>{getText("profile", "language")}:</strong> {user.language}</p>
          <Link to="/dashboard" className="profile-btn">
						{getText("profile", "returnBtn")}
					</Link>
        </div>
      )}
    </ProtectedPages>
  );
}

// TLDR LOOK INTO USER MODEL TO OBTAIN DETAILS ^^^

export default Profile;
