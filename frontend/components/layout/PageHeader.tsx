import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

type Breadcrumb = { label: string; href?: string };

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs: Breadcrumb[];
}

export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <nav className="mb-4 flex flex-wrap items-center gap-1 text-sm text-primary-200">
          <Link href="/" className="flex items-center hover:text-white">
            <Home className="mr-1 h-4 w-4" />
            Beranda
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-white">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-primary-100">{description}</p>}
      </div>
    </div>
  );
}
