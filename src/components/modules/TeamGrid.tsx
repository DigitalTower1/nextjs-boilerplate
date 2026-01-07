'use client';

import { useRef } from 'react';
import { clsx } from 'clsx';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string; // Placeholder .avif o .webp
  video: string; // URL video loop
}

const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Alex Riva",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    video: "https://cdn.coverr.co/videos/coverr-a-man-laughing-5712/1080p.mp4"
  },
  {
    id: 2,
    name: "Elena Voss",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    video: "https://cdn.coverr.co/videos/coverr-woman-working-at-computer-2647/1080p.mp4"
  },
  {
    id: 3,
    name: "Marcus Kane",
    role: "3D Artist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    video: "https://cdn.coverr.co/videos/coverr-man-drinking-coffee-5683/1080p.mp4"
  }
];

function TeamCard({ member }: { member: TeamMember }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay blocked", e));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div 
      className="group relative aspect-[3/4] overflow-hidden bg-white/5 border border-white/10 rounded-2xl cursor-crosshair"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Immagine Statica (Grayscale) */}
      <img
        src={member.image}
        alt={member.name}
        className="absolute inset-0 h-full w-full object-cover grayscale transition-opacity duration-300 group-hover:opacity-0"
        loading="lazy"
      />

      {/* 2. Video Colorato (Hidden by default) */}
      <video
        ref={videoRef}
        src={member.video}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* 3. Overlay Testuale */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-10">
        <div className="translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
          <h4 className="font-display text-2xl font-bold uppercase text-white leading-none">
            {member.name}
          </h4>
          <p className="font-body text-xs uppercase tracking-widest text-accent mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {member.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TeamGrid() {
  return (
    <section className="w-full py-32 px-6 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <h2 className="font-display text-7xl md:text-8xl uppercase leading-[0.8] tracking-tighter">
            Our <br /> <span className="text-white/20 italic">Humans</span>
          </h2>
          <p className="max-w-xs text-sm font-body text-foreground/60 uppercase tracking-widest leading-relaxed">
            A diverse collective of thinkers, makers, and innovators based in LA & Berlin.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}