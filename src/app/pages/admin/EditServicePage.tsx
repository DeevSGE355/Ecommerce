import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, Save, Clock, CheckCircle, Trash2, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { getStoredServices, saveServices } from '../../data/mockData';
import { ServiceRecord, ServiceStatus } from '../../types';
import { formatCurrency } from '../../utils/helpers';
import { toast } from 'sonner';

export function EditServicePage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<ServiceRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const services = getStoredServices();
    const found = services.find(s => s.id === serviceId);
    setService(found || null);
    setLoading(false);
  }, [serviceId]);

  const handleUpdateStatus = (newStatus: ServiceStatus) => {
    if (!service) return;

    const now = new Date().toISOString();
    const updatedService = { ...service, status: newStatus };

    // Update timestamps based on status
    if (newStatus === 'menunggu-konfirmasi' && !service.diagnosisEndTime) {
      updatedService.diagnosisEndTime = now;
      toast.success('Diagnosa selesai! Notifikasi WhatsApp terkirim ke customer.');
    } else if (newStatus === 'perbaikan' && !service.repairStartTime) {
      updatedService.repairStartTime = now;
    } else if (newStatus === 'uji-coba' && !service.repairEndTime) {
      updatedService.repairEndTime = now;
    } else if (newStatus === 'selesai' && !service.actualCompletion) {
      updatedService.actualCompletion = now;
      toast.success('Servis selesai! Notifikasi WhatsApp terkirim ke customer.');
    }

    const services = getStoredServices();
    const updatedServices = services.map(s => s.id === service.id ? updatedService : s);
    saveServices(updatedServices);
    setService(updatedService);
    toast.success('Status berhasil diupdate');
  };

  const handleSaveNotes = () => {
    if (!service) return;

    const services = getStoredServices();
    const updatedServices = services.map(s => s.id === service.id ? service : s);
    saveServices(updatedServices);
    toast.success('Catatan berhasil disimpan');
  };

  const handleCompleteDiagnosis = () => {
    handleUpdateStatus('menunggu-konfirmasi');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Servis tidak ditemukan</CardTitle>
          </CardHeader>
          <CardContent>
            <Link to="/admin/dashboard">
              <Button>Kembali ke Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Dashboard</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Edit Servis #{service.serviceNumber}</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Update */}
            <Card>
              <CardHeader>
                <CardTitle>Update Status Servis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Status Saat Ini</Label>
                    <Select 
                      value={service.status} 
                      onValueChange={(value) => handleUpdateStatus(value as ServiceStatus)}
                    >
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diagnosa">Diagnosa</SelectItem>
                        <SelectItem value="menunggu-konfirmasi">Menunggu Konfirmasi</SelectItem>
                        <SelectItem value="perbaikan">Perbaikan</SelectItem>
                        <SelectItem value="uji-coba">Uji Coba</SelectItem>
                        <SelectItem value="selesai">Selesai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {service.status === 'diagnosa' && (
                    <Button onClick={handleCompleteDiagnosis} className="w-full" size="lg">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Selesaikan Diagnosa & Kirim ke Customer
                    </Button>
                  )}

                  {service.status === 'perbaikan' && !service.repairEndTime && (
                    <Button onClick={() => handleUpdateStatus('uji-coba')} className="w-full" size="lg">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Perbaikan Selesai, Lanjut ke Uji Coba
                    </Button>
                  )}

                  {service.status === 'uji-coba' && (
                    <Button onClick={() => handleUpdateStatus('selesai')} className="w-full" size="lg" variant="default">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Tandai Servis Selesai
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Technician Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Catatan Teknisi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="notes">Catatan Diagnosa & Perbaikan</Label>
                  <Textarea
                    id="notes"
                    value={service.technicianNotes || ''}
                    onChange={(e) => setService({ ...service, technicianNotes: e.target.value })}
                    rows={4}
                    placeholder="Tulis catatan diagnosa, kerusakan yang ditemukan, dll..."
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="testResults">Hasil Uji Coba</Label>
                  <Textarea
                    id="testResults"
                    value={service.testResults || ''}
                    onChange={(e) => setService({ ...service, testResults: e.target.value })}
                    rows={4}
                    placeholder="Hasil uji coba setelah perbaikan..."
                    className="mt-2"
                  />
                </div>

                <Button onClick={handleSaveNotes} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Catatan
                </Button>
              </CardContent>
            </Card>

            {/* Damage List */}
            <Card>
              <CardHeader>
                <CardTitle>Daftar Kerusakan & Biaya</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {service.damages.map((damage, index) => (
                  <div key={damage.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <Label>Nama Kerusakan {index + 1}</Label>
                        <Input
                          value={damage.name}
                          onChange={(e) => {
                            const updatedDamages = [...service.damages];
                            updatedDamages[index] = { ...damage, name: e.target.value };
                            setService({ ...service, damages: updatedDamages });
                          }}
                          className="mt-2"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const updatedDamages = service.damages.filter((_, i) => i !== index);
                          setService({ ...service, damages: updatedDamages });
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <Label>Estimasi Biaya</Label>
                        <Input
                          type="number"
                          value={damage.estimatedCost}
                          onChange={(e) => {
                            const updatedDamages = [...service.damages];
                            updatedDamages[index] = { ...damage, estimatedCost: Number(e.target.value) };
                            setService({ ...service, damages: updatedDamages });
                          }}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Biaya Aktual</Label>
                        <Input
                          type="number"
                          value={damage.actualCost || ''}
                          onChange={(e) => {
                            const updatedDamages = [...service.damages];
                            updatedDamages[index] = { ...damage, actualCost: Number(e.target.value) || undefined };
                            setService({ ...service, damages: updatedDamages });
                          }}
                          placeholder="Opsional"
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    const newDamage = {
                      id: `d${Date.now()}`,
                      name: '',
                      estimatedCost: 0,
                    };
                    setService({ ...service, damages: [...service.damages, newDamage] });
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Kerusakan
                </Button>
              </CardContent>
            </Card>

            {/* Warranty Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Garansi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="warrantyParts">Garansi Sparepart (hari)</Label>
                    <Input
                      id="warrantyParts"
                      type="number"
                      value={service.warranty?.parts || 0}
                      onChange={(e) => setService({
                        ...service,
                        warranty: {
                          parts: Number(e.target.value),
                          service: service.warranty?.service || 0,
                        }
                      })}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="warrantyService">Garansi Servis (hari)</Label>
                    <Input
                      id="warrantyService"
                      type="number"
                      value={service.warranty?.service || 0}
                      onChange={(e) => setService({
                        ...service,
                        warranty: {
                          parts: service.warranty?.parts || 0,
                          service: Number(e.target.value),
                        }
                      })}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Service Info */}
            <Card>
              <CardHeader>
                <CardTitle>Info Servis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Nomor Servis</p>
                  <p className="font-semibold">{service.serviceNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Customer</p>
                  <p className="font-semibold">{service.customerName}</p>
                  <p className="text-sm text-gray-500">{service.customerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Perangkat</p>
                  <p className="font-semibold">{service.deviceBrand} {service.deviceModel}</p>
                </div>
              </CardContent>
            </Card>

            {/* Timers */}
            {service.diagnosisStartTime && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Timer Pengerjaan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {service.diagnosisStartTime && (
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm text-gray-600">Diagnosa</p>
                      <p className="text-sm font-semibold">
                        {service.diagnosisEndTime ? 'Selesai' : 'Sedang berjalan...'}
                      </p>
                    </div>
                  )}
                  {service.repairStartTime && (
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm text-gray-600">Perbaikan</p>
                      <p className="text-sm font-semibold">
                        {service.repairEndTime ? 'Selesai' : 'Sedang berjalan...'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Payment Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status Pembayaran</CardTitle>
              </CardHeader>
              <CardContent>
                <Select 
                  value={service.paymentStatus} 
                  onValueChange={(value: any) => {
                    const services = getStoredServices();
                    const updatedServices = services.map(s => 
                      s.id === service.id ? { ...s, paymentStatus: value } : s
                    );
                    saveServices(updatedServices);
                    setService({ ...service, paymentStatus: value });
                    toast.success('Status pembayaran diupdate');
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unpaid">Belum Dibayar</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Lunas</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Biaya:</span>
                    <span className="font-bold text-lg">{formatCurrency(service.totalCost)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
