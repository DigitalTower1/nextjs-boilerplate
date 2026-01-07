'use client';

import { useRouter } from 'next/navigation';
import { useTransitionStore } from '@/lib/store';

export const usePageTransition = () => {
  const router = useRouter();
  const { setIsExiting } = useTransitionStore();

  const navigate = (href: string) => {
    setIsExiting(true);
    // Wait for the GSAP animation duration (0.8s) before changing route
    setTimeout(() => {
      router.push(href);
    }, 800);
  };

  return navigate;
};