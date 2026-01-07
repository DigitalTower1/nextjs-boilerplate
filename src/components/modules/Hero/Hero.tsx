'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import HeroBackground from './HeroBackground';
import { Button } from '@/components/ui/Button';
import { useMemo } from 'react';

const HEADLINE_1 = 'DIGITAL';
const HEADLINE_2 = 'EXPERIENCES';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef1 = useRef<HTMLHeadingElement>(null);
  const headlineRef2 = useRef<HTMLHeadingElement>(null);
  // Detect reduced motion preference
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  , []);

  // --- KINETIC TYPOGRAPHY ANIMATION ---
  useGSAP(
    () => {
      
      // Select all elements with the 'word-inner' class within the scoped container
      const words = gsap.utils.toArray('.word-inner');

      gsap.fromTo(
        words,
        {
          yPercent: 110, // Start just below the overflow hide line
          opacity: 0,
        },
        {
          yPercent: 0, // Animate to neutral position
          opacity: 1,
          duration: 1.2,
          stagger: 0.15, // Stagger the start time of each word
          ease: 'power4.out', // Aggressive, sophisticated easing
          delay: 0.2,
        }
      );
    },
    { scope: containerRef } // Scope selectors to this component
  );

  // Helper to create splittable structure without premium SplitText plugin
  const renderSplitText = (text: string, ref: React.RefObject<HTMLHeadingElement>) => {
    const words = text.split(' ');
    return (
      <h1
        ref={ref}
        className="flex flex-wrap justify-center gap-x-[2vw] font-display font-bold uppercase leading-[0.85] tracking-tighter text-[12vw] text-foreground select-none"
        aria-label={text}
      >
        {words.map((word, index) => (
          // Outer wrapper hides overflow
          <span key={index} className="relative overflow-hidden inline-block">
            {/* Inner wrapper is animated by GSAP */}
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
    >
      {/* 3D Background Field */}
      if (prefersReducedMotion) return; // Skip complex staggers

    // Standard GSAP animation logic here...
  }, []);

  return (
    <section aria-label="Introduction">
       {/* If reduced motion is on, we render a static high-quality AVIF instead of the Canvas */}
       {prefersReducedMotion ? (
         <div className="absolute inset-0 bg-hero-static bg-cover" />
       ) : (
      <HeroBackground />

      {/* Main Kinetic Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center mix-blend-difference">
        <div className="flex flex-col items-center">
          {renderSplitText(HEADLINE_1, headlineRef1)}
          {/* Accent color on the second line for brutalist contrast */}
          <div className="text-accent">
             {renderSplitText(HEADLINE_2, headlineRef2)}
          </div>
        </div>

        {/* Subtext staggering in slightly later */}
        <p className="word-inner max-w-md text-lg font-body tracking-wide text-foreground/80 opacity-0 translate-y-full">
          Architecting immersive digital futures for the brands of tomorrow.
        </p>

        {/* CTA Atoms staggering in last */}
        <div className="word-inner flex gap-4 mt-8 opacity-0 translate-y-full">
          <Button variant="primary">Our Work</Button>
          <Button variant="outline">Get in touch</Button>
        </div>
      </div>
    </section>
  );
}