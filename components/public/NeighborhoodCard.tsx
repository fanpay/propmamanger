import Link from 'next/link';

export interface Neighborhood {
  name: string;
  slug: string;
  image: string;
  count: number;
  highlight?: string;
}

interface NeighborhoodCardProps {
  neighborhood: Neighborhood;
}

export default function NeighborhoodCard({ neighborhood }: NeighborhoodCardProps) {
  return (
    <Link
      href={`/propiedades?q=${encodeURIComponent(neighborhood.name)}`}
      className="group relative block rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${neighborhood.image})` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative h-52 flex flex-col justify-end p-5">
        {neighborhood.highlight && (
          <span className="inline-block self-start mb-2 px-2.5 py-0.5 bg-secondary text-white text-xs font-semibold rounded-full">
            {neighborhood.highlight}
          </span>
        )}
        <h3 className="text-white font-display font-bold text-xl leading-tight">
          {neighborhood.name}
        </h3>
        <p className="text-white/70 text-sm mt-0.5">
          {neighborhood.count} propiedades disponibles
        </p>
        <div className="flex items-center gap-1.5 mt-3 text-secondary text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span>Ver propiedades</span>
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}
