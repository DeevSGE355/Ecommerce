import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Lock, User, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { mockUsers, setCurrentUser } from '../data/mockData';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Find user by email and password
      const user = mockUsers.find(
        u => u.email === email && u.password === password
      );

      if (user) {
        setCurrentUser(user);
        // Role-based redirect
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (user.role === 'customer') {
          navigate('/customer/dashboard');
        }
      } else {
        setError('Email atau password salah');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 text-white hover:text-blue-200 mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Masuk ke akun Anda (Admin atau Customer)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Masukkan email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Memproses...' : 'Login'}
              </Button>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg space-y-3">
                <p className="text-sm font-semibold text-blue-900">Demo Login - Admin:</p>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>Email: admin@serviceelektronik.com</p>
                  <p>Password: admin123</p>
                </div>

                <p className="text-sm font-semibold text-blue-900 pt-2">Demo Login - Customer:</p>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>Email: budi@email.com</p>
                  <p>Password: customer123</p>
                </div>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>Email: siti@email.com</p>
                  <p>Password: customer123</p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
