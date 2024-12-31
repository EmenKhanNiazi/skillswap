import React from "react";
import { Link } from "react-router-dom";
function Navigation(){
    return(
    <>
     <div class="container">
      <div class="row">
          <div class="col-5">
            <img src="/logo.png" alt="SkillSwap"/>
            </div>
          <div class="col-1">
          <Link to="/aboutus">Aboutus</Link>
            </div>
          <div class="col-1">
          <Link to="/navskills">Skills</Link>
            </div>
          <div class="col-1">
          <Link to="/signin">Sign In</Link>
          </div>
          <div class="col-1">
          <Link to="/signup">Sign Up</Link>
            </div>
          <div class="col-1">
          <Link to="/contactus">Contactus</Link>
            </div>
     
      </div>
  </div>
    </>
    );
}
export default Navigation;

// Use Link instead of <a> tags for navigation in React apps. It prevents the page from refreshing and allows React Router to handle navigation.
// The to prop in Link specifies the path to navigate