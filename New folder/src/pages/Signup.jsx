import React, { useState } from 'react';
import '../cssfiles/signinsignup.css';

function Signup() {
  const [skills, setSkills] = useState(''); // Single input field for skills
  const [skillsList, setSkillsList] = useState([]); // Array to hold added skills

  const handleAddSkill = (e) => {
    e.preventDefault(); // Prevent page reload
    if (skills.trim()) {
      setSkillsList([...skillsList, skills.trim()]); // Add new skill to the list
      setSkills(''); // Clear the input field
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkillsList(skillsList.filter((skill) => skill !== skillToRemove)); // Remove skill
  };

  return (
    <div className='signbody'>
      <div className="signcontainer">
        <div className="logintext" id="registerheight">
          <form method="post" action="http://localhost:3000/signup">
            <h2>Register Yourself!</h2>
            <input type="text" placeholder="username" name="username" required />
            <br />
            <input type="email" placeholder="email" name="email" required />
            <br />
            <input type="number" placeholder="age" name="age" />
            <br />
            <input type="password" placeholder="password" name="password" required />
            <br />
            <input type="text" placeholder="location" name="location" />
            <br />



            <input type="text" placeholder="bio" name="bio" required />
            <br />
            <button id="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
