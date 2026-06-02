interface ProgressBarProps {
  label: string;
  value: number;
  max?: number;
  displayValue?: string;
  barClassName?: string;
}

export function ProgressBar({
  label,
  value,
  max = 100,
  displayValue,
  barClassName = 'bg-primary-500',
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">{displayValue ?? `${value.toFixed(1)}%`}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barClassName}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
