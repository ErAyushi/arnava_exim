import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import Seo from "@/components/Seo";
import { LogoMark } from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { API } from "@/data/site";

function formatApiErrorDetail(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).filter(Boolean).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post(`${API}/auth/login`, { email, password }, { withCredentials: true });
      navigate("/admin");
    } catch (err) {
      setError(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grain flex min-h-screen items-center justify-center bg-navy px-5" data-testid="admin-login-page">
      <Seo title="Admin Login | Arnava Exim" description="Arnava Exim admin area." />
      <form
        onSubmit={submit}
        data-testid="admin-login-form"
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur"
      >
        <div className="flex flex-col items-center">
          <LogoMark light className="h-10 w-10" />
          <h1 className="mt-4 font-display text-xl font-bold text-white">Admin Access</h1>
          <p className="mt-1 text-xs text-slate-400">Arnava Exim inquiry dashboard</p>
        </div>
        <div className="mt-7 space-y-4">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            data-testid="admin-login-email-input"
            className="h-11 rounded-lg border-white/15 bg-white/10 text-white placeholder:text-slate-500 focus-visible:ring-emerald-500"
          />
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            data-testid="admin-login-password-input"
            className="h-11 rounded-lg border-white/15 bg-white/10 text-white placeholder:text-slate-500 focus-visible:ring-emerald-500"
          />
          {error && (
            <p data-testid="admin-login-error" className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            data-testid="admin-login-submit-button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors duration-300 hover:bg-white disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
}
