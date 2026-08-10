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

  const title = "Sign In"
  const subTitle = "Sign in to your productivity workspace.";
  const alternateText = "Don't have an account?";
  const onSubmit = handleSubmit((values) => dispatch(login(values)));

  return <Auth 
        title={title} 
        subtitle={subTitle} 
        fields={fields} 
        submitLabel={title} 
        alternateText={alternateText} 
        alternateLabel="Sign up" 
        alternateTo="/signup" 
        onSubmit={onSubmit} 
        register={(name) => register(name as keyof LoginFormData)} 
        errors={errors} loading={loading} error={error} 
  />;
};

export default LoginPage;
