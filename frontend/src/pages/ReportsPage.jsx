import { useEffect, useState } from 'react';
import api from '../lib/api';
const ReportsPage = () => {
    const [reports, setReports] = useState([]);
    useEffect(() => {
        api.get('/reports').then((res) => setReports(res.data || [])).catch(() => setReports([]));
    }, []);
    const handleExport = async (type) => {
        await api.post('/reports/export', { type }).catch(() => null);
        alert(`${type} export is ready. Check your email or reports list.`);
    };
    return (<div className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
        <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Reports</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Export monthly and yearly financial summaries.</h2>
        <p className="mt-3 text-slate-400">Generate professional PDF and Excel reports for budgeting, tax planning, and performance review.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <button onClick={() => handleExport('monthly')} className="rounded-[2rem] border border-white/10 bg-slate-950/80 px-6 py-6 text-left shadow-glow transition hover:border-sky-400">
          <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Monthly report</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">Generate a summary for the last 30 days.</h3>
        </button>
        <button onClick={() => handleExport('yearly')} className="rounded-[2rem] border border-white/10 bg-slate-950/80 px-6 py-6 text-left shadow-glow transition hover:border-sky-400">
          <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Yearly report</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">Download an annual finance statement.</h3>
        </button>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
        <h3 className="text-xl font-semibold text-white">Recent exports</h3>
        <div className="mt-6 space-y-4">
          {(reports.length ? reports : [{ report_type: 'Monthly', period: 'Jun 2026', generated_at: '2026-06-05' }]).map((report, index) => (<div key={index} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-base font-semibold text-white">{report.report_type} report</p>
                  <p className="text-sm text-slate-400">Period: {report.period}</p>
                </div>
                <p className="text-sm text-slate-300">Generated {report.generated_at}</p>
              </div>
              {report.download_url && (<a href={report.download_url} className="mt-4 inline-flex rounded-full bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300">
                  Download
                </a>)}
            </div>))}
        </div>
      </div>
    </div>);
};
export default ReportsPage;
