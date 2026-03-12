'use client';
import { useState } from 'react';
import { MessageCircle, Send, CheckCircle, Loader2 } from 'lucide-react';

interface ContactFormProps {
  phone?: string;
  propertyTitle?: string;
  advisorName?: string;
}

export default function ContactForm({ phone, propertyTitle, advisorName }: ContactFormProps) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    time: '',
    message: propertyTitle ? `Hola, estoy interesado/a en la propiedad "${propertyTitle}". ¿Podría contactarme?` : '',
  });

  const waMessage = `Hola${advisorName ? ` ${advisorName}` : ''}, soy ${form.name || 'un cliente'} y estoy interesado/a en${propertyTitle ? ` "${propertyTitle}"` : ' propiedades disponibles'}. Mi teléfono es ${form.phone || 'pendiente'}. ${form.message}`;
  const waUrl = phone
    ? `https://wa.me/57${phone.replace(/\D/g, '')}?text=${encodeURIComponent(waMessage)}`
    : `https://wa.me/574445566?text=${encodeURIComponent(waMessage)}`;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  }

  if (sent) {
    return (
      <div className="bg-white rounded-xl border border-border p-6 text-center">
        <div className="w-14 h-14 bg-accent/15 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-7 h-7 text-accent" />
        </div>
        <h3 className="font-display font-bold text-text-main mb-1">¡Mensaje enviado!</h3>
        <p className="text-sm text-text-muted mb-5">
          Te contactaremos en menos de 2 horas. También puedes escribirnos directamente.
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Escribir por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <h3 className="font-display font-semibold text-text-main mb-4">Solicitar información</h3>

      {/* WhatsApp CTA */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="contact-whatsapp-btn"
        className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors mb-4"
      >
        <MessageCircle className="w-4 h-4" />
        Contactar por WhatsApp
      </a>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-text-muted">o llenar el formulario</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          required
          type="text"
          placeholder="Tu nombre*"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
        />
        <input
          required
          type="tel"
          placeholder="Teléfono / WhatsApp*"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
        />
        <input
          type="email"
          placeholder="Email (opcional)"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
        />
        <select
          value={form.time}
          onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
          className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all bg-white text-text-muted"
        >
          <option value="">Horario preferido (opcional)</option>
          <option value="morning">☀️ Mañana (8am - 12pm)</option>
          <option value="afternoon">🌤 Tarde (12pm - 6pm)</option>
          <option value="evening">🌙 Noche (6pm - 8pm)</option>
          <option value="anytime">⏰ Cualquier hora</option>
        </select>
        <textarea
          rows={3}
          placeholder="Tu mensaje..."
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full px-3.5 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          id="contact-form-submit"
          className="flex items-center justify-center gap-2 w-full py-3 bg-primary hover:bg-primary/90 disabled:opacity-70 text-white text-sm font-semibold rounded-xl transition-all"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {loading ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </form>
    </div>
  );
}
