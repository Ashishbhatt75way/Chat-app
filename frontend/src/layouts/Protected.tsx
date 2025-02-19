import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useMeQuery } from '../services/api';

interface ProtectedRouteProps {
  element: ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  allowedRoles,
}) => {
  const { data } = useMeQuery();
  const user = data?.data;
  
  if (!user) return <Navigate to='/login' replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to='/' replace />;

  return <>{element}</>;
};

export default ProtectedRoute;
