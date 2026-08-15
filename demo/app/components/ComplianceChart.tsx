import { clamp } from "./health";
import type { CompliancePoint } from "./types";

export function ComplianceChart({ points }: { points: CompliancePoint[] }) {
  const width = 100;
  const height = 40;
  const data = points.length >= 2 ? points : [...points, ...points];
  const xs = data.map((_, i) => (i / (data.length - 1)) * width);
  const ys = data.map((p) => height - (clamp(p.value, 0, 100) / 100) * height);
  const linePath = xs
    .map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`)
    .join(" ");
  const areaPath = `${linePath} L${width},${height} L0,${height} Z`;

  return (
    <div className="relative h-24 w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="complianceFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0396fd" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#96d416" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="complianceStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0396fd" />
            <stop offset="100%" stopColor="#96d416" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#complianceFill)" stroke="none" />
        <path
          d={linePath}
          fill="none"
          stroke="url(#complianceStroke)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
