import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../cssfiles/profile.css";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/profile", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <div className="sidebar">
        <div className="profile">
          <div className="profile-pic"></div>
          <h5 className="name">{user.name}</h5>
          <p className="email">{user.email}</p>
          <p className="age">{user.age}</p>
        </div>
        <ul className="nav-links">
          <li><Link to="/profile">Home</Link></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><Link to="/viewingmyskills">My Skills</Link></li>
          <li><Link to="/viewingskills">Browse Other Skills</Link></li>
          {/* <li><Link to="">Update Information</Link></li> */}
          {/* <li><Link to="">Delete Account</Link></li> */}
          <li><Link to="/requests">Requests</Link></li>
          <li><Link to="/reqs">View Sent Reqs</Link></li>
          {/* <li><a href="#work" className="nav-link">Work</a></li> */}
          <li><Link to="http://localhost:3000/logout">Logout</Link></li>
        </ul>
      </div>
      <div className="main-content">
        <h1 className="title">{user.bio}</h1>
        <p className="location">Based in {user.location}</p>
        <button className="profbutton" onClick={() => navigate('/skills')}>Add Skills</button>
        <button className="profbutton" onClick={() => navigate('/viewingskills')}>Display Skills</button>
      </div>
    </div>
  );
};

export default Profile;
