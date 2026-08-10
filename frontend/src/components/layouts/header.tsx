import { Avatar, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

interface HeaderProps {
  isAdmin?: boolean;
}

const Header = ({ isAdmin = false }: HeaderProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const initials = user?.name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Box
      component="header"
      sx={{
        height: 76,
        px: { xs: 3, md: 11.5 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #ebeaf1',
        backgroundColor: '#f9fafc',
      }}
    >
      <Typography sx={{ color: '#4545d9', fontSize: 25, fontWeight: 700, letterSpacing: '-0.7px' }}>
        Idea Tracker
      </Typography>

      {!isAdmin && user && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, px: 1.25, py: 0.9, borderRadius: 1.5, backgroundColor: '#e0e2ff', color: '#3030b7' }}>
          <Avatar sx={{ width: 34, height: 34, fontSize: 13, color: '#25252b', backgroundColor: '#d6d8e8', border: '2px solid #fff' }}>
            {initials}
          </Avatar>
          <Typography sx={{ fontWeight: 700, fontSize: 16 }}>{user.name}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Header;
