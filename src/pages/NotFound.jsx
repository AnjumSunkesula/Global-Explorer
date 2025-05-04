import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/home" className="back-to-home">
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;
