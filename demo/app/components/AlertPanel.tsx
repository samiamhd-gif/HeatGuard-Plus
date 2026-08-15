"use client";

import {
  AlertTriangle,
  CircleParking,
  Droplets,
  Heart,
  Moon,
  Thermometer,
} from "lucide-react";
import type { AlertOutcome, HealthData } from "./types";

export function AlertPanel({
  data,
  onResolve,
}: {
  data: HealthData;
  onResolve: (outcome: AlertOutcome) => void;
}) {
  return (
    <>
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide animate-slide-up">
        <div className="min-h-full flex flex-col">
          <div className="my-auto">
            <div className="flex flex-col animate-slide-up">
              <div className="flex items-center gap-3 rounded-2xl border-2 border-slate-900 bg-danger px-4 py-3 shadow-[4px_4px_0_0_#0f172a]">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border-2 border-slate-900 shrink-0">
                  <AlertTriangle className="w-5 h-5 text-danger" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-white">
                    Heat Strain Alert
                  </p>
                  <p className="text-[11px] font-bold text-white/80">
                    Immediate action required
                  </p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-black text-danger border-2 border-slate-900 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
                  LIVE
                </span>
              </div>

              <div className="mt-4 bento-card rounded-2xl p-4">
                <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-slate-500">
                  Current Status
                </p>
                <div className="grid grid-cols-2 gap-2.5 mt-3">
                  <div className="rounded-xl border-2 border-slate-900 p-3">
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-[10px] font-bold text-slate-500">
                          Body Temp
                        </span>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-amber-500 px-1.5 py-0.5 text-[9px] font-black text-white border border-amber-700">
                        ELEVATED
                      </span>
                    </div>
                    <p className="mt-1.5 text-2xl font-black text-slate-900">
                      {data.bodyTemp}
                      <span className="text-sm font-bold text-slate-400">
                        °C
                      </span>
                    </p>
                  </div>
                  <div className="rounded-xl border-2 border-slate-900 p-3">
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-rose-500" />
                        <span className="text-[10px] font-bold text-slate-500">
                          Heart Rate
                        </span>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-rose-500 px-1.5 py-0.5 text-[9px] font-black text-white border border-rose-700">
                        ELEVATED
                      </span>
                    </div>
                    <p className="mt-1.5 text-2xl font-black text-slate-900">
                      {Math.round(data.heartRate)}
                      <span className="text-sm font-bold text-slate-400">
                        bpm
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 bento-card rounded-2xl p-4">
                <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-slate-500">
                  Recommended Actions
                </p>
                <div className="flex flex-col gap-2 mt-3">
                  {[
                    {
                      icon: <CircleParking className="w-4 h-4 text-hg-blue" />,
                      text: "Safely pull over to the side of the road",
                    },
                    {
                      icon: <Moon className="w-4 h-4 text-indigo-500" />,
                      text: "Rest and cool down before continuing",
                    },
                    {
                      icon: <Droplets className="w-4 h-4 text-amber-500" />,
                      text: "Drink water to rehydrate",
                    },
                  ].map((action) => (
                    <div
                      key={action.text}
                      className="flex items-center gap-3 rounded-xl border-2 border-slate-900 bg-slate-50 px-3 py-2.5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white border-2 border-slate-900 flex items-center justify-center shrink-0">
                        {action.icon}
                      </div>
                      <p className="text-xs font-bold text-slate-700">
                        {action.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 mt-5 grid grid-cols-2 gap-3 animate-slide-up">
        <button
          type="button"
          onClick={() => onResolve("comply")}
          className="rounded-xl border-2 border-slate-900 gradient-hg text-white px-4 py-3.5 text-sm font-black shadow-[3px_3px_0_0_#0f172a] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
        >
          Comply
        </button>
        <button
          type="button"
          onClick={() => onResolve("ignore")}
          className="rounded-xl border-2 border-slate-900 bg-white text-slate-900 px-4 py-3.5 text-sm font-black shadow-[3px_3px_0_0_#0f172a] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
        >
          Ignore
        </button>
      </div>
    </>
  );
}
