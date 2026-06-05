import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import { supabase } from '../lib/supabaseClient';

interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

const RegisterPage = () => {
  const { register, handleSubmit } = useForm<RegisterPayload>({ mode: 'onTouched' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values: RegisterPayload) => {
    setLoading(true);
    setError('');
    const { error: signUpError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: { data: { full_name: values.name } },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    navigate('/login');
  };

  return (
    <AuthLayout title="Create your account" subtitle="Register with your email and secure your finance workspace with AI analytics." >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <label className="block text-sm text-slate-300">
          Full name
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-slate-100 outline-none transition focus:border-sky-400"
          />
        </label>
        <label className="block text-sm text-slate-300">
          Email
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-slate-100 outline-none transition focus:border-sky-400"
          />
        </label>
        <label className="block text-sm text-slate-300">
          Password
          <input
            type="password"
            {...register('password', { required: 'Password is required', minLength: 8 })}
            className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-slate-100 outline-none transition focus:border-sky-400"
          />
        </label>

        {error && <p className="rounded-3xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-3xl bg-sky-400 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Creating account…' : 'Register'}
        </button>

        <p className="text-center text-sm text-slate-400">
          Already have an account? <Link to="/login" className="text-sky-300 transition hover:text-white">Sign in</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
