import { AdminPanelSettingsOutlined, BoltOutlined, LightbulbOutlined, PeopleOutlined, TrendingUp } from '@mui/icons-material';
import { Avatar, Box, Chip, LinearProgress, Paper, Typography } from '@mui/material';
import type { Idea } from '../../models/idea.model';
import type { User } from '../../models/user.model';

export const StatCard = ({ label, value, icon, accent, footer }: { label: string; value: string; icon: React.ReactNode; accent: string; footer?: React.ReactNode }) => (
  <Paper elevation={0} sx={{ p: 2, minHeight: 140, border: '1px solid #e4e5eb', borderRadius: 1.5, boxShadow: '0 2px 2px rgba(22,21,29,.08)' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}><Typography sx={{ color: '#454451', fontSize: 12, letterSpacing: '.7px', maxWidth: 90 }}>{label}</Typography><Box sx={{ color: accent, display: 'flex' }}>{icon}</Box></Box>
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75, mt: 2.25 }}><Typography sx={{ fontSize: 34, fontWeight: 600, lineHeight: 1 }}>{value}</Typography>{footer}</Box>
  </Paper>
);

const relativeDate = (date: string) => {
  const hours = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 3_600_000));
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  if (hours < 48) return 'Yesterday';
  return `${Math.floor(hours / 24)}d ago`;
};

export const RecentActivity = ({ ideas }: { ideas: Idea[] }) => (
  <Paper elevation={0} sx={{ border: '1px solid #e4e5eb', borderRadius: 1.5, overflow: 'hidden', boxShadow: '0 2px 2px rgba(22,21,29,.08)' }}>
    <Box sx={{ px: 2, py: 2, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e8e8ed' }}><Typography sx={{ fontSize: 18, fontWeight: 600 }}>Recent Activity</Typography><Typography sx={{ color: '#4545d9', fontSize: 13, fontWeight: 500 }}>View All</Typography></Box>
    {ideas.slice(0, 3).map((idea, index) => (
      <Box key={idea._id} sx={{ p: 2.75, display: 'flex', gap: 1.5, borderBottom: index === Math.min(ideas.length, 3) - 1 ? 0 : '1px solid #ececf1' }}>
        <Avatar sx={{ width: 40, height: 40, bgcolor: ['#6264ef', '#d7e6ff', '#c46600'][index], color: index === 1 ? '#5d6c80' : '#fff', fontSize: 14, fontWeight: 700 }}>{typeof idea.owner === 'string' ? 'IT' : idea.owner.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</Avatar>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}><Typography sx={{ color: '#22212a', fontSize: 16 }}><strong>{typeof idea.owner === 'string' ? 'Workspace member' : idea.owner.name}</strong> created a new idea <Box component="span" sx={{ color: '#4545d9' }}>{idea.title}</Box></Typography><Typography sx={{ flexShrink: 0, color: '#4d4c5a', fontSize: 12 }}>{relativeDate(idea.createdAt)}</Typography></Box>
          <Typography sx={{ mt: 1.25, px: 1.5, py: 1.25, borderRadius: 1, bgcolor: '#f2f3f6', border: '1px solid #d9dbe4', color: '#535262', fontSize: 16, lineHeight: 1.5 }}>{idea.description}</Typography>
        </Box>
      </Box>
    ))}
    {!ideas.length && <Typography sx={{ p: 4, color: '#696775', textAlign: 'center' }}>New ideas will appear here.</Typography>}
  </Paper>
);

export const AdminList = ({ users }: { users: User[] }) => (
  <Paper elevation={0} sx={{ p: 2.5, border: '1px solid #e4e5eb', borderRadius: 1.5, boxShadow: '0 2px 2px rgba(22,21,29,.08)' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5, color: '#25242d' }}><AdminPanelSettingsOutlined sx={{ color: '#5b6b82' }} /><Typography sx={{ fontSize: 19, fontWeight: 600 }}>Admins</Typography></Box>
    {users.slice(0, 4).map((user) => <Box key={user._id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 2 }}><Box><Typography sx={{ fontSize: 15, color: '#22212a' }}>{user.name}</Typography><Typography sx={{ fontSize: 12, color: '#575664' }}>{user.email}</Typography></Box><Chip label="Active" size="small" sx={{ color: '#00ae85', bgcolor: '#e5f8f1', border: '1px solid #bcebdc' }} /></Box>)}
    {!users.length && <Typography sx={{ color: '#696775', fontSize: 14 }}>No administrators found.</Typography>}
  </Paper>
);

export const DashboardIcons = { BoltOutlined, LightbulbOutlined, PeopleOutlined, TrendingUp, LinearProgress };
