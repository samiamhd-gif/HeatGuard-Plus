import type { HealthData, Level } from "./types";

export const brandLogos: Record<string, string> = {
  noon: "/storelogos/noon.svg",
  talabat: "/storelogos/talabat.svg",
  keeta: "/storelogos/keeta.png",
};

export const LEVEL_ORDER: Level[] = ["safe", "caution", "danger"];

export const LEVEL_VALUES: Record<Level, number> = {
  safe: 22,
  caution: 55,
  danger: 95,
};

export const statusConfig: Record<
  Level,
  {
    pulseClass: string;
    bg: string;
    gradient: string;
    ring: string;
    label: string;
    sublabel: string;
    color: string;
    glow: string;
  }
> = {
  safe: {
    pulseClass: "animate-pulse-ring-green",
    bg: "bg-[#96d416]",
    gradient: "from-emerald-500 to-[#96d416]",
    ring: "#96d416",
    label: "Low Risk",
    sublabel: "Normal Operating Vitals",
    color: "#16a34a",
    glow: "shadow-[0_0_22px_rgba(150,212,22,0.55)]",
  },
  caution: {
    pulseClass: "animate-pulse-ring-amber",
    bg: "bg-amber-500",
    gradient: "from-amber-400 to-orange-500",
    ring: "#f59e0b",
    label: "Moderate Strain",
    sublabel: "Shade & Hydration Advised",
    color: "#d97706",
    glow: "shadow-[0_0_22px_rgba(245,158,11,0.55)]",
  },
  danger: {
    pulseClass: "animate-pulse-ring-red",
    bg: "bg-rose-500",
    gradient: "from-rose-500 to-red-600",
    ring: "#ef4444",
    label: "High Heat Stress",
    sublabel: "Stop Riding Immediately",
    color: "#dc2626",
    glow: "shadow-[0_0_22px_rgba(239,68,68,0.6)]",
  },
};

export const INITIAL_DATA: HealthData = {
  heartRate: 82,
  bodyTemp: 37.2,
  hydration: 74,
  adherence: 88,
  stressLevel: "safe",
  stressValue: 24,
  wbgtTemp: 31.4,
  ambientTemp: 42,
  humidity: 58,
  uvIndex: 10,
  streakDays: 7,
};
