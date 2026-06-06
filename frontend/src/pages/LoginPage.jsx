import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import { supabase } from '../lib/supabaseClient';
const LoginPage = () => {
    const { register, handleSubmit, formState } = useForm({ mode: 'onTouched' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        setLoading(true);
        setError('');
        const { error: signInError, data: authData } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });
        setLoading(false);
        if (signInError) {
            setError(signInError.message);
            return;
        }
        if (authData.session) {
            localStorage.setItem('aet_token', authData.session.access_token);
            navigate('/app/dashboard');
        }
    };
    return (<AuthLayout title="Welcome back" subtitle="Sign in to manage your income, expenses, and AI-powered financial insights.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <label className="block text-sm text-slate-300">
          Email
          <input type="email" {...register('email', { required: 'Email is required' })} className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-slate-100 outline-none transition focus:border-sky-400"/>
        </label>

        <label className="block text-sm text-slate-300">
          Password
          <input type="password" {...register('password', { required: 'Password is required', minLength: 8 })} className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-slate-100 outline-none transition focus:border-sky-400"/>
        </label>

        {error && <p className="rounded-3xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}

        <button type="submit" disabled={loading} className="w-full rounded-3xl bg-sky-400 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <div className="flex items-center justify-between text-sm text-slate-400">
          <Link to="/forgot-password" className="transition hover:text-white">Forgot password?</Link>
          <Link to="/register" className="transition hover:text-white">Create account</Link>
        </div>
      </form>
    </AuthLayout>);
};
export default LoginPage;
