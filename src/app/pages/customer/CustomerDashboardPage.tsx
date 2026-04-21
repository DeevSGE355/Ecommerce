import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LogOut, ShoppingCart, History, User, Bookmark } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { getCurrentUser, setCurrentUser, getSavedServices, getStoredServices } from '../../data/mockData';
import { getStatusLabel } from '../../utils/helpers';
import { ServiceRecord } from '../../types';

export function CustomerDashboardPage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [savedServices, setSavedServices] = useState<ServiceRecord[]>([]);

  useEffect(() => {
    if (currentUser) {
      const savedServiceNumbers = getSavedServices(currentUser.email);
      const allServices = getStoredServices();
      const saved = allServices.filter(s => savedServiceNumbers.includes(s.serviceNumber));
      setSavedServices(saved);
    }
  }, [currentUser]);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="w-full max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Pelanggan</h1>
            <p className="text-gray-600">Selamat datang, {currentUser.name}!</p>
          </div>
          <Button variant="destructive" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* User Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Akun</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Nama</p>
                <p className="font-semibold">{currentUser.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{currentUser.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Telepon</p>
                <p className="font-semibold">{currentUser.phone}</p>
              </div>
              {currentUser.loyaltyPoints && (
                <div>
                  <p className="text-sm text-gray-600">Loyalty Points</p>
                  <p className="font-semibold text-blue-600">{currentUser.loyaltyPoints} pts</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => navigate('/track/SRV-2026-001')}
              >
                <ShoppingCart className="w-4 h-4" />
                Lacak Servis
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => navigate('/')}
              >
                <History className="w-4 h-4" />
                Berbelanja Parts
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
              >
                <User className="w-4 h-4" />
                Edit Profil
              </Button>
            </CardContent>
          </Card>

          {/* Membership Info */}
          <Card>
            <CardHeader>
              <CardTitle>Status Member</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Member Sejak</p>
                <p className="font-semibold">{currentUser.memberSince}</p>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm text-gray-600 mb-2">Benefit Member</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>✓ Tracking gratis 24/7</li>
                  <li>✓ Diskon spare parts hingga 15%</li>
                  <li>✓ Prioritas layanan</li>
                  <li>✓ Akumulasi loyalty points</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Saved Services Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bookmark className="w-5 h-5" />
              Servis Tersimpan
            </CardTitle>
            <CardDescription>
              Servis yang Anda simpan dari halaman tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            {savedServices.length === 0 ? (
              <div className="text-center py-8">
                <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Belum ada servis yang tersimpan</p>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/track/SRV-2026-001')}
                >
                  Lacak Servis Sekarang
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {savedServices.map((service) => (
                  <div 
                    key={service.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-gray-900">
                          {service.serviceNumber}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {service.deviceBrand} {service.deviceModel}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{service.customerName}</span>
                        <span>•</span>
                        <Badge className={`text-xs ${
                          service.status === 'selesai' 
                            ? 'bg-green-100 text-green-800' 
                            : service.status === 'perbaikan'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {getStatusLabel(service.status)}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/track/${service.serviceNumber}`)}
                    >
                      Lihat Detail
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Information Section */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Penting</CardTitle>
            <CardDescription>Ketahui lebih lanjut tentang layanan kami</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Cara Melacak Servis</h3>
                <p className="text-sm text-gray-600">
                  Gunakan nomor servis Anda (format: SRV-XXXX-XXX) untuk melacak status perbaikan secara real-time. Update progress, estimasi waktu, dan biaya dapat dilihat kapan saja tanpa perlu login.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Garansi Servis</h3>
                <p className="text-sm text-gray-600">
                  Semua servis kami dilengkapi garansi untuk spare parts dan pekerjaan teknisi. Jika ada masalah dalam periode garansi, hubungi kami melalui WhatsApp untuk klaim gratis.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Metode Pembayaran</h3>
                <p className="text-sm text-gray-600">
                  Kami menerima transfer bank, QRIS, e-wallet, dan COD (bayar di tempat). Semua transaksi aman dan terenkripsi. Tersedia cicilan untuk pembelian di atas Rp 1 juta.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Hubungi Support</h3>
                <p className="text-sm text-gray-600">
                  Ada pertanyaan? Chat dengan tim support kami via WhatsApp, email, atau telepon. Tim kami siap membantu Anda 24/7 untuk memberikan layanan terbaik.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
