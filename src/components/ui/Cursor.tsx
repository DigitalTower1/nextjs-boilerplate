'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAppStore } from '@/src/store/useAppStore'; // Fixed: Corrected import path

export default function Cursor() {
  const cursorType = useAppStore((state) => state.cursorType);
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Follow mouse logic
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Style updates based on state
    if (cursorType === 'project') {
      gsap.to(cursorRef.current, { 
        width: 100, 
        height: 100, 
        backgroundColor: '#ccff00', 
        duration: 0.3 
      });
    } else {
      gsap.to(cursorRef.current, { 
        width: 24, 
        height: 24, 
        backgroundColor: 'rgba(255,255,255,0.8)', 
        duration: 0.3 
      });
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorType]);

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      style={{ width: 24, height: 24, backgroundColor: 'white' }}
    />
  );
}
