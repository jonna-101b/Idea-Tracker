import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../store/index';

const AdminRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return user?.role === 'admin' ? <Outlet /> : <Navigate to="/ideas" replace />;
};

export default AdminRoute;
