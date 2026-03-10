import { Itinerary } from '@/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { MapPin, CheckCircle2 } from 'lucide-react';
import { formatCOP } from '@/lib/utils';

export function ItineraryPreview({ itinerary }: { itinerary: Itinerary }) {
    if (!itinerary) return null;

    return (
        <div className="bg-white border text-left border-border rounded-xl shadow-lg w-full max-w-3xl mx-auto overflow-hidden font-body">
            {/* Header */}
            <div className="bg-[#1B3A5C] text-white p-8 text-center relative">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full border-4 border-white/20" />
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full border-4 border-white/20" />
                </div>

                <div className="relative z-10">
                    <h1 className="text-3xl font-display font-bold mb-2 tracking-tight">PropManager Medellín</h1>
                    <p className="text-white/80 font-medium tracking-wide uppercase text-sm mb-6">Itinerario de Visitas Inmobiliarias</p>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 inline-block text-left min-w-[300px] border border-white/10">
                        <div className="text-white/80 text-xs uppercase font-bold tracking-wider mb-1">Cliente</div>
                        <div className="font-semibold text-lg">{itinerary.client.name}</div>
                        <div className="text-white/80 text-xs uppercase font-bold tracking-wider mb-1 mt-3">Fecha</div>
                        <div className="font-semibold capitalize">{format(itinerary.date, "EEEE, d 'de' MMMM yyyy", { locale: es })}</div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-10">
                {itinerary.generalNotes && (
                    <div className="bg-surface rounded-lg p-4 text-sm text-text-main border border-border mb-8 flex gap-3 shadow-sm">
                        <div className="text-[#C8873A] mt-0.5"><CheckCircle2 className="w-5 h-5" /></div>
                        <p className="italic">{itinerary.generalNotes}</p>
                    </div>
                )}

                {itinerary.stops.length === 0 ? (
                    <div className="text-center text-text-muted py-8 italic border border-dashed border-border rounded-lg">
                        No hay paradas en este itinerario aún.
                    </div>
                ) : (
                    <div className="space-y-8 relative">
                        {/* Timeline line */}
                        <div className="absolute left-[39px] sm:left-[59px] top-6 bottom-6 w-[2px] bg-gray-200" />

                        {itinerary.stops.map((stop, index) => (
                            <div key={stop.id || index} className="flex gap-4 sm:gap-6 relative">
                                <div className="flex-shrink-0 w-20 sm:w-28 text-right pt-1.5 flex flex-col items-end">
                                    <span className="font-bold text-[#C8873A] text-lg font-display bg-white px-2 relative z-10">{stop.time}</span>
                                </div>

                                {/* Timeline dot */}
                                <div className="absolute left-[35px] sm:left-[55px] top-3.5 w-2.5 h-2.5 rounded-full bg-[#1B3A5C] z-10 ring-4 ring-white shadow-sm" />

                                <div className="flex-1 bg-white border border-border hover:border-gray-300 transition-colors rounded-xl overflow-hidden shadow-sm flex flex-col sm:flex-row relative z-10">
                                    <div className="w-full sm:w-40 h-40 sm:h-auto relative bg-gray-100 flex-shrink-0 border-b sm:border-b-0 sm:border-r border-border">
                                        {stop.property?.images[0]?.url ? (
                                            <img
                                                src={stop.property.images[0].url}
                                                alt={stop.property.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">Sin imagen</div>
                                        )}
                                    </div>
                                    <div className="p-4 sm:p-5 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start gap-2 mb-1">
                                            <h3 className="font-bold text-text-main text-lg leading-tight">{stop.property?.title}</h3>
                                        </div>
                                        <p className="text-xs text-text-muted flex items-center gap-1.5 mb-2.5">
                                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                            {stop.property?.address}, {stop.property?.neighborhood}
                                        </p>
                                        <div className="text-[#1B3A5C] font-bold text-lg mb-2">
                                            {formatCOP(stop.property?.price || 0)}
                                        </div>

                                        {stop.notes && (
                                            <div className="mt-auto pt-3 text-sm bg-yellow-50/50 text-yellow-800 p-3 rounded-md border border-yellow-100/50">
                                                <span className="font-bold text-[10px] uppercase tracking-wider block mb-1 text-yellow-600/80">Nota del asesor:</span>
                                                <span className="italic">{stop.notes}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-surface border-t border-border p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden shadow-sm border-2 border-white bg-gray-100 flex-shrink-0 relative">
                        {itinerary.advisor?.avatar ? (
                            <img src={itinerary.advisor.avatar} alt="Asesor" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-300" />
                        )}
                    </div>
                    <div className="text-left">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Tu Asesor Inmobiliario</div>
                        <div className="font-bold text-text-main text-base">{itinerary.advisor?.name}</div>
                        <div className="text-sm text-text-muted font-medium">{itinerary.advisor?.phone}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
