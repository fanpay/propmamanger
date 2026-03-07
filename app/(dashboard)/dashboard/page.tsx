import { getProperties, getContracts, getAppointments } from '@/lib/mock-data';
import { StatsCard } from '@/components/dashboard/StatsCard';
import PropertyTable from '@/components/dashboard/PropertyTable';
import { Building2, FileText, Calendar, TrendingUp } from 'lucide-react';
import { daysUntil, formatCOP, formatDate } from '@/lib/utils';

export default async function DashboardPage() {
  const [properties, contracts, appointments] = await Promise.all([
    getProperties(),
    getContracts(),
    getAppointments(),
  ]);

  const available = properties.filter((p) => p.status === 'AVAILABLE').length;
  const activeContracts = contracts.filter((c) => c.status === 'ACTIVE').length;
  const today = new Date();
  const todayAppts = appointments.filter((a) => {
    const d = a.date;
    return d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate();
  });
  const expiringContracts = contracts.filter(
    (c) => c.status === 'ACTIVE' && daysUntil(c.endDate) >= 0 && daysUntil(c.endDate) <= 30
  );
  const recentProperties = [...properties].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5);

  const APPOINTMENT_TYPE_LABELS: Record<string, string> = {
    VISIT: 'Visita',
    SIGNING: 'Firma',
    KEY_DELIVERY: 'Entrega llaves',
    INSPECTION: 'Inspección',
  };
  const APPOINTMENT_STATUS_COLORS: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-green-100 text-green-800',
    DONE: 'bg-gray-100 text-gray-700',
    CANCELLED: 'bg-red-100 text-red-700',
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Propiedades disponibles"
          value={available}
          subtitle={`de ${properties.length} total`}
          icon={<Building2 className="w-6 h-6 text-[#1B3A5C]" />}
          iconBg="bg-blue-50"
          trend={{ value: 12, positive: true }}
        />
        <StatsCard
          title="Contratos activos"
          value={activeContracts}
          subtitle="arrendamientos vigentes"
          icon={<FileText className="w-6 h-6 text-[#4CAF7D]" />}
          iconBg="bg-green-50"
        />
        <StatsCard
          title="Citas hoy"
          value={todayAppts.length}
          subtitle="visitas programadas"
          icon={<Calendar className="w-6 h-6 text-[#C8873A]" />}
          iconBg="bg-orange-50"
        />
        <StatsCard
          title="Contratos por vencer"
          value={expiringContracts.length}
          subtitle="en los próximos 30 días"
          icon={<TrendingUp className="w-6 h-6 text-[#E8A020]" />}
          iconBg="bg-yellow-50"
          trend={expiringContracts.length > 0 ? { value: expiringContracts.length, positive: false } : undefined}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today appointments */}
        <div className="bg-white rounded-xl border border-[#E5E0D8] p-5">
          <h2 className="font-semibold text-[#1A1A1A] mb-4">Citas de hoy ({todayAppts.length})</h2>
          {todayAppts.length === 0 ? (
            <p className="text-sm text-[#6B7280]">Sin citas programadas para hoy</p>
          ) : (
            <div className="space-y-3">
              {todayAppts.map((a) => (
                <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg bg-[#F7F5F2]">
                  <div className="text-center flex-shrink-0 w-12">
                    <p className="text-lg font-bold text-[#1B3A5C]">
                      {a.date.getHours().toString().padStart(2, '0')}:{a.date.getMinutes().toString().padStart(2, '0')}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#1A1A1A] truncate">{a.clientName}</p>
                    <p className="text-xs text-[#6B7280] truncate">{a.property.title}</p>
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${APPOINTMENT_STATUS_COLORS[a.status]}`}>
                      {APPOINTMENT_TYPE_LABELS[a.type]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Expiring contracts */}
        <div className="bg-white rounded-xl border border-[#E5E0D8] p-5">
          <h2 className="font-semibold text-[#1A1A1A] mb-4">Contratos por vencer</h2>
          {expiringContracts.length === 0 ? (
            <p className="text-sm text-[#6B7280]">No hay contratos próximos a vencer</p>
          ) : (
            <div className="space-y-3">
              {expiringContracts.map((c) => {
                const days = daysUntil(c.endDate);
                return (
                  <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <div className="min-w-0">
                      <p className="font-medium text-[#1A1A1A] truncate">{c.property.title}</p>
                      <p className="text-xs text-[#6B7280]">{c.tenant.name} · {formatCOP(c.monthlyRent)}/mes</p>
                      <p className="text-xs text-[#6B7280] mt-0.5">Vence: {formatDate(c.endDate)}</p>
                    </div>
                    <span className="flex-shrink-0 ml-3 px-2 py-1 bg-[#E8A020] text-white text-xs rounded-full font-medium">
                      {days}d
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent properties */}
      <div>
        <h2 className="font-semibold text-[#1A1A1A] mb-4">Propiedades recientes</h2>
        <PropertyTable properties={recentProperties} />
      </div>
    </div>
  );
}
