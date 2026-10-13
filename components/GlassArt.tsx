import type { GlassKey } from "@/lib/types";

type Shape = {
  body: string;
  liquidTop: number;
  rim: { x: number; y: number };
  stem?: { from: number; to: number };
  ice?: boolean;
  handle?: string;
};

const shapes: Record<Exclude<GlassKey, "beer">, Shape> = {
  martini: {
    body: "M18 28 H102 L60 90 Z",
    liquidTop: 36,
    rim: { x: 97, y: 28 },
    stem: { from: 90, to: 140 },
  },
  coupe: {
    body: "M16 38 C16 84 40 94 60 94 C80 94 104 84 104 38 Z",
    liquidTop: 46,
    rim: { x: 100, y: 38 },
    stem: { from: 94, to: 140 },
  },
  rocks: {
    body: "M28 56 H92 L87 140 Q86.5 144 82 144 H38 Q33.5 144 33 140 Z",
    liquidTop: 70,
    rim: { x: 90, y: 56 },
    ice: true,
  },
  highball: {
    body: "M36 22 H84 L80 142 Q79.6 146 75 146 H45 Q40.4 146 40 142 Z",
    liquidTop: 42,
    rim: { x: 83, y: 22 },
    ice: true,
  },
  mug: {
    body: "M30 44 H90 L85 136 Q84.6 142 79 142 H41 Q35.4 142 35 136 Z",
    liquidTop: 58,
    rim: { x: 88, y: 44 },
    ice: true,
    handle: "M89 60 H100 Q108 60 108 72 V98 Q108 110 98 110 H86",
  },
  wine: {
    body: "M30 24 H90 C94 62 84 92 60 94 C36 92 26 62 30 24 Z",
    liquidTop: 44,
    rim: { x: 88, y: 24 },
    stem: { from: 94, to: 140 },
  },
};

type Props = {
  glass: GlassKey;
  color: string;
  garnish?: string;
  id: string;
  label?: string;
  className?: string;
};

/** A simple drawn glass filled with the drink's colour. Used until real photos are added. */
export default function GlassArt({ glass, color, garnish, id, label, className }: Props) {
  const shape = shapes[glass === "beer" ? "highball" : glass];
  const clipId = `clip-${id}`;
  const isMug = glass === "mug";
  const outline = isMug ? "#c8744a" : "var(--bone)";

  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={shape.body} />
        </clipPath>
      </defs>

      <path d={shape.body} fill="rgba(255,255,255,0.04)" />
      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y={shape.liquidTop} width="120" height="160" fill={color} opacity="0.92" />
        {glass === "beer" && (
          <rect x="0" y={shape.liquidTop - 10} width="120" height="14" fill="#f6efe0" opacity="0.95" />
        )}
        {shape.ice && (
          <g fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.35)" strokeWidth="1">
            <rect x="48" y={shape.liquidTop + 8} width="20" height="20" rx="3" transform={`rotate(-10 58 ${shape.liquidTop + 18})`} />
            <rect x="62" y={shape.liquidTop + 30} width="20" height="20" rx="3" transform={`rotate(12 72 ${shape.liquidTop + 40})`} />
            <rect x="42" y={shape.liquidTop + 44} width="18" height="18" rx="3" transform={`rotate(6 51 ${shape.liquidTop + 53})`} />
          </g>
        )}
        <rect x="0" y={shape.liquidTop} width="120" height="2" fill="rgba(255,255,255,0.35)" />
      </g>

      <path d={shape.body} fill="none" stroke={outline} strokeWidth="1.6" strokeLinejoin="round" />
      {shape.handle && <path d={shape.handle} fill="none" stroke={outline} strokeWidth="5" strokeLinecap="round" />}
      {shape.stem && (
        <>
          <line x1="60" y1={shape.stem.from} x2="60" y2={shape.stem.to} stroke={outline} strokeWidth="1.6" />
          <line x1="38" y1={shape.stem.to + 2} x2="82" y2={shape.stem.to + 2} stroke={outline} strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}

      {garnish && (
        <g transform={`translate(${shape.rim.x} ${shape.rim.y})`}>
          <circle r="10" fill="none" stroke={garnish} strokeWidth="2.5" />
          <circle r="6.5" fill={garnish} opacity="0.3" />
          <line x1="-10" y1="0" x2="10" y2="0" stroke={garnish} strokeWidth="1" opacity="0.7" />
        </g>
      )}
    </svg>
  );
}
