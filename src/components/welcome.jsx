import { Link } from 'react-router-dom';

function WelcomePage () {
  return(
    <>
      <div className="d-flex flex-column bg-warning">
        
        <h1>🌍 Country Info Explorer</h1>
          <p>Discover the world, one country at a time.</p>
          <Link to="/login">
            Get Started
          </Link>
      </div>
    </>
  );
}
export default WelcomePage;