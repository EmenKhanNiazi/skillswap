import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import * as jwt_decode from "jwt-decode";

import "../cssfiles/viewingskills.css";


const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Assuming the token is stored in localStorage after login
  const token = localStorage.getItem("token"); // Replace with your token storage logic

  // Decode the token to extract the logged-in user's ID
  let loggedInUserId = null;
  if (token) {
    const decodedToken = jwt_decode.default(token); // Access default export

    loggedInUserId = decodedToken.userId; // Assuming the user ID is stored in the 'userId' field
  }

  useEffect(() => {
    // Fetch data from backend API
    axios
      .get("http://localhost:3000/skills") // Replace with your backend route for fetching skills
      .then((response) => {
        setSkills(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleRequestSwap = async (skill) => {
    try {
      // Make the API call to request a swap
      const response = await axios.post("http://localhost:3000/request-swap", {
        requesterId: loggedInUserId, // Logged-in user's ID
        skill: {
          offeredBy: skill.user,
          proficiency: skill.proficiencyLevel,
          description: skill.description,
          skillName: skill.name,
        },
      });

      // Display a success message or redirect to another page
      alert(response.data || "Swap request sent successfully!");
    } catch (error) {
      console.error("Error requesting swap:", error);
      alert("sent swap request. ");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="skills-grid">
      {skills.map((skill) => (
        <div className="skill-card" key={skill.id}>
          <p>
            <b>Offered by:</b> {skill.user}
          </p>
          <h3>{skill.name}</h3>
          <p>
            <b>Proficiency:</b> {skill.proficiencyLevel}
          </p>
          {/* <p>
            <b>Time:</b> {skill.time}
          </p> */}
          <p>{skill.description}</p>
          <p>
            <b>Date Added:</b> {new Date(skill.dateAdded).toLocaleDateString()}
          </p>
          <button
            className="cta-button"
            onClick={() => handleRequestSwap(skill)}
          >
            Request a Swap
          </button>
        </div>
      ))}
    </div>
  );
};

export default SkillsPage;
