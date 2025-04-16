import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; //to avoid string-to-boolean confusion
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;