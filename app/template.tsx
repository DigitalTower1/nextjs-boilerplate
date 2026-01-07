'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power3.out', 
        delay: 0.6 // Wait for overlay to start sliding up
      }
    );
  }, { scope: containerRef });

  return <div ref={containerRef}>{children}</div>;
}