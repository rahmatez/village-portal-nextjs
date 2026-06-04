import type { DataStatistik } from '@/lib/api';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function fetchStatistik(): Promise<DataStatistik | null> {
  try {
    const res = await fetch(`${API_BASE}/statistik`, { next: { revalidate: 120 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as DataStatistik;
  } catch {
    return null;
  }
}
