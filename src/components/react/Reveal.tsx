import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Progressive-enhancement section reveal.
 * - Renders fully visible in static HTML (no-JS safe, zero hidden content).
 * - After hydration (via Astro client:visible), animates subtly on first view
 *   only when the element enters from below the viewport and reduced motion is off.
 */
export default function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [animateOnView, setAnimateOnView] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    // Only run entrance animation if the element is below the fold when hydrated
    // so content already on screen never flashes.
    if (rect.top > window.innerHeight * 0.9) {
      setAnimateOnView(true);
    }
  }, [shouldReduceMotion]);

  if (shouldReduceMotion || !animateOnView) {
    return (
      <div ref={containerRef} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
