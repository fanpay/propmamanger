'use client';
import { Share2, Link2 } from 'lucide-react';

interface PropertyShareBarProps {
  title: string;
  price: string;
  adminFee?: string;
  code: string;
  stratum: number;
}

export default function PropertyShareBar({ title, price, adminFee, code, stratum }: PropertyShareBarProps) {
  function copyLink() {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(window.location.href).then(() => {
        // Brief visual feedback could be added here
      });
    }
  }

  const waMessage = `Mira esta propiedad: ${title} - ${typeof window !== 'undefined' ? window.location.href : ''}`;
  const waUrl = `https://wa.me/?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="bg-surface rounded-xl p-5 flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-4xl font-display font-bold text-primary">
          {price}
        </p>
        {adminFee && (
          <p className="text-sm text-text-muted mt-1">+ Admin: {adminFee}/mes</p>
        )}
        <p className="text-xs text-text-muted mt-1">Código: {code} · Estrato {stratum}</p>
      </div>
      <div className="flex items-center gap-2">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold rounded-xl hover:bg-green-100 transition-colors"
          title="Compartir por WhatsApp"
        >
          <Share2 className="w-3.5 h-3.5" /> Compartir
        </a>
        <button
          onClick={copyLink}
          className="flex items-center gap-1.5 px-3 py-2 bg-surface border border-border text-xs font-semibold rounded-xl hover:border-primary hover:text-primary transition-colors"
          title="Copiar enlace"
        >
          <Link2 className="w-3.5 h-3.5" /> Copiar enlace
        </button>
      </div>
    </div>
  );
}
