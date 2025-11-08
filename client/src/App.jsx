import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import navbar component
import Navbar from "./components/Navbar";

// Import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

// Import protected components (routes and pages)
import ProtectedPages from "./components/ProtectedPages"; 
import ProtectedRoute from "./components/ProtectedRoute"; 



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedPages>
              {(user) => <Dashboard user={user} />}
            </ProtectedPages>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedPages>
              {(user) => <Profile user={user} />}
            </ProtectedPages>
          }
        />

      </Routes>
    </Router>
  );
}

export default App
