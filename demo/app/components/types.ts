export type Level = "safe" | "caution" | "danger";

export interface HealthData {
  heartRate: number;
  bodyTemp: number;
  hydration: number;
  adherence: number;
  stressLevel: Level;
  stressValue: number;
  wbgtTemp: number;
  ambientTemp: number;
  humidity: number;
  uvIndex: number;
  streakDays: number;
}

export type AlertPhase = "idle" | "warning" | "panel";
export type AlertOutcome = "comply" | "ignore";
export type ChartRange = "1h" | "6h" | "24h";

export interface CompliancePoint {
  t: number;
  value: number;
}

export interface ComplianceTransition {
  from: number;
  to: number;
  outcome: AlertOutcome;
}
