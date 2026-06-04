'use client';

type AdminLoadingRowProps = {
  colSpan: number;
  text?: string;
};

export function AdminLoadingRow({ colSpan, text = 'Memuat data...' }: AdminLoadingRowProps) {
  return (
    <tr>
      <td className="px-5 py-10 text-center text-slate-500" colSpan={colSpan}>
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-primary-600" />
          {text}
        </span>
      </td>
    </tr>
  );
}
