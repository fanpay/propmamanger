'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const router = useRouter();
  const [operation, setOperation] = useState('');
  const [type, setType] = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (operation) params.set('op', operation);
    if (type) params.set('type', type);
    if (neighborhood) params.set('q', neighborhood);
    router.push(`/propiedades?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-2xl shadow-lg px-4 py-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
    >
      <div className="flex-1">
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="w-full px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C] bg-white text-[#1A1A1A]"
        >
          <option value="">Operación</option>
          <option value="RENT">Arrendar</option>
          <option value="SALE">Comprar</option>
        </select>
      </div>
      <div className="flex-1">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C] bg-white text-[#1A1A1A]"
        >
          <option value="">Tipo de inmueble</option>
          <option value="APARTMENT">Apartamento</option>
          <option value="HOUSE">Casa</option>
          <option value="OFFICE">Oficina</option>
          <option value="LOCAL">Local</option>
          <option value="WAREHOUSE">Bodega</option>
          <option value="LOT">Lote</option>
        </select>
      </div>
      <div className="flex-1">
        <input
          type="text"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          placeholder="Barrio o sector"
          className="w-full px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C] bg-white placeholder-gray-400"
        />
      </div>
      <button
        type="submit"
        className="flex items-center justify-center gap-2 px-6 py-2 bg-[#C8873A] text-white rounded-lg font-medium hover:bg-[#b5762f] transition-colors"
      >
        <Search className="w-4 h-4" />
        Buscar
      </button>
    </form>
  );
}
