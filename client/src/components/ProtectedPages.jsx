import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getText } from "../utils/contentLoader";

function ProtectedPages({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
    async function fetchUser() {
        try {
            const res = await fetch("http://localhost:5000/api/profile", {
                method: "GET",
            credentials: "include",
        });
        
        if (res.status === 401) {
            // Not authorised then redirect to login
            navigate("/");
            return
        } else {
            const data = await res.json();
            setUser(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, [navigate]);
  
  if (!user) return <p>{getText("protectedPages", "loadingPar")}</p>;

  return <div>{children(user)}</div>; // pass user to children as function
}

export default ProtectedPages;