'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Property } from '@/types';
import { getProperties } from '@/lib/mock-data';
import PropertyCard from '@/components/public/PropertyCard';
import FilterPanel from '@/components/public/FilterPanel';
import SkeletonCard from '@/components/public/SkeletonCard';
import MobileFilterDrawer from '@/components/public/MobileFilterDrawer';
import { LayoutGrid, List, ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 9;

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

function PropertiesContent() {
  const searchParams = useSearchParams();
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [viewGrid, setViewGrid] = useState(true);
  const [sort, setSort] = useState('default');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    operation: searchParams.get('op') || '',
    minPrice: '',
    maxPrice: '',
    rooms: [],
    bathrooms: [],
    parking: false,
    strata: [],
  });

  useEffect(() => {
    setLoading(true);
    getProperties().then((props) => {
      setAllProperties(props);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = [...allProperties];

    const qParam = searchParams.get('q');
    if (qParam) {
      result = result.filter((p) =>
        p.neighborhood.toLowerCase().includes(qParam.toLowerCase()) ||
        p.title.toLowerCase().includes(qParam.toLowerCase())
      );
    }

    if (filters.operation) result = result.filter((p) => p.operation === filters.operation);
    if (filters.types.length > 0) result = result.filter((p) => filters.types.includes(p.type));
    if (filters.minPrice) result = result.filter((p) => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) result = result.filter((p) => p.price <= Number(filters.maxPrice));
    if (filters.rooms.length > 0) {
      result = result.filter((p) => {
        if (!p.rooms) return false;
        return filters.rooms.some((r) => (r === '4+' ? p.rooms! >= 4 : p.rooms === Number(r)));
      });
    }
    if (filters.bathrooms.length > 0) {
      result = result.filter((p) => {
        if (!p.bathrooms) return false;
        return filters.bathrooms.some((b) => (b === '3+' ? p.bathrooms! >= 3 : p.bathrooms === Number(b)));
      });
    }
    if (filters.parking) result = result.filter((p) => p.parking);
    if (filters.strata.length > 0) result = result.filter((p) => filters.strata.includes(String(p.stratum)));

    if (sort === 'price_asc') result.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') result.sort((a, b) => b.price - a.price);
    if (sort === 'area_desc') result.sort((a, b) => b.area - a.area);

    setFiltered(result);
    setPage(1);
  }, [allProperties, filters, sort, searchParams]);

  const typeParam = searchParams.get('type');
  useEffect(() => {
    if (typeParam) setFilters((f) => ({ ...f, types: [typeParam] }));
  }, [typeParam]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-6">
        {/* Sidebar filter — desktop only */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <FilterPanel onFilter={(f) => setFilters(f)} />
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              {/* Mobile filter drawer trigger (rendered inside MobileFilterDrawer) */}
              <MobileFilterDrawer onFilter={(f) => setFilters(f)} resultCount={filtered.length} />
              <p className="text-text-muted text-sm">
                <span className="font-semibold text-text-main">{filtered.length}</span> propiedades encontradas
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-1.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary bg-white"
              >
                <option value="default">Relevancia</option>
                <option value="price_asc">Precio: menor a mayor</option>
                <option value="price_desc">Precio: mayor a menor</option>
                <option value="area_desc">Mayor área</option>
              </select>
              <div className="flex gap-1">
                <button
                  onClick={() => setViewGrid(true)}
                  className={`p-2 rounded-lg ${viewGrid ? 'bg-primary text-white' : 'border border-border text-text-muted hover:bg-surface'}`}
                  title="Vista grilla"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewGrid(false)}
                  className={`p-2 rounded-lg ${!viewGrid ? 'bg-primary text-white' : 'border border-border text-text-muted hover:bg-surface'}`}
                  title="Vista lista"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Skeleton loading */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-text-muted">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-lg font-medium text-text-main">No se encontraron propiedades</p>
              <p className="text-sm mt-1">Intenta cambiar los filtros de búsqueda</p>
            </div>
          ) : viewGrid ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginated.map((p) => (
                <PropertyCard key={p.id} property={p} variant="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paginated.map((p) => (
                <PropertyCard key={p.id} property={p} variant="list" />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                disabled={page === 1}
                className="flex items-center gap-1.5 px-4 py-2 border border-border rounded-xl text-sm font-medium disabled:opacity-40 hover:border-primary hover:text-primary transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce<(number | string)[]>((acc, p, i, arr) => {
                  if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push('...');
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === '...' ? (
                    <span key={`ellipsis-${i}`} className="px-2 text-text-muted">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => { setPage(p as number); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className={`w-9 h-9 rounded-xl text-sm font-semibold transition-colors ${
                        page === p ? 'bg-primary text-white' : 'border border-border hover:border-primary hover:text-primary'
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

              <button
                onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                disabled={page === totalPages}
                className="flex items-center gap-1.5 px-4 py-2 border border-border rounded-xl text-sm font-medium disabled:opacity-40 hover:border-primary hover:text-primary transition-colors"
              >
                Siguiente <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  );
}
