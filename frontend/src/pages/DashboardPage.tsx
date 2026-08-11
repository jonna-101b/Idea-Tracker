import { BoltOutlined, HealthAndSafetyOutlined, LightbulbOutlined, PeopleOutlined, TrendingUp } from '@mui/icons-material';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/blocks/Button';
import Input from '../components/blocks/Inputs';
import { AdminList, RecentActivity, StatCard } from '../components/layouts/dashboard';
import { fetchUsers } from '../features/admin/adminSlice';
import { createIdea, fetchIdeas } from '../features/ideas/ideaSlice';
import type { AppDispatch, RootState } from '../store';

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const ideas = useSelector((state: RootState) => state.ideas.ideas);
  const users = useSelector((state: RootState) => state.admin.users);
  const [capture, setCapture] = useState({ title: '', description: '' });

  useEffect(() => { dispatch(fetchIdeas()); dispatch(fetchUsers()); }, [dispatch]);
  const admins = useMemo(() => users.filter((member) => member.role === 'admin'), [users]);
  const saveCapture = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!capture.title.trim() || !capture.description.trim()) return;
    dispatch(createIdea({ title: capture.title.trim(), description: capture.description.trim() }));
    setCapture({ title: '', description: '' });
  };

  return (
    <Box sx={{ px: { xs: 3, md: 3 }, py: { xs: 3.5, md: 3 }, maxWidth: 1280, mx: 'auto' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) 320px' }, gap: { xs: 3, lg: 4 }, alignItems: 'start' }}>
        <Box>
          <Box sx={{ mb: 6 }}><Typography component="h1" sx={{ color: '#1b1b22', fontWeight: 700, fontSize: { xs: 30, md: 34 }, letterSpacing: '-1.2px', lineHeight: 1.15 }}>Good morning, {user?.name?.split(' ')[0] ?? 'there'}</Typography><Typography sx={{ mt: 1, color: '#535162', fontSize: 17 }}>Here's what's happening in your workspace today.</Typography></Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 2, mb: 3, '@media (max-width: 760px)': { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' } }}>
            <StatCard label="TOTAL IDEAS" value={String(ideas.length)} icon={<LightbulbOutlined />} accent="#4e50e4" footer={<Typography sx={{ fontSize: 12, color: '#00ad84' }}>↑ Live</Typography>} />
            <StatCard label="TOTAL USERS" value={String(users.length)} icon={<PeopleOutlined />} accent="#d06b00" footer={<Typography sx={{ fontSize: 12, color: '#f2555c' }}>↓ 2</Typography>} />
            <StatCard label="PROJECT HEALTH" value="94%" icon={<HealthAndSafetyOutlined />} accent="#00b485" footer={<LinearProgress variant="determinate" value={94} sx={{ width: 105, height: 6, borderRadius: 3, bgcolor: '#d9f1e9', '& .MuiLinearProgress-bar': { bgcolor: '#15bd91', borderRadius: 3 } }} />} />
            <StatCard label="WEEKLY GROWTH" value="+18%" icon={<TrendingUp />} accent="#00b485" />
          </Box>
          <RecentActivity ideas={ideas} />
        </Box>
        <Box sx={{ pl: { lg: 4 }, borderLeft: { lg: '1px solid #d9dbe5' }, display: 'grid', gap: 3 }}>
          <Box component="form" onSubmit={saveCapture} sx={{ p: 2, borderRadius: 1.75, bgcolor: '#4847d6', color: '#fff' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}><BoltOutlined /><Typography sx={{ fontSize: 19, fontWeight: 700 }}>Quick Capture</Typography></Box>
            <Input placeholder="Title" value={capture.title} onChange={(event) => setCapture({ ...capture, title: event.target.value })} sx={{ mb: 1.5, '& .MuiOutlinedInput-root': { color: '#fff', backgroundColor: 'rgba(255,255,255,.1)', '& fieldset': { borderColor: 'rgba(255,255,255,.22)' } }, '& input::placeholder, & textarea::placeholder': { color: '#c4c7ff', opacity: 1 } }} />
            <Input placeholder="What's your idea?" value={capture.description} onChange={(event) => setCapture({ ...capture, description: event.target.value })} multiline minRows={3} sx={{ mb: 2.5, '& .MuiOutlinedInput-root': { color: '#fff', backgroundColor: 'rgba(255,255,255,.1)', '& fieldset': { borderColor: 'rgba(255,255,255,.22)' } }, '& input::placeholder, & textarea::placeholder': { color: '#c4c7ff', opacity: 1 } }} />
            <Button type="submit" fullWidth variant="secondary" sx={{ minHeight: 42, color: '#4545d9', fontWeight: 600 }}>Save Idea</Button>
          </Box>
          <AdminList users={admins} />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
