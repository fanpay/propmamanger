'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Home, MapPin, Building, ArrowRight, ShieldCheck, Phone } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

// Componente Wrapper para usarSearchParams (requerido por NextJS 14+)
function CaptacionForm() {
    const searchParams = useSearchParams();
    const operacionParam = searchParams.get('operacion') === 'ARRENDAR' ? 'ARRENDAR' : 'VENDER';

    const [operacion, setOperacion] = useState<'VENDER' | 'ARRENDAR'>(operacionParam);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <>
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden border border-border">

                    {/* Panel Izquierdo Informativo */}
                    <div className="md:col-span-2 bg-[#1B3A5C] text-white p-8 md:p-10 flex flex-col relative overflow-hidden">

                        {/* Abstract background shape */}
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                        <div className="absolute top-12 right-12 w-32 h-32 bg-[#C8873A]/20 rounded-full blur-2xl" />

                        <div className="relative z-10 flex-1 flex flex-col">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 border border-white/20">
                                <Home className="w-6 h-6 text-[#C8873A]" />
                            </div>

                            <h2 className="text-3xl font-display font-bold mb-4">Confía tu patrimonio a expertos</h2>
                            <p className="text-white/80 mb-10 text-sm leading-relaxed">
                                Completa este breve formulario y prepararemos un análisis gratuito del valor comercial de tu propiedad en el sector.
                            </p>

                            <div className="space-y-6 mt-auto">
                                <div className="flex gap-3 items-start">
                                    <ShieldCheck className="w-5 h-5 text-[#C8873A] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-sm">Alianza Legal</h4>
                                        <p className="text-xs text-white/60">Contratos auditados y seguros de arrendamiento.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <Building className="w-5 h-5 text-[#C8873A] flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-sm">Exposición Total</h4>
                                        <p className="text-xs text-white/60">Presencia en MetroCuadrado, FincaRaíz y Ciencuadras.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="md:col-span-3 p-8 md:p-10">
                        {/* Tabs Vender / Arrendar */}
                        <div className="flex p-1 bg-surface rounded-xl mb-8 border border-border">
                            <button
                                type="button"
                                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${operacion === 'VENDER'
                                    ? 'bg-white text-primary shadow-sm border border-border/50'
                                    : 'text-text-muted hover:text-text-main hover:bg-gray-100'
                                    }`}
                                onClick={() => setOperacion('VENDER')}
                            >
                                Quiero Vender
                            </button>
                            <button
                                type="button"
                                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${operacion === 'ARRENDAR'
                                    ? 'bg-white text-primary shadow-sm border border-border/50'
                                    : 'text-text-muted hover:text-text-main hover:bg-gray-100'
                                    }`}
                                onClick={() => setOperacion('ARRENDAR')}
                            >
                                Quiero Arrendar
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-main">Tu Nombre Completo *</label>
                                <input required type="text" placeholder="Ej: Maria Adelaida Gómez"
                                    className="w-full p-2.5 border border-border rounded-lg text-sm bg-surface focus:bg-white focus:outline-none focus:border-primary transition-colors" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-text-main">Teléfono / WhatsApp *</label>
                                    <input required type="tel" placeholder="+57 300 000 0000"
                                        className="w-full p-2.5 border border-border rounded-lg text-sm bg-surface focus:bg-white focus:outline-none focus:border-primary transition-colors" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-text-main">Correo Electrónico *</label>
                                    <input required type="email" placeholder="maria@ejemplo.com"
                                        className="w-full p-2.5 border border-border rounded-lg text-sm bg-surface focus:bg-white focus:outline-none focus:border-primary transition-colors" />
                                </div>
                            </div>

                            <div className="h-px w-full bg-border my-2" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-text-main">Tipo de Inmueble</label>
                                    <select className="w-full p-2.5 border border-border rounded-lg text-sm bg-surface focus:bg-white focus:outline-none focus:border-primary transition-colors">
                                        <option value="APARTMENT">Apartamento</option>
                                        <option value="HOUSE">Casa</option>
                                        <option value="OFFICE">Oficina</option>
                                        <option value="LOCAL">Local / Comercial</option>
                                        <option value="LOT">Lote</option>
                                        <option value="WAREHOUSE">Bodega</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5 relative">
                                    <label className="text-sm font-medium text-text-main">Aproximado en m²</label>
                                    <input type="number" placeholder="Ej: 85"
                                        className="w-full p-2.5 border border-border rounded-lg text-sm bg-surface focus:bg-white focus:outline-none focus:border-primary transition-colors" />
                                    <span className="absolute right-3 bottom-2.5 text-text-muted text-sm pointer-events-none">m²</span>
                                </div>
                            </div>

                            <div className="space-y-1.5 relative">
                                <label className="text-sm font-medium text-text-main">Zona, Barrio o Dirección</label>
                                <MapPin className="absolute left-3 bottom-2.5 w-4 h-4 text-text-muted" />
                                <input type="text" placeholder="Ej: El Poblado, Envigado, Laureles..."
                                    className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg text-sm bg-surface focus:bg-white focus:outline-none focus:border-primary transition-colors" />
                            </div>

                            <div className="space-y-1.5 relative">
                                <label className="text-sm font-medium text-text-main">
                                    {operacion === 'VENDER' ? 'Precio de Venta Estimado (Opcional)' : 'Canon de Arrendamiento (Opcional)'}
                                </label>
                                <span className="absolute left-3 bottom-2.5 text-text-muted font-bold">$</span>
                                <input type="number" placeholder="0.00"
                                    className="w-full pl-8 pr-3 py-2.5 border border-border rounded-lg text-sm bg-surface focus:bg-white focus:outline-none focus:border-primary transition-colors" />
                            </div>

                            <label className="flex items-start gap-3 mt-4 cursor-pointer group">
                                <div className="mt-0.5">
                                    <input required type="checkbox" className="w-4 h-4 rounded appearance-none border-2 border-border cursor-pointer checked:bg-primary checked:border-primary relative
                       after:content-[''] after:absolute after:top-[1px] after:left-[4px] after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:opacity-0 checked:after:opacity-100 transition-colors" />
                                </div>
                                <span className="text-xs text-text-muted leading-relaxed group-hover:text-text-main transition-colors">
                                    Acepto la Política de Tratamiento de Datos Personales. Autorizo a PropManager a contactarme vía WhatsApp o correo electrónico para continuar el proceso de gestión inmobiliaria según la Ley 1581 de 2012.
                                </span>
                            </label>

                            <button type="submit" className="w-full btn-primary py-3.5 mt-2 flex justify-center items-center gap-2 group">
                                Enviar Solicitud
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Success Modal */}
                <Dialog open={submitted} onOpenChange={setSubmitted}>
                    <DialogContent className="sm:max-w-md p-8 text-center rounded-2xl flex flex-col items-center gap-4 outline-none border-none">
                        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center -mt-2">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold font-display text-text-main mb-2">¡Solicitud recibida!</h2>
                            <p className="text-text-muted text-sm leading-relaxed mb-6">
                                Hemos registrado tus datos correctamente. En <strong className="text-text-main">menos de 24 horas</strong> un asesor especializado en tu zona se estará comunicando contigo para iniciar la gestión.
                            </p>
                            <div className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between text-left shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-[#25D366]" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase">¿No quieres esperar?</div>
                                        <div className="text-sm font-medium">Contáctanos directamente</div>
                                    </div>
                                </div>
                                <a href="https://wa.me/573000000000?text=Hola,%20acabo%20de%20diligenciar%20el%20formulario%20y%20quiero%20más%20información." target="_blank" rel="noopener noreferrer"
                                    className="px-4 py-2 bg-[#25D366] text-white text-xs font-bold rounded-lg hover:bg-[#1ebd5a] transition-colors whitespace-nowrap">
                                    Ir a WhatsApp
                                </a>
                            </div>
                            <button onClick={() => setSubmitted(false)} className="mx-auto block mt-6 text-sm text-text-muted underline hover:text-text-main">
                                Volver al inicio
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

export default function QuieroPublicarPage() {
    return (
        <div className="min-h-screen bg-surface flex flex-col">
            <Navbar />
            <main className="flex-1 pt-28 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center mb-10">
                    <Badge variant="secondary" className="mb-4 bg-[#C8873A]/10 text-[#C8873A] border-[#C8873A]/20 hover:bg-[#C8873A]/20">Proceso Rápido y Seguro</Badge>
                    <h1 className="text-4xl md:text-5xl font-display font-black text-text-main mb-4 tracking-tight">Publica tu propiedad con nosotros</h1>
                    <p className="text-lg text-text-muted font-body">Tu inmueble merece rentabilidad y protección jurídica.</p>
                </div>

                <Suspense fallback={<div className="text-center p-12 text-primary">Cargando formulario...</div>}>
                    <CaptacionForm />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
