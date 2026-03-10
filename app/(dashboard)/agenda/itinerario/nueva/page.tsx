'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockClients } from '@/lib/mock-data/clients';
import { mockProperties } from '@/lib/mock-data/properties';
import { ArrowLeft, Save, Plus, Trash2, Calendar, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function NewItineraryPage() {
    const router = useRouter();
    const [clientId, setClientId] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [stops, setStops] = useState<{ id: string; time: string; propertyId: string; notes: string }[]>([]);

    const handleAddStop = () => {
        setStops([...stops, { id: Math.random().toString(), time: '09:00', propertyId: '', notes: '' }]);
    };

    const handleRemoveStop = (id: string) => {
        setStops(stops.filter(s => s.id !== id));
    };

    const updateStop = (id: string, field: string, value: string) => {
        setStops(stops.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate save
        alert('¡Itinerario guardado y listo para compartir!');
        router.push('/dashboard/agenda/itinerario');
    };

    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6 animate-fade-in pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard/agenda/itinerario" className="p-2 hover:bg-surface rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-text-muted" />
                </Link>
                <div>
                    <h1 className="text-2xl font-display font-bold text-text-main">Nuevo Itinerario</h1>
                    <p className="text-text-muted text-sm mt-1">Arma un recorrido de propiedades para un cliente</p>
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* General Info */}
                <div className="bg-white p-6 rounded-xl border border-border shadow-sm space-y-4">
                    <h2 className="font-semibold text-lg border-b border-border pb-3 mb-4">Información General</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-text-main">Cliente</label>
                            <select
                                required
                                value={clientId}
                                onChange={(e) => setClientId(e.target.value)}
                                className="w-full p-2.5 border border-border rounded-lg text-sm bg-surface focus:outline-none focus:border-primary"
                            >
                                <option value="">Selecciona un cliente...</option>
                                {mockClients.map(c => (
                                    <option key={c.id} value={c.id}>{c.name} ({c.type})</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-text-main">Fecha del Recorrido</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                <input
                                    type="date"
                                    required
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm bg-surface focus:outline-none focus:border-primary"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-text-main">Notas Generales (Opcional)</label>
                        <textarea
                            rows={2}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Ej: El cliente está muy interesado en acabados modernos..."
                            className="w-full p-3 border border-border rounded-lg text-sm bg-surface focus:outline-none focus:border-primary resize-none"
                        />
                    </div>
                </div>

                {/* Stops */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-lg text-text-main">Paradas del Recorrido</h2>
                        <button
                            type="button"
                            onClick={handleAddStop}
                            className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
                        >
                            <Plus className="w-4 h-4" /> Agregar propiedad
                        </button>
                    </div>

                    {stops.length === 0 ? (
                        <div className="p-8 border-2 border-dashed border-border rounded-xl text-center text-text-muted bg-surface/50">
                            <p>No hay propiedades en el itinerario aún.</p>
                            <button
                                type="button"
                                onClick={handleAddStop}
                                className="mt-3 text-primary text-sm font-medium hover:underline"
                            >
                                Agrega la primera parada
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {stops.map((stop, index) => (
                                <div key={stop.id} className="bg-white p-5 rounded-xl border border-border shadow-sm flex gap-4 relative group">
                                    <div className="flex flex-col items-center justify-center bg-surface px-3 py-2 rounded-lg border border-border h-fit">
                                        <span className="text-xs text-text-muted font-bold">Parada</span>
                                        <span className="text-lg font-display font-bold text-primary">{index + 1}</span>
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" /> Hora</label>
                                                <input
                                                    type="time"
                                                    required
                                                    value={stop.time}
                                                    onChange={(e) => updateStop(stop.id, 'time', e.target.value)}
                                                    className="w-full p-2 border border-border rounded-md text-sm focus:outline-none focus:border-primary"
                                                />
                                            </div>
                                            <div className="md:col-span-2 space-y-1.5">
                                                <label className="text-xs font-medium text-text-muted flex items-center gap-1"><MapPin className="w-3 h-3" /> Propiedad</label>
                                                <select
                                                    required
                                                    value={stop.propertyId}
                                                    onChange={(e) => updateStop(stop.id, 'propertyId', e.target.value)}
                                                    className="w-full p-2 border border-border rounded-md text-sm focus:outline-none focus:border-primary"
                                                >
                                                    <option value="">Selecciona una propiedad...</option>
                                                    {mockProperties.map(p => (
                                                        <option key={p.id} value={p.id}>{p.code} - {p.title} ({p.neighborhood})</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Notas específicas para esta parada..."
                                                value={stop.notes}
                                                onChange={(e) => updateStop(stop.id, 'notes', e.target.value)}
                                                className="w-full p-2 border border-border rounded-md text-sm bg-surface focus:outline-none focus:bg-white focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleRemoveStop(stop.id)}
                                        className="absolute top-4 right-4 text-red-500/50 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-all opacity-0 group-hover:opacity-100"
                                        title="Eliminar parada"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Action Bar */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 md:left-64">
                    <div className="max-w-4xl mx-auto flex gap-3 justify-end items-center">
                        <Link href="/dashboard/agenda/itinerario" className="btn-secondary">
                            Cancelar
                        </Link>
                        <button type="submit" className="btn-primary flex items-center gap-2" disabled={stops.length === 0 || !clientId || !date}>
                            <Save className="w-4 h-4" />
                            Guardar Itinerario
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
