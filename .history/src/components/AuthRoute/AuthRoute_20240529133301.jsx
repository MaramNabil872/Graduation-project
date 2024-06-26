import { Navigate, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AuthRoute({ children }) {
  const history = useLocation();
  const { user } = useAuth();
  return user ? (
    children
  ) : (
    <Navigate to={`/login?returnUrl=${location.pathname}`} replace />
  );
}
