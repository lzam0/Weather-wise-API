import ProtectedPages from "../components/ProtectedPages";
import "../styles/Login.css";

function Profile() {
  return (
    <ProtectedPages>
      {(user) => (
        <div className="login">
          <h1>My Profile</h1>
          <p><strong>Name:</strong> {user.full_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Location:</strong> {user.location}</p>
          <p><strong>Preferred Unit:</strong> {user.unit_preference}</p>
          <p><strong>Language:</strong> {user.language}</p>
        </div>
      )}
    </ProtectedPages>
  );
}

export default Profile;
