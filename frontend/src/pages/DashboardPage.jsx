import { useEffect, useMemo, useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import api from '../lib/api';
const stats = [
    { title: 'Total Balance', value: '₹35,880', trend: '+12.4%' },
    { title: 'Total Income', value: '₹78,400', trend: '+20.1%' },
    { title: 'Total Expenses', value: '₹42,520', trend: '-8.2%' },
    { title: 'Total Savings', value: '₹16,150', trend: '+9.8%' },
];
const expenseData = [
    { category: 'Food', amount: 11500 },
    { category: 'Transport', amount: 8800 },
    { category: 'Rent', amount: 14000 },
    { category: 'Shopping', amount: 6200 },
    { category: 'Health', amount: 3200 },
    { category: 'Others', amount: 1800 },
];
const trendData = [
    { month: 'Jan', expenses: 4000, income: 6200 },
    { month: 'Feb', expenses: 4600, income: 6900 },
    { month: 'Mar', expenses: 5200, income: 7300 },
    { month: 'Apr', expenses: 4700, income: 7600 },
    { month: 'May', expenses: 4200, income: 8000 },
    { month: 'Jun', expenses: 4500, income: 8200 },
];
const COLORS = ['#38bdf8', '#a855f7', '#fb7185', '#f59e0b', '#34d399', '#60a5fa'];
const DashboardPage = () => {
    const [latestExpenses, setLatestExpenses] = useState([]);
    useEffect(() => {
        api
            .get('/transactions/recent')
            .then((res) => setLatestExpenses(res.data || []))
            .catch(() => setLatestExpenses([]));
    }, []);
    const budgetUsage = useMemo(() => ({ used: 7500, total: 10000 }), []);
    const progress = Math.min(100, (budgetUsage.used / budgetUsage.total) * 100);
    return (<div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-4">
        {stats.map((item) => (<div key={item.title} className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
            <p className="text-sm uppercase tracking-[0.26em] text-slate-400">{item.title}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
            <p className="mt-3 text-sm text-slate-300">{item.trend} vs last month</p>
          </div>))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Monthly cash flow</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Income vs Expense</h2>
            </div>
            <span className="rounded-full bg-slate-800/80 px-4 py-2 text-sm text-slate-300">Updated 2h ago</span>
          </div>
          <div className="mt-8 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fb7185" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#fb7185" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }}/>
                <Area type="monotone" dataKey="income" stroke="#38bdf8" fill="url(#incomeGradient)" strokeWidth={3}/>
                <Area type="monotone" dataKey="expenses" stroke="#fb7185" fill="url(#expenseGradient)" strokeWidth={3}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Expense distribution</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Category breakdown</h2>
            </div>
            <div className="rounded-full bg-slate-800/80 px-4 py-2 text-sm text-slate-300">Live update</div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expenseData} dataKey="amount" nameKey="category" innerRadius={52} outerRadius={86} stroke="transparent">
                  {expenseData.map((entry, index) => (<Cell key={entry.category} fill={COLORS[index % COLORS.length]}/>))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 16 }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid gap-3 text-sm text-slate-300">
            {expenseData.map((entry, index) => (<div key={entry.category} className="flex items-center justify-between gap-4 rounded-3xl bg-slate-950/70 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span style={{ background: COLORS[index % COLORS.length] }} className="h-3.5 w-3.5 rounded-full"/>
                  <div>
                    <p className="font-medium text-white">{entry.category}</p>
                    <p className="text-slate-500">₹{entry.amount.toLocaleString()}</p>
                  </div>
                </div>
                <span>{Math.round((entry.amount / 50000) * 100)}%</span>
              </div>))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Budget planner</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Monthly progress</h2>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">80% used</span>
          </div>
          <div className="rounded-3xl bg-slate-950/90 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">Budget</p>
                <p className="mt-1 text-3xl font-semibold text-white">₹10,000</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400">Remaining</p>
                <p className="mt-1 text-3xl font-semibold text-white">₹2,500</p>
              </div>
            </div>
            <div className="mt-7 h-4 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full rounded-full bg-sky-400" style={{ width: `${progress}%` }}/>
            </div>
            <p className="mt-4 text-sm text-slate-300">Keep tracking your categories to avoid overspending when your budget approaches 100%.</p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Recent activity</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Latest transactions</h2>
          </div>
          <div className="space-y-4">
            {(latestExpenses.length ? latestExpenses : [{ title: 'Grocery shopping', category: 'Food', amount: 420, date: '2026-06-03' }, { title: 'Taxi ride', category: 'Transport', amount: 180, date: '2026-06-02' }]).map((tx, index) => (<div key={index} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-white">{tx.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{tx.category} · {tx.date}</p>
                  </div>
                  <p className="text-lg font-semibold text-white">₹{tx.amount}</p>
                </div>
              </div>))}
          </div>
        </div>
      </div>
    </div>);
};
export default DashboardPage;
