import { Add, Search } from '@mui/icons-material';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Typography } from '@mui/material';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { createIdea, deleteIdea, fetchIdeas } from '../features/ideas/ideaSlice';
import Button from '../components/blocks/Button';
import Input from '../components/blocks/Inputs';
import Idea from '../components/layouts/idea';

const IdeasPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ideas, loading, error } = useSelector((state: RootState) => state.ideas);
  const [query, setQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', tags: '' });

  useEffect(() => { dispatch(fetchIdeas()); }, [dispatch]);

  const filteredIdeas = useMemo(() => ideas.filter((idea) => `${idea.title} ${idea.description} ${idea.tags?.join(' ') ?? ''}`.toLowerCase().includes(query.toLowerCase())), [ideas, query]);

  const handleCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;
    dispatch(createIdea({ title: form.title.trim(), description: form.description.trim(), tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean) }));
    setForm({ title: '', description: '', tags: '' });
    setDialogOpen(false);
  };

  return (
    <Box sx={{ px: { xs: 3, md: 3 }, py: { xs: 3.5, md: 3 }, maxWidth: 1280, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, mb: 4.25 }}>
        <Box>
          <Typography component="h1" sx={{ color: '#1b1b22', fontWeight: 700, fontSize: { xs: 30, md: 34 }, letterSpacing: '-1.2px', lineHeight: 1.15 }}>My Ideas</Typography>
          <Typography sx={{ mt: 0.5, color: '#535162', fontSize: { xs: 15, md: 17 } }}>Manage and organize your captured thoughts.</Typography>
        </Box>
        <Button onClick={() => setDialogOpen(true)} startIcon={<Add />} sx={{ minHeight: 42, px: 2.5, fontSize: 14, whiteSpace: 'nowrap' }}>Create New Idea</Button>
      </Box>
      <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search ideas..." slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search /></InputAdornment> } }} sx={{ width: 256, mb: 4 }} />
      {error && <Typography sx={{ color: '#d32f2f', mb: 2 }}>{error}</Typography>}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 3 }}>
        {filteredIdeas.map((idea) => <Idea key={idea._id} idea={idea} onDelete={(id) => dispatch(deleteIdea(id))} />)}
      </Box>
      {!loading && filteredIdeas.length === 0 && <Typography sx={{ color: '#6a6876', textAlign: 'center', py: 8 }}>No ideas found.</Typography>}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm" slotProps={{ paper: { sx: { borderRadius: 2 } } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Create New Idea</DialogTitle>
        <Box component="form" onSubmit={handleCreate}>
          <DialogContent sx={{ display: 'grid', gap: 2, pt: '12px !important' }}>
            <Input autoFocus label="Title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
            <Input label="Description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} multiline minRows={4} required />
            <Input label="Tags" value={form.tags} onChange={(event) => setForm({ ...form, tags: event.target.value })} helperText="Separate tags with commas" />
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}><Button variant="secondary" onClick={() => setDialogOpen(false)} sx={{ minHeight: 40 }}>Cancel</Button><Button type="submit" sx={{ minHeight: 40 }}>Create Idea</Button></DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default IdeasPage;
