'use client';
import { useState, useEffect } from 'react';
import { Property } from '@/types';
import { getProperties } from '@/lib/mock-data';
import PropertyTable from '@/components/dashboard/PropertyTable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';

const TABS = [
  { label: 'Todas', value: '' },
  { label: 'Disponibles', value: 'AVAILABLE' },
  { label: 'Arrendadas', value: 'RENTED' },
  { label: 'En Venta', value: 'SALE_AVAILABLE' },
  { label: 'En Negociación', value: 'NEGOTIATION' },
];

export default function DashboardPropertiesPage() {
  const [all, setAll] = useState<Property[]>([]);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('');

  useEffect(() => {
    getProperties().then(setAll);
  }, []);

  const filtered = all.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase());

    let matchTab = true;
    if (tab === 'AVAILABLE') matchTab = p.status === 'AVAILABLE';
    else if (tab === 'RENTED') matchTab = p.status === 'RENTED';
    else if (tab === 'SALE_AVAILABLE') matchTab = p.operation === 'SALE' && p.status === 'AVAILABLE';
    else if (tab === 'NEGOTIATION') matchTab = p.status === 'NEGOTIATION';

    return matchSearch && matchTab;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#1A1A1A]">Mis Propiedades</h1>
        <Link href="/dashboard/propiedades/nueva">
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Nueva Propiedad
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 flex-wrap border-b border-[#E5E0D8]">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              tab === t.value
                ? 'border-[#1B3A5C] text-[#1B3A5C]'
                : 'border-transparent text-[#6B7280] hover:text-[#1A1A1A]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
        <Input
          placeholder="Buscar por título, sector o código..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <PropertyTable properties={filtered} />
    </div>
  );
}
