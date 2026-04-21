// Type definitions for the e-commerce service system

export type ServiceStatus = 'diagnosa' | 'menunggu-konfirmasi' | 'perbaikan' | 'uji-coba' | 'selesai';

export type PaymentStatus = 'unpaid' | 'pending' | 'paid';

export type PaymentMethod = 'e-wallet' | 'transfer' | 'credit-card' | 'qr-code';

export interface Damage {
  id: string;
  name: string;
  estimatedCost: number;
  actualCost?: number;
  partOptions?: {
    cheap: { name: string; price: number };
    expensive: { name: string; price: number };
    recommended?: 'cheap' | 'expensive';
  };
}

export interface ServiceRecord {
  id: string;
  serviceNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deviceBrand: string;
  deviceModel: string;
  deviceType: 'smartphone' | 'laptop' | 'computer';
  damages: Damage[];
  status: ServiceStatus;
  createdAt: string;
  diagnosisStartTime?: string;
  diagnosisEndTime?: string;
  repairStartTime?: string;
  repairEndTime?: string;
  estimatedCompletion?: string;
  actualCompletion?: string;
  technicianNotes?: string;
  testResults?: string;
  warranty?: {
    parts: number; // in days
    service: number; // in days
  };
  totalCost: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  rating?: number;
  review?: string;
}

export interface Transaction {
  id: string;
  serviceId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  paidAt?: string;
  invoiceNumber: string;
}

export interface SparePart {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  supplier?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  memberSince?: string;
  loyaltyPoints?: number;
}

export interface DashboardStats {
  totalServices: number;
  completedServices: number;
  pendingServices: number;
  averageRepairTime: number; // in hours
  revenueThisWeek: number;
  mostCommonDamage: string;
}
