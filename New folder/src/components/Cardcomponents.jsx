import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import '../cssfiles/cardcomponents.css';

function Cardcomponents() {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <>
      <div className="gt">
        <div className="containercards">
          <div className="card">
            <img className="background" src="/gr.jpg" alt="Mobile" />
            <div className="card-content">
              <h3 className="title">Graphic Design</h3>
              <p className="description">Enhance your design skills with a professional designer.</p>
              <button className="cta-button" onClick={() => navigate('/signin')}>Propose a Swap</button>
            </div>
          </div>

          <div className="card">
            <img className="background" src="/22.jpg" alt="Laptop" />
            <div className="card-content">
              <h3 className="title">Programming Tutoring</h3>
              <p className="description">Learn coding from experienced developers.</p>
              <button className="cta-button" onClick={() => navigate('/signin')}>Propose a Swap</button>
            </div>
          </div>

          <div className="card">
            <img className="background" src="/t2.jpg" alt="iPads" />
            <div className="card-content">
              <h3 className="title">Language Lessons</h3>
              <p className="description">Improve your fluency with expert tutors.</p>
              <button className="cta-button" onClick={() => navigate('/signin')}>Propose a Swap</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cardcomponents;
