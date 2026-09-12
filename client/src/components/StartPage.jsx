import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function StartPage() {
  const { token, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>
  }

  if (token) {
    return <Navigate to={'/home'} replace />
  }

  return <Navigate to={'/register'} replace />
}

export default StartPage;