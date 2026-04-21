import { ServiceStatus } from '../types';

// Format currency to Indonesian Rupiah
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Format date to Indonesian format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// Format date to short format
export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

// Calculate time difference in hours
export const calculateHoursDifference = (start: string, end?: string): number => {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  const diff = endDate.getTime() - startDate.getTime();
  return diff / (1000 * 60 * 60);
};

// Get status color
export const getStatusColor = (status: ServiceStatus): string => {
  const colors = {
    'diagnosa': 'bg-blue-500',
    'menunggu-konfirmasi': 'bg-yellow-500',
    'perbaikan': 'bg-orange-500',
    'uji-coba': 'bg-purple-500',
    'selesai': 'bg-green-500',
  };
  return colors[status] || 'bg-gray-500';
};

// Get status label
export const getStatusLabel = (status: ServiceStatus): string => {
  const labels = {
    'diagnosa': 'Diagnosa',
    'menunggu-konfirmasi': 'Menunggu Konfirmasi',
    'perbaikan': 'Dalam Perbaikan',
    'uji-coba': 'Uji Coba',
    'selesai': 'Selesai',
  };
  return labels[status] || status;
};

// Calculate progress percentage
export const getProgressPercentage = (status: ServiceStatus): number => {
  const progress = {
    'diagnosa': 20,
    'menunggu-konfirmasi': 40,
    'perbaikan': 60,
    'uji-coba': 80,
    'selesai': 100,
  };
  return progress[status] || 0;
};

// Generate service number
export const generateServiceNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `SRV-${year}-${random}`;
};

// Generate invoice number
export const generateInvoiceNumber = (serviceNumber: string): string => {
  return `INV-${serviceNumber.replace('SRV-', '')}`;
};

// Format timer display
export const formatTimer = (hours: number): string => {
  const h = Math.floor(hours);
  const m = Math.floor((hours - h) * 60);
  return `${h}j ${m}m`;
};

// Check if service is overdue
export const isOverdue = (estimatedCompletion?: string): boolean => {
  if (!estimatedCompletion) return false;
  return new Date(estimatedCompletion) < new Date();
};
