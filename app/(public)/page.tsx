import { getProperties } from '@/lib/mock-data';
import PropertyCard from '@/components/public/PropertyCard';
import SearchBar from '@/components/public/SearchBar';
import { Building2, Shield, Clock, Heart } from 'lucide-react';

export default async function HomePage() {
  const properties = await getProperties();
  const available = properties.filter((p) => p.status === 'AVAILABLE');
  const rentProperties = properties.filter((p) => p.operation === 'RENT' && p.status === 'AVAILABLE').slice(0, 3);
  const saleProperties = properties.filter((p) => p.operation === 'SALE' && p.status === 'AVAILABLE').slice(0, 3);
  const featured = available.slice(0, 6);

  const stats = [
    { number: '150+', label: 'Propiedades activas' },
    { number: '12', label: 'Años de experiencia' },
    { number: '98%', label: 'Clientes satisfechos' },
    { number: '500+', label: 'Familias atendidas' },
  ];

  const whyUs = [
    {
      icon: Shield,
      title: 'Procesos seguros',
      desc: 'Contratos verificados, asesoría jurídica y transparencia total en cada operación.',
    },
    {
      icon: Building2,
      title: 'Cobertura total',
      desc: 'Propiedades en El Poblado, Laureles, Envigado, Sabaneta y toda el Área Metropolitana.',
    },
    {
      icon: Clock,
      title: 'Atención rápida',
      desc: 'Respondemos en menos de 2 horas. Agendamos visita el mismo día si está disponible.',
    },
    {
      icon: Heart,
      title: 'Asesoría personalizada',
      desc: 'Cada cliente tiene un asesor dedicado que lo acompaña de principio a fin.',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[620px] flex items-center pt-16">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&q=80')",
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/60" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="text-center mb-10 animate-fade-in">
            <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary border border-secondary/30 rounded-full text-sm font-medium mb-4">
              🏙️ Medellín y Área Metropolitana
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-4 text-balance leading-tight">
              Encuentra tu próximo
              <span className="block text-secondary">hogar en Medellín</span>
            </h1>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto leading-relaxed">
              Más de 150 propiedades disponibles para arriendo y venta. Tu asesor personal te acompaña en todo el proceso.
            </p>
          </div>

          <div className="animate-fade-in delay-150">
            <SearchBar />
          </div>

          {/* Quick stats under hero searchbar */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 animate-fade-in delay-300">
            {['Apartamentos', 'Casas', 'Oficinas', 'Locales'].map((label) => (
              <span key={label} className="text-sm text-blue-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-secondary py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
            {stats.map(({ number, label }, i) => (
              <div key={label} className={`animate-fade-in delay-${i * 75}`}>
                <p className="text-4xl font-display font-bold">{number}</p>
                <p className="text-sm mt-1 text-white/80 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured properties */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-text-main mb-2">
              Propiedades Destacadas
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              Seleccionadas por nuestros asesores como las mejores opciones disponibles ahora mismo
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="/propiedades"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-card hover:shadow-hover"
            >
              Ver todas las propiedades
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Rent section */}
      {rentProperties.length > 0 && (
        <section className="py-16 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-text-main">En Arriendo</h2>
                <p className="text-text-muted mt-1">Las mejores opciones para vivir en Medellín</p>
              </div>
              <a
                href="/propiedades?op=RENT"
                className="text-sm font-semibold text-primary hover:text-secondary transition-colors flex items-center gap-1"
              >
                Ver todos <span>→</span>
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rentProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sale section */}
      {saleProperties.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-text-main">En Venta</h2>
                <p className="text-text-muted mt-1">Invierte en el mejor mercado inmobiliario de Colombia</p>
              </div>
              <a
                href="/propiedades?op=SALE"
                className="text-sm font-semibold text-primary hover:text-secondary transition-colors flex items-center gap-1"
              >
                Ver todos <span>→</span>
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {saleProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why us */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-3">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-blue-200 max-w-xl mx-auto">
              12 años conectando familias y empresas con las mejores propiedades de Medellín
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/10 border border-white/20 rounded-2xl p-6 card-hover hover:bg-white/15"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-display font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-blue-200 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
