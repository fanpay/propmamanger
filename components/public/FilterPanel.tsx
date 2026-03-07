'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

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

interface FilterPanelProps {
  onFilter: (filters: FilterState) => void;
}

const PROPERTY_TYPES = [
  { value: 'APARTMENT', label: 'Apartamento' },
  { value: 'HOUSE', label: 'Casa' },
  { value: 'OFFICE', label: 'Oficina' },
  { value: 'LOCAL', label: 'Local' },
  { value: 'WAREHOUSE', label: 'Bodega' },
  { value: 'LOT', label: 'Lote' },
];

const ROOM_OPTIONS = ['1', '2', '3', '4+'];
const BATH_OPTIONS = ['1', '2', '3+'];
const STRATA = ['1', '2', '3', '4', '5', '6'];

const defaultFilters: FilterState = {
  types: [],
  operation: '',
  minPrice: '',
  maxPrice: '',
  rooms: [],
  bathrooms: [],
  parking: false,
  strata: [],
};

export default function FilterPanel({ onFilter }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  function toggleArray(arr: string[], value: string): string[] {
    return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
  }

  function update(patch: Partial<FilterState>) {
    const next = { ...filters, ...patch };
    setFilters(next);
    onFilter(next);
  }

  function reset() {
    setFilters(defaultFilters);
    onFilter(defaultFilters);
  }

  return (
    <div className="bg-white rounded-xl border border-[#E5E0D8] p-5 space-y-6 sticky top-20">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[#1A1A1A]">Filtros</h3>
        <button onClick={reset} className="text-xs text-[#C8873A] hover:underline">Limpiar filtros</button>
      </div>

      {/* Operation */}
      <div>
        <p className="text-sm font-medium text-[#1A1A1A] mb-2">Operación</p>
        {[{ v: '', l: 'Todas' }, { v: 'RENT', l: 'Arriendo' }, { v: 'SALE', l: 'Venta' }].map(({ v, l }) => (
          <label key={v} className="flex items-center gap-2 mb-1 cursor-pointer">
            <input
              type="radio"
              name="operation"
              checked={filters.operation === v}
              onChange={() => update({ operation: v })}
              className="accent-[#1B3A5C]"
            />
            <span className="text-sm text-[#1A1A1A]">{l}</span>
          </label>
        ))}
      </div>

      {/* Types */}
      <div>
        <p className="text-sm font-medium text-[#1A1A1A] mb-2">Tipo de inmueble</p>
        {PROPERTY_TYPES.map(({ value, label }) => (
          <label key={value} className="flex items-center gap-2 mb-1 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.types.includes(value)}
              onChange={() => update({ types: toggleArray(filters.types, value) })}
              className="accent-[#1B3A5C]"
            />
            <span className="text-sm text-[#1A1A1A]">{label}</span>
          </label>
        ))}
      </div>

      {/* Price range */}
      <div>
        <p className="text-sm font-medium text-[#1A1A1A] mb-2">Precio (COP)</p>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Mín."
            value={filters.minPrice}
            onChange={(e) => update({ minPrice: e.target.value })}
            className="w-full px-2 py-1.5 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C]"
          />
          <input
            type="number"
            placeholder="Máx."
            value={filters.maxPrice}
            onChange={(e) => update({ maxPrice: e.target.value })}
            className="w-full px-2 py-1.5 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C]"
          />
        </div>
      </div>

      {/* Rooms */}
      <div>
        <p className="text-sm font-medium text-[#1A1A1A] mb-2">Habitaciones</p>
        <div className="flex gap-2 flex-wrap">
          {ROOM_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => update({ rooms: toggleArray(filters.rooms, r) })}
              className={`px-3 py-1 rounded-lg text-sm border transition-colors ${
                filters.rooms.includes(r)
                  ? 'bg-[#1B3A5C] text-white border-[#1B3A5C]'
                  : 'bg-white text-[#1A1A1A] border-[#E5E0D8] hover:border-[#1B3A5C]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div>
        <p className="text-sm font-medium text-[#1A1A1A] mb-2">Baños</p>
        <div className="flex gap-2 flex-wrap">
          {BATH_OPTIONS.map((b) => (
            <button
              key={b}
              onClick={() => update({ bathrooms: toggleArray(filters.bathrooms, b) })}
              className={`px-3 py-1 rounded-lg text-sm border transition-colors ${
                filters.bathrooms.includes(b)
                  ? 'bg-[#1B3A5C] text-white border-[#1B3A5C]'
                  : 'bg-white text-[#1A1A1A] border-[#E5E0D8] hover:border-[#1B3A5C]'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Parking */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.parking}
            onChange={(e) => update({ parking: e.target.checked })}
            className="accent-[#1B3A5C]"
          />
          <span className="text-sm text-[#1A1A1A]">Con parqueadero</span>
        </label>
      </div>

      {/* Strata */}
      <div>
        <p className="text-sm font-medium text-[#1A1A1A] mb-2">Estrato</p>
        <div className="flex gap-2 flex-wrap">
          {STRATA.map((s) => (
            <label key={s} className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.strata.includes(s)}
                onChange={() => update({ strata: toggleArray(filters.strata, s) })}
                className="accent-[#1B3A5C]"
              />
              <span className="text-sm">{s}</span>
            </label>
          ))}
        </div>
      </div>

      <Button variant="outline" size="sm" className="w-full" onClick={reset}>
        Limpiar filtros
      </Button>
    </div>
  );
}
