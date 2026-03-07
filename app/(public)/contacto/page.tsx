'use client';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#1A1A1A]">Contáctanos</h1>
        <p className="text-[#6B7280] mt-2">Estamos aquí para ayudarte a encontrar la propiedad ideal</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E5E0D8] p-5">
            <h3 className="font-semibold text-[#1A1A1A] mb-4">Información de contacto</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#C8873A] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1A1A1A]">Teléfono</p>
                  <p className="text-[#6B7280]">+57 (4) 444-5566</p>
                  <p className="text-[#6B7280]">+57 300 123 4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#C8873A] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1A1A1A]">Correo</p>
                  <p className="text-[#6B7280]">info@propmanager.co</p>
                  <p className="text-[#6B7280]">ventas@propmanager.co</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C8873A] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1A1A1A]">Dirección</p>
                  <p className="text-[#6B7280]">Calle 10 # 43-20, El Poblado</p>
                  <p className="text-[#6B7280]">Medellín, Antioquia</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#C8873A] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1A1A1A]">Horarios</p>
                  <p className="text-[#6B7280]">Lunes a Viernes: 8am - 6pm</p>
                  <p className="text-[#6B7280]">Sábados: 9am - 2pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#4CAF7D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-[#4CAF7D]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">¡Mensaje enviado!</h3>
                <p className="text-[#6B7280]">Te contactaremos en menos de 24 horas.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 px-6 py-2 bg-[#1B3A5C] text-white rounded-lg font-medium hover:bg-[#152d47] transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-5">Envíanos un mensaje</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Nombre completo *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Teléfono *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Correo electrónico</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Asunto</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C] bg-white"
                    >
                      <option value="">Seleccionar asunto</option>
                      <option value="arriendo">Arriendo de propiedad</option>
                      <option value="compra">Compra de propiedad</option>
                      <option value="venta">Quiero vender/arrendar mi propiedad</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Mensaje *</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C] resize-none"
                      placeholder="Cuéntanos en qué podemos ayudarte..."
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#1B3A5C] text-white rounded-lg font-medium hover:bg-[#152d47] transition-colors"
                    >
                      Enviar mensaje
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
