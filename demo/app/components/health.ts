import type { ChartRange, CompliancePoint, HealthData, Level } from "./types";

export function randomBetween(min: number, max: number) {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function seedComplianceHistory(current: number): CompliancePoint[] {
  const now = Date.now();
  const hours = 24;
  const stepsPerHour = 4;
  const totalSteps = hours * stepsPerHour;
  const points: CompliancePoint[] = [];

  let value = clamp(current + randomBetween(-18, -8), 42, 96);
  for (let i = totalSteps; i >= 0; i--) {
    const t = now - i * ((60 * 60 * 1000) / stepsPerHour);
    value = clamp(value + randomBetween(-3.2, 3.6), 35, 100);
    points.push({ t, value: Math.round(value * 10) / 10 });
  }
  points[points.length - 1] = { t: now, value: current };
  return points;
}

export function formatRangeStart(range: ChartRange) {
  return range === "1h"
    ? "1 hour ago"
    : range === "6h"
      ? "6 hours ago"
      : "24 hours ago";
}

export function stepHealthData(prev: HealthData): HealthData {
  const heartRate = clamp(prev.heartRate + randomBetween(-4, 4), 68, 114);
  const bodyTemp = clamp(prev.bodyTemp + randomBetween(-0.1, 0.1), 36.6, 39.4);
  const ambientTemp = clamp(
    prev.ambientTemp + randomBetween(-0.4, 0.4),
    37,
    46,
  );
  const wbgtTemp = clamp(
    prev.wbgtTemp + randomBetween(-0.25, 0.25),
    28.5,
    34.5,
  );
  const humidity = clamp(prev.humidity + randomBetween(-0.8, 0.8), 45, 72);
  const hydration = clamp(prev.hydration - 0.3, 30, 100);

  const hrStress = ((heartRate - 68) / (114 - 68)) * 45;
  const bodyStress = ((bodyTemp - 36.6) / (39.4 - 36.6)) * 40;
  const ambientStress = ((ambientTemp - 37) / (46 - 37)) * 15;
  let stressValue =
    prev.stressValue * 0.55 + (hrStress + bodyStress + ambientStress) * 0.45;
  stressValue += randomBetween(-2, 2);
  if (Math.random() < 0.04) stressValue += randomBetween(8, 16);
  stressValue = clamp(stressValue, 8, 95);

  const stressLevel: Level =
    stressValue >= 66 ? "danger" : stressValue >= 35 ? "caution" : "safe";

  const adherence = clamp(prev.adherence + randomBetween(-0.5, 0.5), 60, 100);

  return {
    heartRate: Math.round(heartRate * 10) / 10,
    bodyTemp: Math.round(bodyTemp * 10) / 10,
    hydration: Math.round(hydration * 10) / 10,
    adherence: Math.round(adherence * 10) / 10,
    stressLevel,
    stressValue: Math.round(stressValue * 10) / 10,
    wbgtTemp: Math.round(wbgtTemp * 10) / 10,
    ambientTemp: Math.round(ambientTemp * 10) / 10,
    humidity: Math.round(humidity * 10) / 10,
    uvIndex: prev.uvIndex,
    streakDays: prev.streakDays,
  };
}

const STRESS_ELEVATION: Record<Level, { heartRate: number; bodyTemp: number }> =
  {
    safe: { heartRate: 0, bodyTemp: 0 },
    caution: { heartRate: 8, bodyTemp: 0.4 },
    danger: { heartRate: 26, bodyTemp: 1.2 },
  };

export function withStressElevation(data: HealthData): HealthData {
  const elevation = STRESS_ELEVATION[data.stressLevel];
  if (elevation.heartRate === 0 && elevation.bodyTemp === 0) return data;
  return {
    ...data,
    heartRate:
      Math.round(clamp(data.heartRate + elevation.heartRate, 98, 128) * 10) /
      10,
    bodyTemp:
      Math.round(clamp(data.bodyTemp + elevation.bodyTemp, 37.8, 39.8) * 10) /
      10,
  };
}
