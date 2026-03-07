import { User } from '@/types';

export const mockAdvisor: User = {
  id: 'advisor-1',
  email: 'carlos.garcia@propmanager.co',
  name: 'Carlos García',
  phone: '+57 300 123 4567',
  role: 'ADVISOR',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  active: true,
  createdAt: new Date('2022-01-15'),
};

export async function getAdvisor(): Promise<User> {
  return mockAdvisor;
}
