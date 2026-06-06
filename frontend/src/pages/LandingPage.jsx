import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const features = [
    { title: 'Expense Tracking', description: 'Log spending quickly, categorize with context, and stay ahead of every transaction.' },
    { title: 'Income Management', description: 'Capture recurring income, one-time payments, and build a clear cash flow plan.' },
    { title: 'Budget Planning', description: 'Set monthly targets, watch progress, and get alerts before you overshoot.' },
    { title: 'Smart Analytics', description: 'Use visual reports and trends to identify savings opportunities.' },
    { title: 'AI Insights', description: 'Ask questions in plain English and get instant finance recommendations.' },
    { title: 'PDF Reports', description: 'Export professional statements for tax season or investor review.' },
];
const testimonials = [
    { name: 'Ariana Fox', role: 'Startup Founder', quote: 'The dashboard made my spending feel less chaotic. AI recommendations are on another level.' },
    { name: 'Milo Chen', role: 'Product Manager', quote: 'Beautiful interface, reliable tracking, and budget alerts that actually help me save.' },
    { name: 'Sara Olivier', role: 'Finance Consultant', quote: 'A polished tool that feels premium and productive. Perfect for modern finance workflows.' },
];
const LandingPage = () => (<div className="relative overflow-hidden pb-16">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-hero-gradient"/>
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-8 sm:px-8 lg:px-10">
      <div className="text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300">AI Expense Tracker</p>
      </div>
      <div className="flex items-center gap-4 text-sm text-slate-300">
        <Link to="/login" className="transition hover:text-white">Login</Link>
        <Link to="/register" className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-slate-100 transition hover:bg-slate-800/80">Get Started</Link>
      </div>
    </header>

    <main className="mx-auto mt-16 max-w-7xl px-6 sm:px-8 lg:px-10">
      <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
          <p className="inline-flex rounded-full bg-sky-500/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">Modern finance with AI</p>
          <h1 className="text-5xl font-semibold leading-tight text-white sm:text-6xl">Take Control of Your Finances</h1>
          <p className="max-w-xl text-lg text-slate-300">Track expenses, manage budgets, analyze spending patterns, and grow your savings with AI-powered insights.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/register" className="rounded-3xl bg-sky-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]">Get Started</Link>
            <a href="#demo" className="rounded-3xl border border-white/15 px-6 py-4 text-sm text-slate-100 transition hover:bg-white/5">View Demo</a>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
              <p className="text-4xl font-semibold text-white">+24%</p>
              <p className="mt-2 text-sm text-slate-400">Faster savings planning</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
              <p className="text-4xl font-semibold text-white">6</p>
              <p className="mt-2 text-sm text-slate-400">Dashboard modules included</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
              <p className="text-4xl font-semibold text-white">100%</p>
              <p className="mt-2 text-sm text-slate-400">Designed for modern teams</p>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-glow backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-2 rounded-t-[2rem] bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-400"/>
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Modern dashboard</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Analytics, budgets, and AI in one place.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Income</p>
                <p className="mt-3 text-3xl font-semibold text-sky-300">₹78,400</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Expenses</p>
                <p className="mt-3 text-3xl font-semibold text-rose-400">₹42,520</p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      <section className="mt-24 space-y-8" id="demo">
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (<div key={feature.title} className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-glow transition hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-slate-400">{feature.description}</p>
            </div>))}
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-glow">
          <h2 className="text-3xl font-semibold text-white">Trusted by fast-moving founders</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (<div key={item.name} className="rounded-3xl bg-slate-950/80 p-6">
                <p className="text-slate-300">“{item.quote}”</p>
                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-slate-400">{item.role}</p>
                </div>
              </div>))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-glow">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Pricing</p>
              <h2 className="text-3xl font-semibold text-white">Simple pricing for every ambition.</h2>
              <p className="text-slate-400">Start with the free plan, then upgrade to Premium for advanced AI, reporting, and team workflows.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Free</p>
                <p className="mt-4 text-3xl font-semibold text-white">₹0</p>
                <ul className="mt-4 space-y-2 text-slate-400">
                  <li>Unlimited expense tracking</li>
                  <li>Dashboard analytics</li>
                  <li>Basic AI suggestions</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Premium</p>
                <p className="mt-4 text-3xl font-semibold text-sky-300">₹499 / mo</p>
                <ul className="mt-4 space-y-2 text-slate-400">
                  <li>Advanced forecasting</li>
                  <li>Export PDF / Excel</li>
                  <li>Smart budget alerts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer className="mx-auto mt-20 max-w-7xl px-6 pb-12 sm:px-8 lg:px-10">
      <div className="flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 AI Expense Tracker. Built for premium finance workflows.</p>
        <div className="flex flex-wrap gap-4">
          <a href="#" className="transition hover:text-white">Docs</a>
          <a href="#" className="transition hover:text-white">Security</a>
          <a href="#" className="transition hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  </div>);
export default LandingPage;
