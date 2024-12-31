import React from 'react';

const MyRequestsPage = () => {
  const requests = [
    { skill: 'JavaScript', description: 'Looking for a mentor', proficiency: 'Intermediate' },
    { skill: 'Python', description: 'Need help with data analysis', proficiency: 'Beginner' },
    // Add more requests as needed
  ];

  const requestBoxStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    marginBottom: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#218838',
  };

  return (
    <div>
      {requests.map((request, index) => (
        <div key={index} style={requestBoxStyle}>
          <h4><b>Skill:</b> {request.skill}</h4>
          <p><b>Description:</b> {request.description || 'No description provided.'}</p>
          <p><b>Proficient in:</b> {request.proficiency || 'N/A'}</p>
        
        </div>
      ))}
    </div>
  );
};

export default MyRequestsPage;
