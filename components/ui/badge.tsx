import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'secondary';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-[#1B3A5C] text-white',
    success: 'bg-[#4CAF7D] text-white',
    warning: 'bg-[#E8A020] text-white',
    danger: 'bg-[#D94F3D] text-white',
    info: 'bg-blue-500 text-white',
    secondary: 'bg-gray-100 text-gray-700',
  };
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  );
}
