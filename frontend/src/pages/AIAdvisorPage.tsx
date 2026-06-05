import { useState } from 'react';

const questions = [
  'Where am I spending the most?',
  'How can I save money this month?',
  'Analyze my monthly expenses',
];

const AIAdvisorPage = () => {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState('Use the AI advisor to uncover your best savings opportunities.');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setReply('Analyzing your spending patterns…');

    setTimeout(() => {
      setReply(
        'Your highest spending is concentrated in Rent and Shopping. Stop-and-think shopping notes could reduce non-essential expenses by 12%, and moving select subscriptions to quarterly billing would increase your monthly savings.'
      );
      setLoading(false);
    }, 900);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
        <p className="text-sm uppercase tracking-[0.26em] text-slate-400">AI Financial Advisor</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Ask for smarter money moves.</h2>
        <p className="mt-3 max-w-2xl text-slate-400">Chat with your finance assistant for spending analysis, savings plans, and personalized recommendations.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_0.55fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block text-sm text-slate-300">
              Ask a question
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-slate-100 outline-none transition focus:border-sky-400"
                placeholder="Where am I overspending this month?"
              />
            </label>
            <button className="rounded-3xl bg-sky-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-sky-300" disabled={loading}>
              {loading ? 'Thinking...' : 'Get AI insights'}
            </button>
          </form>

          <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.26em] text-slate-400">AI response</p>
            <p className="mt-4 text-slate-200">{reply}</p>
          </div>
        </div>

        <div className="space-y-4">
          {questions.map((item) => (
            <button
              key={item}
              onClick={() => setPrompt(item)}
              className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-6 py-5 text-left text-sm text-slate-100 transition hover:border-sky-400"
            >
              {item}
            </button>
          ))}
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
            <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Quick tips</p>
            <ul className="mt-4 space-y-3 text-slate-300">
              <li>• Compare weekly spending to stay ahead of trends.</li>
              <li>• Prioritize savings categories before next payday.</li>
              <li>• Export reports monthly to review progress.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisorPage;
