'use client';

type AdminLoadingRowProps = {
  colSpan: number;
  text?: string;
};

export function AdminLoadingRow({ colSpan, text = 'Memuat data...' }: AdminLoadingRowProps) {
  return (
    <tr>
      <td className="px-4 py-6 text-slate-500" colSpan={colSpan}>
        {text}
      </td>
    </tr>
  );
}
