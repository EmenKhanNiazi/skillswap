import React from "react";
import "../cssfiles/aboutus.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About SkillSwap</h1>
        <p>Your one-stop platform to exchange skills, connect, and grow together!</p>
      </div>
      <div className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            At SkillSwap, we believe that everyone has something unique to offer. Our platform 
            empowers individuals to share their talents, learn new skills, and foster a community 
            of mutual growth.
          </p>
        </div>
        <div className="about-section">
          <h2>How It Works</h2>
          <ul>
            <li>Browse through a wide range of skills offered by users worldwide.</li>
            <li>Request skills that interest you or offer your own in return.</li>
            <li>Connect, learn, and grow together in a skill-sharing ecosystem.</li>
          </ul>
        </div>
        <div className="about-section">
          <h2>Why Choose SkillSwap?</h2>
          <p>
            We offer a user-friendly platform to connect with like-minded individuals, enabling 
            skill-sharing without monetary transactions. It’s all about collaboration, community, 
            and growth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
