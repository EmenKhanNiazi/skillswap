import '../cssfiles/footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
        </div>
        <div className="footer-social">
          <h3>Social</h3>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-instagram"></i> Instagram
          </a>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>info@skill-swap.com</p>
          <p>+1(408)785-9933</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023 SkillSwap All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;




// import React from "react";
// import Cookies from "js-cookie";
// import {jwtDecode} from "jwt-decode"; // Note: Remove curly braces here.

// function Footer() {
//   const jwtToken = Cookies.get('token');
//   console.log('JWT token is:', jwtToken);
//   let decodedToken = null;
  
//   if (jwtToken) {
//     try {
//       decodedToken = jwtDecode(jwtToken);
//       console.log('Decoded token:', decodedToken);
//       console.log(decodedToken.id);

//       // Use email if ID is not available
//       console.log('Requester Email:', decodedToken.email || 'No email found');
//     } catch (error) {
//       console.error("Invalid JWT token:", error);
//     }
//   }

//   return (
//     <>
//       {/* <!-- footer --> */}
//       <div className="footer">
//         <div className="container">
//           <div className="row">
//             <div className="col-3">
//               <img src="/logo.png" alt="SkillSwap" />
//             </div>
//             <div className="col-3">Quick Links</div>
//             <div className="col-3">Social</div>
//             <div className="col-3">Contact Us</div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Footer;
