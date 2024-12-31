import React from "react";
import SkillCard from "./SkillCard";
import "../cssfiles/mainsection2.css";

function Mainsection2(){
    return(
        <>
        <div class="mainsec2">
<h2>Learn something new for free!</h2>
<p>Get a new friend that will manage to help you achieve your goal!</p>
   
          <div className="sec2container">
      <SkillCard
        icon="1.png"
        title="Skill Marketplace"
        description="Browse a diverse catalog of skills and knowledge areas, from cooking and coding to photography and foreign languages. Find what piques your interest."
        link="#"
      />
      <SkillCard
        icon="2.png"
        title="New Interface"
        description="Connect with people who share your passion for learning and teaching. Propose skill swaps, schedule sessions, and get ready to trade knowledge."
      />
      <SkillCard
        icon="3.png"
        title="SkillSwap"
        description="Is all about the joy of learning and sharing. No matter your skill level, you can be a valuable contributor and learner in this vibrant community."
      />
    </div>
    </div>
        </>
    );
}
export default Mainsection2;

