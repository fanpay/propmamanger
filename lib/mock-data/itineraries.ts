import { Itinerary } from '@/types';
import { mockClients } from './clients';
import { mockProperties } from './properties';
import { mockAdvisor } from './advisor';

export const mockItineraries: Itinerary[] = [
    {
        id: 'itn-1',
        clientId: mockClients[0].id,
        client: mockClients[0],
        date: new Date('2025-03-15T00:00:00Z'),
        generalNotes: 'Cliente busca apartamento moderno cerca a zonas comerciales. Presupuesto ajustado.',
        stops: [
            {
                id: 'stop-1',
                time: '10:00',
                property: mockProperties[0], // Apartamento en Laureles
                notes: 'Mostrar el coworking en el primer piso.',
            },
            {
                id: 'stop-2',
                time: '11:30',
                property: mockProperties[1], // Casa en Envigado
                notes: 'Preguntar por facilidad de parqueadero de visitantes.',
            }
        ],
        advisorId: mockAdvisor.id,
        advisor: mockAdvisor,
        createdAt: new Date('2025-03-10T08:00:00Z'),
    },
    {
        id: 'itn-2',
        clientId: mockClients[1].id,
        client: mockClients[1],
        date: new Date('2025-03-16T00:00:00Z'),
        generalNotes: 'Recorrido por propiedades comerciales para nueva sucursal.',
        stops: [
            {
                id: 'stop-3',
                time: '14:00',
                property: mockProperties[3], // Local Comercial Poblado
            }
        ],
        advisorId: mockAdvisor.id,
        advisor: mockAdvisor,
        createdAt: new Date('2025-03-11T09:00:00Z'),
    }
];
