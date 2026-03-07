import React from 'react';
import { cn } from '@/lib/utils';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <label ref={ref} className={cn('text-sm font-medium text-[#1A1A1A]', className)} {...props}>
        {children}
      </label>
    );
  }
);
Label.displayName = 'Label';
