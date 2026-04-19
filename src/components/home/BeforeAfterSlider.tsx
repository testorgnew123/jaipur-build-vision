import { useRef, useState } from "react";

const before = "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80";
const after = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";

export function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const update = (clientX: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <section className="py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            Renovation Magic
          </p>
          <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight">
            Before. <span className="text-gold">After.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Drag the slider to see the transformation.
          </p>
        </div>

        <div
          ref={ref}
          onMouseMove={(e) => e.buttons === 1 && update(e.clientX)}
          onTouchMove={(e) => update(e.touches[0].clientX)}
          onClick={(e) => update(e.clientX)}
          className="relative aspect-[16/10] lg:aspect-[16/8] overflow-hidden rounded-2xl shadow-elegant select-none cursor-ew-resize"
        >
          <img src={after} alt="After renovation" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
            <img
              src={before}
              alt="Before renovation"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ width: ref.current ? `${ref.current.clientWidth}px` : "100%" }}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div
            className="absolute top-0 bottom-0 w-1 bg-gold pointer-events-none"
            style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold text-gold-foreground grid place-items-center font-bold shadow-elegant">
              ⇆
            </div>
          </div>
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-ink/80 text-white text-xs font-semibold backdrop-blur">
            BEFORE
          </div>
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold text-gold-foreground text-xs font-bold">
            AFTER
          </div>
        </div>
      </div>
    </section>
  );
}

export default BeforeAfterSlider;
