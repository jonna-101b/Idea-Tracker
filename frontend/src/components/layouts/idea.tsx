import { AccessTimeOutlined, DeleteOutlined } from '@mui/icons-material';
import { Box, Chip, IconButton, Paper, Typography } from '@mui/material';
import type { Idea as IdeaModel } from '../../models/idea.model';

interface IdeaProps {
    idea: IdeaModel;
    onDelete: (id: string) => void;
}

const tagStyles: Record<string, { backgroundColor: string; color: string }> = {
    product: { backgroundColor: '#e0e2ff', color: '#6972f8' },
    design: { backgroundColor: '#eaf0fb', color: '#55647c' },
    marketing: { backgroundColor: '#fff1d9', color: '#f39a00' },
    research: { backgroundColor: '#d7f5eb', color: '#00af85' },
    'high priority': { backgroundColor: '#f7e5cf', color: '#a64d00' },
    draft: { backgroundColor: '#e8e9ef', color: '#52535e' },
};

const getRelativeDate = (date: string) => {
    const elapsed = Date.now() - new Date(date).getTime();
    const days = Math.floor(elapsed / 86_400_000);
    if (days <= 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 14) return 'Last week';
    return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(date));
};

const Idea = ({ idea, onDelete }: IdeaProps) => (
    <Paper elevation={0} sx={{ minHeight: 260, p: 3, border: '1px solid #ececf1', borderRadius: 2, boxShadow: '0 2px 2px rgba(22, 21, 29, 0.08)', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          {idea.tags?.slice(0, 2).map((tag) => <Chip key={tag} label={tag} size="small" sx={{ height: 24, px: 0.25, fontSize: 13, textTransform: 'capitalize', ...tagStyles[tag.toLowerCase()] }} />)}
        </Box>
        <Typography component="h2" sx={{ fontSize: 18, lineHeight: 1.35, fontWeight: 500, color: '#181720', mb: 1.25 }}>{idea.title}
        </Typography>
        <Typography sx={{ color: '#535162', fontSize: 16, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{idea.description}
        </Typography>
        <Box sx={{ mt: 'auto', pt: 1.75, borderTop: '1px solid #e7e7ec', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#4d4c59' }}><AccessTimeOutlined sx={{ fontSize: 16 }} />
                <Typography sx={{ fontSize: 13 }}>{getRelativeDate(idea.createdAt)}</Typography>
            </Box>
            <IconButton aria-label={`Delete ${idea.title}`} onClick={() => onDelete(idea._id)} size="small" sx={{ color: '#4d4c59' }}>
            <DeleteOutlined fontSize="small" /></IconButton>
        </Box>
    </Paper>
);

export default Idea;
