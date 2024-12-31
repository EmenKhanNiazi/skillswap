import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewReceivedRequests = ({ user }) => {
  const [receivedRequests, setReceivedRequests] = useState([]);

  useEffect(() => {
    const fetchReceivedRequests = async () => {
      try {
        const response = await axios.get(`/api/requests/received/${user.id}`);
        setReceivedRequests(response.data);
      } catch (error) {
        console.error('Error fetching received requests:', error);
      }
    };
    fetchReceivedRequests();
  }, [user.id]);

  return (
    <div>
      <h1>Received Swap Requests</h1>
      {receivedRequests.map((request) => (
        <div key={request._id}>
          <p>Skill: {request.skillId.name}</p>
          <p>Exchange Offer: {request.exchangeMessage}</p>
          <p>Request Message: {request.requestMessage}</p>
          <p>Status: {request.status}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewReceivedRequests;
