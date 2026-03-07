'use client';
import { useState, useEffect } from 'react';
import { Contract } from '@/types';
import { getContracts } from '@/lib/mock-data';
import ContractTable from '@/components/dashboard/ContractTable';
import { daysUntil } from '@/lib/utils';

const TABS = [
  { label: 'Activos', value: 'ACTIVE' },
  { label: 'Por vencer', value: 'EXPIRING' },
  { label: 'Vencidos', value: 'EXPIRED' },
  { label: 'Borradores', value: 'DRAFT' },
];

export default function ContractsPage() {
  const [all, setAll] = useState<Contract[]>([]);
  const [tab, setTab] = useState('ACTIVE');

  useEffect(() => {
    getContracts().then(setAll);
  }, []);

  const filtered = all.filter((c) => {
    if (tab === 'EXPIRING') {
      const days = daysUntil(c.endDate);
      return c.status === 'ACTIVE' && days >= 0 && days <= 30;
    }
    return c.status === tab;
  });

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-[#1A1A1A]">Contratos</h1>

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
            <span className="ml-1.5 text-xs bg-gray-100 text-gray-600 rounded-full px-1.5 py-0.5">
              {t.value === 'EXPIRING'
                ? all.filter((c) => {
                    const days = daysUntil(c.endDate);
                    return c.status === 'ACTIVE' && days >= 0 && days <= 30;
                  }).length
                : all.filter((c) => c.status === t.value).length}
            </span>
          </button>
        ))}
      </div>

      <ContractTable contracts={filtered} />
    </div>
  );
}
