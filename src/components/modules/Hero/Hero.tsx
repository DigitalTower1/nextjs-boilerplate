'use client';

import { useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import HeroBackground from './HeroBackground';
import { Button } from '@/components/ui/Button';

const HEADLINE_1 = 'DIGITAL';
const HEADLINE_2 = 'EXPERIENCES';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef1 = useRef<HTMLHeadingElement>(null);
  const headlineRef2 = useRef<HTMLHeadingElement>(null);

  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  , []);

  useGSAP(
    () => {
      if (prefersReducedMotion) return; // Fixed: Properly integrated reduced motion check

      const words = gsap.utils.toArray('.word-inner');

      gsap.fromTo(
        words,
        {
          yPercent: 110,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
          delay: 0.2,
        }
      );
    },
    { scope: containerRef }
  );

  const renderSplitText = (text: string, ref: React.RefObject<HTMLHeadingElement | null>) => {
    const words = text.split(' ');
    return (
      <h1
        ref={ref}
        className="flex flex-wrap justify-center gap-x-[2vw] font-display font-bold uppercase leading-[0.85] tracking-tighter text-[12vw] text-foreground select-none"
        aria-label={text}
      >
        {words.map((word, index) => (
          <span key={index} className="relative overflow-hidden inline-block">
            <span className="word-inner block relative translate-y-full will-change-transform">
              {word}
            </span>
          </span>
        ))}
      </h1>
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6"
      aria-label="Introduction"
    >
      {prefersReducedMotion ? (
        <div className="absolute inset-0 bg-zinc-900" /> 
      ) : (
        <HeroBackground />
      )}

      <div className="relative z-10 flex flex-col items-center gap-8 text-center mix-blend-difference">
        <div className="flex flex-col items-center">
          {renderSplitText(HEADLINE_1, headlineRef1)}
          <div className="text-accent">
             {renderSplitText(HEADLINE_2, headlineRef2)}
          </div>
        </div>

        <p className="word-inner max-w-md text-lg font-body tracking-wide text-foreground/80 opacity-0 translate-y-full">
          Architecting immersive digital futures for the brands of tomorrow.
        </p>

        <div className="word-inner flex gap-4 mt-8 opacity-0 translate-y-full">
          <Button variant="primary">Our Work</Button>
          <Button variant="outline">Get in touch</Button>
        </div>
      </div>
    </section>
  );
}
