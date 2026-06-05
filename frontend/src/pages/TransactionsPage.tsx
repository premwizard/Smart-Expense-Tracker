import { useEffect, useMemo, useState } from 'react';
import api from '../lib/api';
import { TransactionItem } from '../types';

const categories = ['All', 'Food', 'Transport', 'Shopping', 'Rent', 'Entertainment', 'Health', 'Education', 'Others'];

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortKey, setSortKey] = useState<'date' | 'amount'>('date');

  useEffect(() => {
    api
      .get('/transactions')
      .then((res) => setTransactions(res.data || []))
      .catch(() => setTransactions([]));
  }, []);

  const filtered = useMemo(() => {
    return [...transactions]
      .filter((item) => category === 'All' || item.category === category)
      .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()) || item.notes?.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortKey === 'date') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return b.amount - a.amount;
      });
  }, [category, search, sortKey, transactions]);

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Transactions</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Search, filter, and manage every record.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <input
              type="search"
              placeholder="Search transactions"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
            >
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as 'date' | 'amount')}
              className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
            >
              <option value="date">Sort by date</option>
              <option value="amount">Sort by amount</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
          <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Overview</p>
          <p className="mt-4 text-4xl font-semibold text-white">{filtered.length}</p>
          <p className="mt-2 text-sm text-slate-400">Filtered transactions</p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
          <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Total amount</p>
          <p className="mt-4 text-4xl font-semibold text-white">₹{filtered.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}</p>
          <p className="mt-2 text-sm text-slate-400">Current filtered total</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-glow">
        <table className="w-full border-collapse text-left text-sm text-slate-300">
          <thead className="bg-slate-900/90 text-slate-400">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 12).map((item) => (
              <tr key={item.id} className="border-t border-white/5 hover:bg-slate-900/80">
                <td className="px-6 py-4 text-white">{item.title}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">₹{item.amount.toLocaleString()}</td>
                <td className="px-6 py-4">{new Date(item.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-slate-400">{item.notes || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && (
          <div className="p-8 text-center text-slate-400">No transactions match your criteria. Try another filter.</div>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
