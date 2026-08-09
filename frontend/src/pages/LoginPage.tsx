import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Auth, { type AuthField } from '../components/layouts/auth';
import { login } from '../features/auth/authSlice';
import type { RootState, AppDispatch } from '../store';
import { loginSchema, type LoginFormData } from '../utils/validationSchemas';

const fields: AuthField[] = [
  { name: 'email', label: 'Email Address', placeholder: 'you@example.com', type: 'email' },
  { name: 'password', label: 'Password', placeholder: '••••••••', type: 'password' },
];

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  return <Auth title="Sign In" subtitle="Sign in to your productivity workspace." fields={fields} submitLabel="Sign In" alternateText="Don't have an account?" alternateLabel="Sign up" alternateTo="/signup" onSubmit={handleSubmit((values) => dispatch(login(values)))} register={(name) => register(name as keyof LoginFormData)} errors={errors} loading={loading} error={error} />;
};

export default LoginPage;
