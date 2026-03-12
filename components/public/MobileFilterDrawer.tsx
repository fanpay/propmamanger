'use client';
import { useState, useEffect } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import FilterPanel from './FilterPanel';

interface FilterState {
  types: string[];
  operation: string;
  minPrice: string;
  maxPrice: string;
  rooms: string[];
  bathrooms: string[];
  parking: boolean;
  strata: string[];
}

interface MobileFilterDrawerProps {
  onFilter: (filters: FilterState) => void;
  resultCount: number;
}

export default function MobileFilterDrawer({ onFilter, resultCount }: MobileFilterDrawerProps) {
  const [open, setOpen] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Trigger button — shown only on mobile */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-semibold text-text-main shadow-sm hover:border-primary transition-colors"
        id="mobile-filter-btn"
      >
        <SlidersHorizontal className="w-4 h-4 text-primary" />
        Filtros
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 lg:hidden max-h-[85vh] flex flex-col ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-10 h-1 bg-border rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3 border-b border-border flex-shrink-0">
          <h3 className="font-display font-bold text-text-main text-lg">Filtros</h3>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-xl hover:bg-surface transition-colors"
            aria-label="Cerrar filtros"
          >
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>

        {/* Filter panel — scrollable */}
        <div className="overflow-y-auto flex-1 px-2 pb-4">
          <FilterPanel onFilter={onFilter} />
        </div>

        {/* Apply button */}
        <div className="px-5 py-4 border-t border-border bg-white flex-shrink-0">
          <button
            onClick={() => setOpen(false)}
            className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
            id="apply-filters-btn"
          >
            Ver {resultCount} resultado{resultCount !== 1 ? 's' : ''}
          </button>
        </div>
      </div>
    </>
  );
}
