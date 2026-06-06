import { motion } from 'framer-motion';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../../pages/DashboardPage';
import TransactionsPage from '../../pages/TransactionsPage';
import BudgetPage from '../../pages/BudgetPage';
import AnalyticsPage from '../../pages/AnalyticsPage';
import AIAdvisorPage from '../../pages/AIAdvisorPage';
import ReportsPage from '../../pages/ReportsPage';
import SettingsPage from '../../pages/SettingsPage';
import { supabase } from '../../lib/supabaseClient';
const navItems = [
    { name: 'Overview', to: '/app/dashboard' },
    { name: 'Transactions', to: '/app/transactions' },
    { name: 'Budget', to: '/app/budget' },
    { name: 'Analytics', to: '/app/analytics' },
    { name: 'AI Advisor', to: '/app/ai-advisor' },
    { name: 'Reports', to: '/app/reports' },
    { name: 'Settings', to: '/app/settings' },
];
const AppShell = () => {
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem('aet_token');
        window.location.href = '/login';
    };
    return (<div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-6 lg:px-10">
        <aside className="hidden w-80 shrink-0 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-glow backdrop-blur-xl lg:block">
          <div className="mb-8 space-y-3">
            <p className="text-xs uppercase tracking-[0.24em] text-sky-300">AI Expense Tracker</p>
            <h2 className="text-2xl font-semibold">Control center</h2>
            <p className="text-sm text-slate-400">Premium finance insights for your daily flow.</p>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (<NavLink key={item.to} to={item.to} className={({ isActive }) => `block rounded-3xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-slate-800 text-white shadow-glow' : 'text-slate-300 hover:bg-white/5'}`}>
                {item.name}
              </NavLink>))}
          </nav>
          <button onClick={handleSignOut} className="mt-8 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 transition hover:bg-slate-900">
            Logout
          </button>
        </aside>

        <main className="flex-1 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-glow backdrop-blur-xl">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-sky-300">Dashboard</p>
              <h1 className="text-3xl font-semibold text-white">Welcome back</h1>
            </div>
            <div className="rounded-3xl bg-slate-950/80 px-4 py-3 text-sm text-slate-300 shadow-inner">
              Auto-syncing data, analytics, and AI insights.
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
            <Routes>
              <Route path="dashboard" element={<DashboardPage />}/>
              <Route path="transactions" element={<TransactionsPage />}/>
              <Route path="budget" element={<BudgetPage />}/>
              <Route path="analytics" element={<AnalyticsPage />}/>
              <Route path="ai-advisor" element={<AIAdvisorPage />}/>
              <Route path="reports" element={<ReportsPage />}/>
              <Route path="settings" element={<SettingsPage />}/>
              <Route path="*" element={<Navigate to="dashboard" replace/>}/>
            </Routes>
          </motion.div>
        </main>
      </div>
    </div>);
};
export default AppShell;
