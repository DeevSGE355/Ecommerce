import { ServiceRecord, SparePart, User, DashboardStats } from '../types';

// Extended user type for mock data with password
interface UserWithPassword extends User {
  password: string;
}

// Mock users with password for login
export const mockUsers: UserWithPassword[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    email: 'budi@email.com',
    phone: '081234567890',
    role: 'customer',
    memberSince: '2024-01-15',
    loyaltyPoints: 150,
    password: 'customer123',
  },
  {
    id: '2',
    name: 'Siti Nurhaliza',
    email: 'siti@email.com',
    phone: '081234567891',
    role: 'customer',
    memberSince: '2024-03-20',
    loyaltyPoints: 75,
    password: 'customer123',
  },
  {
    id: '3',
    name: 'Rina Wijaya',
    email: 'rina@email.com',
    phone: '081234567892',
    role: 'customer',
    memberSince: '2025-06-10',
    loyaltyPoints: 200,
    password: 'customer123',
  },
  {
    id: '4',
    name: 'Doni Hermawan',
    email: 'doni@email.com',
    phone: '081234567893',
    role: 'customer',
    memberSince: '2025-08-05',
    loyaltyPoints: 45,
    password: 'customer123',
  },
  {
    id: 'admin1',
    name: 'Teknisi Ahmad',
    email: 'admin@serviceelektronik.com',
    phone: '081234567899',
    role: 'admin',
    password: 'admin123',
  },
];

// Mock service records
export const mockServiceRecords: ServiceRecord[] = [
  {
    id: '1',
    serviceNumber: 'SRV-2026-001',
    customerName: 'Budi Santoso',
    customerPhone: '081234567890',
    customerEmail: 'budi@email.com',
    deviceBrand: 'Samsung',
    deviceModel: 'Galaxy S23',
    deviceType: 'smartphone',
    damages: [
      {
        id: 'd1',
        name: 'LCD Pecah',
        estimatedCost: 1500000,
        actualCost: 1450000,
        partOptions: {
          cheap: { name: 'LCD Aftermarket', price: 850000 },
          expensive: { name: 'LCD Original', price: 1450000 },
          recommended: 'expensive',
        },
      },
      {
        id: 'd2',
        name: 'Baterai Drop',
        estimatedCost: 350000,
        actualCost: 350000,
      },
    ],
    status: 'perbaikan',
    createdAt: '2026-03-10T09:00:00Z',
    diagnosisStartTime: '2026-03-10T09:00:00Z',
    diagnosisEndTime: '2026-03-10T10:30:00Z',
    repairStartTime: '2026-03-10T11:00:00Z',
    estimatedCompletion: '2026-03-13T17:00:00Z',
    technicianNotes: 'LCD retak parah, butuh penggantian. Baterai health 65%.',
    warranty: {
      parts: 90,
      service: 30,
    },
    totalCost: 1800000,
    paymentStatus: 'pending',
  },
  {
    id: '2',
    serviceNumber: 'SRV-2026-002',
    customerName: 'Siti Nurhaliza',
    customerPhone: '081234567891',
    customerEmail: 'siti@email.com',
    deviceBrand: 'iPhone',
    deviceModel: '14 Pro',
    deviceType: 'smartphone',
    damages: [
      {
        id: 'd3',
        name: 'Kamera Blur',
        estimatedCost: 750000,
        actualCost: 700000,
      },
    ],
    status: 'selesai',
    createdAt: '2026-03-08T14:00:00Z',
    diagnosisStartTime: '2026-03-08T14:00:00Z',
    diagnosisEndTime: '2026-03-08T15:00:00Z',
    repairStartTime: '2026-03-09T09:00:00Z',
    repairEndTime: '2026-03-09T12:00:00Z',
    actualCompletion: '2026-03-09T12:30:00Z',
    testResults: 'Kamera depan dan belakang berfungsi normal. Autofokus lancar. Tidak ada blur.',
    warranty: {
      parts: 60,
      service: 30,
    },
    totalCost: 700000,
    paymentStatus: 'paid',
    paymentMethod: 'e-wallet',
    rating: 5,
    review: 'Pelayanan cepat dan memuaskan!',
  },
  {
    id: '3',
    serviceNumber: 'SRV-2026-003',
    customerName: 'Ahmad Fauzi',
    customerPhone: '081234567892',
    deviceBrand: 'Asus',
    deviceModel: 'ROG Phone 6',
    deviceType: 'smartphone',
    damages: [
      {
        id: 'd4',
        name: 'Charging Port Rusak',
        estimatedCost: 250000,
        partOptions: {
          cheap: { name: 'Port Aftermarket', price: 150000 },
          expensive: { name: 'Port Original', price: 250000 },
          recommended: 'cheap',
        },
      },
    ],
    status: 'menunggu-konfirmasi',
    createdAt: '2026-03-12T10:00:00Z',
    diagnosisStartTime: '2026-03-12T10:00:00Z',
    diagnosisEndTime: '2026-03-12T11:15:00Z',
    estimatedCompletion: '2026-03-13T15:00:00Z',
    technicianNotes: 'Port charging longgar, perlu diganti. Tersedia opsi aftermarket dan original.',
    totalCost: 250000,
    paymentStatus: 'unpaid',
  },
  {
    id: '4',
    serviceNumber: 'SRV-2026-004',
    customerName: 'Dewi Lestari',
    customerPhone: '081234567893',
    deviceBrand: 'Lenovo',
    deviceModel: 'ThinkPad X1',
    deviceType: 'laptop',
    damages: [
      {
        id: 'd5',
        name: 'Keyboard Tidak Responsif',
        estimatedCost: 450000,
      },
      {
        id: 'd6',
        name: 'Kipas Berisik',
        estimatedCost: 200000,
      },
    ],
    status: 'diagnosa',
    createdAt: '2026-03-12T08:30:00Z',
    diagnosisStartTime: '2026-03-12T08:30:00Z',
    estimatedCompletion: '2026-03-14T17:00:00Z',
    totalCost: 650000,
    paymentStatus: 'unpaid',
  },
  {
    id: '5',
    serviceNumber: 'SRV-2026-005',
    customerName: 'Rudi Hartono',
    customerPhone: '081234567894',
    deviceBrand: 'Xiaomi',
    deviceModel: '13 Pro',
    deviceType: 'smartphone',
    damages: [
      {
        id: 'd7',
        name: 'Bootloop',
        estimatedCost: 300000,
      },
    ],
    status: 'uji-coba',
    createdAt: '2026-03-11T13:00:00Z',
    diagnosisStartTime: '2026-03-11T13:00:00Z',
    diagnosisEndTime: '2026-03-11T14:30:00Z',
    repairStartTime: '2026-03-11T15:00:00Z',
    repairEndTime: '2026-03-12T10:00:00Z',
    estimatedCompletion: '2026-03-12T17:00:00Z',
    technicianNotes: 'Sistem di-flash ulang. Sedang uji coba stabilitas.',
    testResults: 'Sistem berjalan normal setelah 6 jam penggunaan. Tidak ada crash.',
    warranty: {
      parts: 0,
      service: 14,
    },
    totalCost: 300000,
    paymentStatus: 'unpaid',
  },
];

// Mock spare parts inventory
export const mockSpareParts: SparePart[] = [
  { id: '1', name: 'LCD Samsung Galaxy S23 Original', category: 'Display', stock: 5, price: 1450000, supplier: 'Samsung Official' },
  { id: '2', name: 'LCD Samsung Galaxy S23 Aftermarket', category: 'Display', stock: 12, price: 850000, supplier: 'Local Supplier' },
  { id: '3', name: 'Baterai iPhone 14 Pro', category: 'Battery', stock: 8, price: 450000, supplier: 'Apple Authorized' },
  { id: '4', name: 'Charging Port USB-C', category: 'Port', stock: 25, price: 150000, supplier: 'Local Supplier' },
  { id: '5', name: 'Kamera iPhone 14 Pro', category: 'Camera', stock: 3, price: 700000, supplier: 'Apple Authorized' },
  { id: '6', name: 'Keyboard Lenovo ThinkPad', category: 'Input', stock: 7, price: 450000, supplier: 'Lenovo Parts' },
  { id: '7', name: 'Cooling Fan Laptop', category: 'Cooling', stock: 15, price: 200000, supplier: 'Universal Parts' },
];

// Mock dashboard statistics
export const mockDashboardStats: DashboardStats = {
  totalServices: 48,
  completedServices: 35,
  pendingServices: 13,
  averageRepairTime: 18.5, // hours
  revenueThisWeek: 15750000,
  mostCommonDamage: 'LCD Pecah',
};

// Helper functions for localStorage
export const getStoredServices = (): ServiceRecord[] => {
  if (typeof window === 'undefined') return mockServiceRecords;
  const stored = localStorage.getItem('serviceRecords');
  return stored ? JSON.parse(stored) : mockServiceRecords;
};

export const saveServices = (services: ServiceRecord[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('serviceRecords', JSON.stringify(services));
  }
};

export const getStoredSpareParts = (): SparePart[] => {
  if (typeof window === 'undefined') return mockSpareParts;
  const stored = localStorage.getItem('spareParts');
  return stored ? JSON.parse(stored) : mockSpareParts;
};

export const saveSpareParts = (parts: SparePart[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('spareParts', JSON.stringify(parts));
  }
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('currentUser');
  return stored ? JSON.parse(stored) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (typeof window !== 'undefined') {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }
};

// Saved services per user (keyed by userEmail)
export const getSavedServices = (userEmail: string): string[] => {
  if (typeof window === 'undefined') return [];
  const key = `savedServices_${userEmail}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

export const saveServiceToUser = (userEmail: string, serviceNumber: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  const key = `savedServices_${userEmail}`;
  let saved = getSavedServices(userEmail);
  
  // Add if not already saved
  if (!saved.includes(serviceNumber)) {
    saved.push(serviceNumber);
    localStorage.setItem(key, JSON.stringify(saved));
    return true; // newly saved
  }
  return false; // already saved
};

export const isServiceSaved = (userEmail: string, serviceNumber: string): boolean => {
  const saved = getSavedServices(userEmail);
  return saved.includes(serviceNumber);
};

export const removeServiceFromUser = (userEmail: string, serviceNumber: string): void => {
  if (typeof window === 'undefined') return;
  
  const key = `savedServices_${userEmail}`;
  let saved = getSavedServices(userEmail);
  saved = saved.filter(s => s !== serviceNumber);
  localStorage.setItem(key, JSON.stringify(saved));
};
