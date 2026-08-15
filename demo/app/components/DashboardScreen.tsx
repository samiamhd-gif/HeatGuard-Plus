"use client";

import { CircleCheck, X } from "lucide-react";
import { useState } from "react";
import { AnimatedSun } from "./AnimatedSun";
import { ComplianceGraphCard } from "./ComplianceGraphCard";
import { CurrentStatusCard } from "./CurrentStatusCard";
import { FoodOffersCard } from "./FoodOffersCard";
import type { ChartRange, CompliancePoint, HealthData } from "./types";

export function DashboardScreen({
  data,
  onHydrate,
  history,
  range,
  now,
  onRangeChange,
}: {
  data: HealthData;
  onHydrate: () => void;
  history: CompliancePoint[];
  range: ChartRange;
  now: number;
  onRangeChange: (r: ChartRange) => void;
}) {
  const [showToast, setShowToast] = useState(false);

  const handleHydrateClick = () => {
    onHydrate();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const currentHour = now > 0 ? new Date(now).getHours() : 0;
  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
        ? "Good Afternoon"
        : "Good Evening";

  return (
    <div className="flex flex-col gap-5 pb-6 animate-slide-up">
      <div className="relative overflow-hidden rounded-3xl gradient-hg p-6 sm:p-7 border-2 border-slate-900 shadow-[5px_5px_0_0_#0f172a]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-1/4 -right-1/4 w-2/3 h-2/3 rounded-full bg-white/20 blur-[70px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-1/2 h-1/2 rounded-full bg-hg-green/25 blur-[70px]" />
          <div className="absolute inset-x-6 top-0 h-px bg-white/25" />
        </div>

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/85">
                {greeting}
              </span>
            </div>
            <h1 className="mt-2.5 text-[30px] sm:text-[34px] font-black tracking-tight text-white leading-none">
              Javiru
            </h1>
            <p className="mt-2 text-xs font-semibold text-white/75">
              Thermal protection active &amp; vitals streaming live.
            </p>
          </div>

          <AnimatedSun />
        </div>
      </div>

      {showToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2.5rem)] max-w-sm animate-slide-down">
          <div className="relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-md border-2 border-slate-900 shadow-[4px_4px_0_0_#0f172a] px-4 py-3.5 flex items-center gap-3">
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100">
              <div
                className="h-full gradient-hg rounded-r-full transition-all duration-700 ease-out"
                style={{
                  width: `${Math.min(100, Math.round(data.hydration))}%`,
                }}
              />
            </div>

            <div className="relative w-10 h-10 rounded-xl gradient-hg text-white flex items-center justify-center border-2 border-slate-900 shrink-0">
              <CircleCheck className="w-5 h-5" strokeWidth={2.6} />
            </div>
            <div className="relative flex-1 min-w-0">
              <p className="text-xs font-black text-slate-900 tracking-tight">
                Water Logged
              </p>
              <p className="text-[10px] font-semibold text-slate-500 mt-0.5">
                +250 ml &middot; Hydration now at {Math.round(data.hydration)}%
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowToast(false)}
              aria-label="Dismiss notification"
              className="relative p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <ComplianceGraphCard
        history={history}
        current={data.adherence}
        range={range}
        now={now}
        onRangeChange={onRangeChange}
      />

      <CurrentStatusCard data={data} onHydrate={handleHydrateClick} />

      <FoodOffersCard adherence={data.adherence} />
    </div>
  );
}
