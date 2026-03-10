'use client';

import { useState } from 'react';
import { mockTemplates } from '@/lib/mock-data/templates';
import { Plus, Search, MessageSquare, Mail, Edit3, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function TemplatesListPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = mockTemplates.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'ARRENDATARIO': return 'bg-blue-100 text-blue-700';
            case 'PROPIETARIO': return 'bg-purple-100 text-purple-700';
            case 'CLIENTE': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-text-main">Plantillas de Mensajes</h1>
                    <p className="text-text-muted mt-1">Configura mensajes predefinidos para WhatsApp y Email</p>
                </div>
                <Link
                    href="/dashboard/configuracion/plantillas/nueva"
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Nueva Plantilla
                </Link>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                    type="text"
                    placeholder="Buscar plantillas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary bg-white shadow-sm"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map(template => (
                    <div key={template.id} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-card transition-all duration-300 flex flex-col group">
                        <div className="p-5 border-b border-border/50 flex-1">
                            <div className="flex justify-between items-start mb-3">
                                <Badge variant="secondary" className={`border-0 ${getTypeColor(template.type)}`}>
                                    {template.type}
                                </Badge>
                                <div className="flex gap-1.5 text-text-muted">
                                    {template.channels.includes('WHATSAPP') && <span title="WhatsApp"><MessageSquare className="w-4 h-4 text-green-600" /></span>}
                                    {template.channels.includes('EMAIL') && <span title="Email"><Mail className="w-4 h-4 text-blue-600" /></span>}
                                </div>
                            </div>

                            <h3 className="font-semibold text-text-main text-lg mb-2">{template.name}</h3>
                            <p className="text-sm text-text-muted line-clamp-3 italic bg-surface p-3 rounded-lg border border-border/50">
                                &quot;{template.content}&quot;
                            </p>
                        </div>

                        <div className="bg-surface/50 p-4 flex justify-between items-center text-xs text-text-muted">
                            <span>Modificado: {format(template.updatedAt, "d MMM yyyy", { locale: es })}</span>
                            <Link
                                href={`/dashboard/configuracion/plantillas/${template.id}`}
                                className="flex items-center gap-1.5 text-secondary font-medium hover:text-primary transition-colors group-hover:translate-x-1 duration-200"
                            >
                                <Edit3 className="w-3.5 h-3.5" /> Editar <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="col-span-full py-16 text-center text-text-muted bg-surface rounded-xl border border-dashed border-border flex flex-col items-center">
                        <MessageSquare className="w-8 h-8 opacity-20 mb-3" />
                        <p>No se encontraron plantillas para &quot;{searchTerm}&quot;</p>
                    </div>
                )}
            </div>
        </div>
    );
}
