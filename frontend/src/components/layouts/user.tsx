import { AdminPanelSettingsOutlined, DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { Avatar, Box, Chip, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import type { User as UserModel } from '../../models/user.model';

interface UserTableProps {
  users: UserModel[];
  onEdit: (user: UserModel) => void;
  onDelete: (user: UserModel) => void;
}

const initials = (name: string) => name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

const UserTable = ({ users, onEdit, onDelete }: UserTableProps) => (
  <Paper elevation={0} sx={{ overflow: 'hidden', border: '1px solid #ececf1', borderRadius: 2, boxShadow: '0 2px 2px rgba(22, 21, 29, 0.08)' }}>
    <Table sx={{ minWidth: 720 }} aria-label="Users">
      <TableHead sx={{ backgroundColor: '#f2f3f6' }}>
        <TableRow>
          <TableCell sx={{ py: 1.65, pl: 2, color: '#41404c', fontSize: 12, letterSpacing: '0.5px', width: '43%' }}>USER INFO</TableCell>
          <TableCell sx={{ py: 1.65, color: '#41404c', fontSize: 12, letterSpacing: '0.5px', width: '23%' }}>ROLE</TableCell>
          <TableCell sx={{ py: 1.65, color: '#41404c', fontSize: 12, letterSpacing: '0.5px', width: '22%' }}>STATUS</TableCell>
          <TableCell align="right" sx={{ py: 1.65, pr: 2, color: '#41404c', fontSize: 12, letterSpacing: '0.5px' }}>ACTIONS</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user._id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
            <TableCell sx={{ py: 2, pl: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar sx={{ width: 40, height: 40, bgcolor: '#e7e8ed', color: '#777786', fontWeight: 600 }}>{initials(user.name)}</Avatar>
                <Box><Typography sx={{ color: '#25242d', fontWeight: 600, fontSize: 18, lineHeight: 1.3 }}>{user.name}</Typography><Typography sx={{ color: '#565563', fontSize: 13 }}>{user.email}</Typography></Box>
              </Box>
            </TableCell>
            <TableCell><Chip icon={user.role === 'admin' ? <AdminPanelSettingsOutlined /> : undefined} label={user.role === 'admin' ? 'Admin' : 'User'} size="small" sx={{ height: 28, color: user.role === 'admin' ? '#4141ce' : '#52617a', bgcolor: user.role === 'admin' ? '#e2e4ff' : '#eff4fb', border: '1px solid #dde5f1', '& .MuiChip-icon': { color: '#4141ce', fontSize: 15 } }} /></TableCell>
            <TableCell><Chip label="Active" size="small" sx={{ height: 28, color: '#00ae85', bgcolor: '#e5f8f1', border: '1px solid #bcebdc' }} /></TableCell>
            <TableCell align="right" sx={{ pr: 2, whiteSpace: 'nowrap' }}>
              <IconButton aria-label={`Edit ${user.name}`} onClick={() => onEdit(user)} sx={{ color: '#52515e' }}><EditOutlined fontSize="small" /></IconButton>
              <IconButton aria-label={`Delete ${user.name}`} onClick={() => onDelete(user)} sx={{ color: '#52515e' }}><DeleteOutlined fontSize="small" /></IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Box sx={{ px: 2, py: 2, borderTop: '1px solid #ececf1', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ fontSize: 13, color: '#3f3e4b' }}>Showing 1 to {users.length} of {users.length} users</Typography>
      <Box sx={{ display: 'flex', gap: 1 }}><IconButton disabled aria-label="Previous page" sx={{ border: '1px solid #dfe1e8', borderRadius: 1, width: 34, height: 34 }}>‹</IconButton><IconButton disabled aria-label="Next page" sx={{ border: '1px solid #dfe1e8', borderRadius: 1, width: 34, height: 34 }}>›</IconButton></Box>
    </Box>
  </Paper>
);

export default UserTable;
