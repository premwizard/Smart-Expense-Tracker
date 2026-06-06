import { useEffect, useState } from 'react';
import api from '../lib/api';
import { useForm } from 'react-hook-form';
const categories = ['Food', 'Transport', 'Shopping', 'Rent', 'Entertainment', 'Health', 'Education', 'Others'];
const BudgetPage = () => {
    const [budgets, setBudgets] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    useEffect(() => {
        api.get('/budgets').then((res) => setBudgets(res.data || [])).catch(() => setBudgets([]));
    }, []);
    const onSubmit = async (data) => {
        const payload = {
            ...data,
            amount: Number(data.amount),
            start_date: data.start_date,
            end_date: data.end_date,
        };
        await api.post('/budgets', payload).then((res) => setBudgets((prev) => [res.data, ...prev])).catch(() => null);
        reset();
    };
    return (<div className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Budget Planner</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Create, edit, and track monthly budgets.</h2>
          </div>
          <p className="max-w-xl text-sm text-slate-400">Budget alerts help you avoid overspending while keeping your savings on track.</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_0.7fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
          <h3 className="text-xl font-semibold text-white">Current budgets</h3>
          <div className="mt-6 space-y-4">
            {budgets.length ? budgets.map((budget) => {
            const used = budget.used || 0;
            const percent = Math.min(100, (used / budget.amount) * 100);
            return (<div key={budget.id} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{budget.name}</h4>
                      <p className="text-sm text-slate-400">{budget.start_date} - {budget.end_date}</p>
                    </div>
                    <span className="rounded-full bg-slate-800/80 px-3 py-2 text-sm text-slate-300">Used {percent}%</span>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-900">
                    <div className="h-full rounded-full bg-sky-400" style={{ width: `${percent}%` }}/>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                    <span>₹{used.toLocaleString()} used</span>
                    <span>₹{budget.amount.toLocaleString()} limit</span>
                  </div>
                  {percent >= 100 ? (<p className="mt-3 text-sm text-rose-300">Budget exceeded. Time to review your spending.</p>) : percent >= 80 ? (<p className="mt-3 text-sm text-amber-300">You have reached 80% of your budget.</p>) : null}
                </div>);
        }) : (<div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-slate-400">No budget created yet. Add a monthly plan to monitor your spending.</div>)}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
          <h3 className="text-xl font-semibold text-white">New budget</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <label className="block text-sm text-slate-300">
              Name
              <input type="text" {...register('name', { required: true })} className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-slate-100 outline-none focus:border-sky-400"/>
            </label>
            <label className="block text-sm text-slate-300">
              Amount
              <input type="number" step="0.01" {...register('amount', { required: true })} className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-slate-100 outline-none focus:border-sky-400"/>
            </label>
            <label className="block text-sm text-slate-300">
              Category
              <select {...register('category')} className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-slate-100 outline-none focus:border-sky-400">
                {categories.map((value) => (<option key={value} value={value}>{value}</option>))}
              </select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-slate-300">
                Start Date
                <input type="date" {...register('start_date', { required: true })} className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-slate-100 outline-none focus:border-sky-400"/>
              </label>
              <label className="block text-sm text-slate-300">
                End Date
                <input type="date" {...register('end_date', { required: true })} className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-slate-100 outline-none focus:border-sky-400"/>
              </label>
            </div>
            <button className="w-full rounded-3xl bg-sky-400 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-sky-300">Create Budget</button>
          </form>
        </div>
      </div>
    </div>);
};
export default BudgetPage;
