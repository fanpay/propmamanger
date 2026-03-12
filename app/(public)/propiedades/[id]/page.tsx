import { mockProperties } from '@/lib/mock-data/properties';
import { formatCOP, getPropertyTypeLabel, getOperationLabel, getStatusLabel } from '@/lib/utils';
import PropertyCard from '@/components/public/PropertyCard';
import ContactForm from '@/components/public/ContactForm';
import AmenityBadge from '@/components/public/AmenityBadge';
import WhatsAppFAB from '@/components/public/WhatsAppFAB';
import PropertyShareBar from '@/components/public/PropertyShareBar';
import { PropertyGallery } from './PropertyGallery';
import {
  Maximize2, BedDouble, Bath, Car, Building2, MapPin,
  Phone, Mail, Calendar, School, ShoppingBag,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Props {
  params: Promise<{ id: string }>;
}

function daysAgo(date: Date): number {
  return Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
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

const POINTS_OF_INTEREST = [
  { Icon: School, label: 'Colegio Montessori', distance: '320 m', color: 'text-blue-600 bg-blue-50' },
  { Icon: ShoppingBag, label: 'Centro Comercial El Tesoro', distance: '900 m', color: 'text-amber-600 bg-amber-50' },
  { Icon: MapPin, label: 'Estación Metro Poblado', distance: '1.2 km', color: 'text-green-600 bg-green-50' },
  { Icon: Building2, label: 'Hospital Pablo Tobón Uribe', distance: '2.1 km', color: 'text-red-600 bg-red-50' },
];

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">🏚️</p>
        <h1 className="text-2xl font-bold text-text-main mb-2">Propiedad no encontrada</h1>
        <p className="text-text-muted">La propiedad que buscas no existe o fue eliminada.</p>
        <a href="/propiedades" className="mt-6 inline-block px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors">
          ← Volver a propiedades
        </a>
      </div>
    );
  }

  const similar = mockProperties
    .filter((p) => p.id !== property.id && p.type === property.type && p.status === 'AVAILABLE')
    .slice(0, 3);

  const days = daysAgo(property.createdAt);
  const advisorPhone = property.advisor.phone || '3001234567';

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-text-muted mb-6 flex flex-wrap items-center gap-1">
          <a href="/" className="hover:text-primary transition-colors">Inicio</a>
          <span>/</span>
          <a href="/propiedades" className="hover:text-primary transition-colors">Propiedades</a>
          <span>/</span>
          <span className="text-text-main line-clamp-1">{property.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left: Main content ──────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">
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
                <span className="flex items-center gap-1 text-xs text-text-muted ml-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {days === 0 ? 'Publicado hoy' : `Hace ${days} día${days !== 1 ? 's' : ''}`}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-text-main">{property.title}</h1>
              <div className="flex items-center gap-1 mt-2 text-text-muted">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{property.address}, {property.neighborhood}, {property.city}</span>
              </div>
            </div>


            {/* Price + Share */}
            <PropertyShareBar
              title={property.title}
              price={`${formatCOP(property.price)}${property.operation === 'RENT' ? '/mes' : ''}`}
              adminFee={property.adminFee ? formatCOP(property.adminFee) : undefined}
              code={property.code}
              stratum={property.stratum}
            />


            {/* Description */}
            <div>
              <h2 className="text-lg font-display font-semibold text-text-main mb-2">Descripción</h2>
              <p className="text-text-muted leading-relaxed">{property.description}</p>
            </div>

            {/* Features grid */}
            <div>
              <h2 className="text-lg font-display font-semibold text-text-main mb-4">Características</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-3 bg-surface rounded-xl p-3.5">
                  <Maximize2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <div><p className="text-xs text-text-muted">Área</p><p className="font-semibold text-text-main">{property.area} m²</p></div>
                </div>
                {property.rooms !== undefined && (
                  <div className="flex items-center gap-3 bg-surface rounded-xl p-3.5">
                    <BedDouble className="w-5 h-5 text-primary flex-shrink-0" />
                    <div><p className="text-xs text-text-muted">Habitaciones</p><p className="font-semibold text-text-main">{property.rooms}</p></div>
                  </div>
                )}
                {property.bathrooms !== undefined && (
                  <div className="flex items-center gap-3 bg-surface rounded-xl p-3.5">
                    <Bath className="w-5 h-5 text-primary flex-shrink-0" />
                    <div><p className="text-xs text-text-muted">Baños</p><p className="font-semibold text-text-main">{property.bathrooms}</p></div>
                  </div>
                )}
                <div className="flex items-center gap-3 bg-surface rounded-xl p-3.5">
                  <Car className="w-5 h-5 text-primary flex-shrink-0" />
                  <div><p className="text-xs text-text-muted">Parqueadero</p><p className="font-semibold text-text-main">{property.parking ? 'Sí' : 'No'}</p></div>
                </div>
                {property.floor !== undefined && (
                  <div className="flex items-center gap-3 bg-surface rounded-xl p-3.5">
                    <Building2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <div><p className="text-xs text-text-muted">Piso</p><p className="font-semibold text-text-main">{property.floor}</p></div>
                  </div>
                )}
                <div className="flex items-center gap-3 bg-surface rounded-xl p-3.5">
                  <Building2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <div><p className="text-xs text-text-muted">Estrato</p><p className="font-semibold text-text-main">{property.stratum}</p></div>
                </div>
              </div>
            </div>

            {/* Amenities with icons */}
            {property.amenities.length > 0 && (
              <div>
                <h2 className="text-lg font-display font-semibold text-text-main mb-4">Amenidades</h2>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <AmenityBadge key={amenity} amenity={amenity} />
                  ))}
                </div>
              </div>
            )}

            {/* Tour Virtual placeholder */}
            <div>
              <h2 className="text-lg font-display font-semibold text-text-main mb-3">Tour Virtual</h2>
              <div
                className="relative rounded-2xl overflow-hidden h-52 bg-cover bg-center cursor-pointer group"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80')" }}
              >
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <p className="font-display font-bold text-lg">Ver tour virtual 360°</p>
                  <p className="text-sm text-white/70 mt-1">Disponible próximamente</p>
                </div>
              </div>
            </div>

            {/* Map + Points of interest */}
            <div>
              <h2 className="text-lg font-display font-semibold text-text-main mb-3">Ubicación</h2>
              {/* Map placeholder */}
              <div className="bg-gradient-to-br from-blue-50 to-green-50 border border-border rounded-2xl h-52 flex items-center justify-center relative overflow-hidden mb-4">
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=50')", backgroundSize: 'cover', filter: 'grayscale(100%)' }}
                />
                <div className="relative text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <MapPin className="w-6 h-6 text-white fill-white" />
                  </div>
                  <p className="font-semibold text-text-main text-sm">{property.neighborhood}</p>
                  <p className="text-xs text-text-muted">{property.address}</p>
                </div>
              </div>

              {/* Points of interest */}
              <h3 className="text-sm font-semibold text-text-main mb-3">Puntos de interés cercanos</h3>
              <div className="grid grid-cols-2 gap-2">
                {POINTS_OF_INTEREST.map(({ Icon, label, distance, color }) => (
                  <div key={label} className="flex items-center gap-2.5 bg-white border border-border rounded-xl px-3 py-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-text-main truncate">{label}</p>
                      <p className="text-xs text-text-muted">{distance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Sticky sidebar ───────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {/* Advisor card */}
              <div className="bg-white rounded-xl border border-border p-5">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-4">Tu asesor dedicado</p>
                <div className="flex items-center gap-3 mb-4">
                  {property.advisor.avatar ? (
                    <img src={property.advisor.avatar} alt={property.advisor.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-surface" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                      {property.advisor.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-display font-bold text-text-main">{property.advisor.name}</p>
                    <p className="text-xs text-text-muted">Asesor Inmobiliario</p>
                    <div className="flex gap-0.5 mt-1">
                      {[1,2,3,4,5].map((i) => <span key={i} className="text-secondary text-xs">★</span>)}
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-text-muted">
                  {advisorPhone && (
                    <a href={`tel:${advisorPhone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>{advisorPhone}</span>
                    </a>
                  )}
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{property.advisor.email}</span>
                  </div>
                </div>
              </div>

              {/* Contact form */}
              <ContactForm
                phone={advisorPhone}
                propertyTitle={property.title}
                advisorName={property.advisor.name}
              />
            </div>
          </div>
        </div>

        {/* Similar properties */}
        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-display font-bold text-text-main mb-6">Propiedades Similares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* WhatsApp FAB */}
      <WhatsAppFAB
        phone={advisorPhone}
        advisorName={property.advisor.name}
        propertyTitle={property.title}
      />
    </>
  );
}
