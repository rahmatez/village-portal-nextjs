'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { DESA_INFO, NAV_LINKS } from '@/lib/constants';
import { DesaLogo } from './DesaLogo';

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-primary-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <DesaLogo size={48} />
          <div>
            <p className="text-lg font-bold leading-tight text-primary-800">{DESA_INFO.name}</p>
            <p className="text-xs text-slate-500">{DESA_INFO.tagline}</p>
          </div>
        </Link>

        <button
          type="button"
          className="rounded-lg p-2 text-primary-700 hover:bg-primary-50 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <ul
          className={`absolute left-0 right-0 top-full border-b border-primary-100 bg-white px-4 py-4 lg:static lg:flex lg:items-center lg:gap-1 lg:border-0 lg:p-0 ${
            open ? 'block' : 'hidden lg:flex'
          }`}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-600 lg:py-1"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
