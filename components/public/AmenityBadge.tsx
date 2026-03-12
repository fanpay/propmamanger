import {
  Waves, Dumbbell, Car, Shield, Wifi, Wind, Trees, Coffee,
  Zap, Home, Baby, Dog, Sunset, Camera, UtensilsCrossed,
  Package, Bike, Droplets, Star,
} from 'lucide-react';

const AMENITY_MAP: Record<string, { icon: React.ElementType; color: string }> = {
  'Piscina': { icon: Waves, color: 'bg-blue-50 text-blue-600' },
  'Gimnasio': { icon: Dumbbell, color: 'bg-purple-50 text-purple-600' },
  'Parqueadero': { icon: Car, color: 'bg-gray-50 text-gray-600' },
  'Portería 24h': { icon: Shield, color: 'bg-green-50 text-green-600' },
  'Portería': { icon: Shield, color: 'bg-green-50 text-green-600' },
  'WiFi': { icon: Wifi, color: 'bg-sky-50 text-sky-600' },
  'Aire acondicionado': { icon: Wind, color: 'bg-cyan-50 text-cyan-600' },
  'Zonas verdes': { icon: Trees, color: 'bg-emerald-50 text-emerald-600' },
  'Salón social': { icon: Coffee, color: 'bg-amber-50 text-amber-600' },
  'Ascensor': { icon: Zap, color: 'bg-yellow-50 text-yellow-600' },
  'Depósito': { icon: Package, color: 'bg-orange-50 text-orange-600' },
  'Cuarto de servicio': { icon: Home, color: 'bg-rose-50 text-rose-600' },
  'Zona BBQ': { icon: UtensilsCrossed, color: 'bg-red-50 text-red-600' },
  'Cancha de tenis': { icon: Bike, color: 'bg-lime-50 text-lime-600' },
  'Parque infantil': { icon: Baby, color: 'bg-pink-50 text-pink-600' },
  'Pet friendly': { icon: Dog, color: 'bg-amber-50 text-amber-700' },
  'Terraza': { icon: Sunset, color: 'bg-orange-50 text-orange-500' },
  'Cámaras de seguridad': { icon: Camera, color: 'bg-slate-50 text-slate-600' },
  'Jacuzzi': { icon: Droplets, color: 'bg-blue-50 text-blue-500' },
};

interface AmenityBadgeProps {
  amenity: string;
}

export default function AmenityBadge({ amenity }: AmenityBadgeProps) {
  const config = AMENITY_MAP[amenity] || { icon: Star, color: 'bg-surface text-primary' };
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${config.color} text-sm font-medium`}>
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{amenity}</span>
    </div>
  );
}
