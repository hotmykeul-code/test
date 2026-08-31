import React from 'react';
import { ToneRadar } from '../types';

interface RadarChartProps {
  data: ToneRadar;
  size?: number;
  interactive?: boolean;
  onChange?: (key: keyof ToneRadar, value: number) => void;
}

const AXIS_LABELS: Record<keyof ToneRadar, string> = {
  humour: 'Humour & Dérision',
  formalisme: 'Formalisme',
  energie: 'Énergie & Punch',
  empathie: 'Empathie',
  storytelling: 'Storytelling',
  technicite: 'Technicité',
  clivage: 'Clivage & Impact',
  rythme: 'Rythme & Concision',
};

const AXES_KEYS = Object.keys(AXIS_LABELS) as (keyof ToneRadar)[];

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  size = 320,
  interactive = false,
  onChange,
}) => {
  const center = size / 2;
  const radius = size * 0.38;
  const numAxes = AXES_KEYS.length;
  const angleStep = (Math.PI * 2) / numAxes;

  // Compute polygon points
  const points = AXES_KEYS.map((key, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const value = Math.max(10, Math.min(100, data[key] || 50));
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  // Grid concentric rings
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <div className="relative flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible select-none"
        id="radar-chart-svg"
      >
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.05" />
          </radialGradient>
          <linearGradient id="polygonStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Concentric Web Rings */}
        {rings.map((ringFactor, i) => (
          <polygon
            key={i}
            points={AXES_KEYS.map((_, index) => {
              const angle = index * angleStep - Math.PI / 2;
              const r = ringFactor * radius;
              return `${(center + r * Math.cos(angle)).toFixed(1)},${(center + r * Math.sin(angle)).toFixed(1)}`;
            }).join(' ')}
            fill="none"
            stroke="currentColor"
            className="text-neutral-800"
            strokeWidth="1"
            strokeDasharray={i === rings.length - 1 ? 'none' : '3 3'}
          />
        ))}

        {/* Axis Lines & Labels */}
        {AXES_KEYS.map((key, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const xEnd = center + radius * Math.cos(angle);
          const yEnd = center + radius * Math.sin(angle);
          const labelDist = radius + 24;
          const xLabel = center + labelDist * Math.cos(angle);
          const yLabel = center + labelDist * Math.sin(angle);

          return (
            <g key={key}>
              <line
                x1={center}
                y1={center}
                x2={xEnd}
                y2={yEnd}
                stroke="currentColor"
                className="text-neutral-800"
                strokeWidth="1"
              />
              <text
                x={xLabel}
                y={yLabel}
                textAnchor={Math.abs(Math.cos(angle)) < 0.15 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end'}
                dominantBaseline="central"
                className="text-[10px] font-medium fill-neutral-400 tracking-tight transition-colors duration-200"
              >
                {AXIS_LABELS[key]}
              </text>
            </g>
          );
        })}

        {/* Data Area Fill */}
        <polygon
          points={points}
          fill="url(#radarGlow)"
          stroke="url(#polygonStroke)"
          strokeWidth="2.5"
          className="transition-all duration-300 ease-out drop-shadow-sm"
        />

        {/* Data Point Markers */}
        {AXES_KEYS.map((key, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const value = data[key] || 50;
          const r = (value / 100) * radius;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);

          return (
            <g key={`point-${key}`} className="cursor-pointer group">
              <circle
                cx={x}
                cy={y}
                r={interactive ? 6 : 4}
                className="fill-amber-400 stroke-neutral-950 stroke-2 transition-all duration-200 group-hover:scale-125"
              />
            </g>
          );
        })}
      </svg>

      {/* Interactive sliders if interactive mode is on */}
      {interactive && onChange && (
        <div className="w-full mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-neutral-900/80 p-4 rounded-xl border border-neutral-800">
          {AXES_KEYS.map((key) => (
            <div key={key} className="flex flex-col gap-1">
              <div className="flex justify-between text-neutral-400">
                <span className="truncate">{AXIS_LABELS[key].split(' ')[0]}</span>
                <span className="font-semibold text-amber-400">{data[key]}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={data[key]}
                onChange={(e) => onChange(key, parseInt(e.target.value))}
                className="accent-amber-500 bg-neutral-800 h-1 rounded cursor-pointer"
                id={`slider-${key}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
