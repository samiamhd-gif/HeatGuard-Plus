"use client";

import { Gift, TrendingDown, TrendingUp } from "lucide-react";
import { ComplianceChart } from "./ComplianceChart";
import { formatRangeStart } from "./health";
import type { ChartRange, CompliancePoint } from "./types";

export function ComplianceGraphCard({
  history,
  current,
  range,
  now,
  onRangeChange,
}: {
  history: CompliancePoint[];
  current: number;
  range: ChartRange;
  now: number;
  onRangeChange: (r: ChartRange) => void;
}) {
  const rangeMs =
    range === "1h" ? 3_600_000 : range === "6h" ? 21_600_000 : 86_400_000;
  const filtered = history.filter((p) => p.t >= now - rangeMs);
  const points = filtered.length >= 2 ? filtered : history.slice(-2);
  const first = points[0]?.value ?? current;
  const delta = Math.round((current - first) * 10) / 10;
  const trendUp = delta >= 0;

  const tier =
    current >= 85
      ? "Gold"
      : current >= 70
        ? "Silver"
        : current >= 50
          ? "Bronze"
          : null;
  const nextTier =
    current >= 85
      ? null
      : current >= 70
        ? { name: "Gold", pct: 85 }
        : current >= 50
          ? { name: "Silver", pct: 70 }
          : { name: "Bronze", pct: 50 };

  return (
    <div className="bento-card rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-slate-500">
            Compliance Rate
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {Math.round(current)}%
            </span>
            <span
              className={`flex items-center gap-0.5 text-[11px] font-extrabold ${
                trendUp ? "text-emerald-600" : "text-rose-500"
              }`}
            >
              {trendUp ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              {Math.abs(delta)}%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 border-2 border-slate-900 rounded-xl p-1 shrink-0">
          {(["1h", "6h", "24h"] as ChartRange[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onRangeChange(r)}
              className={`px-2 py-1 rounded-lg text-[10px] font-black transition-all ${
                range === r ? "gradient-hg text-white" : "text-slate-500"
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <ComplianceChart points={points} />
        <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 mt-1">
          <span>{formatRangeStart(range)}</span>
          <span>Now</span>
        </div>
      </div>

      <div className="mt-4 w-full flex items-center gap-2.5 rounded-xl border-2 border-slate-900 bg-gradient-to-r from-hg-blue/10 to-hg-green/10 px-3.5 py-2.5">
        <span className="w-8 h-8 rounded-lg gradient-hg border-2 border-slate-900 flex items-center justify-center shrink-0">
          <Gift className="w-4 h-4 text-white" />
        </span>
        <span className="min-w-0">
          <span className="block text-xs font-extrabold text-slate-900 truncate">
            {tier
              ? `${tier} Tier coupons unlocked!`
              : `Reach ${nextTier?.pct}% for ${nextTier?.name} coupons`}
          </span>
          <span className="block text-[10px] font-semibold text-slate-500">
            {tier
              ? "You are eligible for the current coupon tier"
              : `${Math.max(0, Math.round((nextTier?.pct ?? 0) - current))}% to go`}
          </span>
        </span>
      </div>
    </div>
  );
}
