import { useMemo } from "react";
import { motion } from "framer-motion";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldAtlas from "world-atlas/countries-110m.json";

const W = 960;
const H = 500;
const HUB = [72.5714, 23.0225];

const ROUTES = [
  { to: [4.47, 51.92], label: "Europe" },
  { to: [55.27, 25.2], label: "Middle East" },
  { to: [103.82, 1.35], label: "South-East Asia" },
  { to: [139.69, 35.68], label: "East Asia" },
  { to: [-74.0, 40.71], label: "North America" },
];

export default function MapVisual() {
  const { countries, india, projection, pathGen } = useMemo(() => {
    const feats = feature(worldAtlas, worldAtlas.objects.countries).features;
    const proj = geoNaturalEarth1().fitSize([W, H], { type: "Sphere" });
    return {
      countries: feats,
      india: feats.find((c) => c.id === "356"),
      projection: proj,
      pathGen: geoPath(proj),
    };
  }, []);

  const [hx, hy] = projection(HUB);

  const arc = (to) => {
    const [x2, y2] = projection(to);
    const mx = (hx + x2) / 2;
    const my = (hy + y2) / 2 - Math.hypot(x2 - hx, y2 - hy) / 4;
    return `M${hx},${hy} Q${mx},${my} ${x2},${y2}`;
  };

  return (
    <figure data-testid="global-markets-map" className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img"
        aria-label="World map highlighting India as Arnava Exim's export hub with illustrative global shipping routes">
        <path d={pathGen({ type: "Sphere" })} fill="#F1F5F9" />
        {countries.map((c) => (
          <path
            key={c.id}
            d={pathGen(c)}
            fill={c.id === "356" ? "#10B981" : "#DCE4EE"}
            stroke="#FFFFFF"
            strokeWidth={0.5}
          />
        ))}
        {ROUTES.map((r, i) => (
          <motion.path
            key={r.label}
            d={arc(r.to)}
            fill="none"
            stroke="#0B192C"
            strokeOpacity={0.35}
            strokeWidth={1.4}
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.3 + i * 0.2, ease: "easeInOut" }}
          />
        ))}
        {ROUTES.map((r) => {
          const [x, y] = projection(r.to);
          return <circle key={`dot-${r.label}`} cx={x} cy={y} r={3.5} fill="#0B192C" />;
        })}
        <motion.circle
          cx={hx} cy={hy} fill="none" stroke="#10B981" strokeWidth={1.5}
          initial={{ r: 6, opacity: 0.9 }}
          animate={{ r: 26, opacity: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
        <circle cx={hx} cy={hy} r={5} fill="#0B192C" stroke="#10B981" strokeWidth={2.5} />
        <text x={hx + 12} y={hy - 8} className="fill-navy" fontSize="13" fontWeight="700"
          fontFamily="JetBrains Mono, monospace" letterSpacing="1">
          AHMEDABAD · IN
        </text>
      </svg>
      <figcaption className="mt-3 text-xs text-slate-400">
        Map is illustrative of global reach. Arnava Exim is actively building its international buyer network.
      </figcaption>
    </figure>
  );
}
