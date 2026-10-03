import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { Inbox, Loader2, LogOut, RefreshCw, Trash2 } from "lucide-react";
import Seo from "@/components/Seo";
import { LogoMark } from "@/components/Logo";
import { API } from "@/data/site";

const FIELDS = [
  ["company_name", "Company"],
  ["phone", "Phone / WhatsApp"],
  ["country", "Country"],
  ["product", "Product"],
  ["purity", "Purity"],
  ["quantity", "Quantity"],
  ["destination_port", "Destination Port"],
  ["incoterm", "Incoterm"],
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const authed = useCallback(
    async (fn) => {
      try {
        return await fn();
      } catch (e) {
        if (e.response?.status === 401) {
          try {
            await axios.post(`${API}/auth/refresh`, {}, { withCredentials: true });
            return await fn();
          } catch (e2) {
            navigate("/admin/login");
            throw e2;
          }
        }
        throw e;
      }
    },
    [navigate]
  );

  const load = useCallback(async () => {
    const res = await authed(() => axios.get(`${API}/inquiries`, { withCredentials: true }));
    setInquiries(res.data);
  }, [authed]);

  useEffect(() => {
    (async () => {
      try {
        const me = await authed(() => axios.get(`${API}/auth/me`, { withCredentials: true }));
        setUser(me.data);
        await load();
      } catch (e) {
        // redirect handled in authed()
      } finally {
        setLoading(false);
      }
    })();
  }, [authed, load]);

  const setStatus = async (id, status) => {
    await authed(() => axios.patch(`${API}/inquiries/${id}`, { status }, { withCredentials: true }));
    setInquiries((list) => list.map((q) => (q.id === id ? { ...q, status } : q)));
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this inquiry permanently?")) return;
    await authed(() => axios.delete(`${API}/inquiries/${id}`, { withCredentials: true }));
    setInquiries((list) => list.filter((q) => q.id !== id));
  };

  const logout = async () => {
    await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
    navigate("/admin/login");
  };

  const filtered = inquiries.filter((q) => filter === "all" || q.status === filter);
  const newCount = inquiries.filter((q) => q.status === "new").length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy" data-testid="admin-loading">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20" data-testid="admin-dashboard">
      <Seo title="Inquiries Dashboard | Arnava Exim Admin" description="Arnava Exim admin area." />
      <div className="bg-navy pb-24 pt-28 grain relative">
        <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <LogoMark light className="h-9 w-9" />
            <div>
              <h1 className="font-display text-xl font-bold text-white">Inquiry Dashboard</h1>
              <p className="text-xs text-slate-400" data-testid="admin-user-email">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={load}
              data-testid="admin-refresh-button"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-emerald-400 hover:text-emerald-400"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
            <button
              onClick={logout}
              data-testid="admin-logout-button"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-500/80"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto -mt-12 max-w-6xl px-5 lg:px-8">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-navy/5">
          <span data-testid="admin-total-count" className="rounded-full bg-navy px-4 py-1.5 text-xs font-semibold text-white">
            Total: {inquiries.length}
          </span>
          <span data-testid="admin-new-count" className="rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold text-emerald-800">
            New: {newCount}
          </span>
          <div className="ml-auto flex gap-1.5">
            {["all", "new", "read"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-testid={`admin-filter-${f}`}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-colors ${
                  filter === f ? "bg-navy text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white py-16" data-testid="admin-empty-state">
            <Inbox className="h-10 w-10 text-slate-300" />
            <p className="mt-3 text-sm text-slate-500">No inquiries yet. New B2B inquiries from the website will appear here.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {filtered.map((q) => (
              <div
                key={q.id}
                data-testid={`inquiry-item-${q.id}`}
                className={`rounded-2xl border bg-white p-6 transition-colors ${
                  q.status === "new" ? "border-emerald-300" : "border-slate-200"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-display text-base font-bold text-navy">{q.full_name}</h3>
                      <span
                        data-testid={`inquiry-status-${q.id}`}
                        className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${
                          q.status === "new" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {q.status}
                      </span>
                      <span className="rounded-full bg-navy/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-navy/60">
                        {q.form_type}
                      </span>
                    </div>
                    <a href={`mailto:${q.email}`} className="mt-1 block text-sm font-semibold text-emerald-700 hover:underline">
                      {q.email}
                    </a>
                    {q.created_at && (
                      <p className="mt-0.5 font-mono text-[11px] text-slate-400">
                        {format(new Date(q.created_at), "dd MMM yyyy, HH:mm")} UTC
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStatus(q.id, q.status === "new" ? "read" : "new")}
                      data-testid={`inquiry-toggle-read-${q.id}`}
                      className="rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-navy"
                    >
                      {q.status === "new" ? "Mark Read" : "Mark New"}
                    </button>
                    <button
                      onClick={() => remove(q.id)}
                      data-testid={`inquiry-delete-${q.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3.5 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
                  {FIELDS.filter(([k]) => q[k]).map(([k, label]) => (
                    <div key={k}>
                      <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">{label}</span>
                      <span className="text-xs font-semibold text-navy">{q[k]}</span>
                    </div>
                  ))}
                </div>
                {q.message && (
                  <p className="mt-4 rounded-xl bg-[#F8FAFC] p-4 text-sm leading-relaxed text-slate-600">{q.message}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
