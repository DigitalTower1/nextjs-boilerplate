'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTransitionStore } from '@/lib/store';
import { usePathname } from 'next/navigation';

export default function PageTransitionOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { isExiting, setIsExiting } = useTransitionStore();
  const pathname = usePathname();

  // Reveal animation when path changes (Entry)
  useEffect(() => {
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { yPercent: 0 });
      gsap.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
        delay: 0.2,
        onComplete: () => setIsExiting(false)
      });
    }
  }, [pathname, setIsExiting]);

  // Exit animation (Triggered by hook)
  useEffect(() => {
    if (isExiting && overlayRef.current) {
      gsap.to(overlayRef.current, {
        yPercent: 0,
        duration: 0.8,
        ease: 'power4.inOut',
      });
    }
  }, [isExiting]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[110] bg-accent pointer-events-none will-change-transform"
      style={{ transform: 'translateY(0%)' }}
    />
  );
}