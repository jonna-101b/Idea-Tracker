import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const SessionLoading = () => (
  <Box
    role="status"
    aria-label="Restoring session"
    sx={{ minHeight: '100svh', display: 'grid', placeItems: 'center' }}
  >
    <CircularProgress />
  </Box>
);

export default SessionLoading;
