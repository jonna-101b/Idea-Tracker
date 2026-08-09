import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Auth, { type AuthField } from '../components/layouts/auth';
import { signup } from '../features/auth/authSlice';
import type { RootState, AppDispatch } from '../store';
import { signupSchema, type SignupFormData } from '../utils/validationSchemas';

const fields: AuthField[] = [
  { name: 'name', label: 'Name', placeholder: 'Jhon Doe' },
  { name: 'email', label: 'Email Address', placeholder: 'you@example.com', type: 'email' },
  { name: 'password', label: 'Password', placeholder: '••••••••', type: 'password' },
];

const SignupPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) });

  return <Auth title="Sign Up" subtitle="Sign up, create a workspace for your ideas." fields={fields} submitLabel="Sign Up" alternateText="Already have an account?" alternateLabel="Sign in" alternateTo="/login" onSubmit={handleSubmit((values) => dispatch(signup(values)))} register={(name) => register(name as keyof SignupFormData)} errors={errors} loading={loading} error={error} />;
};

export default SignupPage;
