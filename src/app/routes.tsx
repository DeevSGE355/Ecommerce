import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/customer/HomePage';
import { TrackServicePage } from './pages/customer/TrackServicePage';
import { FAQPage } from './pages/customer/FAQPage';
import { ContactPage } from './pages/customer/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { EditServicePage } from './pages/admin/EditServicePage';
import { NewServicePage } from './pages/admin/NewServicePage';
import { InventoryPage } from './pages/admin/InventoryPage';
import { CustomerDashboardPage } from './pages/customer/CustomerDashboardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/track/:serviceNumber',
    Component: TrackServicePage,
  },
  {
    path: '/faq',
    Component: FAQPage,
  },
  {
    path: '/contact',
    Component: ContactPage,
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/admin/login',
    Component: AdminLoginPage,
  },
  {
    path: '/admin/dashboard',
    Component: AdminDashboardPage,
  },
  {
    path: '/customer/dashboard',
    Component: CustomerDashboardPage,
  },
  {
    path: '/admin/services/new',
    Component: NewServicePage,
  },
  {
    path: '/admin/services/:serviceId',
    Component: EditServicePage,
  },
  {
    path: '/admin/inventory',
    Component: InventoryPage,
  },
  {
    path: '*',
    Component: () => (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-8">Halaman tidak ditemukan</p>
          <a href="/" className="text-blue-600 hover:underline">Kembali ke Beranda</a>
        </div>
      </div>
    ),
  },
]);