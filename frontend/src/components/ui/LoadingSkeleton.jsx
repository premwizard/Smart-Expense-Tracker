import { motion } from 'framer-motion';
const LoadingSkeleton = () => (<div className="flex min-h-screen items-center justify-center px-6 py-12">
    <motion.div initial={{ opacity: 0.15, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease: 'easeOut', repeat: Infinity, repeatType: 'mirror' }} className="w-full max-w-3xl rounded-3xl border border-white/10 bg-slate-900/70 p-10 shadow-glow">
      <div className="space-y-4">
        <div className="h-6 w-2/5 rounded-full bg-slate-700/90"/>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-40 rounded-3xl bg-slate-800/90"/>
          <div className="h-40 rounded-3xl bg-slate-800/90"/>
        </div>
        <div className="h-72 rounded-[2rem] bg-slate-800/90"/>
      </div>
    </motion.div>
  </div>);
export default LoadingSkeleton;
