'use client';
import { useState } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';

interface WhatsAppFABProps {
  phone: string;
  advisorName?: string;
  propertyTitle?: string;
}

export default function WhatsAppFAB({ phone, advisorName, propertyTitle }: WhatsAppFABProps) {
  const [expanded, setExpanded] = useState(false);

  const message = propertyTitle
    ? `Hola${advisorName ? ` ${advisorName}` : ''}, estoy interesado/a en la propiedad: "${propertyTitle}". ¿Podría darme más información?`
    : `Hola${advisorName ? ` ${advisorName}` : ''}, me gustaría recibir información sobre propiedades disponibles.`;

  const waUrl = `https://wa.me/57${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Expanded panel */}
      {expanded && (
        <div className="animate-scale-in bg-white rounded-2xl shadow-hover border border-border p-4 w-64">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-text-main text-sm">¿Hablamos?</p>
              <p className="text-xs text-text-muted">Respuesta en &lt; 2 horas</p>
            </div>
          </div>
          {advisorName && (
            <p className="text-xs text-text-muted mb-3">
              Tu asesor <strong className="text-text-main">{advisorName}</strong> está disponible.
            </p>
          )}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors"
            id="whatsapp-fab-link"
          >
            <MessageCircle className="w-4 h-4" />
            Escribir por WhatsApp
          </a>
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 border border-border text-text-muted text-xs font-medium rounded-xl mt-2 hover:bg-surface transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {phone}
            </a>
          )}
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="relative w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-hover flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Contactar por WhatsApp"
        id="whatsapp-fab-btn"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-[ping_2s_ease-out_infinite] opacity-40" />
        {expanded ? (
          <X className="w-6 h-6 relative z-10" />
        ) : (
          <MessageCircle className="w-6 h-6 relative z-10" />
        )}
      </button>
    </div>
  );
}
