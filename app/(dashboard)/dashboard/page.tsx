import { getProperties, getContracts, getAppointments } from '@/lib/mock-data';
import { StatsCard } from '@/components/dashboard/StatsCard';
import PropertyTable from '@/components/dashboard/PropertyTable';
import { Building2, FileText, Calendar, TrendingUp } from 'lucide-react';
import { daysUntil, formatCOP, formatDate } from '@/lib/utils';
import { mockAdvisor } from '@/lib/mock-data/advisor';
import Link from 'next/link';

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
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  });
  const expiringContracts = contracts.filter(
    (c) => c.status === 'ACTIVE' && daysUntil(c.endDate) >= 0 && daysUntil(c.endDate) <= 30
  );
  const recentProperties = [...properties]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  const APPT_TYPE_LABELS: Record<string, string> = {
    VISIT: 'Visita',
    SIGNING: 'Firma',
    KEY_DELIVERY: 'Entrega llaves',
    INSPECTION: 'Inspección',
  };
  const APPT_STATUS_STYLES: Record<string, string> = {
    PENDING: 'bg-warning/15 text-warning border border-warning/30',
    CONFIRMED: 'bg-accent/15 text-accent border border-accent/30',
    DONE: 'bg-gray-100 text-gray-600 border border-gray-200',
    CANCELLED: 'bg-danger/10 text-danger border border-danger/20',
  };

  /* Greeting */
  const hour = today.getHours();
  const greeting = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches';
  const firstName = mockAdvisor.name.split(' ')[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-main">
            {greeting}, {firstName} 👋
          </h1>
          <p className="text-text-muted text-sm mt-0.5">
            {today.toLocaleDateString('es-CO', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <Link
          href="/dashboard/propiedades/nueva"
          className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-card hover:shadow-hover hidden sm:inline-flex items-center gap-2"
        >
          + Nueva propiedad
        </Link>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Propiedades disponibles"
          value={available}
          subtitle={`de ${properties.length} en total`}
          icon={<Building2 className="w-6 h-6 text-primary" />}
          iconBg="bg-primary/10"
          trend={{ value: 12, positive: true }}
          accentColor="border-l-primary"
        />
        <StatsCard
          title="Contratos activos"
          value={activeContracts}
          subtitle="arrendamientos vigentes"
          icon={<FileText className="w-6 h-6 text-accent" />}
          iconBg="bg-accent/10"
          accentColor="border-l-accent"
        />
        <StatsCard
          title="Citas hoy"
          value={todayAppts.length}
          subtitle="visitas programadas"
          icon={<Calendar className="w-6 h-6 text-secondary" />}
          iconBg="bg-secondary/10"
          accentColor="border-l-secondary"
        />
        <StatsCard
          title="Contratos por vencer"
          value={expiringContracts.length}
          subtitle="en los próximos 30 días"
          icon={<TrendingUp className="w-6 h-6 text-warning" />}
          iconBg="bg-warning/10"
          trend={expiringContracts.length > 0 ? { value: expiringContracts.length, positive: false } : undefined}
          accentColor="border-l-warning"
        />
      </div>

      {/* Citas + Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today appointments */}
        <div className="bg-white rounded-2xl border border-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-text-main">
              Citas de hoy
              <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                {todayAppts.length}
              </span>
            </h2>
            <Link href="/dashboard/agenda" className="text-xs text-text-muted hover:text-primary transition-colors">
              Ver agenda →
            </Link>
          </div>
          {todayAppts.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-10 h-10 text-border mx-auto mb-2" />
              <p className="text-sm text-text-muted">Sin citas programadas para hoy</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayAppts.map((a) => (
                <div key={a.id} className="flex items-start gap-3 p-3 rounded-xl bg-surface hover:bg-surface/80 transition-colors">
                  <div className="text-center flex-shrink-0 w-12 bg-white rounded-lg p-1.5 shadow-card border border-border">
                    <p className="text-sm font-display font-bold text-primary">
                      {a.date.getHours().toString().padStart(2, '0')}:{a.date.getMinutes().toString().padStart(2, '0')}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text-main text-sm truncate">{a.clientName}</p>
                    <p className="text-xs text-text-muted truncate mt-0.5">{a.property.title}</p>
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1.5 border ${APPT_STATUS_STYLES[a.status]}`}>
                      {APPT_TYPE_LABELS[a.type]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Expiring contracts */}
        <div className="bg-white rounded-2xl border border-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-text-main">
              Contratos por vencer
              {expiringContracts.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-warning/15 text-warning text-xs rounded-full border border-warning/30">
                  {expiringContracts.length} alertas
                </span>
              )}
            </h2>
            <Link href="/dashboard/contratos" className="text-xs text-text-muted hover:text-primary transition-colors">
              Ver todos →
            </Link>
          </div>
          {expiringContracts.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-10 h-10 text-border mx-auto mb-2" />
              <p className="text-sm text-text-muted">No hay contratos próximos a vencer</p>
            </div>
          ) : (
            <div className="space-y-3">
              {expiringContracts.map((c) => {
                const days = daysUntil(c.endDate);
                return (
                  <div
                    key={c.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-warning/5 border border-warning/20 hover:bg-warning/10 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-text-main text-sm truncate">{c.property.title}</p>
                      <p className="text-xs text-text-muted mt-0.5">
                        {c.tenant.name} · {formatCOP(c.monthlyRent)}/mes
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">Vence: {formatDate(c.endDate)}</p>
                    </div>
                    <div className="flex-shrink-0 ml-3 text-center">
                      <span className="block px-2.5 py-1.5 bg-warning text-white text-xs rounded-xl font-bold">
                        {days}d
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent properties */}
      <div className="bg-white rounded-2xl border border-border p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-text-main">Propiedades recientes</h2>
          <Link href="/dashboard/propiedades" className="text-xs text-text-muted hover:text-primary transition-colors">
            Ver todas →
          </Link>
        </div>
        <PropertyTable properties={recentProperties} />
      </div>
    </div>
  );
}
