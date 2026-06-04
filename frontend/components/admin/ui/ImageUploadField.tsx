'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ImagePlus, Loader2 } from 'lucide-react';
import { uploadApi } from '@/lib/api/modul';

type ImageUploadFieldProps = {
  label?: string;
  value: string;
  onChange: (url: string) => void;
};

export function ImageUploadField({
  label = 'Gambar',
  value,
  onChange,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const res = await uploadApi.image(file);
      onChange(res.data.data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengunggah gambar');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div className="space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="flex flex-wrap items-start gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/80 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 disabled:opacity-60"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <ImagePlus className="h-4 w-4" aria-hidden />
          )}
          {uploading ? 'Mengunggah...' : 'Unggah gambar'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={onFileChange}
        />
      </div>
      <input
        className="admin-input"
        placeholder="Atau tempel URL gambar"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <div className="relative h-24 w-40 overflow-hidden rounded-lg border border-slate-200">
          <Image src={value} alt="Pratinjau" fill className="object-cover" unoptimized />
        </div>
      )}
      {error && <p className="text-sm text-rose-600">{error}</p>}
    </div>
  );
}
