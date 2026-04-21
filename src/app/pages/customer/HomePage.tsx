import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, Smartphone, Laptop, Shield, Clock, Award, MessageCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

export function HomePage() {
  const [serviceNumber, setServiceNumber] = useState('');
  const navigate = useNavigate();

  const handleTrackService = (e: React.FormEvent) => {
    e.preventDefault();
    if (serviceNumber.trim()) {
      navigate(`/track/${serviceNumber.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Service Elektronik Pro</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link to="/faq" className="text-gray-700 hover:text-blue-600">FAQ</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600">Kontak</Link>
              <Link to="/admin/login">
                <Button variant="outline" size="sm">Login Admin</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Servis Handphone & Laptop Terpercaya
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Transparansi penuh, tracking real-time, garansi resmi. Pantau status perbaikan perangkat Anda kapan saja.
          </p>

          {/* Track Service Form */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Lacak Status Servis Anda
              </CardTitle>
              <CardDescription>
                Masukkan nomor servis atau nomor nota untuk melihat status perbaikan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrackService} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Contoh: SRV-2026-001"
                  value={serviceNumber}
                  onChange={(e) => setServiceNumber(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="lg">
                  <Search className="w-4 h-4 mr-2" />
                  Lacak
                </Button>
              </form>
              <p className="text-sm text-gray-500 mt-4">
                Sudah pernah servis? <Link to="/login" className="text-blue-600 hover:underline">Login</Link> untuk melihat riwayat lengkap
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12">Mengapa Pilih Kami?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Clock className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Tracking Real-Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Pantau progress perbaikan dengan timer otomatis. Notifikasi WhatsApp di setiap tahap.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="w-12 h-12 text-green-600 mb-4" />
              <CardTitle>Garansi Resmi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Garansi sparepart hingga 90 hari. Garansi servis 30 hari untuk kualitas terjamin.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Award className="w-12 h-12 text-purple-600 mb-4" />
              <CardTitle>Teknisi Berpengalaman</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Ditangani teknisi profesional bersertifikat dengan pengalaman puluhan tahun.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Jenis Perangkat yang Kami Layani</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-2 border-blue-100 hover:border-blue-300 transition-colors">
            <CardHeader>
              <Smartphone className="w-16 h-16 text-blue-600 mb-4" />
              <CardTitle>Smartphone</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• LCD/Touchscreen Pecah</li>
                <li>• Baterai Drop/Tidak Mengisi</li>
                <li>• Kamera Rusak/Blur</li>
                <li>• Charging Port Bermasalah</li>
                <li>• Software/Bootloop</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 hover:border-purple-300 transition-colors">
            <CardHeader>
              <Laptop className="w-16 h-16 text-purple-600 mb-4" />
              <CardTitle>Laptop & Komputer</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Layar Tidak Menyala</li>
                <li>• Keyboard/Touchpad Rusak</li>
                <li>• Overheat/Kipas Berisik</li>
                <li>• Upgrade RAM/SSD</li>
                <li>• Install/Repair OS</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageCircle className="w-16 h-16 mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">Butuh Konsultasi?</h3>
          <p className="text-xl mb-8 text-blue-100">
            Hubungi kami via WhatsApp untuk konsultasi gratis sebelum servis
          </p>
          <Button size="lg" variant="secondary">
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat di WhatsApp
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2026 Service Elektronik Pro. Servis Terpercaya, Transparan, dan Bergaransi.
          </p>
        </div>
      </footer>
    </div>
  );
}
