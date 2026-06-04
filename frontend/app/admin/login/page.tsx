'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Eye, EyeOff, Loader2, LogIn, Shield } from 'lucide-react';
import api from '@/lib/axios';
import { DesaLogo } from '@/components/layout/DesaLogo';

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
        /* not logged in */
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
      setTimeout(() => router.replace('/admin'), 900);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen">
      {/* Panel kiri — branding */}
      <div className="relative hidden w-[45%] overflow-hidden bg-gradient-to-br from-primary-800 via-primary-900 to-slate-950 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute inset-0 bg-[url('/pattern.svg')] opacity-[0.07]" />
        <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 left-10 h-56 w-56 rounded-full bg-accent-gold/10 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <DesaLogo size={52} className="ring-white/20" />
          <div>
            <p className="text-lg font-bold text-white">Desa Mindaka</p>
            <p className="text-sm text-primary-200">Portal Resmi Pemerintah Desa</p>
          </div>
        </div>

        <div className="relative max-w-md">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-primary-100 backdrop-blur">
            <Shield className="h-3.5 w-3.5" />
            Area terbatas administrator
          </div>
          <h1 className="text-3xl font-bold leading-tight text-white">
            Kelola konten desa dengan mudah dan aman
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-primary-100/90">
            Dashboard admin untuk mengelola berita, galeri, data profil, APB Desa, pengaduan warga,
            dan informasi publik lainnya.
          </p>
        </div>

        <p className="relative text-xs text-primary-300/80">
          © {new Date().getFullYear()} Pemerintah Desa Mindaka
        </p>
      </div>

      {/* Panel kanan — form */}
      <div className="flex flex-1 items-center justify-center bg-[#f1f5f9] px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <DesaLogo size={44} />
            <div>
              <p className="font-bold text-slate-900">Desa Mindaka</p>
              <p className="text-xs text-slate-500">Panel Admin</p>
            </div>
          </div>

          <div className="admin-panel !p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">
              Masuk Admin
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Selamat datang kembali</h2>
            <p className="mt-1 text-sm text-slate-500">
              Gunakan akun administrator untuk mengakses dashboard.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading || success}
                  className="admin-input"
                  placeholder="admin@desamindaka.go.id"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
                <div className="relative">
                  <input
                    type={show ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading || success}
                    className="admin-input pr-11"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    disabled={loading || success}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    aria-label={show ? 'Sembunyikan password' : 'Tampilkan password'}
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || success}
                className={`btn-admin w-full py-3 ${success ? '!from-emerald-600 !to-emerald-700' : ''}`}
              >
                {success ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Berhasil! Mengalihkan...
                  </>
                ) : loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Memverifikasi...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Masuk Dashboard
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
