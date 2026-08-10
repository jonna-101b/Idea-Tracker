import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../store';


const Layout = () => (
  <Box
      component="main"
      sx={{
        minHeight: '100svh',
        display: 'grid',
        placeItems: 'center',
        boxSizing: 'border-box',
        px: 2,
        py: { xs: 4, sm: 7 },
        bgcolor: '#f4f5f8',
      }}
    >
        <Outlet />
    </Box>
);

const AuthLayout = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return isAuthenticated ?  <Navigate to="/ideas" replace /> : <Layout />;
};

export default AuthLayout;
