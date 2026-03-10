import { User } from '@/types';

// Expanded role types for mock purposes (extends existing Role type in types/index.ts)
export type UserRole = 'ADMIN' | 'ADVISOR' | 'COLLABORATOR';

export interface MockUser extends Omit<User, 'role'> {
    role: UserRole;
    position: string;
    lastLogin: Date;
}

export const mockUsers: MockUser[] = [
    {
        id: 'user-admin-1',
        name: 'Carlos Rodríguez',
        email: 'admin@propmanager.co',
        phone: '300 111 2222',
        role: 'ADMIN',
        position: 'Gerente General',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        active: true,
        lastLogin: new Date('2025-03-09T08:30:00Z'),
        createdAt: new Date('2022-01-01T00:00:00Z'),
    },
    {
        id: 'user-advisor-1',
        name: 'Ana María Torres',
        email: 'asesor@propmanager.co',
        phone: '311 222 3333',
        role: 'ADVISOR',
        position: 'Asesora Comercial Senior',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        active: true,
        lastLogin: new Date('2025-03-09T09:15:00Z'),
        createdAt: new Date('2022-06-15T00:00:00Z'),
    },
    {
        id: 'user-collab-1',
        name: 'Sebastián Muñoz',
        email: 'colaborador@propmanager.co',
        phone: '322 333 4444',
        role: 'COLLABORATOR',
        position: 'Asistente Administrativo',
        avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
        active: true,
        lastLogin: new Date('2025-03-07T14:00:00Z'),
        createdAt: new Date('2024-01-10T00:00:00Z'),
    },
];
