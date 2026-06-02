'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Eye, EyeOff, Loader2, LogIn } from 'lucide-react';
import api from '@/lib/axios';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@desamindaka.go.id');
  const [password, setPassword] = useState('Admin@12345');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function checkAlreadyLogged() {
      try {
        await api.get('/auth/me');
        router.replace('/admin');
      } catch {
        // ignore
      }
    }
    void checkAlreadyLogged();
  }, [router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (success) return;
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/login', { email, password });
      setSuccess(true);
      setTimeout(() => {
        router.replace('/admin');
      }, 900);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#465fff55,transparent_35%),radial-gradient(circle_at_80%_10%,#7c3aed44,transparent_30%),radial-gradient(circle_at_50%_90%,#0ea5e944,transparent_35%)]" />
      <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#465fff]">Mindaka Admin</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Sign in to dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Masuk untuk mengelola konten portal desa.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || success}
              className="admin-input"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || success}
                className="admin-input pr-10"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                disabled={loading || success}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500 hover:bg-slate-100"
                aria-label="Toggle password"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || success}
            className={`btn-admin w-full disabled:opacity-70 ${success ? 'scale-[1.01] bg-emerald-600 hover:bg-emerald-600' : ''}`}
          >
            {success ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4 animate-bounce" />
                Login berhasil, mengarahkan...
              </>
            ) : loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Masuk ke Dashboard
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
