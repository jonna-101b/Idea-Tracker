import { GroupAddOutlined, Search } from '@mui/icons-material';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, MenuItem, Typography } from '@mui/material';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/blocks/Button';
import Input from '../components/blocks/Inputs';
import UserTable from '../components/layouts/user';
import { deleteUser, fetchUsers, updateUser } from '../features/admin/adminSlice';
import type { User } from '../models/user.model';
import type { AppDispatch, RootState } from '../store';

const UserManagementPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.admin);
  const [query, setQuery] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [draft, setDraft] = useState({ name: '', email: '', role: 'user' as User['role'] });

  useEffect(() => { dispatch(fetchUsers()); }, [dispatch]);

  const displayedUsers = useMemo(() => users.filter((user) => `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(query.toLowerCase())), [query, users]);
  const beginEdit = (user: User) => { setEditingUser(user); setDraft({ name: user.name, email: user.email, role: user.role }); };
  const submitEdit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingUser || !draft.name.trim() || !draft.email.trim()) return;
    dispatch(updateUser({ _id: editingUser._id, name: draft.name.trim(), email: draft.email.trim(), role: draft.role }));
    setEditingUser(null);
  };

  return (
    <Box sx={{ px: { xs: 3, md: 3 }, py: { xs: 3.5, md: 3 }, maxWidth: 1280, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, mb: 4.25 }}>
        <Box><Typography component="h1" sx={{ color: '#1b1b22', fontWeight: 700, fontSize: { xs: 30, md: 34 }, letterSpacing: '-1.2px', lineHeight: 1.15 }}>User Management</Typography><Typography sx={{ mt: 0.75, color: '#535162', fontSize: { xs: 15, md: 17 } }}>Manage roles, permissions, and account status across the organization.</Typography></Box>
        <Button startIcon={<GroupAddOutlined />} sx={{ minHeight: 42, px: 2.5, fontSize: 14, whiteSpace: 'nowrap' }} disabled title="Inviting users is not available until an invitation endpoint is added.">Invite User</Button>
      </Box>
      <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search users..." slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search /></InputAdornment> } }} sx={{ width: 256, mb: 4 }} />
      {error && <Typography sx={{ color: '#d32f2f', mb: 2 }}>{error}</Typography>}
      <Box sx={{ overflowX: 'auto' }}><UserTable users={displayedUsers} onEdit={beginEdit} onDelete={(user) => dispatch(deleteUser(user._id))} /></Box>
      {!loading && displayedUsers.length === 0 && <Typography sx={{ color: '#6a6876', textAlign: 'center', py: 6 }}>No users found.</Typography>}

      <Dialog open={Boolean(editingUser)} onClose={() => setEditingUser(null)} fullWidth maxWidth="sm" slotProps={{ paper: { sx: { borderRadius: 2 } } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Edit User</DialogTitle>
        <Box component="form" onSubmit={submitEdit}>
          <DialogContent sx={{ display: 'grid', gap: 2, pt: '12px !important' }}>
            <Input label="Name" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} required />
            <Input label="Email" type="email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} required />
            <Input select label="Role" value={draft.role} onChange={(event) => setDraft({ ...draft, role: event.target.value as User['role'] })}><MenuItem value="user">User</MenuItem><MenuItem value="admin">Admin</MenuItem></Input>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}><Button variant="secondary" onClick={() => setEditingUser(null)} sx={{ minHeight: 40 }}>Cancel</Button><Button type="submit" sx={{ minHeight: 40 }}>Save changes</Button></DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UserManagementPage;
