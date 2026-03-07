'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Property } from '@/types';
import { getProperties } from '@/lib/mock-data';
import PropertyCard from '@/components/public/PropertyCard';
import FilterPanel from '@/components/public/FilterPanel';
import { LayoutGrid, List } from 'lucide-react';

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
    getProperties().then((props) => {
      setAllProperties(props);
    });
  }, []);

  useEffect(() => {
    let result = [...allProperties];

    // Apply initial search params filters
    const qParam = searchParams.get('q');
    if (qParam) {
      result = result.filter((p) =>
        p.neighborhood.toLowerCase().includes(qParam.toLowerCase()) ||
        p.title.toLowerCase().includes(qParam.toLowerCase())
      );
    }

    // Apply filter panel filters
    if (filters.operation) {
      result = result.filter((p) => p.operation === filters.operation);
    }
    if (filters.types.length > 0) {
      result = result.filter((p) => filters.types.includes(p.type));
    }
    if (filters.minPrice) {
      result = result.filter((p) => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= Number(filters.maxPrice));
    }
    if (filters.rooms.length > 0) {
      result = result.filter((p) => {
        if (!p.rooms) return false;
        return filters.rooms.some((r) => {
          if (r === '4+') return p.rooms! >= 4;
          return p.rooms === Number(r);
        });
      });
    }
    if (filters.bathrooms.length > 0) {
      result = result.filter((p) => {
        if (!p.bathrooms) return false;
        return filters.bathrooms.some((b) => {
          if (b === '3+') return p.bathrooms! >= 3;
          return p.bathrooms === Number(b);
        });
      });
    }
    if (filters.parking) {
      result = result.filter((p) => p.parking);
    }
    if (filters.strata.length > 0) {
      result = result.filter((p) => filters.strata.includes(String(p.stratum)));
    }

    // Sort
    if (sort === 'price_asc') result.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') result.sort((a, b) => b.price - a.price);
    if (sort === 'area_desc') result.sort((a, b) => b.area - a.area);

    setFiltered(result);
  }, [allProperties, filters, sort, searchParams]);

  const typeParam = searchParams.get('type');
  useEffect(() => {
    if (typeParam) {
      setFilters((f) => ({ ...f, types: [typeParam] }));
    }
  }, [typeParam]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-6">
        {/* Sidebar filter */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <FilterPanel onFilter={(f) => setFilters(f)} />
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-[#6B7280] text-sm">
              <span className="font-semibold text-[#1A1A1A]">{filtered.length}</span> propiedades encontradas
            </p>
            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-1.5 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C] bg-white"
              >
                <option value="default">Relevancia</option>
                <option value="price_asc">Precio: menor a mayor</option>
                <option value="price_desc">Precio: mayor a menor</option>
                <option value="area_desc">Mayor área</option>
              </select>
              <div className="flex gap-1">
                <button
                  onClick={() => setViewGrid(true)}
                  className={`p-2 rounded-lg ${viewGrid ? 'bg-[#1B3A5C] text-white' : 'border border-[#E5E0D8] text-[#6B7280] hover:bg-gray-50'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewGrid(false)}
                  className={`p-2 rounded-lg ${!viewGrid ? 'bg-[#1B3A5C] text-white' : 'border border-[#E5E0D8] text-[#6B7280] hover:bg-gray-50'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#6B7280]">
              <p className="text-lg font-medium">No se encontraron propiedades</p>
              <p className="text-sm mt-1">Intenta cambiar los filtros de búsqueda</p>
            </div>
          ) : viewGrid ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20 text-[#6B7280]">Cargando propiedades...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
