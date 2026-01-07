import localFont from 'next/font/local';
import { Plus_Jakarta_Sans } from 'next/font/google';

export const ClashDisplay = localFont({
  src: '../assets/fonts/ClashDisplay-Variable.woff2',
  display: 'swap',
  variable: '--font-display',
});

export const Jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});
