import { Suspense } from 'react';
import { ClashDisplay, Jakarta } from '@/lib/fonts';
import SmoothScroll from '@/components/providers/SmoothScroll';
import PageTransitionOverlay from '@/components/ui/PageTransitionOverlay';
import Navigation from '@/components/modules/Navigation';
import Cursor from '@/components/ui/Cursor';
import Footer from '@/components/modules/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ClashDisplay.variable} ${Jakarta.variable}`}>
      <body className="antialiased bg-background text-foreground overflow-x-hidden">
        {/* A11Y: Skip Link */}
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-[200] bg-accent p-4">
          Skip to content
        </a>

        <SmoothScroll>
          <PageTransitionOverlay />
          <Cursor />
          <Navigation />
          
          {/* Static Shell with Dynamic Children */}
          <main id="main" className="relative z-10 bg-background mb-[80vh]">
            {children}
          </main>
          
          {/* Footer Reveal (Sticky Trick) */}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );

}
