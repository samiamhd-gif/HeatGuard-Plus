"use client";

import { AlertTriangle, Volume2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { AlertPanel } from "./AlertPanel";
import type { AlertOutcome, AlertPhase, HealthData } from "./types";

export function AlertScreen({
  phase,
  data,
  onPhaseChange,
  onResolve,
}: {
  phase: Exclude<AlertPhase, "idle">;
  data: HealthData;
  onPhaseChange: (phase: Exclude<AlertPhase, "idle">) => void;
  onResolve: (outcome: AlertOutcome) => void;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const onResolveRef = useRef(onResolve);

  useEffect(() => {
    onResolveRef.current = onResolve;
  });

  useEffect(() => {
    const audio = new Audio("/Sound.mp3");
    audio.loop = false;
    audioRef.current = audio;
    audio.play().catch(() => {});
    const stop = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 2000);
    return () => {
      clearTimeout(stop);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (phase !== "warning") return;
    const t = setTimeout(() => onPhaseChange("panel"), 1900);
    return () => clearTimeout(t);
  }, [phase, onPhaseChange]);

  useEffect(() => {
    if (phase !== "panel") return;
    const t = setTimeout(
      () => {
        audioRef.current?.pause();
        onResolveRef.current("ignore");
      },
      5 * 60 * 1000,
    );
    return () => clearTimeout(t);
  }, [phase]);

  const handleResolve = (outcome: AlertOutcome) => {
    audioRef.current?.pause();
    onResolve(outcome);
  };

  return (
    <div className="fixed inset-0 z-[90] bg-background">
      <div className="h-full max-w-md mx-auto app-shell flex flex-col px-5 py-8 animate-fade-in">
        {phase === "warning" ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-slide-up">
            <div className="relative w-28 h-28 rounded-full bg-danger border-2 border-slate-900 flex items-center justify-center animate-pulse-ring-red">
              <AlertTriangle
                className="w-12 h-12 text-white"
                strokeWidth={2.2}
              />
            </div>
            <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-900">
              HEAT STRAIN
            </h1>
            <p className="mt-1 text-sm font-bold text-slate-500">
              High thermal stress detected
            </p>
            <div className="mt-6 flex items-center gap-2 text-slate-400">
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Alert tone playing
              </span>
            </div>
          </div>
        ) : (
          <AlertPanel data={data} onResolve={handleResolve} />
        )}
      </div>
    </div>
  );
}
