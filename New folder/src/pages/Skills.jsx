import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../cssfiles/skills.css";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [description, setDescription] = useState("");
  // const [time, setTime]=useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/skills", {
          withCredentials: true,
        });
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills data:", error);
      }
    };
    fetchSkillsData();
  }, []);

  const addSkill = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const userId=localStorage.getItem('userId');
    if(!userId){ 
      navigate('/signin'); // Redirect to sign-in if no userId is found
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/skills",
        { name, proficiencyLevel: proficiency, description, userId },
        { withCredentials: true }
      );
      setSkills([...skills, response.data]);
      setName("");
      setProficiency("");
      setDescription("");
      // setTime("");
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  return (
    <div className="skills-container">
      <h2>Skills</h2>
      <form onSubmit={addSkill} className="skills-form">
        <input
          type="text"
          placeholder="Skill Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          value={proficiency}
          onChange={(e) => setProficiency(e.target.value)}
        >
          <option value="">Select Proficiency</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* <input
          type="text"
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        /> */}
        <button type="submit">Add Skill</button>
      </form>
      <div className="skills-list">
        {skills.map((skill, index) => (
          <div key={index} className="skill-box">
            <h4>{skill.name}</h4>
            <p>Proficiency: {skill.proficiencyLevel}</p>
            {skill.description && <p>{skill.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;














// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../cssfiles/skills.css";

// const Skills = () => {
//   const [skills, setSkills] = useState([]);
//   const [name, setName] = useState("");
//   const [proficiency, setProficiency] = useState("");
//   const [description, setDescription] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSkillsData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/skills", {
//           withCredentials: true,
//         });
//         setSkills(response.data);
//       } catch (error) {
//         console.error("Error fetching skills data:", error);
//       }
//     };
//     fetchSkillsData();
//   }, []);

//   const addSkill = async () => {
//     try {
//       const response = await axios.post("http://localhost:3000/skills", {
//         name,
//         proficiencyLevel: proficiency,
//         description,
//       }, {
//         withCredentials: true,
//       });
//       setSkills([...skills, response.data]);
//       setName("");
//       setProficiency("");
//       setDescription("");
//     } catch (error) {
//       console.error("Error adding skill:", error);
//     }
//   };

//   return (
//     <form method="post" action="http://localhost:3000/skills">
//     <div className="skills-container">
//       <h2>Skills</h2>
//       <div className="skills-form">
//         <input
//           type="text"
//           placeholder="Skill Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <select
//           value={proficiency}
//           onChange={(e) => setProficiency(e.target.value)}
//         >
//           <option value="">Select Proficiency</option>
//           <option value="Beginner">Beginner</option>
//           <option value="Intermediate">Intermediate</option>
//           <option value="Advanced">Advanced</option>
//         </select>
//         <input
//           type="text"
//           placeholder="Description (optional)"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <button onClick={addSkill}>Add Skill</button>
//       </div>
//       <div className="skills-list">
//         {skills.map((skill, index) => (
//           <div key={index} className="skill-box">
//             <h4>{skill.name}</h4>
//             <p>Proficiency: {skill.proficiencyLevel}</p>
//             {skill.description && <p>{skill.description}</p>}
//           </div>
//         ))}
//       </div>
//     </div>
//     </form>
//   );
// };

// export default Skills;

//purana
// import React from "react";
// import { useEffect, useState } from "react";
// import '../cssfiles/skills.css';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Skills(){
//     const[skills,setSkills]=useState();
//     const[name, setName]=useState();
//     const[proficiency,setProficiency]= useState();
//     const[description, setDescription]= useState();
//     const navigate=useNavigate();
    
    
     
       
    
    
    
    
//     useEffect(()=>{
//         const fetchUserData = async() =>{
//             try{
//                 const response=await axios.get("http://localhost:3000/profile")
//                 console.log(response.data);
//                 setUser(response.data);

//             }
//             catch(error){
//                 console.error("error fetching user data: ", error)
//             }
//         };
//         const fetchSkillsData= async()=>{
//             try{
//                 const response=await axios.get("http://localhost:3000/skills")
//                 console.log(response.data);
//                 setSkills(response.data);

//             }
//             catch(error){
//                 console.error("error fetching user data: ", error)
//             }
//         };
//         fetchUserData();
//         fetchSkillsData();
//     });
//     return(
//     <>
//     <div className="skills-container">
//             <h2>Skills</h2>
//             <div className="skills-form">
//                 <input
//                     type="text"
//                     placeholder="Skill Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//                 <select
//                     value={proficiencyLevel}
//                     onChange={(e) =>
//                         setProficiency(e.target.value)
//                     }
//                 >
//                     <option value="Beginner">Beginner</option>
//                     <option value="Intermediate">Intermediate</option>
//                     <option value="Advanced">Advanced</option>
//                 </select>
//                 <input
//                     type="text"
//                     placeholder="Description (optional)"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                 />
//                 <button onClick={addSkill}>Add Skill</button>
//             </div>
//             <div className="skills-list">
//                 {skills.map((skill, index) => (
//                     <div key={index} className="skill-box">
//                         <h4>{skill.name}</h4>
//                         <p>Proficiency: {skill.proficiencyLevel}</p>
//                         {skill.description && <p>{skill.description}</p>}
//                     </div>
//                 ))}
//             </div>
//         </div>

//     </>
//     );
// }

// export default Skills