"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertScreen } from "./components/AlertScreen";
import { ComplianceScreen } from "./components/ComplianceScreen";
import { INITIAL_DATA, LEVEL_ORDER, LEVEL_VALUES } from "./components/config";
import { DashboardScreen } from "./components/DashboardScreen";
import {
  clamp,
  seedComplianceHistory,
  stepHealthData,
  withStressElevation,
} from "./components/health";
import type {
  AlertOutcome,
  AlertPhase,
  ChartRange,
  CompliancePoint,
  ComplianceTransition,
  HealthData,
  Level,
} from "./components/types";
import { useAutoFullscreen } from "./components/useAutoFullscreen";

export default function Home() {
  useAutoFullscreen();

  const [alertPhase, setAlertPhase] = useState<AlertPhase>("idle");
  const [transition, setTransition] = useState<ComplianceTransition | null>(
    null,
  );
  const [chartRange, setChartRange] = useState<ChartRange>("1h");
  const [now, setNow] = useState(0);
  const [history, setHistory] = useState<CompliancePoint[]>([]);
  const [data, setData] = useState<HealthData>(INITIAL_DATA);
  const prevLevel = useRef<Level>("safe");

  const updateData = useCallback(() => {
    setData((prev) => stepHealthData(prev));
  }, []);

  const handleManualHydrate = () => {
    setData((prev) => ({
      ...prev,
      hydration: Math.min(100, prev.hydration + 15),
    }));
  };

  const handleResolveAlert = (outcome: AlertOutcome) => {
    const delta = outcome === "comply" ? 2 : -4;
    const from = data.adherence;
    const to = clamp(from + delta, 0, 100);
    setData({ ...data, adherence: to });
    setHistory((prev) => [...prev.slice(-95), { t: Date.now(), value: to }]);
    setTransition({ from, to, outcome });
    setAlertPhase("idle");
  };

  useEffect(() => {
    const interval = setInterval(updateData, 9000);
    return () => clearInterval(interval);
  }, [updateData]);

  useEffect(() => {
    setNow(Date.now());
    setHistory(seedComplianceHistory(88));
  }, []);

  useEffect(() => {
    if (now === 0) return;
    setHistory((prev) => {
      const last = prev[prev.length - 1];
      const value = Math.round(data.adherence * 10) / 10;
      if (last && Math.abs(last.value - value) < 0.05) return prev;
      return [...prev.slice(-199), { t: Date.now(), value }];
    });
  }, [now, data.adherence]);

  useEffect(() => {
    if (
      data.stressLevel === "danger" &&
      prevLevel.current !== "danger" &&
      alertPhase === "idle" &&
      transition === null
    ) {
      setAlertPhase("warning");
    }
    prevLevel.current = data.stressLevel;
  }, [data.stressLevel, alertPhase, transition]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.code !== "KeyS" && event.code !== "KeyW") return;
      const index = LEVEL_ORDER.indexOf(data.stressLevel);
      const dir = event.code === "KeyS" ? 1 : -1;
      const next =
        LEVEL_ORDER[(index + dir + LEVEL_ORDER.length) % LEVEL_ORDER.length];
      setData((prev) => ({
        ...prev,
        stressLevel: next,
        stressValue: LEVEL_VALUES[next],
      }));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [data.stressLevel]);

  return (
    <>
      {alertPhase !== "idle" ? (
        <AlertScreen
          phase={alertPhase}
          data={withStressElevation(data)}
          onPhaseChange={setAlertPhase}
          onResolve={handleResolveAlert}
        />
      ) : transition ? (
        <ComplianceScreen
          transition={transition}
          onDone={() => setTransition(null)}
        />
      ) : (
        <div className="app-shell flex flex-col h-dvh max-w-md mx-auto relative text-foreground overflow-hidden shadow-2xl">
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute -top-20 -left-16 w-64 h-64 rounded-full bg-hg-blue/10 blur-3xl animate-float-blob" />
            <div
              className="absolute top-44 -right-20 w-72 h-72 rounded-full bg-hg-green/[0.07] blur-3xl animate-float-blob"
              style={{ animationDelay: "-5s" }}
            />
            <div
              className="absolute bottom-32 -left-20 w-64 h-64 rounded-full bg-hg-cyan/10 blur-3xl animate-float-blob"
              style={{ animationDelay: "-9s" }}
            />
          </div>

          <div className="relative z-10 flex-1 overflow-y-auto px-4 pt-4 pb-8 app-scroll scrollbar-hide">
            <DashboardScreen
              data={withStressElevation(data)}
              onHydrate={handleManualHydrate}
              history={history}
              range={chartRange}
              now={now}
              onRangeChange={setChartRange}
            />
          </div>
        </div>
      )}
    </>
  );
}
