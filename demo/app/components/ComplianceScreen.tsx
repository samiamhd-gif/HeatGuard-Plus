"use client";

import {
  AlertTriangle,
  CircleCheck,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ComplianceTransition } from "./types";
import { useCountUp } from "./useCountUp";

export function ComplianceScreen({
  transition,
  onDone,
}: {
  transition: ComplianceTransition;
  onDone: () => void;
}) {
  const complied = transition.outcome === "comply";
  const delta = Math.round((transition.to - transition.from) * 10) / 10;
  const score = useCountUp(transition.from, transition.to);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowButton(true), 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 z-[90] bg-background">
      <div className="h-full max-w-md mx-auto app-shell flex flex-col items-center justify-center px-6 text-center overflow-y-auto scrollbar-hide animate-fade-in">
        <div
          className={`relative w-24 h-24 rounded-full border-2 border-slate-900 flex items-center justify-center ${
            complied ? "bg-emerald-500" : "bg-amber-400"
          } ${complied ? "animate-pulse-ring-green" : "animate-pulse-ring-amber"}`}
        >
          {complied ? (
            <CircleCheck className="w-10 h-10 text-white" strokeWidth={2.4} />
          ) : (
            <AlertTriangle className="w-10 h-10 text-white" strokeWidth={2.4} />
          )}
        </div>

        <p className="mt-6 text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">
          Compliance Score
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-5xl font-black tracking-tight text-slate-900">
            {Math.round(score)}
          </span>
          <span className="text-xl font-black text-slate-300">%</span>
        </div>
        <div
          className={`mt-2 flex items-center gap-1.5 text-sm font-black ${
            complied ? "text-emerald-600" : "text-rose-500"
          }`}
        >
          {complied ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {delta > 0 ? `+${delta}` : delta}
        </div>

        <div className="mt-5 w-full max-w-[260px] bg-slate-100 h-3 rounded-full overflow-hidden border-2 border-slate-900">
          <div
            className={`h-full transition-all duration-700 ${
              complied ? "gradient-hg" : "bg-rose-400"
            }`}
            style={{ width: `${score}%` }}
          />
        </div>

        <h1 className="mt-8 text-2xl font-black tracking-tight text-slate-900 leading-tight">
          {complied
            ? "Thank you for prioritising your health"
            : "Please proceed with caution"}
        </h1>
        <p className="mt-2 text-xs font-semibold text-slate-500 leading-relaxed">
          {complied
            ? "Your compliance score has been updated. Rewards are closer than ever."
            : "Repeatedly ignoring alerts can affect your rewards and eligibility."}
        </p>

        <button
          type="button"
          onClick={onDone}
          className={`mt-8 rounded-xl border-2 border-slate-900 gradient-hg text-white px-8 py-3.5 text-sm font-black shadow-[4px_4px_0_0_#0f172a] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all ${
            showButton
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 pointer-events-none"
          }`}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
