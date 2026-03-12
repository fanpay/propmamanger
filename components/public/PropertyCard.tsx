import Link from 'next/link';
import { Property } from '@/types';
import { formatCOP, getOperationLabel, getStatusLabel } from '@/lib/utils';
import { Maximize2, BedDouble, Bath, Car, ArrowRight, Sparkles } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  variant?: 'grid' | 'list';
}

function getOperationColor(op: string) {
  if (op === 'RENT') return 'bg-secondary';
  if (op === 'SALE') return 'bg-primary';
  return 'bg-text-muted';
}

function getStatusBadge(status: string) {
  const map: Record<string, { label: string; cls: string }> = {
    AVAILABLE: { label: 'Disponible', cls: 'bg-accent/15 text-accent border border-accent/30' },
    RENTED: { label: 'Arrendado', cls: 'bg-primary/10 text-primary border border-primary/20' },
    SOLD: { label: 'Vendido', cls: 'bg-text-muted/10 text-text-muted border border-border' },
    NEGOTIATION: { label: 'En negociación', cls: 'bg-warning/15 text-warning border border-warning/30' },
    PAUSED: { label: 'Pausado', cls: 'bg-gray-100 text-gray-500 border border-gray-200' },
  };
  return map[status] || { label: getStatusLabel(status), cls: 'bg-gray-100 text-gray-600' };
}

function isNew(date: Date): boolean {
  const diffDays = (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24);
  return diffDays < 7;
}

export default function PropertyCard({ property, variant = 'grid' }: PropertyCardProps) {
  const mainImage =
    property.images[0]?.url ||
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800';
  const statusBadge = getStatusBadge(property.status);
  const newProp = isNew(property.createdAt);

  if (variant === 'list') {
    return (
      <div className="group bg-white rounded-2xl shadow-card border border-border overflow-hidden card-hover flex">
        {/* Image */}
        <div className="relative w-64 flex-shrink-0 overflow-hidden">
          <img
            src={mainImage}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getOperationColor(property.operation)}`}>
              {getOperationLabel(property.operation)}
            </span>
            {newProp && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-primary border border-primary/20 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Nuevo
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="text-2xl font-display font-bold text-primary">
                {formatCOP(property.price)}
                {property.operation === 'RENT' && (
                  <span className="text-sm font-body font-normal text-text-muted ml-1">/mes</span>
                )}
              </p>
              <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge.cls}`}>
                {statusBadge.label}
              </span>
            </div>
            {property.adminFee && (
              <p className="text-xs text-text-muted">+ ${property.adminFee.toLocaleString('es-CO')} admon.</p>
            )}
            <h3 className="mt-2 text-sm font-semibold text-text-main line-clamp-2 leading-snug">
              {property.title}
            </h3>
            <p className="text-xs text-text-muted mt-1">
              📍 {property.neighborhood}, {property.city} · Estrato {property.stratum}
            </p>
            <p className="text-xs text-text-muted mt-2 line-clamp-2 leading-relaxed hidden sm:block">
              {property.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5 text-secondary" />{property.area} m²</span>
              {property.rooms !== undefined && <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-secondary" />{property.rooms} hab.</span>}
              {property.bathrooms !== undefined && <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-secondary" />{property.bathrooms}</span>}
              {property.parking && <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5 text-secondary" />Parq.</span>}
            </div>
            <Link
              href={`/propiedades/${property.id}`}
              className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Ver más <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Grid variant (default)
  return (
    <div className="group bg-white rounded-2xl shadow-card border border-border overflow-hidden card-hover">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={mainImage}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getOperationColor(property.operation)}`}>
            {getOperationLabel(property.operation)}
          </span>
          {newProp && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-primary border border-primary/20 flex items-center gap-1 self-start">
              <Sparkles className="w-2.5 h-2.5" /> Nuevo
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge.cls}`}>
            {statusBadge.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <p className="text-2xl font-display font-bold text-primary">
          {formatCOP(property.price)}
          {property.operation === 'RENT' && (
            <span className="text-sm font-body font-normal text-text-muted ml-1">/mes</span>
          )}
        </p>
        {property.adminFee && (
          <p className="text-xs text-text-muted mt-0.5">
            + ${property.adminFee.toLocaleString('es-CO')} admon.
          </p>
        )}

        {/* Title */}
        <h3 className="mt-2 text-sm font-semibold text-text-main line-clamp-2 leading-snug">
          {property.title}
        </h3>

        {/* Location */}
        <p className="text-xs text-text-muted mt-1">
          📍 {property.neighborhood} · Estrato {property.stratum}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 mt-3 text-xs text-text-muted">
          <span className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-secondary" />
            {property.area} m²
          </span>
          {property.rooms !== undefined && (
            <span className="flex items-center gap-1.5">
              <BedDouble className="w-3.5 h-3.5 text-secondary" />
              {property.rooms} hab.
            </span>
          )}
          {property.bathrooms !== undefined && (
            <span className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-secondary" />
              {property.bathrooms}
            </span>
          )}
          {property.parking && (
            <span className="flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-secondary" />
              Parq.
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            {property.advisor.avatar ? (
              <img
                src={property.advisor.avatar}
                alt={property.advisor.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-border"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold ring-2 ring-border">
                {property.advisor.name.charAt(0)}
              </div>
            )}
            <span className="text-xs text-text-muted">{property.advisor.name}</span>
          </div>
          <Link
            href={`/propiedades/${property.id}`}
            className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Ver más
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
