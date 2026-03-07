'use client';
import { useState, useEffect } from 'react';
import { Client } from '@/types';
import { getClients } from '@/lib/mock-data';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Phone, Mail } from 'lucide-react';

const TYPE_LABELS: Record<string, string> = {
  OWNER: 'Propietario',
  TENANT: 'Arrendatario',
  BUYER: 'Comprador',
  INTERESTED: 'Interesado',
};

const TYPE_VARIANTS: Record<string, 'default' | 'success' | 'warning' | 'info' | 'secondary'> = {
  OWNER: 'default',
  TENANT: 'success',
  BUYER: 'warning',
  INTERESTED: 'secondary',
};

const TABS = [
  { label: 'Todos', value: '' },
  { label: 'Propietarios', value: 'OWNER' },
  { label: 'Arrendatarios', value: 'TENANT' },
  { label: 'Compradores', value: 'BUYER' },
  { label: 'Interesados', value: 'INTERESTED' },
];

export default function ClientsPage() {
  const [all, setAll] = useState<Client[]>([]);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', phone: '', email: '', type: 'TENANT', notes: '' });

  useEffect(() => {
    getClients().then(setAll);
  }, []);

  const filtered = all.filter((c) => {
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      (c.email && c.email.toLowerCase().includes(search.toLowerCase()));
    const matchTab = !tab || c.type === tab;
    return matchSearch && matchTab;
  });

  function handleAddClient(e: React.FormEvent) {
    e.preventDefault();
    const client: Client = {
      id: `client-${Date.now()}`,
      name: newClient.name,
      phone: newClient.phone,
      email: newClient.email || undefined,
      type: newClient.type as Client['type'],
      notes: newClient.notes || undefined,
      createdAt: new Date(),
    };
    setAll((prev) => [client, ...prev]);
    setModalOpen(false);
    setNewClient({ name: '', phone: '', email: '', type: 'TENANT', notes: '' });
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#1A1A1A]">Clientes</h1>
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> Nuevo Cliente
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 flex-wrap border-b border-[#E5E0D8]">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              tab === t.value
                ? 'border-[#1B3A5C] text-[#1B3A5C]'
                : 'border-transparent text-[#6B7280] hover:text-[#1A1A1A]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
        <Input
          placeholder="Buscar cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E5E0D8] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E0D8] bg-[#F7F5F2]">
              <th className="text-left px-4 py-3 font-medium text-[#6B7280]">Nombre</th>
              <th className="text-left px-4 py-3 font-medium text-[#6B7280]">Contacto</th>
              <th className="text-left px-4 py-3 font-medium text-[#6B7280]">Tipo</th>
              <th className="text-left px-4 py-3 font-medium text-[#6B7280]">Notas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E0D8]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-[#6B7280]">No se encontraron clientes</td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[#F7F5F2] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#1B3A5C]/10 flex items-center justify-center text-[#1B3A5C] font-semibold text-sm flex-shrink-0">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-[#1A1A1A]">{c.name}</p>
                        {c.document && <p className="text-xs text-[#6B7280]">CC {c.document}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-[#6B7280]">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{c.phone}</span>
                    </div>
                    {c.email && (
                      <div className="flex items-center gap-1 text-[#6B7280] mt-0.5">
                        <Mail className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[180px]">{c.email}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={TYPE_VARIANTS[c.type]}>{TYPE_LABELS[c.type]}</Badge>
                  </td>
                  <td className="px-4 py-3 text-[#6B7280] text-xs max-w-[200px]">
                    <p className="line-clamp-2">{c.notes || '—'}</p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo Cliente">
        <form onSubmit={handleAddClient} className="space-y-4">
          <div>
            <Label htmlFor="nc-name">Nombre completo *</Label>
            <Input
              id="nc-name"
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="nc-phone">Teléfono *</Label>
            <Input
              id="nc-phone"
              value={newClient.phone}
              onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="nc-email">Correo</Label>
            <Input
              id="nc-email"
              type="email"
              value={newClient.email}
              onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="nc-type">Tipo *</Label>
            <Select
              id="nc-type"
              value={newClient.type}
              onChange={(e) => setNewClient({ ...newClient, type: e.target.value })}
              className="mt-1"
            >
              <option value="OWNER">Propietario</option>
              <option value="TENANT">Arrendatario</option>
              <option value="BUYER">Comprador</option>
              <option value="INTERESTED">Interesado</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="nc-notes">Notas</Label>
            <Input
              id="nc-notes"
              value={newClient.notes}
              onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
              className="mt-1"
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button type="submit" variant="primary" size="sm">Guardar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
