'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- DATA ---
const SERVICES = [
  {
    id: '01',
    title: 'STRATEGY',
    description: 'Data-driven insights meets cultural intuition. We define where you play and how you win.',
    tags: ['Brand Audit', 'Market Analysis', 'Positioning'],
  },
  {
    id: '02',
    title: 'DESIGN',
    description: ' crafting visual systems that disrupt markets. High-fidelity UI/UX with brutalist precision.',
    tags: ['Art Direction', 'UI/UX System', 'Motion Design'],
  },
  {
    id: '03',
    title: 'ENGINEERING',
    description: 'Pixel-perfect implementation. Next.js architecture scaled for global performance.',
    tags: ['Creative Coding', 'WebGL / R3F', 'Full Stack'],
  },
  {
    id: '04',
    title: 'CONTENT',
    description: 'Narratives that stick. 3D asset generation and video production for the new web.',
    tags: ['3D Modeling', 'Video Editing', 'Copywriting'],
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      // Calculate total translation needed
      // (Number of panels - 1) * 100% to move the last panel into view
      const totalWidth = (SERVICES.length - 1) * 100;

      gsap.to(track, {
        xPercent: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true, // Pin the container while scrolling
          scrub: 1, // Smooth linking of scroll to animation
          snap: 1 / (SERVICES.length - 1), // Optional: Snap to sections
          // duration of the scroll (300% of viewport height)
          end: '+=300%', 
        },
      });
    },
    { scope: containerRef }
  );

  return (
    // Outer container creates the scroll space (height)
    <section ref={containerRef} className="relative h-[300vh] bg-background">
      {/* Sticky Wrapper: Stays fixed while we scroll through the outer container */}
      <div className="sticky top-0 flex h-screen overflow-hidden">
        
        {/* Horizontal Track: The element that moves left */}
        <div ref={trackRef} className="flex w-full will-change-transform">
          
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="relative flex h-screen w-screen shrink-0 flex-col justify-between border-r border-white/10 bg-background p-6 md:p-12"
            >
              {/* Top: ID and Tags */}
              <div className="flex w-full items-start justify-between border-b border-white/10 pb-6">
                <span className="font-display text-6xl text-accent">
                  {service.id}
                </span>
                <div className="flex flex-col items-end gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-widest text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Middle: Huge Title */}
              <div className="relative z-10">
                <h2 className="font-display text-[15vw] font-bold leading-none tracking-tighter text-foreground mix-blend-difference">
                  {service.title}
                </h2>
              </div>

              {/* Bottom: Description */}
              <div className="max-w-xl border-t border-white/10 pt-6">
                <p className="font-body text-xl font-light text-white/80 md:text-2xl">
                  {service.description}
                </p>
              </div>
              
              {/* Decorative Background Pattern (Optional CSS Grid lines) */}
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}