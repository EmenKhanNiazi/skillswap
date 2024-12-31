import React from "react";

function SkillCard({ icon, title, description, link }) {
  return (
    <div className="card2">
      <div className="icon">
        <img src={icon} alt={`${title} Icon`} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {link && <a href={link} className="read-more">Read More</a>}
    </div>
  );
}

export default SkillCard;
