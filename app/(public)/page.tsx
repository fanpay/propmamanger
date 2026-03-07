import { getProperties } from '@/lib/mock-data';
import PropertyCard from '@/components/public/PropertyCard';
import SearchBar from '@/components/public/SearchBar';

export default async function HomePage() {
  const properties = await getProperties();
  const available = properties.filter((p) => p.status === 'AVAILABLE');
  const rentProperties = properties.filter((p) => p.operation === 'RENT' && p.status === 'AVAILABLE').slice(0, 3);
  const saleProperties = properties.filter((p) => p.operation === 'SALE' && p.status === 'AVAILABLE').slice(0, 3);
  const featured = available.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1B3A5C] min-h-[560px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B3A5C] to-[#2d5a8e] opacity-90" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">
              Encuentra tu próximo hogar en Medellín
            </h1>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Más de 150 propiedades disponibles para arriendo y venta. Tu asesor personal te acompaña en todo el proceso.
            </p>
          </div>
          <SearchBar />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#C8873A] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
            {[
              { number: '150+', label: 'Propiedades' },
              { number: '12', label: 'Años experiencia' },
              { number: '98%', label: 'Satisfacción' },
              { number: '500+', label: 'Familias' },
            ].map(({ number, label }) => (
              <div key={label}>
                <p className="text-3xl font-bold">{number}</p>
                <p className="text-sm mt-1 opacity-90">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured properties */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Propiedades Destacadas</h2>
          <p className="text-[#6B7280] mb-6">Encuentra la propiedad que más se adapta a tus necesidades</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Rent section */}
      {rentProperties.length > 0 && (
        <section className="py-14 bg-[#F7F5F2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#1A1A1A]">En Arriendo</h2>
                <p className="text-[#6B7280]">Las mejores opciones para vivir en Medellín</p>
              </div>
              <a href="/propiedades?op=RENT" className="text-sm text-[#1B3A5C] font-medium hover:text-[#C8873A] transition-colors">
                Ver todos →
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
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#1A1A1A]">En Venta</h2>
                <p className="text-[#6B7280]">Invierte en el mejor mercado inmobiliario de Colombia</p>
              </div>
              <a href="/propiedades?op=SALE" className="text-sm text-[#1B3A5C] font-medium hover:text-[#C8873A] transition-colors">
                Ver todos →
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
    </>
  );
}
