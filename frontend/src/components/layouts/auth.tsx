import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Button from '../blocks/Button';
import Input from '../blocks/Inputs';

export interface AuthField {
  name: 'name' | 'email' | 'password';
  label: string;
  placeholder: string;
  type?: 'text' | 'email' | 'password';
}

interface AuthProps {
  title: string;
  subtitle: string;
  fields: AuthField[];
  submitLabel: string;
  alternateText: string;
  alternateLabel: string;
  alternateTo: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  register: (name: AuthField['name']) => Record<string, unknown>;
  errors: Partial<Record<AuthField['name'], { message?: string }>>;
  loading?: boolean;
  error?: string | null;
}

const Auth = ({
  title,
  subtitle,
  fields,
  submitLabel,
  alternateText,
  alternateLabel,
  alternateTo,
  onSubmit,
  register,
  errors,
  loading = false,
  error,
}: AuthProps) => (
  <Box sx={{ width: '100%', maxWidth: 446, textAlign: 'center' }}>
    <Typography component="h1" sx={{ color: '#4545d9', fontSize: 32, fontWeight: 700, lineHeight: 1.2, mb: 0.75 }}>
      Idea Tracker
    </Typography>
    <Typography sx={{ color: '#4d4b5b', fontSize: 16, mb: 3.5 }}>{subtitle}</Typography>

    <Box
      component="form"
      noValidate
      onSubmit={onSubmit}
      sx={{ bgcolor: '#ffffff', borderRadius: '14px', boxShadow: '0 18px 26px rgba(27, 31, 48, 0.14)', p: 4 }}
    >
      <Stack spacing={2.25}>
        {fields.map((field) => {
          const isPassword = field.name === 'password';
          const isEmail = field.name === 'email';
          return (
            <Box key={field.name} sx={{ textAlign: 'left' }}>
              <Typography component="label" htmlFor={field.name} sx={{ display: 'block', color: '#16151d', fontSize: 13, fontWeight: 500, mb: 0.75 }}>
                {field.label}
                {isPassword && title === 'Sign In' && (
                  <Link component={RouterLink} to="/forgot-password" underline="none" sx={{ float: 'right', color: '#4545d9', fontSize: 13 }}>
                    Forgot password?
                  </Link>
                )}
              </Typography>
              <Input
                id={field.name}
                type={field.type ?? 'text'}
                placeholder={field.placeholder}
                error={Boolean(errors[field.name])}
                helperText={errors[field.name]?.message}
                slotProps={{
                  input: {
                    startAdornment: (isEmail || isPassword) ? (
                      <InputAdornment position="start">
                        {isEmail ? <EmailOutlinedIcon fontSize="small" /> : <LockOutlinedIcon fontSize="small" />}
                      </InputAdornment>
                    ) : undefined,
                  },
                }}
                {...register(field.name)}
              />
            </Box>
          );
        })}

        {error && <Alert severity="error">{error}</Alert>}

        <Button type="submit" disabled={loading} fullWidth endIcon={<ArrowForwardIcon />} sx={{ mt: 0.25 }}>
          {loading ? 'Please wait…' : submitLabel}
        </Button>

        <Stack direction="row" spacing={1.5} sx={{ pt: 0.75, alignItems: 'center' }}>
          <Divider sx={{ flex: 1 }} />
          <Typography sx={{ color: '#6e6b80', fontSize: 13, whiteSpace: 'nowrap' }}>or continue with</Typography>
          <Divider sx={{ flex: 1 }} />
        </Stack>

        <Stack direction="row" spacing={1.5}>
          <Button type="button" variant="secondary" fullWidth sx={{ minHeight: 44, fontSize: 13 }}>Google</Button>
          <Button type="button" variant="secondary" fullWidth sx={{ minHeight: 44, fontSize: 13 }}>Facebook</Button>
        </Stack>
      </Stack>
    </Box>

    <Typography sx={{ color: '#4d4b5b', fontSize: 16, mt: 3 }}>
      {alternateText}{' '}
      <Link component={RouterLink} to={alternateTo} underline="none" sx={{ color: '#4545d9', fontWeight: 500 }}>
        {alternateLabel}
      </Link>
    </Typography>
  </Box>
);

export default Auth;
