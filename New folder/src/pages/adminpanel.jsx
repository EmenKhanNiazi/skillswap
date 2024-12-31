import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../cssfiles/adminpage.css";
import { useNavigate, Link } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch skills offered by users
  const fetchSkills = async () => {
    try {
      const response = await axios.get('/skills');
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  // Fetch all registered users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    // Optionally, preload data if needed
    // fetchSkills();
    // fetchUsers();
  }, []);

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <div className="button-container">
     <Link to="/viewingskills">
  <button className="admin-button" >
    View All Registered Skills
  </button>
</Link>
<Link to="/viewusers">
  <button className="admin-button" >
    View All Registered Users
  </button>
</Link>
        {/* <button className="admin-button" onClick={fetchUsers}>
          View All Registered Users
        </button> */}
      </div>
      <div className="content-container">
        {skills.length > 0 && (
          <div>
            <h2>Skills Offered</h2>
            <ul>
              {skills.map(skill => (
                <li key={skill._id}>
                  {skill.name} - {skill.proficiencyLevel}
                </li>
              ))}
            </ul>
          </div>
        )}
        {users.length > 0 && (
          <div>
            <h2>Registered Users</h2>
            <ul>
              {users.map(user => (
                <li key={user._id}>
                  {user.username} - {user.email}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
