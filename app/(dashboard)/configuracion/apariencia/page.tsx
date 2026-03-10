'use client';

import { useState } from 'react';
import { useAppConfig } from '@/lib/contexts/AppConfigContext';
import { Save, Image, Palette, Type, Phone, Building2 } from 'lucide-react';

const FONT_DISPLAY_OPTIONS = ['Outfit', 'Playfair Display', 'Sora', 'Plus Jakarta Sans', 'Raleway'];
const FONT_BODY_OPTIONS = ['DM Sans', 'Nunito', 'Lato', 'Source Sans Pro'];

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border">
            <div>
                <p className="text-sm font-medium text-text-main">{label}</p>
                <p className="text-xs text-text-muted font-mono">{value}</p>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg border-2 border-white shadow-md cursor-pointer" style={{ backgroundColor: value }} />
                <input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-10 h-10 opacity-0 absolute cursor-pointer" />
            </div>
        </div>
    );
}

export default function AppearancePage() {
    const { config, updateConfig, updateColors } = useAppConfig();
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
            <div>
                <h1 className="text-2xl font-display font-bold text-text-main">Configuración de Apariencia</h1>
                <p className="text-text-muted mt-1">Personaliza la identidad visual de la plataforma (White-Label)</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Config columns */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Identidad */}
                    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                        <h2 className="font-semibold text-text-main flex items-center gap-2 mb-5 pb-3 border-b border-border">
                            <Building2 className="w-5 h-5 text-primary" /> Identidad de la Empresa
                        </h2>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Nombre de la Empresa</label>
                                <input value={config.companyName} onChange={e => updateConfig({ companyName: e.target.value })}
                                    className="w-full p-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Slogan</label>
                                <input value={config.slogan} onChange={e => updateConfig({ slogan: e.target.value })}
                                    className="w-full p-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium flex items-center gap-1.5"><Image className="w-4 h-4" /> Logo (Solo previsualización)</label>
                                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center text-text-muted hover:border-primary/50 transition-colors cursor-pointer bg-surface/50">
                                    <Image className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                    <p className="text-sm">Arrastra o haz clic para subir tu logo</p>
                                    <p className="text-xs opacity-60 mt-1">.PNG, .SVG recomendados — Máx 2MB</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Colores */}
                    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                        <h2 className="font-semibold text-text-main flex items-center gap-2 mb-5 pb-3 border-b border-border">
                            <Palette className="w-5 h-5 text-primary" /> Paleta de Colores
                        </h2>
                        <div className="space-y-3">
                            <ColorPicker label="Color Primario (Azul / Marca)" value={config.colors.primary} onChange={v => updateColors({ primary: v })} />
                            <ColorPicker label="Color Secundario (Acento / CTA)" value={config.colors.secondary} onChange={v => updateColors({ secondary: v })} />
                            <ColorPicker label="Color de Fondo" value={config.colors.surface} onChange={v => updateColors({ surface: v })} />
                            <ColorPicker label="Color de Texto Principal" value={config.colors.textMain} onChange={v => updateColors({ textMain: v })} />
                        </div>
                    </div>

                    {/* Tipografía */}
                    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                        <h2 className="font-semibold text-text-main flex items-center gap-2 mb-5 pb-3 border-b border-border">
                            <Type className="w-5 h-5 text-primary" /> Tipografía
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Fuente de Títulos (Display)</label>
                                <select className="w-full p-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary">
                                    {FONT_DISPLAY_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                                </select>
                                <p className="text-xs text-text-muted italic pt-1" style={{ fontFamily: 'Outfit' }}>Aa — {config.companyName}</p>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Fuente de Cuerpo (Body)</label>
                                <select className="w-full p-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary">
                                    {FONT_BODY_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                                </select>
                                <p className="text-xs text-text-muted italic pt-1" style={{ fontFamily: 'DM Sans' }}>El texto de la página se verá así de claro.</p>
                            </div>
                        </div>
                    </div>

                    {/* Contacto */}
                    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                        <h2 className="font-semibold text-text-main flex items-center gap-2 mb-5 pb-3 border-b border-border">
                            <Phone className="w-5 h-5 text-primary" /> Contacto y Redes
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { label: 'Teléfono Principal', key: 'phone' },
                                { label: 'WhatsApp Business', key: 'whatsapp' },
                                { label: 'Email de Contacto', key: 'email', type: 'email' },
                                { label: 'Dirección Física', key: 'address' },
                                { label: 'Instagram URL', key: 'instagram' },
                                { label: 'Facebook URL', key: 'facebook' },
                            ].map(({ label, key, type }) => (
                                <div key={key} className="space-y-1.5">
                                    <label className="text-sm font-medium">{label}</label>
                                    <input
                                        type={type || 'text'}
                                        value={(config.contact as Record<string, string>)[key]}
                                        onChange={e => updateConfig({ contact: { ...config.contact, [key]: e.target.value } })}
                                        className="w-full p-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Comisiones */}
                    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                        <h2 className="font-semibold text-text-main mb-5 pb-3 border-b border-border">% Comisiones por Defecto</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Comisión Venta (%)</label>
                                <div className="relative">
                                    <input type="number" value={config.commissions.sale} onChange={e => updateConfig({ commissions: { ...config.commissions, sale: Number(e.target.value) } })}
                                        className="w-full p-2.5 pr-8 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted font-bold">%</span>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Comisión Arriendo (%)</label>
                                <div className="relative">
                                    <input type="number" value={config.commissions.rent} onChange={e => updateConfig({ commissions: { ...config.commissions, rent: Number(e.target.value) } })}
                                        className="w-full p-2.5 pr-8 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted font-bold">%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Preview */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-4">
                        <h3 className="font-semibold text-text-main text-sm uppercase tracking-wide">Vista Previa en Tiempo Real</h3>

                        {/* Mini Navbar Preview */}
                        <div className="rounded-xl overflow-hidden border border-border shadow-card">
                            <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: config.colors.primary }}>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                                        <Building2 className="w-3.5 h-3.5 text-white" />
                                    </div>
                                    <span className="font-bold text-white text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>{config.companyName}</span>
                                </div>
                                <div className="flex gap-3">
                                    {['Inicio', 'Propiedades', 'Contacto'].map(t => (
                                        <span key={t} className="text-[10px] text-white/80">{t}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Mini Property Card Preview */}
                            <div className="p-4 bg-white">
                                <div className="h-20 rounded-lg mb-3" style={{ backgroundColor: `${config.colors.primary}20` }} />
                                <p className="font-bold text-sm mb-1" style={{ fontFamily: 'Outfit, sans-serif', color: config.colors.textMain }}>
                                    Apartamento en El Poblado
                                </p>
                                <p className="text-xs text-gray-500 mb-3">Laureles · 85 m²</p>
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-sm" style={{ color: config.colors.primary }}>$ 1.800.000</p>
                                    <button className="text-xs text-white px-3 py-1.5 rounded-lg font-medium" style={{ backgroundColor: config.colors.secondary }}>
                                        Ver más
                                    </button>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-text-muted text-center italic">Los cambios se guardan en el contexto mientras navegas.</p>
                    </div>
                </div>
            </div>

            {/* Fixed save bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 z-20 md:left-64">
                <div className="max-w-6xl mx-auto flex justify-end items-center gap-4">
                    {saved && <span className="text-green-600 text-sm font-medium animate-fade-in">✓ Cambios guardados</span>}
                    <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                        <Save className="w-4 h-4" /> Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
}
