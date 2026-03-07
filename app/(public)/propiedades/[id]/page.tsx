import { mockProperties } from '@/lib/mock-data/properties';
import { formatCOP, getPropertyTypeLabel, getOperationLabel, getStatusLabel } from '@/lib/utils';
import PropertyCard from '@/components/public/PropertyCard';
import { PropertyGallery } from './PropertyGallery';
import { Maximize2, BedDouble, Bath, Car, Building2, MapPin, Phone, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Props {
  params: { id: string };
}

export default function PropertyDetailPage({ params }: Props) {
  const property = mockProperties.find((p) => p.id === params.id);

  if (!property) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">Propiedad no encontrada</h1>
        <p className="text-[#6B7280]">La propiedad que buscas no existe o fue eliminada.</p>
        <a href="/propiedades" className="mt-4 inline-block text-[#1B3A5C] font-medium hover:text-[#C8873A] transition-colors">
          ← Volver a propiedades
        </a>
      </div>
    );
  }

  const similar = mockProperties
    .filter((p) => p.id !== property.id && p.type === property.type && p.status === 'AVAILABLE')
    .slice(0, 3);

  function getStatusVariant(status: string) {
    const map: Record<string, 'success' | 'warning' | 'secondary' | 'danger' | 'default'> = {
      AVAILABLE: 'success',
      RENTED: 'default',
      SOLD: 'secondary',
      NEGOTIATION: 'warning',
      PAUSED: 'secondary',
    };
    return map[status] || 'secondary';
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-[#6B7280] mb-6">
        <a href="/" className="hover:text-[#1B3A5C]">Inicio</a>
        {' / '}
        <a href="/propiedades" className="hover:text-[#1B3A5C]">Propiedades</a>
        {' / '}
        <span className="text-[#1A1A1A]">{property.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - 65% */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gallery */}
          <PropertyGallery images={property.images} title={property.title} />

          {/* Title & badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="secondary">{getPropertyTypeLabel(property.type)}</Badge>
              <Badge variant={property.operation === 'RENT' ? 'warning' : 'default'}>
                {getOperationLabel(property.operation)}
              </Badge>
              <Badge variant={getStatusVariant(property.status)}>{getStatusLabel(property.status)}</Badge>
            </div>
            <h1 className="text-2xl font-bold text-[#1A1A1A]">{property.title}</h1>
            <div className="flex items-center gap-1 mt-1 text-[#6B7280]">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{property.address}, {property.neighborhood}, {property.city}</span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-[#F7F5F2] rounded-xl p-4">
            <p className="text-3xl font-bold text-[#1B3A5C]">
              {formatCOP(property.price)}
              {property.operation === 'RENT' && <span className="text-base font-normal text-[#6B7280]">/mes</span>}
            </p>
            {property.adminFee && (
              <p className="text-sm text-[#6B7280] mt-1">+ Admin: {formatCOP(property.adminFee)}/mes</p>
            )}
            <p className="text-sm text-[#6B7280] mt-1">Código: {property.code} · Estrato {property.stratum}</p>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-2">Descripción</h2>
            <p className="text-[#6B7280] leading-relaxed">{property.description}</p>
          </div>

          {/* Features grid */}
          <div>
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-3">Características</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 bg-[#F7F5F2] rounded-lg p-3">
                <Maximize2 className="w-5 h-5 text-[#1B3A5C]" />
                <div>
                  <p className="text-xs text-[#6B7280]">Área</p>
                  <p className="font-semibold text-[#1A1A1A]">{property.area} m²</p>
                </div>
              </div>
              {property.rooms !== undefined && (
                <div className="flex items-center gap-2 bg-[#F7F5F2] rounded-lg p-3">
                  <BedDouble className="w-5 h-5 text-[#1B3A5C]" />
                  <div>
                    <p className="text-xs text-[#6B7280]">Habitaciones</p>
                    <p className="font-semibold text-[#1A1A1A]">{property.rooms}</p>
                  </div>
                </div>
              )}
              {property.bathrooms !== undefined && (
                <div className="flex items-center gap-2 bg-[#F7F5F2] rounded-lg p-3">
                  <Bath className="w-5 h-5 text-[#1B3A5C]" />
                  <div>
                    <p className="text-xs text-[#6B7280]">Baños</p>
                    <p className="font-semibold text-[#1A1A1A]">{property.bathrooms}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 bg-[#F7F5F2] rounded-lg p-3">
                <Car className="w-5 h-5 text-[#1B3A5C]" />
                <div>
                  <p className="text-xs text-[#6B7280]">Parqueadero</p>
                  <p className="font-semibold text-[#1A1A1A]">{property.parking ? 'Sí' : 'No'}</p>
                </div>
              </div>
              {property.floor !== undefined && (
                <div className="flex items-center gap-2 bg-[#F7F5F2] rounded-lg p-3">
                  <Building2 className="w-5 h-5 text-[#1B3A5C]" />
                  <div>
                    <p className="text-xs text-[#6B7280]">Piso</p>
                    <p className="font-semibold text-[#1A1A1A]">{property.floor}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 bg-[#F7F5F2] rounded-lg p-3">
                <Building2 className="w-5 h-5 text-[#1B3A5C]" />
                <div>
                  <p className="text-xs text-[#6B7280]">Estrato</p>
                  <p className="font-semibold text-[#1A1A1A]">{property.stratum}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          {property.amenities.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-[#1A1A1A] mb-3">Amenidades</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((a) => (
                  <span key={a} className="px-3 py-1 bg-[#1B3A5C]/10 text-[#1B3A5C] rounded-full text-sm font-medium">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Map placeholder */}
          <div>
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-3">Ubicación</h2>
            <div className="bg-gray-200 rounded-xl h-52 flex items-center justify-center">
              <div className="text-center text-[#6B7280]">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">{property.address}</p>
                <p className="text-xs">{property.neighborhood}, {property.city}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - 35% sticky */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-4">
            {/* Advisor card */}
            <div className="bg-white rounded-xl border border-[#E5E0D8] p-5">
              <p className="text-sm font-semibold text-[#6B7280] mb-3">Tu asesor</p>
              <div className="flex items-center gap-3 mb-4">
                {property.advisor.avatar ? (
                  <img
                    src={property.advisor.avatar}
                    alt={property.advisor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#1B3A5C] flex items-center justify-center text-white font-bold">
                    {property.advisor.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-[#1A1A1A]">{property.advisor.name}</p>
                  <p className="text-xs text-[#6B7280]">Asesor Inmobiliario</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-[#6B7280]">
                {property.advisor.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{property.advisor.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{property.advisor.email}</span>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-white rounded-xl border border-[#E5E0D8] p-5">
              <h3 className="font-semibold text-[#1A1A1A] mb-4">¿Te interesa esta propiedad?</h3>
              <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert('¡Mensaje enviado! Te contactaremos pronto.'); }}>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  required
                  className="w-full px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C]"
                />
                <input
                  type="tel"
                  placeholder="Tu teléfono"
                  required
                  className="w-full px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C]"
                />
                <input
                  type="email"
                  placeholder="Tu correo"
                  className="w-full px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C]"
                />
                <textarea
                  placeholder="Mensaje (opcional)"
                  rows={3}
                  className="w-full px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C] resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#C8873A] text-white rounded-lg font-medium hover:bg-[#b5762f] transition-colors"
                >
                  Solicitar información
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Similar properties */}
      {similar.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-6">Propiedades Similares</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
