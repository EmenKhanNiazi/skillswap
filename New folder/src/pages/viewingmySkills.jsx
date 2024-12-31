import React, { useState, useEffect } from "react";
import axios from "axios";

const MySkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from backend API
    axios.get("http://localhost:3000/myskills", {
        withCredentials: true,
      })
      .then((response) => {
        setSkills(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
    
    <h2>Your Skills Dashboard</h2>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", padding: "55px" }}>
      {skills.map((skill) => (
        <div key={skill.id} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", background: "#f9f9f9" }}>
          <p>{skill.user}</p>  
          <h3>{skill.name}</h3>
          <p>{skill.proficiencyLevel}</p>
          <p>{skill.description}</p>
          {/* <p>{skill.time}</p> */}
          <p><b>Date Added:</b> {new Date(skill.dateAdded).toLocaleDateString()}</p>
          
        </div>
        
      ))}
    </div>
    
    </>
  );
};

export default MySkillsPage;
