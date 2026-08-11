import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../store/index';
import SessionLoading from '../components/SessionLoading';


const ProtectedRoute = () => {
  const { isAuthenticated, isSessionChecked } = useSelector((state: RootState) => state.auth);

  if (!isSessionChecked) {
    return <SessionLoading />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
