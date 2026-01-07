'use client';

import { Button } from '@/components/ui/Button';

export default function Footer() {
  return (
    <footer
      className="fixed bottom-0 left-0 h-[80vh] w-full bg-accent -z-10 overflow-hidden flex flex-col justify-between px-6 py-12 md:p-24"
      // data-scroll-section is often used by smooth scroll libs to identify boundaries,
      // but with fixed positioning, we rely on the main content's margin-bottom.
    >
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Top Section: Navigation Links */}
      <div className="flex flex-col md:flex-row w-full justify-between items-start z-10 text-black">
        <div className="flex flex-col gap-2">
          <h4 className="font-display font-bold uppercase tracking-widest mb-4">Socials</h4>
          {['Instagram', 'Twitter / X', 'LinkedIn', 'Awwwards'].map((link) => (
            <a
              key={link}
              href="#"
              className="font-body text-lg hover:underline decoration-2 underline-offset-4"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2 mt-12 md:mt-0 text-right">
          <h4 className="font-display font-bold uppercase tracking-widest mb-4">Location</h4>
          <p className="font-body text-lg">
            1200 Grand St.<br />
            Los Angeles, CA<br />
            90015
          </p>
        </div>
      </div>

      {/* Center/Bottom Section: MASSIVE CTA */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
        <h2 className="font-display text-[15vw] leading-[0.8] tracking-tighter uppercase text-black text-center mix-blend-multiply">
          Let's Talk
        </h2>
        <div className="mt-8">
           {/* Reusing our brutalist button, but inverting colors for the accent background */}
          <Button 
            className="bg-black text-accent border-black hover:bg-transparent hover:text-black hover:shadow-[4px_4px_0px_0px_#000]"
          >
            Start a Project
          </Button>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex justify-between items-end border-t border-black/20 pt-6 mt-6 z-10 text-black/60 font-body text-sm uppercase tracking-wide">
        <span>© 2026 Agency Inc.</span>
        <span>All Rights Reserved.</span>
      </div>
    </footer>
  );
}