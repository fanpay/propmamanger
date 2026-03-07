import React from 'react';
import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C] focus:ring-1 focus:ring-[#1B3A5C] bg-white placeholder-gray-400 resize-none',
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
