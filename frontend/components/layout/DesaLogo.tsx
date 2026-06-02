import Image from 'next/image';

interface DesaLogoProps {
  size?: number;
  className?: string;
}

export function DesaLogo({ size = 44, className = '' }: DesaLogoProps) {
  return (
    <Image
      src="/logo-desa.png"
      alt="Logo Pemerintah Desa Mindaka"
      width={size}
      height={size}
      className={`rounded-full object-cover ring-2 ring-white shadow-md ${className}`}
      priority
    />
  );
}
