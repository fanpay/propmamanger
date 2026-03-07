'use client';
import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  from: 'user' | 'bot';
  text: string;
}

const INITIAL_MSG: Message = {
  id: '0',
  from: 'bot',
  text: '¡Hola! Soy el asistente de PropManager. ¿En qué te puedo ayudar hoy? 🏠',
};

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('arriendo') || lower.includes('arrendar')) {
    return 'Tenemos excelentes opciones en arriendo en Medellín, El Poblado, Laureles y más. ¿Qué tipo de inmueble buscas?';
  }
  if (lower.includes('precio') || lower.includes('valor') || lower.includes('cuánto')) {
    return 'Los precios varían según el sector y tipo de inmueble. Puedes filtrar por precio en nuestra sección de propiedades o contactar a un asesor.';
  }
  if (lower.includes('contacto') || lower.includes('asesor') || lower.includes('llamar')) {
    return 'Puedes contactarnos al +57 (4) 444-5566 o escribirnos a info@propmanager.co. ¡Estamos disponibles de lunes a sábado!';
  }
  if (lower.includes('venta') || lower.includes('comprar') || lower.includes('compra')) {
    return 'Tenemos casas y apartamentos en venta desde $300 millones. ¿Buscas en algún sector específico de Medellín?';
  }
  if (lower.includes('hola') || lower.includes('buenos') || lower.includes('buenas')) {
    return '¡Hola! Bienvenido a PropManager. Puedo ayudarte a encontrar propiedades, información de precios o conectarte con un asesor.';
  }
  if (lower.includes('poblado')) {
    return 'El Poblado es uno de los sectores más cotizados de Medellín. Tenemos apartamentos desde $2.5M en arriendo y casas desde $800M en venta.';
  }
  return 'Entendido. Para más información, visita nuestra sección de propiedades o habla con uno de nuestros asesores. ¿Algo más en lo que pueda ayudarte?';
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MSG]);
  const [input, setInput] = useState('');

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), from: 'user', text: input.trim() };
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      from: 'bot',
      text: getBotReply(input.trim()),
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#C8873A] text-white shadow-lg flex items-center justify-center hover:bg-[#b5762f] transition-colors"
        aria-label="Chat de asistencia"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-xl shadow-xl border border-[#E5E0D8] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#1B3A5C] text-white px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">PropManager Chat</p>
              <p className="text-xs text-blue-200">Asistente en línea</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-blue-200 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-72">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                    msg.from === 'user'
                      ? 'bg-[#1B3A5C] text-white rounded-br-sm'
                      : 'bg-[#F7F5F2] text-[#1A1A1A] rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="border-t border-[#E5E0D8] px-3 py-2 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1 px-3 py-1.5 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C]"
            />
            <button
              type="submit"
              className="p-2 bg-[#C8873A] text-white rounded-lg hover:bg-[#b5762f] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
