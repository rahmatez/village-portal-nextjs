'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { CheckCircle2, Search } from 'lucide-react';
import { pengaduanApi } from '@/lib/api/modul';

export function PengaduanForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [ticketCode, setTicketCode] = useState<string | null>(null);
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: () =>
      pengaduanApi.create({
        name: form.name.trim(),
        email: form.email.trim() || undefined,
        phone: form.phone.trim() || undefined,
        subject: form.subject.trim(),
        message: form.message.trim(),
      }),
    onSuccess: (res) => {
      setTicketCode(res.data.data.ticketCode);
      setError('');
    },
    onError: (e) => {
      setError(e instanceof Error ? e.message : 'Gagal mengirim pengaduan');
    },
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    mutation.mutate();
  }

  if (ticketCode) {
    return (
      <div className="card mx-auto max-w-lg text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" aria-hidden />
        <h2 className="mt-4 text-xl font-bold text-slate-900">Pengaduan terkirim</h2>
        <p className="mt-2 text-slate-600">
          Simpan kode tiket berikut untuk melacak status pengaduan Anda.
        </p>
        <p className="mt-4 rounded-xl bg-primary-50 px-4 py-3 font-mono text-lg font-bold tracking-wide text-primary-800">
          {ticketCode}
        </p>
        <Link
          href={`/pengaduan/lacak?kode=${encodeURIComponent(ticketCode)}`}
          className="btn-primary mt-6 inline-flex"
        >
          Lacak status sekarang
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card mx-auto max-w-2xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Nama lengkap *</label>
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            required
            minLength={2}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">No. HP / WhatsApp</label>
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
            value={form.phone}
            onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
            placeholder="08xxxxxxxxxx"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
        <input
          type="email"
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Subjek pengaduan *</label>
        <input
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
          value={form.subject}
          onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))}
          required
          minLength={5}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Uraian pengaduan *</label>
        <textarea
          className="min-h-[140px] w-full rounded-xl border border-slate-200 px-3 py-2.5 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
          value={form.message}
          onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
          required
          minLength={20}
        />
        <p className="mt-1 text-xs text-slate-500">Minimal 20 karakter</p>
      </div>
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <div className="flex flex-wrap gap-3 pt-2">
        <button type="submit" className="btn-primary" disabled={mutation.isPending}>
          {mutation.isPending ? 'Mengirim...' : 'Kirim pengaduan'}
        </button>
        <Link
          href="/pengaduan/lacak"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Search className="h-4 w-4" />
          Lacak tiket
        </Link>
      </div>
    </form>
  );
}
