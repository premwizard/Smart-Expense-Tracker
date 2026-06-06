import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from 'recharts';
const expenseByCategory = [
    { category: 'Food', value: 11200 },
    { category: 'Transport', value: 8300 },
    { category: 'Rent', value: 14000 },
    { category: 'Shopping', value: 6700 },
    { category: 'Health', value: 3100 },
    { category: 'Education', value: 2100 },
];
const monthlyExpense = [
    { month: 'Jan', value: 4200 },
    { month: 'Feb', value: 4800 },
    { month: 'Mar', value: 5200 },
    { month: 'Apr', value: 4600 },
    { month: 'May', value: 5300 },
    { month: 'Jun', value: 4900 },
];
const monthlyIncome = [
    { month: 'Jan', value: 6200 },
    { month: 'Feb', value: 6800 },
    { month: 'Mar', value: 7300 },
    { month: 'Apr', value: 7600 },
    { month: 'May', value: 8200 },
    { month: 'Jun', value: 8600 },
];
const savingsTrend = [
    { month: 'Jan', value: 2000 },
    { month: 'Feb', value: 2200 },
    { month: 'Mar', value: 2100 },
    { month: 'Apr', value: 2500 },
    { month: 'May', value: 2900 },
    { month: 'Jun', value: 3200 },
];
const incomeVsExpense = [
    { month: 'Jan', income: 6200, expense: 4200 },
    { month: 'Feb', income: 6800, expense: 4800 },
    { month: 'Mar', income: 7300, expense: 5200 },
    { month: 'Apr', income: 7600, expense: 4600 },
    { month: 'May', income: 8200, expense: 5300 },
    { month: 'Jun', income: 8600, expense: 4900 },
];
const AnalyticsPage = () => (<div className="space-y-8">
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
      <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Analytics</p>
      <h2 className="mt-2 text-3xl font-semibold text-white">Built-in finance intelligence</h2>
      <p className="mt-3 text-slate-400">Visualize trends, track categories, and compare income versus spending in a single view.</p>
    </div>

    <div className="grid gap-6 xl:grid-cols-2">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
        <h3 className="text-xl font-semibold text-white">Expense by category</h3>
        <p className="mt-2 text-sm text-slate-400">See where your money is flowing across top categories.</p>
        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expenseByCategory} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="#1e293b" vertical={false}/>
              <XAxis dataKey="category" tick={{ fill: '#94a3b8' }}/>
              <YAxis tick={{ fill: '#94a3b8' }}/>
              <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 16 }}/>
              <Bar dataKey="value" fill="#38bdf8" radius={[12, 12, 0, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
          <h3 className="text-xl font-semibold text-white">Monthly expense trend</h3>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyExpense} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#1e293b" opacity={0.4}/>
                <XAxis dataKey="month" tick={{ fill: '#94a3b8' }}/>
                <YAxis tick={{ fill: '#94a3b8' }}/>
                <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 16 }}/>
                <Line type="monotone" dataKey="value" stroke="#fb7185" strokeWidth={3} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
          <h3 className="text-xl font-semibold text-white">Monthly income trend</h3>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyIncome} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#1e293b" opacity={0.4}/>
                <XAxis dataKey="month" tick={{ fill: '#94a3b8' }}/>
                <YAxis tick={{ fill: '#94a3b8' }}/>
                <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 16 }}/>
                <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={3} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>

    <div className="grid gap-6 xl:grid-cols-2">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
        <h3 className="text-xl font-semibold text-white">Savings trend</h3>
        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={savingsTrend} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#1e293b" opacity={0.35}/>
              <XAxis dataKey="month" tick={{ fill: '#94a3b8' }}/>
              <YAxis tick={{ fill: '#94a3b8' }}/>
              <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 16 }}/>
              <Line type="monotone" dataKey="value" stroke="#facc15" strokeWidth={3} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
        <h3 className="text-xl font-semibold text-white">Income vs expenses</h3>
        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={incomeVsExpense} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="#1e293b" vertical={false}/>
              <XAxis dataKey="month" tick={{ fill: '#94a3b8' }}/>
              <YAxis tick={{ fill: '#94a3b8' }}/>
              <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 16 }}/>
              <Bar dataKey="income" fill="#34d399" radius={[12, 12, 0, 0]}/>
              <Bar dataKey="expense" fill="#fb7185" radius={[12, 12, 0, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>);
export default AnalyticsPage;
