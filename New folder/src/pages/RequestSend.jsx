
import React, { useState } from "react";
import axios from "axios";

function RequestsPage() {
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

export default RequestsPage;


// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import {jwtDecode} from 'jwt-decode'; // Corrected import

// const RequestSend = () => {
//     const jwtToken = Cookies.get("token"); // Get the JWT token from cookies
//     const [formData, setFormData] = useState({
//         requester: '', // This will be automatically filled with the user ID from the token
//         serviceProvider: '', // This is an editable field
//         skill: '', // This is an editable field
//         message: '', // This is an editable field
//         status: 'pending', // Default status
//     });
//     const [decodedToken, setDecodedToken] = useState(null); // State to store the decoded token
//     const [loading, setLoading] = useState(true); // To handle loading state
//     const [error, setError] = useState(''); // To store errors

//     const { state } = useLocation(); // Get the state from useLocation
//     const { skill, serviceProviderId } = state || {}; // Destructure state with fallback

//     useEffect(() => {
//         console.log("JWT Token: ", jwtToken); // Log the token for debugging
//         if (jwtToken) {
//             try {
//                 const token = jwtDecode(jwtToken); // Decode the JWT token
//                 console.log("Decoded Token: ", token); // Log the decoded token for debugging
//                 setDecodedToken(token); // Store the decoded token
//                 setFormData((prev) => ({
//                     ...prev,
//                     requester: token.id || '', // Automatically set the requester ID from the token
//                     serviceProvider: serviceProviderId || '', // Pre-fill service provider if available in state
//                     skill: skill?.name || '', // Pre-fill skill if available in state
//                 }));
//                 setLoading(false); // Stop loading after processing
//             } catch (error) {
//                 console.error("Error decoding token:", error);
//                 setError("Invalid JWT token");
//                 setLoading(false);
//             }
//         } else {
//             setError("No JWT token found");
//             setLoading(false);
//         }
//     }, [jwtToken, serviceProviderId, skill]); // Only re-run effect when jwtToken, serviceProviderId or skill changes

//     const handleSubmit = async () => {
//         try {
//             const response = await fetch('/api/swap-request', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to submit request.');
//             }
//             alert('Request submitted successfully!');
//         } catch (error) {
//             alert(error.message);
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>; // Display error message if any
//     }

//     return (
//         <form>
//             {/* Form fields */}
//             <input
//                 type="text"
//                 value={formData.requester}
//                 readOnly
//                 placeholder="Requester ID"
//             />
//             <input
//                 type="text"
//                 value={formData.serviceProvider}
//                 placeholder="Service Provider ID"
//                 onChange={(e) => setFormData({ ...formData, serviceProvider: e.target.value })}
//             />
//             <input
//                 type="text"
//                 value={formData.skill}
//                 placeholder="Skill"
//                 onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
//             />
//             <textarea
//                 value={formData.message}
//                 placeholder="Message"
//                 onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//             />
//             <button type="button" onClick={handleSubmit}>
//                 Submit Request
//             </button>
//         </form>
//     );
// };

// export default RequestSend;

