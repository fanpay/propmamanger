'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}

interface DialogContentProps {
    children: ReactNode;
    className?: string;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onOpenChange(false);
        };
        if (open) document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [open, onOpenChange]);

    if (!open) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={(e) => { if (e.target === overlayRef.current) onOpenChange(false); }}
        >
            {children}
        </div>
    );
}

export function DialogContent({ children, className = '' }: DialogContentProps) {
    return (
        <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in ${className}`}>
            {children}
        </div>
    );
}
