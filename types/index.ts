export type Role = 'ADMIN' | 'ADVISOR';
export type ClientType = 'OWNER' | 'TENANT' | 'BUYER' | 'INTERESTED';
export type PropertyType = 'APARTMENT' | 'HOUSE' | 'OFFICE' | 'LOCAL' | 'WAREHOUSE' | 'LOT';
export type OperationType = 'RENT' | 'SALE' | 'RENT_SALE';
export type PropertyStatus = 'AVAILABLE' | 'RENTED' | 'SOLD' | 'NEGOTIATION' | 'PAUSED';
export type ContractStatus = 'DRAFT' | 'ACTIVE' | 'EXPIRED' | 'TERMINATED' | 'RENEWED';
export type AppointmentType = 'VISIT' | 'SIGNING' | 'KEY_DELIVERY' | 'INSPECTION';
export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'DONE' | 'CANCELLED';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: Role;
  avatar?: string;
  active: boolean;
  createdAt: Date;
}

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone: string;
  document?: string;
  type: ClientType;
  notes?: string;
  createdAt: Date;
}

export interface PropertyImage {
  id: string;
  url: string;
  alt?: string;
}

export interface Property {
  id: string;
  code: string;
  title: string;
  description: string;
  type: PropertyType;
  operation: OperationType;
  status: PropertyStatus;
  price: number;
  adminFee?: number;
  area: number;
  rooms?: number;
  bathrooms?: number;
  parking: boolean;
  floor?: number;
  stratum: number;
  address: string;
  neighborhood: string;
  city: string;
  latitude?: number;
  longitude?: number;
  amenities: string[];
  images: PropertyImage[];
  ownerId: string;
  owner: Client;
  advisorId: string;
  advisor: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contract {
  id: string;
  propertyId: string;
  property: Property;
  tenantId: string;
  tenant: Client;
  advisorId: string;
  advisor: User;
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
  deposit?: number;
  paymentDay: number;
  annualIncrease?: number;
  status: ContractStatus;
  notes?: string;
  createdAt: Date;
}

export interface Payment {
  id: string;
  contractId: string;
  amount: number;
  date: Date;
  notes?: string;
}

export interface Appointment {
  id: string;
  propertyId: string;
  property: Property;
  advisorId: string;
  advisor: User;
  clientName: string;
  clientPhone: string;
  date: Date;
  type: AppointmentType;
  status: AppointmentStatus;
  notes?: string;
  createdAt: Date;
}
