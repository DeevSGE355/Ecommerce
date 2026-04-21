import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { 
  LayoutDashboard, Package, Settings, LogOut, Plus, 
  TrendingUp, Clock, CheckCircle, AlertCircle, Search, Filter 
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { getCurrentUser, setCurrentUser, getStoredServices } from '../../data/mockData';
import { formatCurrency, formatDateShort, getStatusLabel } from '../../utils/helpers';
import { ServiceRecord, ServiceStatus } from '../../types';

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUserState] = useState(getCurrentUser());
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [filteredServices, setFilteredServices] = useState<ServiceRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ServiceStatus | 'all'>('all');

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/login');
      return;
    }

    const loadedServices = getStoredServices();
    setServices(loadedServices);
    setFilteredServices(loadedServices);
  }, [currentUser, navigate]);

  useEffect(() => {
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.serviceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.customerPhone.includes(searchTerm)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(s => s.status === statusFilter);
    }

    setFilteredServices(filtered);
  }, [searchTerm, statusFilter, services]);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  // Calculate statistics
  const stats = {
    total: services.length,
    pending: services.filter(s => s.status !== 'selesai').length,
    completed: services.filter(s => s.status === 'selesai').length,
    revenue: services
      .filter(s => s.paymentStatus === 'paid')
      .reduce((sum, s) => sum + s.totalCost, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white p-6 hidden lg:block">
        <div className="mb-8">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-sm text-gray-400">{currentUser?.name}</p>
        </div>

        <nav className="space-y-2">
          <Link to="/admin/dashboard">
            <Button variant="secondary" className="w-full justify-start">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link to="/admin/services/new">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800 hover:text-white">
              <Plus className="w-4 h-4 mr-2" />
              Servis Baru
            </Button>
          </Link>
          <Link to="/admin/inventory">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800 hover:text-white">
              <Package className="w-4 h-4 mr-2" />
              Inventory
            </Button>
          </Link>
          <Link to="/admin/settings">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800 hover:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Pengaturan
            </Button>
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button onClick={handleLogout} variant="destructive" className="w-full justify-start">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <Link to="/admin/services/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Servis Baru
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Servis</CardTitle>
                <LayoutDashboard className="w-4 h-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-gray-500 mt-1">Semua data servis</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Dalam Proses</CardTitle>
                <Clock className="w-4 h-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
                <p className="text-xs text-gray-500 mt-1">Sedang dikerjakan</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Selesai</CardTitle>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <p className="text-xs text-gray-500 mt-1">Perbaikan selesai</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Pendapatan</CardTitle>
                <TrendingUp className="w-4 h-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{formatCurrency(stats.revenue)}</div>
                <p className="text-xs text-gray-500 mt-1">Total terbayar</p>
              </CardContent>
            </Card>
          </div>

          {/* Services Table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle>Data Servis</CardTitle>
                <div className="flex gap-2">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Cari servis..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ServiceStatus | 'all')}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="diagnosa">Diagnosa</SelectItem>
                      <SelectItem value="menunggu-konfirmasi">Menunggu Konfirmasi</SelectItem>
                      <SelectItem value="perbaikan">Perbaikan</SelectItem>
                      <SelectItem value="uji-coba">Uji Coba</SelectItem>
                      <SelectItem value="selesai">Selesai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No. Servis</TableHead>
                      <TableHead>Pelanggan</TableHead>
                      <TableHead>Perangkat</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pembayaran</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredServices.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                          <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          Tidak ada data servis
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredServices.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell className="font-medium">{service.serviceNumber}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{service.customerName}</p>
                              <p className="text-sm text-gray-500">{service.customerPhone}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{service.deviceBrand}</p>
                              <p className="text-sm text-gray-500">{service.deviceModel}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{formatDateShort(service.createdAt)}</TableCell>
                          <TableCell>
                            <Badge className={
                              service.status === 'selesai' ? 'bg-green-600' :
                              service.status === 'perbaikan' ? 'bg-orange-600' :
                              service.status === 'uji-coba' ? 'bg-purple-600' :
                              service.status === 'menunggu-konfirmasi' ? 'bg-yellow-600' :
                              'bg-blue-600'
                            }>
                              {getStatusLabel(service.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              service.paymentStatus === 'paid' ? 'default' :
                              service.paymentStatus === 'pending' ? 'secondary' : 'destructive'
                            }>
                              {service.paymentStatus === 'paid' ? 'Lunas' :
                               service.paymentStatus === 'pending' ? 'Pending' : 'Belum'}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold">{formatCurrency(service.totalCost)}</TableCell>
                          <TableCell>
                            <Link to={`/admin/services/${service.id}`}>
                              <Button size="sm" variant="outline">Edit</Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
