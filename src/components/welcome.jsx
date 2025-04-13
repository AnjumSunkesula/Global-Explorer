import { Link } from 'react-router-dom';
import LottieGlobe from './lottieglobe';
function WelcomePage () {
  return(
    <>
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100" >
        <div className="container text-center">
          <div className="d-flex align-items-center justify-content-center flex-wrap">
            <div><LottieGlobe /></div>
            <div className="text-uppercase h1 title">global explorer</div>
          </div>
          <p className="text-capitalize fs-3 mb-5">discover the world, one country at a time.</p>
          <Link to="/login" className="btn-custom mt-2">
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}
export default WelcomePage;