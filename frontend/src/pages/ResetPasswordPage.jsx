import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import { supabase } from '../lib/supabaseClient';
const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const { register, handleSubmit } = useForm();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const accessToken = searchParams.get('access_token');
    const onSubmit = async ({ password }) => {
        setLoading(true);
        setMessage('');
        if (!accessToken) {
            setMessage('Reset token is missing.');
            setLoading(false);
            return;
        }
        const { error } = await supabase.auth.updateUser({
            access_token: accessToken,
            password,
        });
        setLoading(false);
        setMessage(error ? error.message : 'Password updated successfully. Please log in again.');
    };
    return (<AuthLayout title="Enter a new password" subtitle="Secure your account with a strong password and continue your journey.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <label className="block text-sm text-slate-300">
          New password
          <input type="password" {...register('password', { required: true, minLength: 8 })} className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-slate-100 outline-none transition focus:border-sky-400"/>
        </label>

        {message && <p className="rounded-3xl border border-slate-600/40 bg-slate-950/80 px-4 py-3 text-sm text-slate-200">{message}</p>}

        <button type="submit" className="w-full rounded-3xl bg-sky-400 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60" disabled={loading}>
          {loading ? 'Updating…' : 'Update password'}
        </button>

        <div className="text-center text-sm text-slate-400">
          <Link to="/login" className="text-sky-300 transition hover:text-white">Back to login</Link>
        </div>
      </form>
    </AuthLayout>);
};
export default ResetPasswordPage;
