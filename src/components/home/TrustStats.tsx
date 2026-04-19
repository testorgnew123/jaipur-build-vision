import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 8, suffix: "+", label: "Years in Jaipur" },
  { value: 98, suffix: "%", label: "On-time Handover" },
  { value: 4.9, suffix: "★", label: "Client Rating", decimals: 1 },
];

function Counter({ to, suffix, decimals = 0 }: { to: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function TrustStats() {
  return (
    <section className="py-14 lg:py-20 bg-background">
      <div className="container-px mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="text-center lg:text-left"
          >
            <div className="font-display text-4xl lg:text-6xl font-bold text-foreground tracking-tight">
              <Counter to={s.value} suffix={s.suffix} decimals={s.decimals} />
            </div>
            <div className="mt-2 text-sm text-muted-foreground font-medium">{s.label}</div>
            <div className="mt-3 h-px w-12 mx-auto lg:mx-0 bg-gold" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
