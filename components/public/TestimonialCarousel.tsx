'use client';
import { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'María Fernanda López',
    role: 'Compradora en El Poblado',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    rating: 5,
    text: 'Encontré el apartamento de mis sueños en menos de 3 semanas. Mi asesor estuvo disponible en todo momento, respondiendo mis dudas incluso los fines de semana. El proceso fue transparente y muy profesional.',
  },
  {
    id: 2,
    name: 'Carlos Andrés Restrepo',
    role: 'Arrendatario en Laureles',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    rating: 5,
    text: 'Llevaba meses buscando oficina en Laureles con los requisitos específicos de mi empresa. En PropManager lo lograron en 10 días. Excelente manejo de los trámites y claridad en los contratos.',
  },
  {
    id: 3,
    name: 'Valentina Cano Giraldo',
    role: 'Vendedora en Envigado',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    rating: 5,
    text: 'Vendí mi apartamento a precio justo en 45 días. La fotografia profesional, la difusión en redes y el acompañamiento jurídico fueron clave. Muy satisfecha con el servicio end-to-end.',
  },
  {
    id: 4,
    name: 'Juan Pablo Mora',
    role: 'Propietario en Sabaneta',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    rating: 5,
    text: 'Tengo 3 apartamentos en arriendo con ellos. La gestión de pagos, contratos y visitas es impecable. Me despreocupé completamente. El portal para propietarios es muy útil.',
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((index + TESTIMONIALS.length) % TESTIMONIALS.length);
        setIsAnimating(false);
      }, 200);
    },
    [isAnimating]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goTo(current + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const t = TESTIMONIALS[current];

  return (
    <div className="relative">
      {/* Main card */}
      <div
        className={`bg-white rounded-2xl shadow-hover p-8 md:p-10 max-w-3xl mx-auto transition-opacity duration-200 ${
          isAnimating ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Quote icon */}
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
          <Quote className="w-6 h-6 text-primary" />
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
          ))}
        </div>

        {/* Text */}
        <p className="text-text-main text-lg leading-relaxed mb-8 italic">
          &ldquo;{t.text}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-4">
          <img
            src={t.avatar}
            alt={t.name}
            className="w-14 h-14 rounded-full object-cover ring-4 ring-surface"
          />
          <div>
            <p className="font-display font-semibold text-text-main">{t.name}</p>
            <p className="text-sm text-text-muted">{t.role}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => goTo(current - 1)}
          className="w-10 h-10 rounded-full border border-border text-text-muted hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-8 h-2.5 bg-primary'
                  : 'w-2.5 h-2.5 bg-border hover:bg-text-muted'
              }`}
              aria-label={`Testimonio ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(current + 1)}
          className="w-10 h-10 rounded-full border border-border text-text-muted hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
