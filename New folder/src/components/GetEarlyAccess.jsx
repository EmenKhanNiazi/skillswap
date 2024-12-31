import '../cssfiles/earlyaccess.css'
const GetEarlyAccess = () => {
    return (
      <div className="early-access">
        <div className="content">
          <h1>Get Early Access</h1>
          <p>Keep up to date with our next upgrades!</p>
          <div className="form">
            <input type="email" placeholder="Your Email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default GetEarlyAccess;
  