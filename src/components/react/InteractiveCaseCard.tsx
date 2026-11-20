import React, { useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface InteractiveCaseCardProps {
  children: React.ReactNode;
}

/**
 * Wraps an existing case-study card with a restrained desktop-only pointer
 * spotlight and subtle hover/focus lift. Disabled on touch devices and
 * prefers-reduced-motion.
 */
export default function InteractiveCaseCard({ children }: InteractiveCaseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || e.pointerType !== 'mouse') return;
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--spotlight-x', `${x}px`);
    el.style.setProperty('--spotlight-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className="case-card-interactive p-6 sm:p-8 rounded-2xl border border-brand-border bg-[#F8FAFC] hover:bg-white shadow-sm hover:shadow-md group"
    >
      <div className="case-card-spotlight" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
