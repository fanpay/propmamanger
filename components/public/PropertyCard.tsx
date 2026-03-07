import Link from 'next/link';
import { Property } from '@/types';
import { formatCOP, getOperationLabel, getStatusLabel } from '@/lib/utils';
import { Maximize2, BedDouble, Bath, Car } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

function getOperationColor(op: string) {
  if (op === 'RENT') return 'bg-[#C8873A]';
  if (op === 'SALE') return 'bg-[#1B3A5C]';
  return 'bg-[#6B7280]';
}

function getStatusBadge(status: string) {
  const map: Record<string, { label: string; cls: string }> = {
    AVAILABLE: { label: 'Disponible', cls: 'bg-[#4CAF7D] text-white' },
    RENTED: { label: 'Arrendado', cls: 'bg-[#1B3A5C] text-white' },
    SOLD: { label: 'Vendido', cls: 'bg-[#6B7280] text-white' },
    NEGOTIATION: { label: 'En negociación', cls: 'bg-[#E8A020] text-white' },
    PAUSED: { label: 'Pausado', cls: 'bg-gray-300 text-gray-700' },
  };
  return map[status] || { label: getStatusLabel(status), cls: 'bg-gray-200 text-gray-700' };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const mainImage = property.images[0]?.url || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800';
  const statusBadge = getStatusBadge(property.status);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#E5E0D8] overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={mainImage}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium text-white ${getOperationColor(property.operation)}`}>
            {getOperationLabel(property.operation)}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge.cls}`}>
            {statusBadge.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <p className="text-xl font-bold text-[#1B3A5C]">
          {formatCOP(property.price)}
          {property.operation === 'RENT' && <span className="text-sm font-normal text-[#6B7280]">/mes</span>}
        </p>

        {/* Title */}
        <h3 className="mt-1 text-sm font-semibold text-[#1A1A1A] line-clamp-1">{property.title}</h3>

        {/* Location */}
        <p className="text-xs text-[#6B7280] mt-0.5">
          {property.neighborhood} • Estrato {property.stratum}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 mt-3 text-xs text-[#6B7280]">
          <span className="flex items-center gap-1">
            <Maximize2 className="w-3.5 h-3.5" />
            {property.area} m²
          </span>
          {property.rooms !== undefined && (
            <span className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5" />
              {property.rooms}
            </span>
          )}
          {property.bathrooms !== undefined && (
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" />
              {property.bathrooms}
            </span>
          )}
          {property.parking && (
            <span className="flex items-center gap-1">
              <Car className="w-3.5 h-3.5" />
              Parq.
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#E5E0D8]">
          <div className="flex items-center gap-2">
            {property.advisor.avatar ? (
              <img
                src={property.advisor.avatar}
                alt={property.advisor.name}
                className="w-7 h-7 rounded-full object-cover"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#1B3A5C] flex items-center justify-center text-white text-xs font-bold">
                {property.advisor.name.charAt(0)}
              </div>
            )}
            <span className="text-xs text-[#6B7280]">{property.advisor.name}</span>
          </div>
          <Link
            href={`/propiedades/${property.id}`}
            className="text-xs font-medium text-[#1B3A5C] hover:text-[#C8873A] transition-colors"
          >
            Ver más →
          </Link>
        </div>
      </div>
    </div>
  );
}
