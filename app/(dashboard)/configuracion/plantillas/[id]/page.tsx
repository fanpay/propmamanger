'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mockTemplates } from '@/lib/mock-data/templates';
import { ArrowLeft, Save, Sparkles, MessageSquare, Mail } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// ReactQuill needs to be dynamically imported with SSR disabled for NextJS
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function TemplateEditorPage() {
    const { id } = useParams();
    const router = useRouter();

    const isNew = id === 'nueva';
    const existingTemplate = !isNew ? mockTemplates.find(t => t.id === id) : null;

    const [name, setName] = useState(existingTemplate?.name || '');
    const [type, setType] = useState<'ARRENDATARIO' | 'PROPIETARIO' | 'CLIENTE' | 'GENERAL'>(existingTemplate?.type || 'GENERAL');
    const [channels, setChannels] = useState<string[]>(existingTemplate?.channels || ['WHATSAPP']);
    const [content, setContent] = useState(existingTemplate?.content || '');

    const [commission, setCommission] = useState('3'); // For the special captación template
    const isCaptacion = type === 'GENERAL' && name.toLowerCase().includes('captación');

    const variables = [
        '{nombre_cliente}', '{nombre_propiedad}', '{precio}',
        '{fecha}', '{nombre_asesor}', '{telefono_asesor}',
        '{comision}', '{firma_asesor}'
    ];

    const insertVariable = (variable: string) => {
        // In a real implementation with ReactQuill, we'd use the Quill API to insert at cursor position.
        // For this mock, appending to the end is sufficient.
        setContent(prev => prev + ' ' + variable);
    };

    const toggleChannel = (channel: string) => {
        if (channels.includes(channel)) {
            if (channels.length > 1) setChannels(channels.filter(c => c !== channel));
        } else {
            setChannels([...channels, channel]);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        alert('¡Plantilla guardada correctamente!');
        router.push('/dashboard/configuracion/plantillas');
    };

    // Mock preview values
    const getPreviewContent = () => {
        const preview = content
            .replace(/{nombre_cliente}/g, 'Juan Pérez')
            .replace(/{nombre_propiedad}/g, 'Apartamento Laureles')
            .replace(/{precio}/g, '$ 1.800.000')
            .replace(/{fecha}/g, '15 de Marzo')
            .replace(/{nombre_asesor}/g, 'Carlos Asesor')
            .replace(/{telefono_asesor}/g, '300 123 4567')
            .replace(/{comision}/g, commission);

        // For the raw WhatsApp preview, we don't render HTML forms, we render plain text
        return preview;
    };

    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6 animate-fade-in pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard/configuracion/plantillas" className="p-2 hover:bg-surface rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-text-muted" />
                </Link>
                <div>
                    <h1 className="text-2xl font-display font-bold text-text-main">
                        {isNew ? 'Nueva Plantilla' : 'Editar Plantilla'}
                    </h1>
                    <p className="text-text-muted text-sm mt-1">Configura el mensaje y las variables dinámicas</p>
                </div>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Editor Area */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-border shadow-sm space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-text-main">Nombre de la Plantilla</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ej: Mensaje de Bienvenida"
                                className="w-full p-2.5 border border-border rounded-lg text-sm bg-surface focus:outline-none focus:border-primary"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-main">Tipo de Destinatario</label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value as 'ARRENDATARIO' | 'PROPIETARIO' | 'CLIENTE' | 'GENERAL')}
                                    className="w-full p-2.5 border border-border rounded-lg text-sm bg-surface focus:outline-none focus:border-primary"
                                >
                                    <option value="GENERAL">General</option>
                                    <option value="ARRENDATARIO">Arrendatario</option>
                                    <option value="PROPIETARIO">Propietario</option>
                                    <option value="CLIENTE">Cliente/Interesado</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-text-main">Canales Habilitados</label>
                                <div className="flex gap-2 h-[42px]">
                                    <button
                                        type="button"
                                        onClick={() => toggleChannel('WHATSAPP')}
                                        className={`flex-1 flex items-center justify-center gap-2 rounded-lg border text-sm transition-colors ${channels.includes('WHATSAPP') ? 'bg-[#25D366]/10 border-[#25D366] text-[#128C7E]' : 'bg-surface border-border text-text-muted'
                                            }`}
                                    >
                                        <MessageSquare className="w-4 h-4" /> WhatsApp
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => toggleChannel('EMAIL')}
                                        className={`flex-1 flex items-center justify-center gap-2 rounded-lg border text-sm transition-colors ${channels.includes('EMAIL') ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-surface border-border text-text-muted'
                                            }`}
                                    >
                                        <Mail className="w-4 h-4" /> Email
                                    </button>
                                </div>
                            </div>
                        </div>

                        {isCaptacion && (
                            <div className="space-y-1.5 p-4 bg-secondary/10 border border-secondary/30 rounded-lg">
                                <label className="text-sm font-medium text-secondary flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" /> Configuración de Captación
                                </label>
                                <p className="text-xs text-text-muted mb-2">Para automatizar este mensaje, define el porcentaje de comisión predeterminado que ofreces.</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium">Porcentaje:</span>
                                    <div className="relative w-24">
                                        <input
                                            type="number"
                                            value={commission}
                                            onChange={(e) => setCommission(e.target.value)}
                                            className="w-full p-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-secondary"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">%</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-border shadow-sm space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-border">
                            <h3 className="font-semibold text-text-main">Contenido del Mensaje</h3>
                        </div>

                        <div className="mb-2">
                            <p className="text-xs text-text-muted mb-2 font-medium">Variables dinámicas (clic para insertar al final):</p>
                            <div className="flex flex-wrap gap-2">
                                {variables.map(v => (
                                    <button
                                        key={v}
                                        type="button"
                                        onClick={() => insertVariable(v)}
                                        className="text-[11px] font-mono bg-primary/5 text-primary border border-primary/20 px-2 py-1 rounded hover:bg-primary hover:text-white transition-colors"
                                    >
                                        {v}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="border border-border rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
                            {channels.includes('EMAIL') ? (
                                <ReactQuill
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                    className="h-64 mb-12"
                                    placeholder="Redacta el contenido de la plantilla aquí..."
                                />
                            ) : (
                                <textarea
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                    className="w-full h-64 p-4 text-sm resize-none focus:outline-none border-none"
                                    placeholder="Redacta el contenido de la plantilla para WhatsApp aquí..."
                                />
                            )}
                        </div>
                        {content.includes('{firma_asesor}') && (
                            <p className="text-xs text-accent italic flex items-center justify-end gap-1 mt-2">
                                <Sparkles className="w-3 h-3" /> La variable firma_asesor incluye automáticamente datos y logo en Emails.
                            </p>
                        )}
                    </div>
                </div>

                {/* Live Preview Area */}
                <div className="lg:col-span-2">
                    <div className="sticky top-24 bg-white rounded-xl border border-border shadow-card overflow-hidden">
                        <div className="bg-[#1B3A5C] text-white p-4">
                            <h3 className="font-semibold flex items-center gap-2">
                                Vista Previa Dinámica
                            </h3>
                            <p className="text-xs text-white/70 mt-1">Así se verá con datos de prueba</p>
                        </div>

                        <div className="p-6 bg-surface min-h-[400px]">
                            {channels.includes('WHATSAPP') ? (
                                /* WhatsApp Mock Preview */
                                <div className="bg-[#E5DDD5] p-4 rounded-xl shadow-inner max-w-sm mx-auto relative overflow-hidden" style={{ backgroundImage: "url('https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png')", backgroundSize: "30%" }}>

                                    <div className="bg-[#DCF8C6] p-3 rounded-lg rounded-tr-none shadow text-[13px] text-[#111] leading-relaxed relative z-10 break-words whitespace-pre-wrap">
                                        {getPreviewContent() || <span className="text-gray-400 italic">Escribe algo en el editor...</span>}

                                        <div className="text-[10px] text-gray-500 text-right mt-1 font-medium">10:45 AM ✓✓</div>
                                    </div>
                                </div>
                            ) : (
                                /* Email Mock Preview */
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-[14px] text-gray-800 leading-relaxed font-body">
                                    <div className="border-b border-gray-100 pb-3 mb-4 text-xs text-gray-400 font-mono">
                                        De: carlos@propmanager.com
                                        <br />Asunto: [PropManager] Nuevo Mensaje
                                    </div>
                                    <div
                                        className="prose prose-sm max-w-none prose-p:my-1"
                                        dangerouslySetInnerHTML={{
                                            __html: getPreviewContent().replace(/\n/g, '<br/>') || '<span class="text-gray-400 italic">Escribe algo en el editor...</span>'
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 md:left-64">
                    <div className="max-w-6xl mx-auto flex gap-3 justify-end items-center">
                        <Link href="/dashboard/configuracion/plantillas" className="btn-secondary">
                            Cancelar
                        </Link>
                        <button type="submit" className="btn-primary flex items-center gap-2" disabled={!name || !content}>
                            <Save className="w-4 h-4" />
                            Guardar Plantilla
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
