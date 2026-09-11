import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Register from '../pages/Register';

function StartPage() {
  const { token, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>
  }

  if (token) {
    return <Navigate to={'/home'} replace />
  }

  return <Register />
}

export default StartPage;