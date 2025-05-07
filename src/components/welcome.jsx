import { Link } from 'react-router-dom';
function WelcomePage () {
  return(
    <>
      <div className="d-flex flex-column justify-content-center min-vh-100 position-relative z-1" >
        <video src="/Vdo.mp4" loop autoPlay muted></video>
        <div className='text'>
          <div className="title position-absolute top-0 text-uppercase">global explorer</div>
          <div className='text-uppercase captions'>
            <div className='cap1'>never stop</div>
            <div className='cap2'>exploring the world</div>
          </div>
          <div className='para'>
            <p>From national flags to fascinating details about currencies, population, and languages, Global Explorer is your gateway to understanding every country. Discover unique facts, learn about different regions, and explore the world, one country at a time.</p>
          </div>
          <Link to="/login" className="btn-custom mt-2">
            Explore
          </Link>
        </div>
      </div>
    </>
  );
}
export default WelcomePage;