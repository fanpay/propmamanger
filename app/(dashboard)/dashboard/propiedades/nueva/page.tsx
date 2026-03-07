'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

const STEPS = [
  'Información Básica',
  'Características',
  'Precio',
  'Descripción',
  'Fotos',
];

export default function NewPropertyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: '',
    type: '',
    operation: '',
    status: 'AVAILABLE',
    address: '',
    neighborhood: '',
    city: 'Medellín',
    stratum: '',
    area: '',
    rooms: '',
    bathrooms: '',
    parking: false,
    floor: '',
    price: '',
    adminFee: '',
    description: '',
    amenities: '',
  });

  function update(k: string, v: string | boolean) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function handleNext() {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  function handleSubmit() {
    alert('¡Propiedad registrada con éxito! (Demo)');
    router.push('/dashboard/propiedades');
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-[#1A1A1A]">Nueva Propiedad</h1>

      {/* Stepper */}
      <div className="flex items-center gap-2">
        {STEPS.map((label, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                i < step
                  ? 'bg-[#4CAF7D] text-white'
                  : i === step
                  ? 'bg-[#1B3A5C] text-white'
                  : 'bg-gray-200 text-[#6B7280]'
              }`}
            >
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs hidden sm:block ${i === step ? 'text-[#1B3A5C] font-medium' : 'text-[#6B7280]'}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && <div className="flex-1 h-px bg-[#E5E0D8]" />}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-white rounded-xl border border-[#E5E0D8] p-6 space-y-4">
        {step === 0 && (
          <>
            <h2 className="font-semibold text-[#1A1A1A]">Información Básica</h2>
            <div>
              <Label htmlFor="title">Título del inmueble *</Label>
              <Input id="title" value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Ej: Apartamento moderno en El Poblado" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Tipo *</Label>
                <Select id="type" value={form.type} onChange={(e) => update('type', e.target.value)} className="mt-1">
                  <option value="">Seleccionar</option>
                  <option value="APARTMENT">Apartamento</option>
                  <option value="HOUSE">Casa</option>
                  <option value="OFFICE">Oficina</option>
                  <option value="LOCAL">Local</option>
                  <option value="WAREHOUSE">Bodega</option>
                  <option value="LOT">Lote</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="operation">Operación *</Label>
                <Select id="operation" value={form.operation} onChange={(e) => update('operation', e.target.value)} className="mt-1">
                  <option value="">Seleccionar</option>
                  <option value="RENT">Arriendo</option>
                  <option value="SALE">Venta</option>
                  <option value="RENT_SALE">Arriendo/Venta</option>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="Calle 10 # 43-20" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="neighborhood">Barrio</Label>
                <Input id="neighborhood" value={form.neighborhood} onChange={(e) => update('neighborhood', e.target.value)} placeholder="El Poblado" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="city">Ciudad</Label>
                <Input id="city" value={form.city} onChange={(e) => update('city', e.target.value)} className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="stratum">Estrato</Label>
              <Select id="stratum" value={form.stratum} onChange={(e) => update('stratum', e.target.value)} className="mt-1">
                <option value="">Seleccionar</option>
                {[1, 2, 3, 4, 5, 6].map((s) => <option key={s} value={s}>{s}</option>)}
              </Select>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="font-semibold text-[#1A1A1A]">Características</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="area">Área (m²) *</Label>
                <Input id="area" type="number" value={form.area} onChange={(e) => update('area', e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="floor">Piso</Label>
                <Input id="floor" type="number" value={form.floor} onChange={(e) => update('floor', e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="rooms">Habitaciones</Label>
                <Input id="rooms" type="number" value={form.rooms} onChange={(e) => update('rooms', e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="bathrooms">Baños</Label>
                <Input id="bathrooms" type="number" value={form.bathrooms} onChange={(e) => update('bathrooms', e.target.value)} className="mt-1" />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.parking}
                  onChange={(e) => update('parking', e.target.checked)}
                  className="accent-[#1B3A5C]"
                />
                <span className="text-sm font-medium text-[#1A1A1A]">Incluye parqueadero</span>
              </label>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="font-semibold text-[#1A1A1A]">Precio</h2>
            <div>
              <Label htmlFor="price">Precio *</Label>
              <Input id="price" type="number" value={form.price} onChange={(e) => update('price', e.target.value)} placeholder="2500000" className="mt-1" />
              <p className="text-xs text-[#6B7280] mt-1">
                {form.operation === 'RENT' ? 'Arriendo mensual en COP' : 'Precio de venta en COP'}
              </p>
            </div>
            {form.operation === 'RENT' && (
              <div>
                <Label htmlFor="adminFee">Administración</Label>
                <Input id="adminFee" type="number" value={form.adminFee} onChange={(e) => update('adminFee', e.target.value)} placeholder="200000" className="mt-1" />
              </div>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="font-semibold text-[#1A1A1A]">Descripción y Amenidades</h2>
            <div>
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                rows={5}
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                placeholder="Describe el inmueble..."
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="amenities">Amenidades</Label>
              <Input
                id="amenities"
                value={form.amenities}
                onChange={(e) => update('amenities', e.target.value)}
                placeholder="Piscina, Gimnasio, Salón comunal..."
                className="mt-1"
              />
              <p className="text-xs text-[#6B7280] mt-1">Separar por comas</p>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="font-semibold text-[#1A1A1A]">Fotos</h2>
            <div className="border-2 border-dashed border-[#E5E0D8] rounded-xl p-10 text-center">
              <p className="text-[#6B7280] text-sm">Arrastra y suelta imágenes aquí</p>
              <p className="text-xs text-[#6B7280] mt-1">(Funcionalidad disponible próximamente)</p>
              <button className="mt-4 px-4 py-2 border border-[#1B3A5C] text-[#1B3A5C] rounded-lg text-sm hover:bg-[#1B3A5C] hover:text-white transition-colors">
                Seleccionar archivos
              </button>
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={handleBack} disabled={step === 0}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
        </Button>
        {step < STEPS.length - 1 ? (
          <Button variant="primary" size="sm" onClick={handleNext}>
            Siguiente <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button variant="secondary" size="sm" onClick={handleSubmit}>
            <Check className="w-4 h-4 mr-1" /> Guardar Propiedad
          </Button>
        )}
      </div>
    </div>
  );
}
