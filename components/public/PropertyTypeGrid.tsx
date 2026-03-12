import Link from 'next/link';
import { Building2, Home, Briefcase, ShoppingBag, Warehouse, MapPin } from 'lucide-react';

const TYPES = [
  {
    label: 'Apartamentos',
    value: 'APARTMENT',
    icon: Building2,
    count: 68,
    color: 'bg-blue-50 text-blue-600 group-hover:bg-primary group-hover:text-white',
    desc: 'Unidades modernas y funcionales',
  },
  {
    label: 'Casas',
    value: 'HOUSE',
    icon: Home,
    count: 34,
    color: 'bg-amber-50 text-amber-600 group-hover:bg-secondary group-hover:text-white',
    desc: 'Espacios para toda la familia',
  },
  {
    label: 'Oficinas',
    value: 'OFFICE',
    icon: Briefcase,
    count: 22,
    color: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
    desc: 'Espacios de trabajo premium',
  },
  {
    label: 'Locales',
    value: 'LOCAL',
    icon: ShoppingBag,
    count: 15,
    color: 'bg-green-50 text-green-600 group-hover:bg-accent group-hover:text-white',
    desc: 'Ideal para tu negocio',
  },
  {
    label: 'Bodegas',
    value: 'WAREHOUSE',
    icon: Warehouse,
    count: 8,
    color: 'bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white',
    desc: 'Capacidad industrial y logística',
  },
  {
    label: 'Lotes',
    value: 'LOT',
    icon: MapPin,
    count: 11,
    color: 'bg-red-50 text-red-600 group-hover:bg-red-500 group-hover:text-white',
    desc: 'Terrenos para construir',
  },
];

export default function PropertyTypeGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {TYPES.map(({ label, value, icon: Icon, count, color, desc }) => (
        <Link
          key={value}
          href={`/propiedades?type=${value}`}
          className="group flex flex-col items-center text-center p-5 bg-white rounded-2xl border border-border shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 ${color}`}>
            <Icon className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <p className="font-display font-semibold text-text-main text-sm">{label}</p>
          <p className="text-text-muted text-xs mt-0.5 hidden sm:block">{desc}</p>
          <p className="text-primary font-semibold text-xs mt-1.5">{count} props.</p>
        </Link>
      ))}
    </div>
  );
}
