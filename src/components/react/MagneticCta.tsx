import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface MagneticCtaProps {
  href: string;
  label: string;
  className?: string;
}

const MAX_OFFSET_X = 4;
const MAX_OFFSET_Y = 3;

export default function MagneticCta({ href, label, className = '' }: MagneticCtaProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 320, damping: 24, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 320, damping: 24, mass: 0.4 });

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion || e.pointerType !== 'mouse') return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    rawX.set(Math.max(-MAX_OFFSET_X, Math.min(MAX_OFFSET_X, relX * MAX_OFFSET_X * 2)));
    rawY.set(Math.max(-MAX_OFFSET_Y, Math.min(MAX_OFFSET_Y, relY * MAX_OFFSET_Y * 2)));
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={shouldReduceMotion ? undefined : { x, y }}
      className={className}
    >
      {label}
    </motion.a>
  );
}
