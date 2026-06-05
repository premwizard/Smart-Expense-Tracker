import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import { supabase } from '../lib/supabaseClient';

interface ForgotPayload {
  email: string;
}

const ForgotPasswordPage = () => {
  const { register, handleSubmit } = useForm<ForgotPayload>();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ email }: ForgotPayload) => {
    setLoading(true);
    setStatus('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);
    setStatus(error ? error.message : 'Check your email for reset instructions.');
  };

  return (
    <AuthLayout title="Reset your password" subtitle="Enter your email and we'll send you secure reset instructions." >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <label className="block text-sm text-slate-300">
          Email address
          <input
            type="email"
            {...register('email', { required: true })}
            className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-slate-100 outline-none transition focus:border-sky-400"
          />
        </label>

        {status && <p className="rounded-3xl border border-slate-600/40 bg-slate-950/80 px-4 py-3 text-sm text-slate-200">{status}</p>}

        <button
          type="submit"
          className="w-full rounded-3xl bg-sky-400 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Sending…' : 'Send reset link'}
        </button>

        <div className="text-center text-sm text-slate-400">
          <Link to="/login" className="text-sky-300 transition hover:text-white">Return to login</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
