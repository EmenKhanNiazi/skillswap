import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../cssfiles/signinsignup.css';

function Signin() {
  // State variables for email, password, and error messages
  const [email, setEmail] = useState(''); // Stores the email input
  const [password, setPassword] = useState(''); // Stores the password input
  const [error, setError] = useState(''); // Stores error messages
  const navigate = useNavigate(); // Used for navigation between routes

  const handleSignin = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    try {
      const response = await axios.post(
        'http://localhost:3000/signin',
        { email, password },
        { withCredentials: true } // To handle cookies during the request
      );

      if (response.data.userId) {
        // Store the userId in localStorage for future reference
        localStorage.setItem('userId', response.data.userId);
        // Redirect the user to the profile page after successful login
        navigate('/profile');
      } else {
        setError('Invalid email or password'); // Display error message if login fails
      }
    } catch (error) {
      console.error('Error during sign-in:', error); // Log any error that occurs during login
      setError('An error occurred. Please try again.'); // Display a generic error message
    }
  };

  return (
    <div className='signbody'>
      <div className="signcontainer">
        <div className="logintext">
          <form onSubmit={handleSignin}>
            <h2>Sign In</h2>
            <input
              type="email"
              placeholder="Email"
              value={email} // Controlled input for email
              onChange={(e) => setEmail(e.target.value)} // Updates email state on input change
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password} // Controlled input for password
              onChange={(e) => setPassword(e.target.value)} // Updates password state on input change
            />
            <br />
            <button id="submit">Login</button> {/* Login button */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Conditionally renders error message */}
            <p>Don't have an account?</p>
            <Link to="/signup" style={{ color: 'white' }}>Sign up</Link> {/* Link to signup page */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
