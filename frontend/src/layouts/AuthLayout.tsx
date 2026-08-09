import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
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

export default AuthLayout;
