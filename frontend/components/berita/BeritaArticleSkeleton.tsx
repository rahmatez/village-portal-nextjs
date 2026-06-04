import { Skeleton } from '@/components/ui/Skeleton';

export function BeritaArticleSkeleton() {
  return (
    <div className="bg-slate-50 pb-16">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <Skeleton className="h-4 w-56" />
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Skeleton className="aspect-[16/10] w-full rounded-none" />
          <div className="space-y-4 p-6 md:p-10">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-4/5" />
            <div className="flex gap-3">
              <Skeleton className="h-8 w-36 rounded-full" />
              <Skeleton className="h-8 w-28 rounded-full" />
            </div>
            <Skeleton className="mt-4 h-5 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
