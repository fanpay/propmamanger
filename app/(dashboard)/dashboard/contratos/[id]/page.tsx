'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Contract } from '@/types';
import { getContracts } from '@/lib/mock-data';
import { formatCOP, formatDate, getStatusLabel, daysUntil } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, User, DollarSign } from 'lucide-react';

const MOCK_PAYMENTS = [
  { id: 'p1', month: 'Junio 2024', amount: 0, paid: false },
  { id: 'p2', month: 'Mayo 2024', amount: 0, paid: true },
  { id: 'p3', month: 'Abril 2024', amount: 0, paid: true },
  { id: 'p4', month: 'Marzo 2024', amount: 0, paid: true },
];

function getStatusVariant(status: string): 'success' | 'warning' | 'secondary' | 'danger' | 'default' {
  const map: Record<string, 'success' | 'warning' | 'secondary' | 'danger' | 'default'> = {
    ACTIVE: 'success',
    DRAFT: 'secondary',
    EXPIRED: 'danger',
    TERMINATED: 'secondary',
    RENEWED: 'default',
  };
  return map[status] || 'secondary';
}

export default function ContractDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    getContracts().then((contracts) => {
      const found = contracts.find((c) => c.id === id);
      setContract(found || null);
    });
  }, [id]);

  if (!contract) {
    return (
      <div className="text-center py-20 text-[#6B7280]">
        <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p>Contrato no encontrado</p>
        <Link href="/dashboard/contratos" className="mt-3 inline-block text-sm text-[#1B3A5C] hover:underline">
          Volver a contratos
        </Link>
      </div>
    );
  }

  const payments = MOCK_PAYMENTS.map((p) => ({ ...p, amount: contract.monthlyRent }));
  const days = daysUntil(contract.endDate);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back */}
      <Link href="/dashboard/contratos" className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#1B3A5C] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Volver a contratos
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#1A1A1A]">{contract.property.title}</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">{contract.property.code} · {contract.property.neighborhood}</p>
        </div>
        <Badge variant={getStatusVariant(contract.status)}>{getStatusLabel(contract.status)}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contract details */}
        <div className="bg-white rounded-xl border border-[#E5E0D8] p-5 space-y-4">
          <h2 className="font-semibold text-[#1A1A1A] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#1B3A5C]" /> Detalles del contrato
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Arriendo mensual</span>
              <span className="font-semibold text-[#1B3A5C]">{formatCOP(contract.monthlyRent)}</span>
            </div>
            {contract.deposit && (
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Depósito</span>
                <span className="font-medium">{formatCOP(contract.deposit)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Día de pago</span>
              <span className="font-medium">Día {contract.paymentDay}</span>
            </div>
            {contract.annualIncrease && (
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Incremento anual</span>
                <span className="font-medium">{contract.annualIncrease}%</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Inicio</span>
              <span className="font-medium">{formatDate(contract.startDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Vencimiento</span>
              <span className={`font-medium ${days >= 0 && days <= 30 ? 'text-[#E8A020]' : days < 0 ? 'text-[#D94F3D]' : ''}`}>
                {formatDate(contract.endDate)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Días restantes</span>
              <span className={`font-medium ${days < 0 ? 'text-[#D94F3D]' : days <= 30 ? 'text-[#E8A020]' : 'text-[#4CAF7D]'}`}>
                {days < 0 ? 'Vencido' : `${days} días`}
              </span>
            </div>
          </div>
        </div>

        {/* Tenant */}
        <div className="bg-white rounded-xl border border-[#E5E0D8] p-5 space-y-4">
          <h2 className="font-semibold text-[#1A1A1A] flex items-center gap-2">
            <User className="w-5 h-5 text-[#1B3A5C]" /> Arrendatario
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-[#6B7280]">Nombre</p>
              <p className="font-medium text-[#1A1A1A]">{contract.tenant.name}</p>
            </div>
            <div>
              <p className="text-[#6B7280]">Teléfono</p>
              <p className="font-medium">{contract.tenant.phone}</p>
            </div>
            {contract.tenant.email && (
              <div>
                <p className="text-[#6B7280]">Correo</p>
                <p className="font-medium">{contract.tenant.email}</p>
              </div>
            )}
            {contract.tenant.document && (
              <div>
                <p className="text-[#6B7280]">Documento</p>
                <p className="font-medium">{contract.tenant.document}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment history */}
      <div className="bg-white rounded-xl border border-[#E5E0D8] p-5">
        <h2 className="font-semibold text-[#1A1A1A] flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-[#1B3A5C]" /> Historial de pagos
        </h2>
        <div className="space-y-2">
          {payments.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-[#F7F5F2]">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${p.paid ? 'bg-[#4CAF7D]' : 'bg-[#E8A020]'}`} />
                <span className="text-sm text-[#1A1A1A]">{p.month}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#1B3A5C]">{formatCOP(p.amount)}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${p.paid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {p.paid ? 'Pagado' : 'Pendiente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {contract.notes && (
        <div className="bg-white rounded-xl border border-[#E5E0D8] p-5">
          <h2 className="font-semibold text-[#1A1A1A] mb-2">Notas</h2>
          <p className="text-sm text-[#6B7280]">{contract.notes}</p>
        </div>
      )}
    </div>
  );
}
