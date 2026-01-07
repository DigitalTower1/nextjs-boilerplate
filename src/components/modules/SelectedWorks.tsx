'use client';

import { useRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- TYPE DEFINITIONS ---
interface Project {
  id: number;
  title: string;
  category: string;
  videoSrc: string; // URL to background video
  colSpan?: string; // Tailwind class for grid span
}

// --- MOCK DATA ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'NEURAL INTERFACE',
    category: 'AI / WEBGL',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-abstract-digital-tunnel-4509/1080p.mp4',
    colSpan: 'md:col-span-2', // Wide block
  },
  {
    id: 2,
    title: 'CYBER FASHION',
    category: 'ECOMMERCE',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-fashion-model-cyberpunk-4560/1080p.mp4',
    colSpan: 'md:col-span-1', // Tall/Square block
  },
  {
    id: 3,
    title: 'QUANTUM FINANCE',
    category: 'DASHBOARD',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-financial-graph-digital-overlay-5244/1080p.mp4',
    colSpan: 'md:col-span-1',
  },
  {
    id: 4,
    title: 'AERO SPACE',
    category: 'IMMERSIVE 3D',
    videoSrc: 'https://cdn.coverr.co/videos/coverr-planet-earth-rotation-space-4444/1080p.mp4',
    colSpan: 'md:col-span-2',
  },
];

// --- CARD COMPONENT ---
function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      // Layout & Shape
      className={twMerge(
        'group relative h-[400px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8',
        'transition-colors duration-500 hover:border-accent/50',
        project.colSpan
      )}
      // Interaction Handlers
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Trigger for Custom Cursor
      data-hover-trigger
    >
      {/* 1. Background Video (Hidden by default, shown on hover) */}
      <div className="absolute inset-0 -z-10 bg-black">
        <video
          ref={videoRef}
          src={project.videoSrc}
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-0 transition-opacity duration-500 will-change-opacity group-hover:opacity-60"
        />
      </div>

      {/* 2. Content Overlay */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Top: Category Tag */}
        <div className="w-fit rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-medium uppercase tracking-widest backdrop-blur-md">
          {project.category}
        </div>

        {/* Bottom: Title & Arrow */}
        <div className="flex items-end justify-between translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <h3 className="font-display text-4xl font-bold uppercase leading-none text-white">
            {project.title}
          </h3>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-black">
             {/* Simple SVG Arrow */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 13L13 1M13 1H5M13 1V9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

// --- MAIN GRID MODULE ---
export default function SelectedWorks() {
  return (
    <section className="relative w-full bg-background py-32 px-6">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header */}
        <div className="mb-16 flex items-end justify-between">
          <h2 className="font-display text-8xl uppercase leading-[0.85] text-foreground">
            Selected <br /> <span className="text-white/20">Works</span>
          </h2>
          <p className="hidden max-w-sm text-right text-sm text-gray-400 md:block">
            A curation of award-winning digital experiences designed for the boldest
            brands in the industry.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}