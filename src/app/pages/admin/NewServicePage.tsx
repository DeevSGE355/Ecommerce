import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { getStoredServices, saveServices } from '../../data/mockData';
import { generateServiceNumber } from '../../utils/helpers';
import { ServiceRecord, Damage } from '../../types';
import { toast } from 'sonner';

export function NewServicePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    deviceBrand: '',
    deviceModel: '',
    deviceType: 'smartphone' as 'smartphone' | 'laptop' | 'computer',
    technicianNotes: '',
  });

  const [damages, setDamages] = useState<Damage[]>([
    {
      id: 'd1',
      name: '',
      estimatedCost: 0,
    }
  ]);

  const handleAddDamage = () => {
    setDamages([
      ...damages,
      {
        id: `d${Date.now()}`,
        name: '',
        estimatedCost: 0,
      }
    ]);
  };

  const handleRemoveDamage = (id: string) => {
    if (damages.length > 1) {
      setDamages(damages.filter(d => d.id !== id));
    }
  };

  const handleUpdateDamage = (id: string, field: keyof Damage, value: any) => {
    setDamages(damages.map(d => 
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.customerName || !formData.customerPhone || !formData.deviceBrand || !formData.deviceModel) {
      toast.error('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    const validDamages = damages.filter(d => d.name && d.estimatedCost > 0);
    if (validDamages.length === 0) {
      toast.error('Tambahkan minimal 1 kerusakan dengan biaya');
      return;
    }

    const totalCost = validDamages.reduce((sum, d) => sum + d.estimatedCost, 0);
    const now = new Date().toISOString();

    const newService: ServiceRecord = {
      id: `srv${Date.now()}`,
      serviceNumber: generateServiceNumber(),
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail || undefined,
      deviceBrand: formData.deviceBrand,
      deviceModel: formData.deviceModel,
      deviceType: formData.deviceType,
      damages: validDamages,
      status: 'diagnosa',
      createdAt: now,
      diagnosisStartTime: now,
      estimatedCompletion: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      technicianNotes: formData.technicianNotes || undefined,
      totalCost,
      paymentStatus: 'unpaid',
    };

    const services = getStoredServices();
    saveServices([...services, newService]);

    toast.success('Servis baru berhasil dibuat!');
    navigate(`/admin/services/${newService.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Dashboard</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Tambah Servis Baru</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Pelanggan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Nama Pelanggan *</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="Nama lengkap"
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">No. Telepon *</Label>
                  <Input
                    id="customerPhone"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder="08123456789"
                    required
                    className="mt-2"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="customerEmail">Email (Opsional)</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  placeholder="email@example.com"
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Device Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Perangkat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="deviceType">Tipe Perangkat *</Label>
                <Select 
                  value={formData.deviceType} 
                  onValueChange={(value: any) => setFormData({ ...formData, deviceType: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smartphone">Smartphone</SelectItem>
                    <SelectItem value="laptop">Laptop</SelectItem>
                    <SelectItem value="computer">Komputer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deviceBrand">Merek *</Label>
                  <Input
                    id="deviceBrand"
                    value={formData.deviceBrand}
                    onChange={(e) => setFormData({ ...formData, deviceBrand: e.target.value })}
                    placeholder="Samsung, Apple, dll"
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="deviceModel">Model *</Label>
                  <Input
                    id="deviceModel"
                    value={formData.deviceModel}
                    onChange={(e) => setFormData({ ...formData, deviceModel: e.target.value })}
                    placeholder="Galaxy S23, iPhone 14, dll"
                    required
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Damages */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Daftar Kerusakan</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={handleAddDamage}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {damages.map((damage, index) => (
                <div key={damage.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium">Kerusakan {index + 1}</h4>
                    {damages.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveDamage(damage.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <Label>Nama Kerusakan</Label>
                      <Input
                        value={damage.name}
                        onChange={(e) => handleUpdateDamage(damage.id, 'name', e.target.value)}
                        placeholder="LCD Pecah, Baterai Drop, dll"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Estimasi Biaya (Rp)</Label>
                      <Input
                        type="number"
                        value={damage.estimatedCost || ''}
                        onChange={(e) => handleUpdateDamage(damage.id, 'estimatedCost', Number(e.target.value))}
                        placeholder="0"
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Initial Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Catatan Awal</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="technicianNotes">Catatan Teknisi (Opsional)</Label>
              <Textarea
                id="technicianNotes"
                value={formData.technicianNotes}
                onChange={(e) => setFormData({ ...formData, technicianNotes: e.target.value })}
                rows={4}
                placeholder="Catatan awal dari pemeriksaan..."
                className="mt-2"
              />
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-3">
            <Button type="submit" size="lg" className="flex-1">
              <Save className="w-5 h-5 mr-2" />
              Simpan Servis Baru
            </Button>
            <Link to="/admin/dashboard" className="flex-1">
              <Button type="button" variant="outline" size="lg" className="w-full">
                Batal
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
