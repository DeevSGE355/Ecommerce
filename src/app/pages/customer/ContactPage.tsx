import { Link } from 'react-router';
import { ArrowLeft, MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h1>
          <p className="text-lg text-gray-600">Kami siap membantu Anda dengan servis elektronik terbaik</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Alamat</h3>
                    <p className="text-gray-600">
                      Jl. Sudirman No. 123<br />
                      Jakarta Pusat, DKI Jakarta 10220<br />
                      Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Telepon</h3>
                    <p className="text-gray-600">+62 21 1234 5678</p>
                    <p className="text-gray-600">+62 812 3456 7890 (WhatsApp)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">info@serviceelektronik.com</p>
                    <p className="text-gray-600">support@serviceelektronik.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Jam Operasional</h3>
                    <p className="text-gray-600">Senin - Jumat: 09:00 - 18:00</p>
                    <p className="text-gray-600">Sabtu: 09:00 - 15:00</p>
                    <p className="text-gray-600">Minggu & Libur: Tutup</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <MessageCircle className="w-6 h-6" />
                  Chat dengan Kami
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800 mb-4">
                  Dapatkan respons cepat melalui WhatsApp untuk konsultasi dan informasi servis
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat via WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Lokasi Kami</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Google Maps</p>
                    <p className="text-sm text-gray-500">Jl. Sudirman No. 123, Jakarta Pusat</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <h4 className="font-semibold">Petunjuk Arah:</h4>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                    <li>5 menit dari Stasiun MRT Dukuh Atas</li>
                    <li>10 menit dari Bundaran HI</li>
                    <li>Dekat dengan Plaza Indonesia dan Grand Indonesia</li>
                    <li>Parkir tersedia di basement gedung</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Services Quick Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Servis Smartphone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Perbaikan semua jenis kerusakan smartphone dari berbagai merek</p>
              <Link to="/">
                <Button variant="outline" className="w-full">Konsultasi Gratis</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Servis Laptop</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Diagnosa dan perbaikan laptop dengan teknisi berpengalaman</p>
              <Link to="/">
                <Button variant="outline" className="w-full">Konsultasi Gratis</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lacak Servis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Cek status perbaikan perangkat Anda secara real-time</p>
              <Link to="/">
                <Button variant="outline" className="w-full">Lacak Sekarang</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
