'use client';
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  if (lower.includes('arriendo') || lower.includes('arrendar'))
    return 'Tenemos excelentes opciones en arriendo en Medellín, El Poblado, Laureles y más. ¿Qué tipo de inmueble buscas?';
  if (lower.includes('precio') || lower.includes('valor') || lower.includes('cuánto'))
    return 'Los precios varían según el sector y tipo de inmueble. Puedes filtrar por precio en nuestra sección de propiedades o contactar a un asesor.';
  if (lower.includes('contacto') || lower.includes('asesor') || lower.includes('llamar'))
    return 'Puedes contactarnos al +57 (4) 444-5566 o escribirnos a info@propmanager.co. ¡Estamos disponibles de lunes a sábado!';
  if (lower.includes('venta') || lower.includes('comprar') || lower.includes('compra'))
    return 'Tenemos casas y apartamentos en venta desde $300 millones. ¿Buscas en algún sector específico de Medellín?';
  if (lower.includes('hola') || lower.includes('buenos') || lower.includes('buenas'))
    return '¡Hola! Bienvenido a PropManager. Puedo ayudarte a encontrar propiedades, información de precios o conectarte con un asesor.';
  if (lower.includes('poblado'))
    return 'El Poblado es uno de los sectores más cotizados de Medellín. Tenemos apartamentos desde $2.5M en arriendo y casas desde $800M en venta.';
  if (lower.includes('laureles'))
    return 'Laureles es un sector tranquilo y familiar. Tenemos opciones de arriendo desde $1.5M y apartamentos en venta desde $350M.';
  return 'Entendido. Para más información, visita nuestra sección de propiedades o habla con uno de nuestros asesores. ¿Algo más en lo que pueda ayudarte?';
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MSG]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  }, [messages, open]);

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), from: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        from: 'bot',
        text: getBotReply(userMsg.text),
      };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 900);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-secondary text-white shadow-xl',
          'flex items-center justify-center transition-all duration-200',
          'hover:scale-110 hover:bg-secondary/90',
          !open && 'animate-pulse-ring'
        )}
        aria-label="Chat de asistencia"
      >
        <span className={cn('transition-transform duration-200', open ? 'rotate-90' : 'rotate-0')}>
          {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </span>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-xl-colored border border-border flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="font-display font-semibold text-sm">Asistente PropManager</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <p className="text-xs text-blue-200">En línea</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-72 bg-surface/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn('flex animate-fade-in', msg.from === 'user' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed',
                    msg.from === 'user'
                      ? 'bg-primary text-white rounded-br-sm'
                      : 'bg-white text-text-main rounded-bl-sm shadow-card border border-border'
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 shadow-card">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-text-muted animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          {messages.length === 1 && (
            <div className="px-4 py-2 flex flex-wrap gap-2 border-t border-border bg-white">
              {['Apartamentos en arriendo', 'Precios El Poblado', 'Contactar asesor'].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q);
                    const userMsg: Message = { id: Date.now().toString(), from: 'user', text: q };
                    const botMsg: Message = {
                      id: (Date.now() + 1).toString(),
                      from: 'bot',
                      text: getBotReply(q),
                    };
                    setMessages((prev) => [...prev, userMsg, botMsg]);
                  }}
                  className="text-xs px-2.5 py-1.5 bg-surface border border-border rounded-full text-text-muted hover:text-primary hover:border-primary transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={sendMessage} className="border-t border-border px-3 py-3 flex gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1 px-3 py-2 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 bg-surface"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
