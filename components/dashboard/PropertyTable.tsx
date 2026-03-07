'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Property } from '@/types';
import { formatCOP, getPropertyTypeLabel, getStatusLabel } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Eye, Pencil } from 'lucide-react';

interface PropertyTableProps {
  properties: Property[];
}

function getStatusVariant(status: string): 'success' | 'warning' | 'secondary' | 'danger' | 'default' {
  const map: Record<string, 'success' | 'warning' | 'secondary' | 'danger' | 'default'> = {
    AVAILABLE: 'success',
    RENTED: 'default',
    SOLD: 'secondary',
    NEGOTIATION: 'warning',
    PAUSED: 'secondary',
  };
  return map[status] || 'secondary';
}

const PAGE_SIZE = 10;

export default function PropertyTable({ properties }: PropertyTableProps) {
  const [page, setPage] = useState(0);
  const total = properties.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const pageItems = properties.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="bg-white rounded-xl border border-[#E5E0D8] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E0D8] bg-[#F7F5F2]">
              <th className="text-left px-4 py-3 font-medium text-[#6B7280]">Código</th>
              <th className="text-left px-4 py-3 font-medium text-[#6B7280]">Propiedad</th>
              <th className="text-left px-4 py-3 font-medium text-[#6B7280]">Tipo</th>
              <th className="text-left px-4 py-3 font-medium text-[#6B7280]">Sector</th>
              <th className="text-left px-4 py-3 font-medium text-[#6B7280]">Precio</th>
              <th className="text-left px-4 py-3 font-medium text-[#6B7280]">Estado</th>
              <th className="text-left px-4 py-3 font-medium text-[#6B7280]">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E0D8]">
            {pageItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[#6B7280]">No hay propiedades</td>
              </tr>
            ) : (
              pageItems.map((p) => (
                <tr key={p.id} className="hover:bg-[#F7F5F2] transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-[#6B7280]">{p.code}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]?.url || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'}
                        alt={p.title}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      />
                      <span className="font-medium text-[#1A1A1A] line-clamp-1 max-w-[200px]">{p.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#6B7280]">{getPropertyTypeLabel(p.type)}</td>
                  <td className="px-4 py-3 text-[#6B7280]">{p.neighborhood}</td>
                  <td className="px-4 py-3 font-medium text-[#1B3A5C]">{formatCOP(p.price)}</td>
                  <td className="px-4 py-3">
                    <Badge variant={getStatusVariant(p.status)}>{getStatusLabel(p.status)}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/propiedades/${p.id}`}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-[#6B7280] hover:text-[#1B3A5C] transition-colors"
                        title="Ver"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-[#6B7280] hover:text-[#C8873A] transition-colors"
                        title="Editar"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#E5E0D8]">
          <p className="text-sm text-[#6B7280]">
            {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} de {total}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="p-1.5 rounded-lg border border-[#E5E0D8] disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              disabled={page === totalPages - 1}
              className="p-1.5 rounded-lg border border-[#E5E0D8] disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
