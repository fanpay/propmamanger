'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/propiedades?op=RENT', label: 'Arrendar' },
  { href: '/propiedades?op=SALE', label: 'Comprar' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'glass shadow-card border-b border-border'
          : 'bg-white/95 backdrop-blur-sm shadow-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:bg-secondary transition-colors duration-200">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-primary group-hover:text-secondary transition-colors duration-200">
              PropManager
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname.startsWith(href.split('?')[0]);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'relative text-sm font-medium transition-colors duration-200 py-1',
                    'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-200',
                    active
                      ? 'text-primary after:w-full'
                      : 'text-text-muted hover:text-primary after:w-0 hover:after:w-full'
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden md:inline-flex items-center px-4 py-2 text-sm font-semibold border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-200"
            >
              Ingresar
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-surface transition-colors"
              aria-label="Menú"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden animate-slide-down bg-white border-t border-border px-4 py-4 flex flex-col gap-3 shadow-lg">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-text-main hover:text-primary px-3 py-2 rounded-lg hover:bg-surface transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/login"
            className="flex items-center justify-center px-4 py-2.5 text-sm font-semibold bg-primary text-white rounded-xl mt-2"
            onClick={() => setMobileOpen(false)}
          >
            Ingresar al Panel
          </Link>
        </div>
      )}
    </nav>
  );
}
