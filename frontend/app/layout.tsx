import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import { AppShell } from '@/components/layout/AppShell';
import { DESA_INFO } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: `${DESA_INFO.name} | Portal Resmi`,
    template: `%s | ${DESA_INFO.name}`,
  },
  description: `Website resmi ${DESA_INFO.name} — informasi profil, pemerintahan, berita, dan layanan publik.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans`}>
        <QueryProvider>
          <AppShell>{children}</AppShell>
        </QueryProvider>
      </body>
    </html>
  );
}
