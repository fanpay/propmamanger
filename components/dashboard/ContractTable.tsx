'use client';
import { Contract } from '@/types';
import { formatCOP, formatDate, getStatusLabel, daysUntil } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ContractTableProps {
  contracts: Contract[];
}

function getStatusVariant(status: string): 'success' | 'warning' | 'secondary' | 'danger' | 'default' {
  const map: Record<string, 'success' | 'warning' | 'secondary' | 'danger' | 'default'> = {
    ACTIVE: 'success',
    DRAFT: 'secondary',
    EXPIRED: 'danger',
    TERMINATED: 'secondary',
    RENEWED: 'info' as 'default',
  };
  return map[status] || 'secondary';
}

export default function ContractTable({ contracts }: ContractTableProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E5E0D8] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E0D8] bg-[#F7F5F2]">
              <th className="text-left px-4 py-3 font-medium text-[#6B7280]">Propiedad</th>
              <th className="text-left px-4 py-3 font-medium text-[#6B7280]">Arrendatario</th>
              <th className="text-left px-4 py-3 font-medium text-[#6B7280]">Arriendo/mes</th>
              <th className="text-left px-4 py-3 font-medium text-[#6B7280]">Inicio</th>
              <th className="text-left px-4 py-3 font-medium text-[#6B7280]">Vencimiento</th>
              <th className="text-left px-4 py-3 font-medium text-[#6B7280]">Días restantes</th>
              <th className="text-left px-4 py-3 font-medium text-[#6B7280]">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E0D8]">
            {contracts.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[#6B7280]">No hay contratos</td>
              </tr>
            ) : (
              contracts.map((c) => {
                const days = daysUntil(c.endDate);
                const expiringSoon = days >= 0 && days <= 30 && c.status === 'ACTIVE';
                return (
                  <tr
                    key={c.id}
                    className={cn(
                      'hover:bg-[#F7F5F2] transition-colors',
                      expiringSoon && 'bg-amber-50 hover:bg-amber-100'
                    )}
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#1A1A1A] line-clamp-1 max-w-[180px]">{c.property.title}</p>
                      <p className="text-xs text-[#6B7280]">{c.property.code}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-[#1A1A1A]">{c.tenant.name}</p>
                      <p className="text-xs text-[#6B7280]">{c.tenant.phone}</p>
                    </td>
                    <td className="px-4 py-3 font-medium text-[#1B3A5C]">{formatCOP(c.monthlyRent)}</td>
                    <td className="px-4 py-3 text-[#6B7280]">{formatDate(c.startDate)}</td>
                    <td className="px-4 py-3 text-[#6B7280]">{formatDate(c.endDate)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'font-medium',
                          days < 0
                            ? 'text-[#D94F3D]'
                            : expiringSoon
                            ? 'text-[#E8A020]'
                            : 'text-[#6B7280]'
                        )}
                      >
                        {days < 0 ? 'Vencido' : `${days} días`}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={getStatusVariant(c.status)}>{getStatusLabel(c.status)}</Badge>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
