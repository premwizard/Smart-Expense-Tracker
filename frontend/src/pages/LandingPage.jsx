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

const LandingPage = () => (
  <div className="relative min-h-screen w-full bg-surface-50 font-sans text-surface-900 overflow-x-hidden">
    {/* Navigation */}
    <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur-md border-b border-surface-200 shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-xl">
            $
          </div>
          <span className="font-bold text-xl tracking-tight text-surface-900">ExpenseAI</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="hidden text-sm font-medium text-surface-600 hover:text-surface-900 md:block transition-colors">Features</a>
          <a href="#pricing" className="hidden text-sm font-medium text-surface-600 hover:text-surface-900 md:block transition-colors">Pricing</a>
          <Link to="/login" className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">Log in</Link>
          <Link to="/register" className="rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-all hover:shadow-md hover:-translate-y-0.5">
            Get Started
          </Link>
        </div>
      </div>
    </header>

    <main>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pb-32 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-100 via-surface-50 to-surface-50 opacity-70"></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700 ring-1 ring-inset ring-primary-600/20 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary-600"></span>
            Introducing AI-Powered Finance
          </p>
          <h1 className="text-5xl font-extrabold tracking-tight text-surface-900 sm:text-7xl mb-8 leading-[1.1]">
            Take Control of Your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-400">Financial Future</span>
          </h1>
          <p className="text-lg leading-8 text-surface-600 max-w-2xl mx-auto mb-10">
            Track expenses, manage budgets, analyze spending patterns, and grow your savings with intelligent, AI-driven insights designed for modern teams and individuals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto rounded-full bg-primary-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-primary-500 hover:shadow-xl hover:-translate-y-1 transition-all">
              Start for free
            </Link>
            <a href="#demo" className="w-full sm:w-auto rounded-full bg-white px-8 py-4 text-base font-semibold text-surface-900 shadow-sm ring-1 ring-inset ring-surface-200 hover:bg-surface-50 transition-all">
              Book a Demo
            </a>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-16 w-full max-w-5xl relative">
          <div className="rounded-2xl border border-surface-200 bg-white/50 backdrop-blur-sm p-2 shadow-2xl ring-1 ring-surface-900/5">
            <div className="rounded-xl overflow-hidden bg-surface-50 aspect-video border border-surface-100 flex items-center justify-center relative">
              {/* Mock Dashboard UI */}
              <div className="absolute inset-0 flex">
                <div className="w-64 border-r border-surface-200 bg-white hidden md:block p-6">
                  <div className="h-4 w-24 bg-surface-200 rounded mb-8"></div>
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-8 w-full bg-surface-100 rounded"></div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 p-8">
                  <div className="h-8 w-48 bg-surface-200 rounded mb-8"></div>
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-24 bg-white border border-surface-200 rounded-xl p-4 shadow-sm">
                        <div className="h-4 w-16 bg-surface-100 rounded mb-4"></div>
                        <div className="h-8 w-24 bg-surface-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                  <div className="h-64 w-full bg-white border border-surface-200 rounded-xl shadow-sm p-6 flex flex-col justify-end gap-2 items-center">
                     {/* Mock Chart */}
                     <div className="flex gap-4 items-end w-full h-48 px-4">
                        {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                          <div key={i} className="flex-1 bg-primary-200 rounded-t-md" style={{ height: `${h}%` }}></div>
                        ))}
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Everything you need</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-surface-900 sm:text-4xl">
              Powerful features for modern finance
            </p>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-start p-8 rounded-2xl bg-surface-50 border border-surface-100 hover:shadow-md transition-shadow">
                <div className="rounded-lg bg-primary-100 p-3 mb-6">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold leading-7 text-surface-900">{feature.title}</h3>
                <p className="mt-3 text-base leading-7 text-surface-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-surface-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-surface-900 mb-12">
            Trusted by fast-moving founders and teams
          </h2>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm ring-1 ring-surface-200">
                <p className="text-lg leading-relaxed text-surface-700">“{item.quote}”</p>
                <div className="mt-6 flex items-center gap-x-4 border-t border-surface-100 pt-6">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-surface-900">{item.name}</p>
                    <p className="text-sm text-surface-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-2xl mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Pricing</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-surface-900 sm:text-4xl">
              Simple pricing for every ambition
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-2 text-left">
            {/* Free Tier */}
            <div className="rounded-3xl p-8 ring-1 ring-surface-200 xl:p-10 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold leading-8 text-surface-900">Starter</h3>
              <p className="mt-4 text-sm leading-6 text-surface-600">Perfect for individuals starting their financial journey.</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-surface-900">₹0</span>
                <span className="text-sm font-semibold leading-6 text-surface-600">/month</span>
              </p>
              <Link to="/register" className="mt-6 block rounded-full px-3 py-3 text-center text-sm font-semibold leading-6 text-primary-600 ring-1 ring-inset ring-primary-200 hover:ring-primary-300 hover:bg-primary-50 transition-all">
                Get started for free
              </Link>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-surface-600">
                <li className="flex gap-x-3"><span className="text-primary-600">✓</span> Unlimited expense tracking</li>
                <li className="flex gap-x-3"><span className="text-primary-600">✓</span> Basic dashboard analytics</li>
                <li className="flex gap-x-3"><span className="text-primary-600">✓</span> Community support</li>
              </ul>
            </div>
            {/* Premium Tier */}
            <div className="rounded-3xl p-8 bg-surface-900 ring-1 ring-surface-900 xl:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-primary-500 blur-[50px] opacity-50"></div>
              <h3 className="text-xl font-semibold leading-8 text-white relative z-10">Premium</h3>
              <p className="mt-4 text-sm leading-6 text-surface-300 relative z-10">Advanced features for teams and serious planners.</p>
              <p className="mt-6 flex items-baseline gap-x-1 relative z-10">
                <span className="text-4xl font-bold tracking-tight text-white">₹499</span>
                <span className="text-sm font-semibold leading-6 text-surface-300">/month</span>
              </p>
              <Link to="/register" className="mt-6 block rounded-full bg-primary-500 px-3 py-3 text-center text-sm font-semibold leading-6 text-white hover:bg-primary-400 transition-all shadow-md relative z-10">
                Start Premium Trial
              </Link>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-surface-300 relative z-10">
                <li className="flex gap-x-3"><span className="text-primary-400">✓</span> Advanced AI forecasting</li>
                <li className="flex gap-x-3"><span className="text-primary-400">✓</span> Export to PDF & Excel</li>
                <li className="flex gap-x-3"><span className="text-primary-400">✓</span> Smart budget alerts</li>
                <li className="flex gap-x-3"><span className="text-primary-400">✓</span> Priority support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>

    {/* Footer */}
    <footer className="bg-surface-900 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary-500 text-white font-bold text-xs">
            $
          </div>
          <span className="font-bold text-lg text-white">ExpenseAI</span>
        </div>
        <p className="text-sm text-surface-400">
          © 2026 AI Expense Tracker. Built for modern finance.
        </p>
        <div className="flex gap-6 text-sm text-surface-400">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  </div>
);

export default LandingPage;
