'use client';

export default function ContactForm() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('¡Mensaje enviado! Te contactaremos pronto.');
    };

    return (
        <div className="bg-white rounded-xl border border-[#E5E0D8] p-5">
            <h3 className="font-semibold text-[#1A1A1A] mb-4">¿Te interesa esta propiedad?</h3>
            <form className="space-y-3" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Tu nombre"
                    required
                    className="w-full px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C]"
                />
                <input
                    type="tel"
                    placeholder="Tu teléfono"
                    required
                    className="w-full px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C]"
                />
                <input
                    type="email"
                    placeholder="Tu correo"
                    className="w-full px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C]"
                />
                <textarea
                    placeholder="Mensaje (opcional)"
                    rows={3}
                    className="w-full px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B3A5C] resize-none"
                />
                <button
                    type="submit"
                    className="w-full py-2.5 bg-[#C8873A] text-white rounded-lg font-medium hover:bg-[#b5762f] transition-colors"
                >
                    Solicitar información
                </button>
            </form>
        </div>
    );
}
