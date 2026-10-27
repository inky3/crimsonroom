import type { CategoryKey, GlassKey } from "@/lib/types";

type Props = {
  mode: "card" | "detail";
  slug: string;
  name: string;
  category: CategoryKey;
  glass: GlassKey;
  color: string;
  garnishColor?: string;
  image?: string;
};

type GlassShape = {
  body: string;
  liquidTop: number;
  rim: { x: number; y: number };
  stem?: { from: number; to: number };
  foot?: string;
  handle?: string;
  ice?: boolean;
};

const shapes: Record<Exclude<GlassKey, "beer">, GlassShape> = {
  martini: { body: "M116 134 L284 134 Q273 212 200 263 Q127 212 116 134 Z", liquidTop: 157, rim: { x: 282, y: 132 }, stem: { from: 263, to: 383 }, foot: "M150 397 Q200 387 250 397" },
  coupe: { body: "M86 172 Q86 248 200 254 Q314 248 314 172 Z", liquidTop: 187, rim: { x: 300, y: 172 }, stem: { from: 254, to: 383 }, foot: "M150 397 Q200 387 250 397" },
  rocks: { body: "M126 174 L274 174 L258 370 Q200 384 142 370 Z", liquidTop: 218, rim: { x: 270, y: 174 }, ice: true },
  highball: { body: "M149 116 L251 116 L238 373 Q200 385 162 373 Z", liquidTop: 170, rim: { x: 250, y: 116 }, ice: true },
  mug: { body: "M135 165 L255 165 L243 360 Q200 374 147 360 Z", liquidTop: 211, rim: { x: 254, y: 165 }, handle: "M253 200 C326 183 326 304 250 288", ice: true },
  wine: { body: "M140 117 Q136 220 200 265 Q264 220 260 117 Z", liquidTop: 158, rim: { x: 258, y: 117 }, stem: { from: 265, to: 383 }, foot: "M150 397 Q200 387 250 397" },
  shot: { body: "M165 290 L235 290 L225 385 Q200 394 175 385 Z", liquidTop: 322, rim: { x: 235, y: 290 } },
  cup: { body: "M130 208 L270 208 L250 380 L150 380 Z", liquidTop: 253, rim: { x: 270, y: 208 }, handle: "M270 235 Q326 228 320 284 Q317 310 259 307" },
};

function hashText(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function garnishFor(slug: string): "lime" | "lemon" | "orange" | "mint" | "berry" | "pineapple" | "coffee" | "cherry" | "herb" {
  const key = slug.toLowerCase();
  if (/espresso|coffee|irish-coffee|white-russian|black-russian/.test(key)) return "coffee";
  if (/pineapple|colada|pina|mango|banana|tropical|dragonfruit|dragon-fruit/.test(key)) return "pineapple";
  if (/strawberry|cranberry|blueberry|blackberry|huckleberry|grape|berry|blood|vampire|pink-lady|cosmopolitan|shirley|diablo|candy-corn/.test(key)) return "berry";
  if (/mint|mojito/.test(key)) return "mint";
  if (/cherry|manhattan|old-fashioned|boulevardier|sangria|negroni/.test(key)) return "cherry";
  if (/orange|sunrise|screwdriver|mimosa|americano|spritz|aperol/.test(key)) return "orange";
  if (/lemon|collins|french-75|hot-toddy/.test(key)) return "lemon";
  if (/lime|mule|gimlet|daiquiri|margarita|paloma|caipirinha|fizz|tonic|soda/.test(key)) return "lime";
  if (/tea|thai|ginger|herbal|basil|sage/.test(key)) return "herb";
  return "orange";
}

function Garnish({ kind, x, y, color }: { kind: ReturnType<typeof garnishFor>; x: number; y: number; color: string }) {
  if (kind === "coffee") return <g transform={`translate(${x} ${y}) rotate(-18)`}><ellipse rx="15" ry="21" fill="#3a201a" stroke="#d9b18b" strokeWidth="2" /><path d="M-4 -18 Q10 0 -4 18" fill="none" stroke="#d9b18b" strokeWidth="2.5" /></g>;
  if (kind === "mint" || kind === "herb") return <g transform={`translate(${x} ${y}) rotate(-20)`} fill={kind === "mint" ? "#6dbb75" : color} stroke="#d2efc7" strokeWidth="1.4"><path d="M0 15 C-28 2 -28 -20 -3 -26 C11 -13 11 2 0 15 Z" /><path d="M3 18 C2 -4 -9 -16 -17 -21" fill="none" /><path d="M4 13 C29 6 33 -13 17 -25 C2 -15 0 1 4 13 Z" /><path d="M4 15 C11 -2 18 -13 23 -19" fill="none" /></g>;
  if (kind === "berry" || kind === "cherry") return <g transform={`translate(${x} ${y})`}><path d="M-13 2 Q-5 -22 6 -21 M5 -2 Q13 -21 20 -18" fill="none" stroke="#7dbb70" strokeWidth="3" strokeLinecap="round" /><circle cx="-13" cy="6" r="12" fill={kind === "cherry" ? "#d9344e" : "#8f3156"} stroke="#ffc0b9" strokeWidth="1.5" /><circle cx="8" cy="9" r="13" fill={kind === "cherry" ? "#a91f38" : "#bd4b78"} stroke="#ffd1da" strokeWidth="1.5" /><circle cx="-17" cy="1" r="3" fill="#fff" opacity=".45" /><circle cx="4" cy="4" r="3" fill="#fff" opacity=".45" /></g>;
  if (kind === "pineapple") return <g transform={`translate(${x} ${y}) rotate(18)`}><path d="M0 -22 L-17 -42 L-5 -18 L-2 -45 L7 -18 L23 -35 L11 -13 Z" fill="#6cb878" stroke="#b6df92" strokeWidth="1.5" /><path d="M-23 -8 L17 -16 L25 12 L-15 22 Z" fill="#e2b94f" stroke="#ffe8a2" strokeWidth="2" /><path d="M-18 -5 L21 11 M-11 18 L12 -12 M-4 20 L19 -8 M-20 7 L17 -13" stroke="#ac8437" strokeWidth="1.4" /></g>;
  const citrus = kind === "orange" ? "#f19a43" : kind === "lemon" ? "#f2d96a" : "#a3cf66";
  const rind = kind === "orange" ? "#ffd39a" : kind === "lemon" ? "#fff1ab" : "#d8f6a6";
  return <g transform={`translate(${x} ${y}) rotate(-12)`}><circle r="28" fill={citrus} stroke={rind} strokeWidth="5" /><circle r="21" fill="none" stroke={rind} strokeWidth="2" /><path d="M0 0 L0 -20 M0 0 L17 -10 M0 0 L17 11 M0 0 L0 20 M0 0 L-17 11 M0 0 L-17 -10" stroke={rind} strokeWidth="2.5" strokeLinecap="round" /><circle r="3.5" fill={rind} /></g>;
}

export default function RecipeArtwork({ mode, slug, name, category, glass, color, garnishColor }: Props) {
  const shape = shapes[glass === "beer" ? "highball" : glass];
  const id = slug.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const hash = hashText(slug);
  const garnish = garnishFor(slug);
  const accent = garnishColor || color;
  const liquidTop = shape.liquidTop + (hash % 19) - 9;
  const fillId = `drink-fill-${id}`;
  const glowId = `drink-glow-${id}`;
  const clipId = `drink-clip-${id}`;
  const backgroundId = `drink-bg-${id}`;
  const speckles = Array.from({ length: 7 }, (_, i) => ({
    x: 38 + ((hash >>> (i % 4) * 5) + i * 49) % 324,
    y: 72 + ((hash >>> (i % 5) * 3) + i * 37) % 325,
    r: 1.5 + ((hash >>> (i % 6)) % 4),
  }));

  return (
    <svg viewBox="0 0 400 480" className={mode === "card" ? "card-art recipe-artwork-svg" : "recipe-artwork-svg"} role="img" aria-label={name} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={backgroundId} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#080609" /><stop offset=".55" stopColor="#1b0c12" /><stop offset="1" stopColor="#080709" /></linearGradient>
        <radialGradient id={glowId} cx=".5" cy=".46" r=".62"><stop offset="0" stopColor={color} stopOpacity=".58" /><stop offset="1" stopColor={color} stopOpacity="0" /></radialGradient>
        <linearGradient id={fillId} x1="0" y1="0" x2="1" y2=".1"><stop offset="0" stopColor={color} stopOpacity=".76" /><stop offset=".48" stopColor={color} /><stop offset="1" stopColor={accent} stopOpacity=".96" /></linearGradient>
        <clipPath id={clipId}><path d={shape.body} /></clipPath>
      </defs>
      <rect width="400" height="480" rx="10" fill={`url(#${backgroundId})`} />
      <circle cx={200 + (hash % 39) - 19} cy={225 + (hash % 31) - 15} r={150 + (hash % 35)} fill={`url(#${glowId})`} />
      <circle cx="200" cy="237" r="149" fill="none" stroke={accent} strokeOpacity=".18" strokeWidth="1" strokeDasharray={`${14 + (hash % 17)} ${7 + (hash % 9)}`} />
      <circle cx={55 + (hash % 38)} cy={365 - (hash % 23)} r={18 + (hash % 13)} fill="none" stroke={accent} strokeOpacity=".28" strokeWidth="1.5" />
      <path d={`M ${25 + hash % 34} 112 Q 70 90 ${94 + hash % 35} ${112 + hash % 31}`} fill="none" stroke={accent} strokeOpacity=".42" strokeWidth="2" strokeLinecap="round" />
      {speckles.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={i % 2 ? accent : "#f4e8dc"} opacity={i % 2 ? ".23" : ".13"} />)}
      <text x="24" y="34" fill="#eadfd6" opacity=".72" fontSize="9" letterSpacing="3.2">{category === "mocktail" ? "ZERO PROOF" : "CRIMSON ROOM"}</text>
      <text x="376" y="34" fill={accent} opacity=".86" fontSize="9" textAnchor="end" letterSpacing="2">{String((hash % 89) + 10).padStart(2, "0")}</text>
      {shape.handle && <path d={shape.handle} fill="none" stroke="#d8c9c6" strokeOpacity=".68" strokeWidth="9" strokeLinecap="round" />}
      <ellipse cx="200" cy="408" rx="94" ry="14" fill="#000" opacity=".55" />
      <ellipse cx="200" cy="404" rx="72" ry="5" fill={accent} opacity=".3" />
      <g clipPath={`url(#${clipId})`}>
        <path d={shape.body} fill="#fff" fillOpacity=".04" />
        <rect x="80" y={liquidTop} width="240" height="250" fill={`url(#${fillId})`} />
        <rect x="80" y={liquidTop} width="240" height="3" fill="#fff" fillOpacity=".5" />
        {shape.ice && <>
          <rect x={150 + (hash % 9)} y={liquidTop + 17} width="35" height="38" rx="5" fill="#f9f6f0" fillOpacity=".42" stroke="#fff" strokeOpacity=".75" strokeWidth="2" transform={`rotate(-13 ${167 + hash % 9} ${liquidTop + 36})`} />
          <rect x="202" y={liquidTop + 42} width="34" height="36" rx="5" fill="#f9f6f0" fillOpacity=".3" stroke="#fff" strokeOpacity=".65" strokeWidth="2" transform={`rotate(14 219 ${liquidTop + 60})`} />
          <rect x="169" y={liquidTop + 66} width="28" height="31" rx="4" fill="#fff" fillOpacity=".22" stroke="#fff" strokeOpacity=".45" strokeWidth="1.5" transform={`rotate(5 183 ${liquidTop + 81})`} />
        </>}
        {glass === "beer" && <path d={`M132 ${liquidTop - 4} Q170 ${liquidTop - 16} 204 ${liquidTop - 6} Q238 ${liquidTop - 18} 270 ${liquidTop - 3} L270 ${liquidTop + 12} L132 ${liquidTop + 12} Z`} fill="#f5ecdb" />}
        {Array.from({ length: 4 }, (_, i) => <circle key={i} cx={176 + i * 16 + (hash % 5)} cy={liquidTop + 102 + (i % 2) * 19} r={2.2 + (i % 2)} fill="#fff" opacity=".35" />)}
      </g>
      <path d={shape.body} fill="none" stroke="#f3e8e5" strokeOpacity=".82" strokeWidth="2.4" strokeLinejoin="round" />
      {shape.stem && <>
        <path d={`M200 ${shape.stem.from} L200 ${shape.stem.to}`} stroke="#f4e9e3" strokeOpacity=".78" strokeWidth="3" />
        <path d={shape.foot} fill="none" stroke="#f4e9e3" strokeOpacity=".8" strokeWidth="3" strokeLinecap="round" />
      </>}
      <path d={glass === "rocks" || glass === "highball" || glass === "mug" || glass === "beer" ? "M153 191 Q158 355 166 364" : glass === "shot" ? "M177 301 L181 378" : "M147 143 Q153 207 188 239"} fill="none" stroke="#fff" strokeOpacity=".52" strokeWidth="3" strokeLinecap="round" />
      <Garnish kind={garnish} x={shape.rim.x} y={shape.rim.y} color={accent} />
      {/mojito|mule|punch|fizz|collins|spritz|highball|soda/.test(slug) && <path d="M223 195 L256 78" fill="none" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity=".88" />}
      <path d={`M30 ${435 + hash % 13} Q200 ${420 + hash % 15} 370 ${435 + hash % 13}`} fill="none" stroke={accent} strokeOpacity=".4" strokeWidth="1.2" />
    </svg>
  );
}
