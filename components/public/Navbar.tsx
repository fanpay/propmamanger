'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Building2, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="w-7 h-7 text-[#1B3A5C]" />
            <span className="text-xl font-bold text-[#1B3A5C]">PropManager</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/propiedades?op=RENT" className="text-sm font-medium text-[#1A1A1A] hover:text-[#1B3A5C] transition-colors">
              Arrendar
            </Link>
            <Link href="/propiedades?op=SALE" className="text-sm font-medium text-[#1A1A1A] hover:text-[#1B3A5C] transition-colors">
              Comprar
            </Link>
            <Link href="/contacto" className="text-sm font-medium text-[#1A1A1A] hover:text-[#1B3A5C] transition-colors">
              Contacto
            </Link>
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium border border-[#1B3A5C] text-[#1B3A5C] rounded-lg hover:bg-[#1B3A5C] hover:text-white transition-colors"
            >
              Ingresar
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#E5E0D8] px-4 py-4 flex flex-col gap-4">
          <Link href="/propiedades?op=RENT" className="text-sm font-medium text-[#1A1A1A]" onClick={() => setMobileOpen(false)}>
            Arrendar
          </Link>
          <Link href="/propiedades?op=SALE" className="text-sm font-medium text-[#1A1A1A]" onClick={() => setMobileOpen(false)}>
            Comprar
          </Link>
          <Link href="/contacto" className="text-sm font-medium text-[#1A1A1A]" onClick={() => setMobileOpen(false)}>
            Contacto
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-[#1B3A5C] text-[#1B3A5C] rounded-lg"
            onClick={() => setMobileOpen(false)}
          >
            Ingresar
          </Link>
        </div>
      )}
    </nav>
  );
}
