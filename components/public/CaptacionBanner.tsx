import Link from 'next/link';
import { Home, ArrowRight, TrendingUp, ShieldCheck, Clock } from 'lucide-react';

export default function CaptacionBanner() {
    return (
        <section className="py-20 relative overflow-hidden bg-[#1B3A5C] text-white">
            {/* Decorative patterns */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#C8873A]/10 -skew-x-12 translate-x-1/4" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full border-[16px] border-white/5" />
            <div className="absolute top-12 right-24 w-24 h-24 rounded-full bg-gradient-to-tr from-[#C8873A] to-transparent opacity-20 blur-xl" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="lg:w-1/2 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-bold uppercase tracking-wider text-[#C8873A]">
                        <Home className="w-3.5 h-3.5" />
                        Socios Inmobiliarios
                    </div>

                    <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                        ¿Tienes una propiedad? <br />
                        <span className="text-[#C8873A]">Déjanos gestionarla por ti</span>
                    </h2>

                    <p className="text-white/80 text-lg max-w-lg leading-relaxed font-body">
                        Encontramos el cliente ideal para tu inmueble de forma rápida, segura y bajo las mejores condiciones del mercado.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link
                            href="/quiero-publicar?operacion=VENDER"
                            className="px-8 py-3.5 bg-[#C8873A] text-white rounded-lg font-bold text-center hover:bg-[#b5762f] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                            Quiero Vender
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/quiero-publicar?operacion=ARRENDAR"
                            className="px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg font-bold text-center hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            Quiero Arrendar
                        </Link>
                    </div>
                </div>

                <div className="lg:w-5/12 grid gap-4 w-full">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl flex items-start gap-4 hover:bg-white/15 transition-colors">
                        <div className="bg-[#C8873A] p-3 rounded-lg flex-shrink-0 text-white shadow-md">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-lg mb-1">Valoración Profesional</h4>
                            <p className="text-sm text-white/70">Asignamos el canon o precio de venta exacto según el mercado actual, garantizando rentabilidad sin perder competitividad.</p>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl flex items-start gap-4 hover:bg-white/15 transition-colors">
                        <div className="bg-[#1B3A5C] border border-white/30 p-3 rounded-lg flex-shrink-0 text-white shadow-md">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-lg mb-1">Respaldo Jurídico</h4>
                            <p className="text-sm text-white/70">Estudio de pólizas, redacción de contratos blindados y seguros que protegen tu patrimonio al 100%.</p>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl flex items-start gap-4 hover:bg-white/15 transition-colors">
                        <div className="bg-[#1B3A5C] border border-white/30 p-3 rounded-lg flex-shrink-0 text-white shadow-md">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-lg mb-1">Agilidad en Colocación</h4>
                            <p className="text-sm text-white/70">Red de más de 300 asesores aliados y posicionamiento automático en los 5 portales más grandes del país.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
