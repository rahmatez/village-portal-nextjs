export function AdminPlaceholder({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      <p className="mt-2 text-slate-600">
        Modul ini akan dilanjutkan pada langkah berikutnya.
      </p>
    </div>
  );
}
