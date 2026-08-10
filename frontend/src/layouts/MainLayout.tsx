import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import Header from '../components/layouts/header';
import Sidebar from '../components/layouts/sidebar';

const MainLayout = () => {
  const isAdmin = useSelector((state: RootState) => state.auth.user?.role === 'admin');

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fc' }}>
      <Header isAdmin={isAdmin} />
      <Box sx={{ display: 'flex' }}>
        {isAdmin && <Sidebar />}
        <Box component="main" sx={{ flex: 1, minWidth: 0 }}><Outlet /></Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
