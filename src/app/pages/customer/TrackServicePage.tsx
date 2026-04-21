import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Calendar, Clock, Phone, Mail, Smartphone, AlertCircle, CheckCircle, MessageCircle, CreditCard, Bookmark, BookmarkCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { ServiceProgressBar } from '../../components/ServiceProgressBar';
import { ServiceTimer } from '../../components/ServiceTimer';
import { getStoredServices, getCurrentUser, saveServiceToUser, isServiceSaved } from '../../data/mockData';
import { formatCurrency, formatDate, getStatusLabel, isOverdue } from '../../utils/helpers';
import { ServiceRecord } from '../../types';

export function TrackServicePage() {
  const { serviceNumber } = useParams();
  const [service, setService] = useState<ServiceRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUserState] = useState(getCurrentUser());
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const services = getStoredServices();
      const found = services.find(s => s.serviceNumber === serviceNumber);
      setService(found || null);
      
      // Check if service is already saved for current user
      if (currentUser && found) {
        setIsSaved(isServiceSaved(currentUser.email, found.serviceNumber));
      }
      
      setLoading(false);
    }, 500);
  }, [serviceNumber, currentUser]);

  const handleSaveService = () => {
    if (!currentUser || !service) return;
    
    setIsSaving(true);
    setTimeout(() => {
      const newlySaved = saveServiceToUser(currentUser.email, service.serviceNumber);
      setIsSaved(true);
      setIsSaving(false);
      // Optional: show toast notification
      if (newlySaved) {
        alert('Servis berhasil disimpan ke akun Anda!');
      } else {
        alert('Servis sudah terdaftar di akun Anda.');
      }
    }, 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data servis...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-6 h-6" />
              Servis Tidak Ditemukan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Nomor servis <strong>{serviceNumber}</strong> tidak ditemukan dalam sistem kami.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Pastikan Anda memasukkan nomor servis yang benar atau hubungi customer service kami.
            </p>
            <Link to="/">
              <Button className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalDamageCost = service.damages.reduce((sum, d) => sum + (d.actualCost || d.estimatedCost), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Service Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Status Servis #{service.serviceNumber}
              </h1>
              <p className="text-gray-600">
                Dibuat pada {formatDate(service.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {currentUser && (
                <Button
                  onClick={handleSaveService}
                  disabled={isSaving || isSaved}
                  variant={isSaved ? 'default' : 'outline'}
                  className={isSaved ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  {isSaved ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 mr-2" />
                      Tersimpan
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4 mr-2" />
                      Simpan ke Akun
                    </>
                  )}
                </Button>
              )}
              <Badge className={`w-fit text-base px-4 py-2 ${
                service.status === 'selesai' ? 'bg-green-600' : 'bg-blue-600'
              }`}>
                {getStatusLabel(service.status)}
              </Badge>
            </div>
          </div>

          {/* Overdue Alert */}
          {service.estimatedCompletion && isOverdue(service.estimatedCompletion) && service.status !== 'selesai' && (
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                Estimasi waktu selesai telah terlewati. Anda bisa menghubungi teknisi untuk informasi lebih lanjut.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Tracking */}
            <Card>
              <CardHeader>
                <CardTitle>Progress Perbaikan</CardTitle>
                <CardDescription>
                  Lacak setiap tahap perbaikan perangkat Anda secara real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ServiceProgressBar currentStatus={service.status} />
              </CardContent>
            </Card>

            {/* Timers */}
            {service.diagnosisStartTime && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Waktu Pengerjaan
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  <ServiceTimer
                    startTime={service.diagnosisStartTime}
                    endTime={service.diagnosisEndTime}
                    label="Waktu Diagnosa"
                  />
                  {service.repairStartTime && (
                    <ServiceTimer
                      startTime={service.repairStartTime}
                      endTime={service.repairEndTime}
                      label="Waktu Perbaikan"
                    />
                  )}
                </CardContent>
              </Card>
            )}

            {/* Damage Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detail Kerusakan & Biaya</CardTitle>
                <CardDescription>
                  Rincian kerusakan yang ditemukan dan estimasi biaya perbaikan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {service.damages.map((damage) => (
                    <div key={damage.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{damage.name}</h4>
                          <p className="text-sm text-gray-600">
                            Biaya: {formatCurrency(damage.actualCost || damage.estimatedCost)}
                          </p>
                        </div>
                        {damage.actualCost && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>

                      {damage.partOptions && (
                        <div className="bg-gray-50 rounded p-3 space-y-2">
                          <p className="text-sm font-medium text-gray-700">Pilihan Sparepart:</p>
                          <div className="grid sm:grid-cols-2 gap-2">
                            <div className={`border rounded p-2 ${damage.partOptions.recommended === 'cheap' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                              <p className="text-sm font-medium">{damage.partOptions.cheap.name}</p>
                              <p className="text-sm text-gray-600">{formatCurrency(damage.partOptions.cheap.price)}</p>
                              {damage.partOptions.recommended === 'cheap' && (
                                <Badge variant="secondary" className="mt-1 text-xs">Rekomendasi</Badge>
                              )}
                            </div>
                            <div className={`border rounded p-2 ${damage.partOptions.recommended === 'expensive' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                              <p className="text-sm font-medium">{damage.partOptions.expensive.name}</p>
                              <p className="text-sm text-gray-600">{formatCurrency(damage.partOptions.expensive.price)}</p>
                              {damage.partOptions.recommended === 'expensive' && (
                                <Badge variant="secondary" className="mt-1 text-xs">Rekomendasi</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">Total Biaya:</span>
                      <span className="font-bold text-2xl text-blue-600">{formatCurrency(service.totalCost)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technician Notes */}
            {service.technicianNotes && (
              <Card>
                <CardHeader>
                  <CardTitle>Catatan Teknisi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{service.technicianNotes}</p>
                </CardContent>
              </Card>
            )}

            {/* Test Results */}
            {service.testResults && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Hasil Uji Coba
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{service.testResults}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Device Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Info Perangkat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Merek</p>
                  <p className="font-semibold">{service.deviceBrand}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Model</p>
                  <p className="font-semibold">{service.deviceModel}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tipe</p>
                  <p className="font-semibold capitalize">{service.deviceType}</p>
                </div>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Info Pelanggan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Nama</p>
                  <p className="font-semibold">{service.customerName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-600" />
                  <p className="text-sm">{service.customerPhone}</p>
                </div>
                {service.customerEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <p className="text-sm">{service.customerEmail}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Status Pembayaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className={`w-full justify-center py-2 ${
                  service.paymentStatus === 'paid' ? 'bg-green-600' :
                  service.paymentStatus === 'pending' ? 'bg-yellow-600' : 'bg-red-600'
                }`}>
                  {service.paymentStatus === 'paid' ? 'Lunas' :
                   service.paymentStatus === 'pending' ? 'Menunggu Pembayaran' : 'Belum Dibayar'}
                </Badge>
                {service.paymentStatus !== 'paid' && service.status === 'menunggu-konfirmasi' && (
                  <Link to={`/payment/${service.serviceNumber}`} className="block mt-4">
                    <Button className="w-full">
                      Bayar Sekarang
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Warranty Info */}
            {service.warranty && service.status === 'selesai' && (
              <Card>
                <CardHeader>
                  <CardTitle>Garansi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Sparepart:</span>
                    <span className="font-semibold">{service.warranty.parts} hari</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Servis:</span>
                    <span className="font-semibold">{service.warranty.service} hari</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Technician */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Butuh Bantuan?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-blue-800">
                  Hubungi teknisi untuk informasi lebih lanjut
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat via WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
