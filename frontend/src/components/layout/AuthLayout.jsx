import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const AuthLayout = ({ title, subtitle, children }) => (<div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-hero-gradient"/>
    <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-10 lg:px-12">
      <Link to="/" className="mb-8 inline-flex items-center gap-3 text-sm font-medium text-sky-300 transition hover:text-white">
        ← Back to home
      </Link>
      <div className="mx-auto w-full max-w-3xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-glow backdrop-blur-xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="mb-8 space-y-3 text-center">
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">{title}</h1>
            <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">{subtitle}</p>
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  </div>);
export default AuthLayout;
