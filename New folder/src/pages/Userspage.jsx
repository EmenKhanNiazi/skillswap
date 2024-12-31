import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../cssfiles/viewusers.css";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users and their associated skills
    axios
      .get("http://localhost:3000/users") // Adjust the API URL if needed
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to navigate to the user profile or other page
  const handleUserProfile = (userId) => {
    navigate(`/profile/${userId}`); // Navigate to a user profile page
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="users-grid">
      {users.map((user) => (
        <div className="user-card" key={user._id}>
          <h3>{user.username}</h3>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Age:</b> {user.age}</p>
          <p><b>Location:</b> {user.location}</p>
          <p><b>Bio:</b> {user.bio || "No bio available"}</p>
          <p><b>Skills:</b></p>
          <ul>
            {user.skills.map((skill) => (
              <li key={skill._id}>{skill.name}</li> // Display associated skills
            ))}
          </ul>
          <button
            className="cta-button"
            onClick={() => handleUserProfile(user._id)} // Navigate to user profile page
          >
            View Profile
          </button>
        </div>
      ))}
    </div>
  );
};

export default UsersPage;
