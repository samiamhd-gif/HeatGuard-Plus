import type { ReactNode } from "react";

export function MiniStat({
  icon,
  label,
  value,
  unit,
  accent,
  onClick,
  hint,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  unit: string;
  accent: string;
  onClick?: () => void;
  hint?: string;
}) {
  const content = (
    <>
      <span
        className="w-8 h-8 rounded-lg flex items-center justify-center border-2 border-slate-900 shrink-0"
        style={{ backgroundColor: `${accent}18`, color: accent }}
      >
        {icon}
      </span>
      <span className="text-sm font-black text-slate-900 leading-none mt-1.5">
        {value}
        <span className="text-[9px] font-bold ml-0.5" style={{ color: accent }}>
          {unit}
        </span>
      </span>
      <span className="text-[8px] font-bold uppercase tracking-wide text-slate-400 mt-0.5">
        {label}
      </span>
      {hint && (
        <span
          className="text-[7px] font-black text-center leading-tight mt-0.5"
          style={{ color: accent }}
        >
          {hint}
        </span>
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex flex-col items-center gap-0 rounded-xl border-2 border-slate-900 bg-white p-2.5 active:scale-95 transition-transform"
      >
        {content}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center gap-0 rounded-xl border-2 border-slate-900 bg-white p-2.5">
      {content}
    </div>
  );
}
