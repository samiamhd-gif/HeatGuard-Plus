"use client";

import {
  CloudSun,
  Droplets,
  Heart,
  ShieldCheck,
  Thermometer,
} from "lucide-react";
import { statusConfig } from "./config";
import { MiniStat } from "./MiniStat";
import type { HealthData } from "./types";

export function CurrentStatusCard({
  data,
  onHydrate,
}: {
  data: HealthData;
  onHydrate: () => void;
}) {
  const sc = statusConfig[data.stressLevel];

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-5 border-2 border-slate-900 shadow-[4px_4px_0_0_#0f172a]"
      style={{ backgroundColor: `${sc.color}0d` }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-11 h-11 rounded-xl text-white flex items-center justify-center border-2 border-slate-900 shrink-0"
            style={{ backgroundColor: sc.color }}
          >
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-black text-slate-900">{sc.label}</p>
            <p className="text-[11px] font-semibold text-slate-500">
              {sc.sublabel}
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p
            className="text-2xl font-black leading-none"
            style={{ color: sc.color }}
          >
            {Math.round(data.stressValue)}
          </p>
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-1">
            Stress Score
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white border-2 border-slate-900 px-2.5 py-1">
          <Thermometer className="w-3 h-3" style={{ color: sc.color }} />
          <span className="text-[10px] font-extrabold text-slate-600">
            Ambient {Math.round(data.ambientTemp)}°C
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white border-2 border-slate-900 px-2.5 py-1">
          <CloudSun className="w-3 h-3 text-slate-500" />
          <span className="text-[10px] font-extrabold text-slate-600">
            WBGT {Math.round(data.wbgtTemp)}°C
          </span>
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5 mt-4 pt-4 border-t-2 border-slate-900/15">
        <MiniStat
          icon={<Heart className="w-3.5 h-3.5" />}
          label="Heart Rate"
          value={`${Math.round(data.heartRate)}`}
          unit="bpm"
          accent="#f43f5e"
        />
        <MiniStat
          icon={<Thermometer className="w-3.5 h-3.5" />}
          label="Body Temp"
          value={`${data.bodyTemp}`}
          unit="°C"
          accent="#f59e0b"
        />
        <MiniStat
          icon={<Droplets className="w-3.5 h-3.5" />}
          label="Hydration"
          value={`${Math.round(data.hydration)}`}
          unit="%"
          accent="#0396fd"
          hint="Tap to record 250ml"
          onClick={onHydrate}
        />
      </div>
    </div>
  );
}
