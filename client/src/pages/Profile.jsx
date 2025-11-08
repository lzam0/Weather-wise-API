import ProtectedPages from "../components/ProtectedPages";
import "../styles/Profile.css";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <ProtectedPages>
      {(user) => (
        <div className="profile-page">
          <h1>My Profile</h1>
          <p><strong>Name:</strong> {user.fname + " " + user.lname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Location:</strong> {user.location}</p>
          <p><strong>Preferred Unit:</strong> {user.unit_preference}</p>
          <p><strong>Language:</strong> {user.language}</p>
          <Link to="/dashboard" className="profile-btn">
						Return to Dashboard
					</Link>
        </div>
      )}
    </ProtectedPages>
  );
}

// TLDR LOOK INTO USER MODEL TO OBTAIN DETAILS ^^^

export default Profile;
