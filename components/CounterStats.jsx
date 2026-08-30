'use client';

import { useEffect, useRef, useState } from 'react';

function useCounter(target, active) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const dur = 1400;
    const t0 = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return value.toLocaleString('tr-TR');
}

export default function CounterStats({ items = [] }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className="text-center">
          <div className="font-display text-4xl font-bold text-brand-600 sm:text-5xl">
            {useCounter(it.value, active)}
            {it.suffix ? <span className="text-brand-400">{it.suffix}</span> : null}
          </div>
          <div className="mt-1.5 text-sm font-semibold uppercase tracking-wide text-ink-500">
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}