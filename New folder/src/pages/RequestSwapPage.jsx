
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"; // Note: Remove curly braces here.
function RequestSwapPage() {
    const jwtToken = Cookies.get('token');
  console.log('JWT token is:', jwtToken);
  let decodedToken = null;
    const [requesterId, setRequesterId] = useState(""); 
    const [serviceProviderId, setServiceProviderId] = useState(""); 
    const [skill, setSkill] = useState(""); 
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const requestSwap = (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const data = {
            requesterId,
            serviceProviderId,
            skill,
            message,
            timeCreated: new Date().toISOString(), // Automatically sets the timestamp
        };

        axios
            .post("http://localhost:3000/requests", data, { withCredentials: true })
            .then(() => {
                setSuccess("Request submitted successfully!");
                setLoading(false);
                // Reset the form fields after successful submission
                setRequesterId("");
                setServiceProviderId("");
                setSkill("");
                setMessage("");
            })
            .catch(() => {
                setError("Failed to submit the request. Please try again.");
                setLoading(false);
            });
    };

    return (
        <form onSubmit={requestSwap} style={formStyles}>
            <h2>Request a Swap</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <div style={inputContainerStyles}>
                <label>Requester ID:</label>
                <input
                    type="text"
                    value={requesterId}
                    onChange={(e) => setRequesterId(e.target.value)}
                    required
                    style={inputStyles}
                />
            </div>
            <div style={inputContainerStyles}>
                <label>Service Provider ID:</label>
                <input
                    type="text"
                    value={serviceProviderId}
                    onChange={(e) => setServiceProviderId(e.target.value)}
                    required
                    style={inputStyles}
                />
            </div>
            <div style={inputContainerStyles}>
                <label>Skill:</label>
                <input
                    type="text"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    required
                    style={inputStyles}
                />
            </div>
            <div style={inputContainerStyles}>
                <label>Message:</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    style={{ ...inputStyles, height: "100px" }}
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                style={{
                    backgroundColor: loading ? "#ccc" : "#007BFF",
                    color: "#fff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: loading ? "not-allowed" : "pointer",
                }}
            >
                {loading ? "Submitting..." : "Submit Request"}
            </button>
        </form>
    );
}

const formStyles = {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const inputContainerStyles = {
    marginBottom: "15px",
};

const inputStyles = {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    border: "1px solid #ddd",
    borderRadius: "5px",
};

export default RequestSwapPage;

