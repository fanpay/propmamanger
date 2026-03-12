'use client';
import { useState, useEffect, useRef } from 'react';
import { Building2, Shield, Clock, Heart } from 'lucide-react';
import { getProperties } from '@/lib/mock-data';
import { Property } from '@/types';
import PropertyCard from '@/components/public/PropertyCard';
import SearchBar from '@/components/public/SearchBar';
import CaptacionBanner from '@/components/public/CaptacionBanner';
import NeighborhoodCard, { Neighborhood } from '@/components/public/NeighborhoodCard';
import TestimonialCarousel from '@/components/public/TestimonialCarousel';
import PropertyTypeGrid from '@/components/public/PropertyTypeGrid';

const STATS = [
  { number: 150, suffix: '+', label: 'Propiedades activas' },
  { number: 12, suffix: '', label: 'Años de experiencia' },
  { number: 98, suffix: '%', label: 'Clientes satisfechos' },
  { number: 500, suffix: '+', label: 'Familias atendidas' },
];

const WHY_US = [
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

const NEIGHBORHOODS: Neighborhood[] = [
  {
    name: 'El Poblado',
    slug: 'El Poblado',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    count: 42,
    highlight: 'Más popular',
  },
  {
    name: 'Laureles',
    slug: 'Laureles',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    count: 28,
  },
  {
    name: 'Envigado',
    slug: 'Envigado',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    count: 19,
  },
  {
    name: 'Sabaneta',
    slug: 'Sabaneta',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    count: 14,
  },
  {
    name: 'Belén',
    slug: 'Belén',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
    count: 11,
  },
  {
    name: 'Estadio',
    slug: 'Estadio',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    count: 9,
  },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function HomePage() {
  const [rentProperties, setRentProperties] = useState<Property[]>([]);
  const [saleProperties, setSaleProperties] = useState<Property[]>([]);
  const [featured, setFeatured] = useState<Property[]>([]);

  useEffect(() => {
    getProperties().then((properties) => {
      const available = properties.filter((p) => p.status === 'AVAILABLE');
      setRentProperties(available.filter((p) => p.operation === 'RENT').slice(0, 3));
      setSaleProperties(available.filter((p) => p.operation === 'SALE').slice(0, 3));
      setFeatured(available.slice(0, 6));
    });
  }, []);

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative min-h-[640px] flex items-center pt-16 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&q=80')",
          }}
        />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/97 via-primary/88 to-primary/55" />
        {/* Subtle animated orb */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />

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

      {/* ── Animated Stats Bar ──────────────────────────────────────── */}
      <section className="bg-secondary py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
            {STATS.map(({ number, suffix, label }, i) => (
              <div key={label} className={`animate-fade-in delay-${i * 75}`}>
                <p className="text-4xl font-display font-bold">
                  <AnimatedCounter target={number} suffix={suffix} />
                </p>
                <p className="text-sm mt-1 text-white/80 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Property Type Grid ─────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-text-main mb-2">
              ¿Qué estás buscando?
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              Explora por tipo de propiedad y encuentra exactamente lo que necesitas
            </p>
          </div>
          <PropertyTypeGrid />
        </div>
      </section>

      {/* ── Featured Properties ────────────────────────────────────── */}
      <section className="py-16 bg-surface">
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

      {/* ── Rent Properties ────────────────────────────────────────── */}
      {rentProperties.length > 0 && (
        <section className="py-16">
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

      {/* ── Neighborhoods ──────────────────────────────────────────── */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-text-main mb-2">
              Barrios Destacados
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              Conoce las zonas más buscadas de Medellín y Área Metropolitana
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NEIGHBORHOODS.map((n) => (
              <NeighborhoodCard key={n.slug} neighborhood={n} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Sale Properties ────────────────────────────────────────── */}
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

      {/* ── Why Us ─────────────────────────────────────────────────── */}
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
            {WHY_US.map(({ icon: Icon, title, desc }) => (
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

      {/* ── Testimonials ───────────────────────────────────────────── */}
      <section className="py-20 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-text-main mb-2">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              Más de 500 familias han encontrado su hogar con nosotros
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── Captacion Banner ───────────────────────────────────────── */}
      <CaptacionBanner />
    </>
  );
}
