import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const SettingsPage = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [email, setEmail] = useState('me@example.com');
  const [name, setName] = useState('Finance Manager');

  useEffect(() => {
    const stored = localStorage.getItem('aet_theme') as 'dark' | 'light' | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle('light', stored === 'light');
    }
  }, []);

  const handleThemeChange = (next: 'dark' | 'light') => {
    setTheme(next);
    localStorage.setItem('aet_theme', next);
    document.documentElement.classList.toggle('light', next === 'light');
  };

  const handleLogoutAll = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('aet_token');
    window.location.href = '/login';
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
        <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Profile</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-3xl bg-sky-500/20" />
              <div>
                <p className="text-xl font-semibold text-white">{name}</p>
                <p className="text-sm text-slate-400">{email}</p>
              </div>
            </div>
            <p className="mt-4 text-slate-400">Update your profile, contact preferences, and avatar directly from the settings page.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <div className="space-y-3">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Preferences</p>
                <div className="mt-4 flex items-center gap-4">
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={`rounded-3xl px-4 py-3 text-sm ${theme === 'dark' ? 'bg-sky-400 text-slate-950' : 'bg-slate-950/80 text-slate-300'}`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => handleThemeChange('light')}
                    className={`rounded-3xl px-4 py-3 text-sm ${theme === 'light' ? 'bg-sky-400 text-slate-950' : 'bg-slate-950/80 text-slate-300'}`}
                  >
                    Light
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Security</p>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <button className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-left hover:bg-white/5">Change password</button>
                  <button onClick={handleLogoutAll} className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-left text-rose-300 hover:bg-rose-500/10">Logout everywhere</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
