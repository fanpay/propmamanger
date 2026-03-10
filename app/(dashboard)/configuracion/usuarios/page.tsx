'use client';

import { useState } from 'react';
import { mockUsers } from '@/lib/mock-data/users';
import { Plus, Search, Pencil, UserCheck, UserX, Shield, Users, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

type UserRole = 'ADMIN' | 'ADVISOR' | 'COLLABORATOR';

const roleConfig: Record<UserRole, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
    ADMIN: { label: 'Administrador', color: 'bg-red-100 text-red-700', icon: Shield },
    ADVISOR: { label: 'Asesor', color: 'bg-blue-100 text-blue-700', icon: Users },
    COLLABORATOR: { label: 'Colaborador', color: 'bg-green-100 text-green-700', icon: Eye },
};

export default function UsersPage() {
    const [users, setUsers] = useState(mockUsers.map(u => ({ ...u, active: true })));
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', phone: '', role: 'ADVISOR' as UserRole });

    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const toggleActive = (id: string) => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, active: !u.active } : u));
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const newUser = {
            ...form,
            id: `user-${Date.now()}`,
            position: 'Nuevo Integrante',
            avatar: `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 8)}.jpg`,
            active: true,
            lastLogin: new Date(),
            createdAt: new Date(),
        };
        setUsers(prev => [...prev, newUser]);
        setShowModal(false);
        setForm({ name: '', email: '', phone: '', role: 'ADVISOR' });
    };

    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6 animate-fade-in">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-display font-bold text-text-main">Gestión de Usuarios</h1>
                    <p className="text-text-muted mt-1">Administra los accesos al panel de gestión</p>
                </div>
                <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Nuevo Usuario
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {Object.entries(roleConfig).map(([role, config]) => {
                    const count = users.filter(u => u.role === role && u.active).length;
                    const Icon = config.icon;
                    return (
                        <div key={role} className="bg-white rounded-xl p-4 border border-border flex items-center gap-4 shadow-sm">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.color}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-display font-bold text-text-main">{count}</p>
                                <p className="text-xs text-text-muted">{config.label}s activos</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input type="text" placeholder="Buscar usuarios..." value={search} onChange={e => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary bg-white shadow-sm" />
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-surface border-b border-border">
                        <tr>
                            <th className="text-left px-5 py-3 font-semibold text-text-muted text-xs uppercase tracking-wide">Usuario</th>
                            <th className="text-left px-5 py-3 font-semibold text-text-muted text-xs uppercase tracking-wide hidden md:table-cell">Perfil</th>
                            <th className="text-left px-5 py-3 font-semibold text-text-muted text-xs uppercase tracking-wide hidden lg:table-cell">Última Conexión</th>
                            <th className="text-left px-5 py-3 font-semibold text-text-muted text-xs uppercase tracking-wide">Estado</th>
                            <th className="text-right px-5 py-3 font-semibold text-text-muted text-xs uppercase tracking-wide">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filtered.map(user => {
                            const role = user.role as UserRole;
                            const rc = roleConfig[role];
                            const Icon = rc.icon;
                            return (
                                <tr key={user.id} className="hover:bg-surface/50 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={user.avatar || ''} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-border" />
                                            <div>
                                                <p className="font-semibold text-text-main">{user.name}</p>
                                                <p className="text-xs text-text-muted">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 hidden md:table-cell">
                                        <Badge variant="secondary" className={`border-0 flex items-center gap-1 w-fit ${rc.color}`}>
                                            <Icon className="w-3 h-3" /> {rc.label}
                                        </Badge>
                                    </td>
                                    <td className="px-5 py-4 hidden lg:table-cell text-text-muted text-xs">
                                        {format(user.lastLogin, "d MMM yyyy, HH:mm", { locale: es })}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${user.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.active ? 'bg-green-500' : 'bg-gray-400'}`} />
                                            {user.active ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-text-muted hover:text-primary hover:bg-surface rounded-lg transition-colors" title="Editar">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => toggleActive(user.id)} className={`p-2 rounded-lg transition-colors ${user.active ? 'text-red-500 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`} title={user.active ? 'Desactivar' : 'Activar'}>
                                                {user.active ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* New User Modal */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="p-8">
                    <h2 className="text-xl font-bold font-display mb-5">Nuevo Usuario</h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Nombre Completo</label>
                            <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full p-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Email</label>
                                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full p-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Teléfono</label>
                                <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full p-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Perfil</label>
                            <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value as UserRole }))} className="w-full p-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-primary">
                                <option value="ADVISOR">Asesor</option>
                                <option value="ADMIN">Administrador</option>
                                <option value="COLLABORATOR">Colaborador</option>
                            </select>
                        </div>
                        <div className="flex gap-3 mt-2 pt-2">
                            <button type="button" onClick={() => setShowModal(false)} className="flex-1 p-2.5 border border-border rounded-lg text-sm font-medium text-text-muted hover:bg-surface transition-colors">Cancelar</button>
                            <button type="submit" className="flex-1 p-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Crear Usuario</button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
