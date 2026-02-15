import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-[var(--transition-normal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

    const variants = {
      default:
        'bg-[var(--brand)] text-white hover:bg-[var(--brand-hover)] shadow-subtle hover:shadow-card',
      secondary:
        'bg-[var(--surface-1)] text-[var(--foreground)] hover:bg-[var(--surface-2)] border border-[var(--border-soft)]',
      outline:
        'border-2 border-[var(--border-medium)] bg-transparent text-[var(--foreground)] hover:bg-[var(--surface-1)] hover:border-[var(--border-strong)]',
      ghost:
        'bg-transparent text-[var(--foreground)] hover:bg-[var(--surface-1)]',
      accent:
        'bg-[var(--accent)] text-white hover:bg-[#d97706] shadow-subtle hover:shadow-card',
      destructive:
        'bg-[var(--error)] text-white hover:bg-[#dc2626] shadow-subtle hover:shadow-card',
    };

    const sizes = {
      default: 'h-10 px-4 py-2 text-sm',
      sm: 'h-9 px-3 py-1.5 text-xs rounded-sm',
      lg: 'h-12 px-8 py-3 text-base rounded-lg',
      icon: 'h-10 w-10 p-0 rounded-md',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button };
