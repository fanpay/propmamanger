'use client';

import { useState } from 'react';
import { mockItineraries } from '@/lib/mock-data/itineraries';
import { Calendar, Search, Plus, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ItineraryListPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = mockItineraries.filter(it =>
        it.client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-text-main">Itinerarios de Visita</h1>
                    <p className="text-text-muted mt-1">Gestiona los recorridos programados para tus clientes</p>
                </div>
                <Link
                    href="/dashboard/agenda/itinerario/nueva"
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Crear Itinerario
                </Link>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                    type="text"
                    placeholder="Buscar por cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary bg-white shadow-sm"
                />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map(itinerary => (
                    <div key={itinerary.id} className="bg-white rounded-xl border border-border p-5 hover:shadow-card transition-all duration-300 group flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-semibold text-text-main text-lg">{itinerary.client.name}</h3>
                                <div className="text-sm text-text-muted flex items-center gap-1.5 mt-1 capitalize">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {format(itinerary.date, "EEEE, d MMM yyyy", { locale: es })}
                                </div>
                            </div>
                            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                                {itinerary.stops.length} paradas
                            </Badge>
                        </div>

                        <div className="space-y-4 mb-5 flex-1">
                            {itinerary.stops.slice(0, 3).map((stop, idx) => (
                                <div key={stop.id} className="flex gap-3 text-sm relative">
                                    {/* Timeline line */}
                                    {idx !== Math.min(itinerary.stops.length - 1, 2) && (
                                        <div className="absolute left-[3px] top-4 bottom-[-16px] w-[1px] bg-border" />
                                    )}
                                    {/* Dot */}
                                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-1.5 relative z-10" />

                                    <div>
                                        <span className="font-medium text-text-main flex items-baseline gap-2">
                                            <span className="text-xs text-secondary font-bold w-10">{stop.time}</span>
                                            <span className="line-clamp-1">{stop.property.title}</span>
                                        </span>
                                        <span className="text-text-muted text-xs line-clamp-1 ml-12">{stop.property.neighborhood} - {stop.property.city}</span>
                                    </div>
                                </div>
                            ))}
                            {itinerary.stops.length > 3 && (
                                <div className="text-xs text-text-muted pl-5 font-medium italic pt-2">
                                    + {itinerary.stops.length - 3} paradas más
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-border flex justify-between items-center mt-auto">
                            <span className="text-xs text-text-muted">
                                Creado: {format(itinerary.createdAt, 'dd/MM/yyyy')}
                            </span>
                            <button className="text-accent hover:text-primary transition-colors text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 duration-200">
                                Ver detalle <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="col-span-full py-16 text-center text-text-muted bg-surface rounded-xl border border-dashed border-border flex flex-col items-center">
                        <Search className="w-8 h-8 opacity-20 mb-3" />
                        <p>No se encontraron itinerarios para &quot;{searchTerm}&quot;</p>
                    </div>
                )}
            </div>
        </div>
    );
}
