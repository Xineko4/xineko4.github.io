import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface Stage {
  id: 'scope' | 'coordinate' | 'implement' | 'measure';
  step: string;
  label: string;
  description: string;
  focus: string;
  nodeX: number;
}

const STAGES: Stage[] = [
  {
    id: 'scope',
    step: '01',
    label: 'Scope',
    description: 'Clarify objectives, scope, and constraints.',
    focus: 'Project planning & scope breakdown',
    nodeX: 36,
  },
  {
    id: 'coordinate',
    step: '02',
    label: 'Coordinate',
    description: 'Align stakeholders across departments.',
    focus: 'Cross-departmental coordination & stakeholder management',
    nodeX: 132,
  },
  {
    id: 'implement',
    step: '03',
    label: 'Implement',
    description: 'Support rollout and adoption.',
    focus: 'Implementation, VR/MR training & digital work instructions',
    nodeX: 228,
  },
  {
    id: 'measure',
    step: '04',
    label: 'Measure',
    description: 'Monitor progress and evaluate results.',
    focus: 'Monitoring, evaluation & status reporting',
    nodeX: 324,
  },
];

export default function HeroDeliveryMap() {
  const [activeIndex, setActiveIndex] = useState<number>(1); // Default: Coordinate
  const shouldReduceMotion = useReducedMotion();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeStage = STAGES[activeIndex];
  const progressRatio = activeIndex / (STAGES.length - 1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % STAGES.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + STAGES.length) % STAGES.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = STAGES.length - 1;
    }

    if (nextIndex !== null) {
      setActiveIndex(nextIndex);
      buttonRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div
      className="rounded-2xl border border-brand-border bg-white/90 backdrop-blur p-4 sm:p-5 shadow-sm"
      aria-label="How I deliver projects"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-teal shrink-0" aria-hidden="true" />
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-navy">
            HOW I DELIVER
          </h2>
        </div>
        <span className="text-[11px] font-mono text-brand-muted">
          Stage {activeStage.step} / 04
        </span>
      </div>

      {/* Inline SVG System Connector Map */}
      <div className="mb-3 px-1" aria-hidden="true">
        <svg
          viewBox="0 0 360 36"
          className="w-full h-9 overflow-visible"
          role="presentation"
        >
          {/* Base rail */}
          <line
            x1={STAGES[0].nodeX}
            y1="18"
            x2={STAGES[STAGES.length - 1].nodeX}
            y2="18"
            stroke="#E2E8F0"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Animated active connector path */}
          <motion.line
            x1={STAGES[0].nodeX}
            y1="18"
            x2={STAGES[STAGES.length - 1].nodeX}
            y2="18"
            stroke="url(#delivery-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: Math.max(0.001, progressRatio) }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 260, damping: 28 }
            }
          />

          <defs>
            <linearGradient id="delivery-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>
          </defs>

          {/* Stage Nodes */}
          {STAGES.map((stage, idx) => {
            const isSelected = idx === activeIndex;
            const isReached = idx <= activeIndex;

            return (
              <g key={stage.id}>
                {isSelected && !shouldReduceMotion && (
                  <motion.circle
                    cx={stage.nodeX}
                    cy="18"
                    r="11"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="1.5"
                    initial={{ opacity: 0.5, scale: 0.75 }}
                    animate={{ opacity: [0.45, 0.12, 0.45], scale: [0.85, 1.15, 0.85] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: `${stage.nodeX}px 18px` }}
                  />
                )}
                <circle
                  cx={stage.nodeX}
                  cy="18"
                  r={isSelected ? 7.5 : 5.5}
                  fill={isSelected ? '#0F1E2E' : isReached ? '#0284C7' : '#FFFFFF'}
                  stroke={isSelected ? '#0284C7' : isReached ? '#0284C7' : '#CBD5E1'}
                  strokeWidth="2"
                />
                {isSelected && (
                  <circle cx={stage.nodeX} cy="18" r="2.5" fill="#FFFFFF" />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Four Selectable Stages */}
      <div
        role="tablist"
        aria-label="Delivery stages"
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3.5"
      >
        {STAGES.map((stage, idx) => {
          const isSelected = idx === activeIndex;

          return (
            <button
              key={stage.id}
              ref={(el) => {
                buttonRefs.current[idx] = el;
              }}
              type="button"
              role="tab"
              id={`delivery-tab-${stage.id}`}
              aria-selected={isSelected}
              aria-controls={`delivery-panel-${stage.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => setActiveIndex(idx)}
              onFocus={() => setActiveIndex(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`group relative rounded-xl border px-2.5 py-2 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-1 ${
                isSelected
                  ? 'border-brand-accent bg-[#0F1E2E] text-white shadow-sm'
                  : 'border-brand-border bg-[#F8FAFC] text-brand-navy hover:border-brand-accent/60 hover:bg-white'
              }`}
            >
              <span
                className={`block text-[10px] font-mono leading-none mb-1 ${
                  isSelected ? 'text-sky-300' : 'text-brand-muted'
                }`}
              >
                {stage.step}
              </span>
              <span className="block text-xs font-semibold tracking-tight truncate">
                {stage.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail Panel */}
      <div
        role="tabpanel"
        id={`delivery-panel-${activeStage.id}`}
        aria-labelledby={`delivery-tab-${activeStage.id}`}
        className="rounded-xl border border-brand-border bg-[#F8FAFC] p-3.5 min-h-[84px] flex flex-col justify-center"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeStage.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.16, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-brand-navy">
                {activeStage.label}
              </span>
              <span className="text-[11px] font-mono text-brand-teal">
                &mdash; Active focus
              </span>
            </div>
            <p className="text-xs sm:text-[13px] text-brand-slate leading-relaxed">
              {activeStage.description}
            </p>
            <p className="text-[11px] font-mono text-brand-muted mt-1.5">
              {activeStage.focus}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Static Summary Line */}
      <div className="mt-3.5 pt-3 border-t border-brand-border">
        <p className="text-[11px] font-mono text-brand-slate leading-relaxed">
          6 years &bull; Multiple departments &bull; AI evaluation &bull; VR/MR &amp; digital training
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-brand-muted">
          <span>Batam, Indonesia</span>
          <span className="font-mono">Open to remote collaboration</span>
        </div>
      </div>
    </div>
  );
}
