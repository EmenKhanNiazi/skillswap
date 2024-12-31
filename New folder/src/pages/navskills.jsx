import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../cssfiles/navskills.css";

const SkillsPage2 = () => {
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleNavigate = () => {
    navigate('/signin'); // Navigating to the Sign In page
  };

  return (
    <div className="skills-container">
      <h1 className="skills-heading">Explore Skills</h1>
      <p className="skills-description">
        Choose from a variety of skills you can request or provide services for. 
        Click on a skill to get started!
      </p>

      <div className="skills-grid">
        <div className="skill-box">Web Development</div>
        <div className="skill-box">Graphic Design</div>
        <div className="skill-box">Digital Marketing</div>
        <div className="skill-box">Content Writing</div>
        <div className="skill-box">Photography</div>
        <div className="skill-box">App Development</div>
      </div>

      <button className="navigate-button" onClick={handleNavigate}>
        Go to Sign In Page
      </button>
    </div>
  );
};

export default SkillsPage2;
