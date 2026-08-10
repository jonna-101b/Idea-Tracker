import { Avatar, Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { DashboardOutlined, GroupsOutlined, Lightbulb, Logout } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../store';
import { logout } from '../../features/auth/authSlice';
import Button from '../blocks/Button';

const navigation = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: <DashboardOutlined /> },
  { label: 'My Ideas', path: '/ideas', icon: <Lightbulb /> },
  { label: 'User Management', path: '/admin/users', icon: <GroupsOutlined /> },
];

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Box component="aside" sx={{ width: 258, minHeight: 'calc(100vh - 76px)', backgroundColor: '#f4f6fa', borderRight: '1px solid #edf0f5', display: { xs: 'none', md: 'flex' }, flexDirection: 'column', p: 2.25 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1, pb: 4.75 }}>
        <Box sx={{ width: 40, height: 40, borderRadius: 1, display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700, fontSize: 17, backgroundColor: '#5b5be9' }}>W</Box>
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 700, lineHeight: 1.15 }}>Workspace</Typography>
          <Typography sx={{ fontSize: 12, color: '#4e4c5c' }}>Productivity Hub</Typography>
        </Box>
      </Box>

      <List disablePadding sx={{ display: 'grid', gap: 0.75 }}>
        {navigation.map((item) => {
          const selected = location.pathname === item.path;
          return (
            <ListItemButton key={item.path} component={NavLink} to={item.path} selected={selected} sx={{ borderRadius: 1, px: 1.25, minHeight: 45, color: selected ? '#4545d9' : '#50617a', '&.Mui-selected': { backgroundColor: '#e3e5fb' }, '&.Mui-selected:hover': { backgroundColor: '#e3e5fb' } }}>
              <ListItemIcon sx={{ minWidth: 33, color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontSize: 13, fontWeight: selected ? 700 : 500 } } }} />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ mt: 'auto', pt: 4, borderTop: '1px solid #e2e6ed' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, px: 1.25, mb: 2.25 }}>
          <Avatar sx={{ width: 38, height: 38, bgcolor: '#d6d8e8', color: '#25252b', fontSize: 14 }}>{user?.name?.slice(0, 1).toUpperCase()}</Avatar>
          <Box>
            <Typography sx={{ color: '#494855', fontWeight: 700, fontSize: 16, lineHeight: 1.2 }}>{user?.name ?? 'Admin'}</Typography>
            <Typography sx={{ color: '#52617a', fontSize: 14 }}>Admin</Typography>
          </Box>
        </Box>
        <Button fullWidth onClick={() => dispatch(logout())} startIcon={<Logout />} sx={{ minHeight: 45, bgcolor: '#fb777e !important', fontWeight: 700, '&:hover': { bgcolor: '#ed666e !important' } }}>Log out</Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
