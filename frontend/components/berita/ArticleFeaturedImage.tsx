'use client';

import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

type ArticleFeaturedImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  /** Tanpa border/radius — untuk dipasang di atas kartu artikel */
  flush?: boolean;
  className?: string;
};

export function ArticleFeaturedImage({
  src,
  alt,
  priority = true,
  flush = false,
  className = '',
}: ArticleFeaturedImageProps) {
  if (!src?.trim()) {
    return (
      <div
        className={`flex aspect-[16/10] w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-400 sm:aspect-[21/9] ${className}`}
        role="img"
        aria-label={alt}
      >
        <ImageIcon className="h-10 w-10 opacity-60" aria-hidden />
      </div>
    );
  }

  const frameClass = flush
    ? 'relative w-full overflow-hidden bg-slate-100'
    : 'relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-md';

  return (
    <div className={`${frameClass} ${className}`.trim()}>
      <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          priority={priority}
          unoptimized={src.startsWith('http://') && !src.includes('localhost')}
        />
      </div>
    </div>
  );
}
