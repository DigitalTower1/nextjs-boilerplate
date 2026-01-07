import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

export function Button({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        clsx(
          // Base styles: Neo-brutalist defaults (sharp corners, uppercase, bold)
          'inline-flex items-center justify-center px-8 py-4',
          'font-display font-bold uppercase tracking-wider text-sm leading-none',
          'transition-all duration-300 ease-out',
          'border-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none',
          {
            // Primary variant: Accent bg, black text, hard hover shift
            'bg-accent border-accent text-background hover:-translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]':
              variant === 'primary',
            // Outline variant: Transparent bg, white border, accent hover
            'bg-transparent border-foreground text-foreground hover:bg-foreground hover:text-background':
              variant === 'outline',
          }
        ),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}