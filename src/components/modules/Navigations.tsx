'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Home, Briefcase, Cpu, Zap, Mail } from 'lucide-react';
import { clsx } from 'clsx';

const NAV_ITEMS = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Work', icon: Briefcase, href: '#work' },
  { label: 'Services', icon: Cpu, href: '#services' },
  { label: 'Studio', icon: Zap, href: '#studio' },
  { label: 'Contact', icon: Mail, href: '#contact' },
];

export default function Navigation() {
  const dockRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>('.dock-item');
    
    const onMouseMove = (e: MouseEvent) => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        // Calcolo del centro dell'icona
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calcolo distanza tra mouse e centro icona
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        
        // Effetto ingrandimento: più vicino è il mouse, più grande è l'icona (max 1.5x)
        const scale = gsap.utils.pipe(
          gsap.utils.mapRange(0, 200, 1.5, 1), // Range di 200px per l'influenza
          gsap.utils.clamp(1, 1.5)
        )(distance);

        gsap.to(item, {
          scale: scale,
          duration: 0.3,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      });
    };

    const onMouseLeave = () => {
      gsap.to(items, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    };

    const dock = dockRef.current;
    if (dock) {
      dock.addEventListener('mousemove', onMouseMove);
      dock.addEventListener('mouseleave', onMouseLeave);
    }

    return () => {
      if (dock) {
        dock.removeEventListener('mousemove', onMouseMove);
        dock.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, { scope: dockRef });

  return (
    <nav 
      ref={dockRef}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 
                 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl 
                 flex items-center gap-2 md:gap-4 shadow-2xl"
    >
      {NAV_ITEMS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="dock-item group relative flex items-center justify-center 
                     w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 
                     transition-colors hover:bg-accent hover:text-black text-white"
        >
          <item.icon size={20} strokeWidth={1.5} />
          
          {/* Label Tooltip (Desktop Only) */}
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 
                           px-3 py-1 rounded-md bg-white text-black text-[10px] 
                           font-display font-bold uppercase tracking-tighter
                           opacity-0 group-hover:opacity-100 transition-opacity 
                           pointer-events-none whitespace-nowrap">
            {item.label}
          </span>
        </a>
      ))}
    </nav>
  );
}