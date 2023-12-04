import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5001/users");
        if (response.ok) {
          const users = await response.json();
          if (users.length > 0) {
            const currentUser = users[users.length - 1];
            setUserData(currentUser);
          }
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const formatTimestamp = (timestamp) => {
    if (timestamp && !isNaN(timestamp)) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } else {
      return "Invalid Date";
    }
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/Login");
  };

  return (
    <div className="home-container">
      {userData && (
        <div className="home-info-container">
          <p className="home-greeting">Hello, {userData.email}!</p>
          <p className="home-info">Email: {userData.email}!</p>
          {userData.createdAt ? (
            <p className="home-info">
              Login Date: {formatTimestamp(userData.createdAt)}
            </p>
          ) : (
            <p className="home-info">Login Date: Not available</p>
          )}
        </div>
      )}

      <div className="home-links-container">
      <Link to="/Home" className="home-link">Home</Link>
        <Link to="/Notes" className="home-link">Notes</Link>
        <Link to="/Login" className="home-link">Log Out</Link>
      </div>

      {userData && (
        <Link to="/Notes" className="home">Go to Notes</Link>
      )}
    </div>
  );
};

export default Home;
