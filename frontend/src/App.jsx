import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { supabase } from './lib/supabaseClient';
import LoadingSkeleton from './components/ui/LoadingSkeleton';
import AppShell from './components/layout/AppShell';
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const TransactionsPage = lazy(() => import('./pages/TransactionsPage'));
const BudgetPage = lazy(() => import('./pages/BudgetPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const AIAdvisorPage = lazy(() => import('./pages/AIAdvisorPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
function App() {
    const [session, setSession] = useState(false);
    const location = useLocation();
    useEffect(() => {
        const currentSession = supabase.auth.getSession();
        currentSession.then((res) => setSession(Boolean(res.data.session)));
        const { data: listener } = supabase.auth.onAuthStateChange((event, authSession) => {
            setSession(Boolean(authSession?.session));
            if (authSession?.session) {
                localStorage.setItem('aet_token', authSession.session.access_token);
            }
            else {
                localStorage.removeItem('aet_token');
            }
        });
        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);
    return (<div className="min-h-screen w-full bg-surface-50 text-surface-900">
      <Suspense fallback={<LoadingSkeleton />}> 
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
            <Route path="/reset-password" element={<ResetPasswordPage />}/>
            <Route path="/app/*" element={session ? <AppShell /> : <Navigate to="/login" replace/>}/>
            <Route path="*" element={<Navigate to="/" replace/>}/>
          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>);
}
export default App;
