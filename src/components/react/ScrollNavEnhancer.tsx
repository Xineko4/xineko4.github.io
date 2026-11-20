import React, { useEffect } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

const SECTION_IDS = ['about', 'expertise', 'case-studies', 'experience', 'contact'] as const;

export default function ScrollNavEnhancer() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );

    if (sections.length === 0) return;

    const desktopLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('nav[aria-label="Main Navigation"] a[data-nav-section]')
    );
    const mobileLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('#mobile-menu a[data-nav-section]')
    );

    const setActiveSection = (activeId: string | null) => {
      desktopLinks.forEach((link) => {
        const isMatch = link.dataset.navSection === activeId;
        link.dataset.active = isMatch ? 'true' : 'false';
        if (isMatch) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });

      mobileLinks.forEach((link) => {
        const isMatch = link.dataset.navSection === activeId;
        if (isMatch) {
          link.setAttribute('aria-current', 'location');
          link.classList.add('text-brand-accent', 'font-semibold');
        } else {
          link.removeAttribute('aria-current');
          if (link.dataset.navSection !== 'contact') {
            link.classList.remove('text-brand-accent', 'font-semibold');
          }
        }
      });
    };

    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRatios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestId: string | null = null;
        let bestRatio = 0;

        for (const id of SECTION_IDS) {
          const ratio = visibleRatios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId) {
          setActiveSection(bestId);
        } else if (window.scrollY < 160) {
          setActiveSection(null);
        }
      },
      {
        rootMargin: '-18% 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-brand-accent via-sky-500 to-brand-teal"
        style={{
          scaleX: shouldReduceMotion ? scrollYProgress : smoothProgress,
        }}
      />
    </div>
  );
}
