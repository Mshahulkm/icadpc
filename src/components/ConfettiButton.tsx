import { type ReactNode, type MouseEvent } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export default function ConfettiButton({
  children,
  onClick,
  className = '',
  href,
  variant = 'primary',
  fullWidth = false,
}: ConfettiButtonProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      origin: { x, y },
      particleCount: 100,
      spread: 70,
      colors: ['#C8A84E', '#1B5E20', '#FFD700', '#E8D58A'],
      gravity: 0.8,
      ticks: 150,
    });

    if (onClick) onClick();
  };

  const baseClasses = `inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer ${fullWidth ? 'w-full' : ''} ${className}`;

  const variantClasses: Record<string, string> = {
    primary: 'bg-[#1B5E20] text-[#F5F5F0] hover:bg-[#0D3B10] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(27,94,32,0.3)]',
    secondary: 'bg-transparent border-2 border-[#C8A84E] text-[#C8A84E] hover:bg-[#C8A84E] hover:text-[#0A0A0A]',
    outline: 'bg-transparent border border-[rgba(200,168,78,0.3)] text-[#E8E8E0] hover:border-[#C8A84E] hover:text-[#C8A84E]',
  };

  const classes = `${baseClasses} ${variantClasses[variant]}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return <button className={classes} onClick={handleClick}>{children}</button>;
}
