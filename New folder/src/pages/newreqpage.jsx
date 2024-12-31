import React, { useState } from "react";
import axios from "axios";
// import Cookies from "js-cookie";
// import {jwt_decode} from "jwt-decode"; // Correct import for jwt-decode

const RequestSwap = () => {
  // State for form inputs
  const [skillId, setSkillId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle Skill Click (sets skillId and receiverId)
  const handleSkillClick = (clickedSkillId, clickedReceiverId) => {
    setSkillId(clickedSkillId);
    setReceiverId(clickedReceiverId);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get token from cookies
    const jwtToken = Cookies.get("token");

    if (!jwtToken) {
      alert("You must be logged in to request a swap");
      return;
    }

    console.log("JWT token is:", jwtToken);

    let userId = null;

    try {
      // Decode the JWT token
      const decodedToken = jwt_decode(jwtToken);

      console.log("Decoded token:", decodedToken);

      // Extract user ID
      userId = decodedToken.id.toString();
      console.log("User ID:", userId);

      // Use email if ID is not available (optional)
      console.log("Requester Email:", decodedToken.email || "No email found");
    } catch (error) {
      console.error("Invalid JWT token:", error);
      alert("Error decoding token. Please login again.");
      return;
    }

    if (!userId) {
      alert("Error decoding token");
      return;
    }

    // Prepare the data for the request
    const data = {
      skillId,
      userId, // Sender (logged-in user)
      receiverId,
      message,
    };

    try {
      // Make the POST request to send the swap request
      const response = await axios.post(
        "http://localhost:3000/request-swap",
        data,
        { withCredentials: true }
      );

      // Handle success
      if (response.status === 201) {
        console.log("Success:", response.data);
        setSuccess("Swap request sent successfully!");
        setError(null); // Clear any previous error
        // Clear the form
        setSkillId("");
        setReceiverId("");
        setMessage("");
      }
    } catch (error) {
      console.error("Error requesting swap:", error);
      setError(
        error.response?.data?.message || "An error occurred while sending the swap request"
      );
      setSuccess(null); // Clear any previous success
    }
  };

  return (
    <div>
      <h1>Request a Swap</h1>

      {/* List of Skills */}
      <div id="skills-list">
        <div
          className="skill"
          onClick={() => handleSkillClick("123", "456")}
        >
          Skill 1
        </div>
        <div
          className="skill"
          onClick={() => handleSkillClick("124", "789")}
        >
          Skill 2
        </div>
        <div
          className="skill"
          onClick={() => handleSkillClick("125", "101")}
        >
          Skill 3
        </div>
      </div>

      {/* Swap Request Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="skill">Skill ID:</label>
          <input
            type="text"
            id="skill"
            name="skill"
            value={skillId}
            readOnly
            required
          />
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <button type="submit">Request Swap</button>
      </form>

      {/* Display success/error message */}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default RequestSwap;
