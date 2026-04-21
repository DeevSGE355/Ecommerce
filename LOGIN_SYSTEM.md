# 🆙 Unified Login System - Panduan Lengkap

Website sekarang memiliki **sistem login unified** dengan role-based redirect otomatis. Ketika user login, sistem akan otomatis mengarahkan ke halaman sesuai dengan role mereka (Admin atau Customer).

---

## 📋 Ringkasan Perubahan

✅ **Halaman Login Unified** (`/login`) - Satu form login untuk Admin dan Customer
✅ **Role-Based Redirect** - Otomatis ke halaman sesuai role:
   - **Admin** → `/admin/dashboard`
   - **Customer** → `/customer/dashboard`
✅ **Customer Dashboard** (`/customer/dashboard`) - Halaman baru untuk customer yang sudah login
✅ **Password-Protected Login** - Setiap user memiliki password untuk autentikasi
✅ **Mock Data dengan Password** - Semua akun demo sudah siap untuk testing

---

## 🔐 Akun Demo untuk Login

### **Admin Account (Teknisi/Pemilik Bisnis)**
```
Email: admin@serviceelektronik.com
Password: admin123
Role: Admin
Redirect: /admin/dashboard
```

**Fitur Admin:**
- Dashboard dengan statistik servis
- Kelola data servis (tambah, edit, update status)
- Manajemen inventory spare parts
- Filter dan search servis
- Logout otomatis

---

### **Customer Accounts (Pelanggan)**

#### Customer 1 - Budi Santoso
```
Email: budi@email.com
Password: customer123
Role: Customer
Redirect: /customer/dashboard
Loyalty Points: 150 pts
Member Since: 2024-01-15
```

#### Customer 2 - Siti Nurhaliza
```
Email: siti@email.com
Password: customer123
Role: Customer
Redirect: /customer/dashboard
Loyalty Points: 75 pts
Member Since: 2024-03-20
```

#### Customer 3 - Rina Wijaya
```
Email: rina@email.com
Password: customer123
Role: Customer
Redirect: /customer/dashboard
Loyalty Points: 200 pts
Member Since: 2025-06-10
```

#### Customer 4 - Doni Hermawan
```
Email: doni@email.com
Password: customer123
Role: Customer
Redirect: /customer/dashboard
Loyalty Points: 45 pts
Member Since: 2025-08-05
```

**Fitur Customer:**
- Lihat informasi akun pribadi
- Akses quick actions (lacak servis, belanja parts, edit profil)
- Informasi benefit member
- Logout otomatis

---

## 🚀 Cara Menggunakan Login System

### **Step 1: Akses Halaman Login**
```
http://localhost:5173/login
atau klik tombol "Login" di halaman utama
```

### **Step 2: Pilih Akun untuk Demo**
Input salah satu akun di atas sesuai role yang ingin Anda demo:
- **Untuk Admin**: gunakan email admin@serviceelektronik.com dengan password admin123
- **Untuk Customer**: gunakan salah satu email customer dengan password customer123

### **Step 3: Automatic Redirect**
Setelah login, sistem akan otomatis mengarahkan ke dashboard yang sesuai:
- Admin → Dashboard Admin dengan statistik dan manajemen servis
- Customer → Dashboard Customer dengan informasi akun dan quick actions

### **Step 4: Logout**
Klik button "Logout" di setiap dashboard untuk keluar dan kembali ke halaman login/home.

---

## 📌 Struktur File & Routing

### **Routes yang Tersedia**

| Route | Component | Role | Deskripsi |
|-------|-----------|------|-----------|
| `/` | HomePage | Public | Halaman utama tanpa login |
| `/login` | LoginPage | Public | **NEW** - Form login unified |
| `/admin/login` | AdminLoginPage | Public | Legacy - Redirect ke `/login` |
| `/admin/dashboard` | AdminDashboardPage | Admin | Dashboard admin (redirect jika tidak admin) |
| `/customer/dashboard` | CustomerDashboardPage | **NEW** | **NEW** - Dashboard customer (redirect jika tidak login) |
| `/track/:serviceNumber` | TrackServicePage | Public | Tracking tanpa login (fitur existing) |
| `/faq` | FAQPage | Public | FAQ page |
| `/contact` | ContactPage | Public | Contact page |

### **File yang Ditambah/Diubah**

```
src/app/
├── pages/
│   ├── LoginPage.tsx                    ✨ NEW - Unified login
│   ├── customer/
│   │   ├── CustomerDashboardPage.tsx    ✨ NEW - Customer dashboard
│   │   └── ...existing files
│   ├── admin/
│   │   ├── AdminDashboardPage.tsx       ✏️ UPDATED - Redirect ke /login
│   │   └── ...existing files
│   ├── routes.tsx                       ✏️ UPDATED - Add new routes
│   └── ...existing files
└── data/
    └── mockData.ts                      ✏️ UPDATED - Add password fields + customers
```

---

## 🎯 Demonstrasi Login Flow

### **Skenario 1: Admin Login**
```
1. Users goes to http://localhost:5173/login
2. Input: admin@serviceelektronik.com / admin123
3. System validates credentials from mockData
4. If match → Redirect to `/admin/dashboard`
5. Admin dashboard loads dengan user context
6. Click "Logout" → Redirect to homepage
```

### **Skenario 2: Customer Login**
```
1. User goes to http://localhost:5173/login
2. Input: budi@email.com / customer123
3. System validates credentials from mockData
4. If match → Redirect to `/customer/dashboard`
5. Customer dashboard loads dengan user profile
6. Click "Logout" → Redirect to homepage
```

### **Skenario 3: Failed Login**
```
1. User goes to http://localhost:5173/login
2. Input: wrong.email@email.com / wrongpassword
3. System tries to find matching user
4. No match found → Error message: "Email atau password salah"
5. User can retry with correct credentials
```

---

## 🔒 Fitur Keamanan

### **Current Implementation**
- ✅ Password field di setiap user
- ✅ Email validation saat login
- ✅ Role-based access control (RBAC)
- ✅ Client-side session management dengan localStorage
- ✅ Automatic redirect jika tidak login

### **Future Improvements (Untuk Production)**
- [ ] Hash password menggunakan bcrypt atau argon2
- [ ] Two-factor authentication (2FA)
- [ ] JWT token dengan expiration
- [ ] HTTPS/SSL encryption
- [ ] Rate limiting untuk prevent brute-force
- [ ] CSRF protection
- [ ] Audit logging untuk security events

---

## 🧪 Test Cases untuk Demonstrasi

### **Test 1: Admin Login Success**
```
Input: admin@serviceelektronik.com / admin123
Expected: Redirect to /admin/dashboard
Result: ✓ Admin dashboard displays dengan statistik
```

### **Test 2: Customer Login Success**
```
Input: budi@email.com / customer123
Expected: Redirect to /customer/dashboard
Result: ✓ Customer dashboard displays dengan profile info
```

### **Test 3: Invalid Email**
```
Input: invalid@email.com / customer123
Expected: Error message "Email atau password salah"
Result: ✓ Error displayed, user stays on login page
```

### **Test 4: Invalid Password**
```
Input: budi@email.com / wrongpassword
Expected: Error message "Email atau password salah"
Result: ✓ Error displayed, user stays on login page
```

### **Test 5: Admin Logout**
```
Action: Click "Logout" button di admin dashboard
Expected: Redirect to home page, session cleared
Result: ✓ User logged out successfully
```

### **Test 6: Customer Logout**
```
Action: Click "Logout" button di customer dashboard
Expected: Redirect to home page, session cleared
Result: ✓ User logged out successfully
```

### **Test 7: Protected Admin Dashboard**
```
Action: Try access /admin/dashboard tanpa login
Expected: Redirect to /login
Result: ✓ User redirected to login
```

### **Test 8: Protected Customer Dashboard**
```
Action: Try access /customer/dashboard tanpa login
Expected: Redirect to /login
Result: ✓ User redirected to login
```

---

## 💡 Tips untuk Demonstrasi

1. **Show Role-Based Redirect**: Login dengan admin vs customer, tunjukkan bagaimana sistem otomatis mengarahkan ke halaman berbeda.

2. **Highlight User Context**: Tampilkan bahwa dashboard menampilkan info user yang sedang login (nama, email, telepon).

3. **Show Quick Actions**: Di customer dashboard, tunjukkan quick actions seperti "Lacak Servis" dan "Berbelanja Parts".

4. **Demonstrate Error Handling**: Input akun yang salah, tunjukkan error message muncul dengan handling yang proper.

5. **Show Logout**: Tunjukkan bahwa logout benar-benar membersihkan session dan redirect ke home.

6. **Compare with Old System**: Jelaskan perbedaan antara sistem login lama (`/admin/login` khusus admin) dengan sistem login baru yang unified.

---

## 📚 Mock Data Users dalam Code

Semua user tersimpan di `src/app/data/mockData.ts`:

```typescript
interface UserWithPassword extends User {
  password: string;
}

export const mockUsers: UserWithPassword[] = [
  // Customer users
  { id: '1', name: 'Budi Santoso', email: 'budi@email.com', role: 'customer', password: 'customer123', ... },
  { id: '2', name: 'Siti Nurhaliza', email: 'siti@email.com', role: 'customer', password: 'customer123', ... },
  { id: '3', name: 'Rina Wijaya', email: 'rina@email.com', role: 'customer', password: 'customer123', ... },
  { id: '4', name: 'Doni Hermawan', email: 'doni@email.com', role: 'customer', password: 'customer123', ... },
  // Admin user
  { id: 'admin1', name: 'Teknisi Ahmad', email: 'admin@serviceelektronik.com', role: 'admin', password: 'admin123' },
];
```

---

## ❓ FAQ tentang Login System

### **Q: Bisakah saya menambah user baru?**
A: Ya, edit file `src/app/data/mockData.ts` dan tambahkan object user baru ke array `mockUsers`. Pastikan email unik dan tambahkan password.

### **Q: Bagaimana jika user lupa password?**
A: Dalam demo ini, password hardcoded. Di production, implementasikan "Forgot Password" feature dengan email verification.

### **Q: Apakah session persisten jika refresh page?**
A: Ya, session tersimpan di localStorage, jadi akan persisten sampai user logout atau clear browser storage.

### **Q: Bisakah customer access admin dashboard?**
A: Tidak, ada role check. Jika customer mencoba akses `/admin/dashboard`, sistem akan redirect ke `/login`.

### **Q: Bagaimana cara customize URL redirect setelah login?**
A: Edit file `src/app/pages/LoginPage.tsx`, di bagian `handleLogin` function, ubah `navigate('/admin/dashboard')` atau `navigate('/customer/dashboard')` sesuai kebutuhan.

---

## 🎓 Pembelajaran untuk Pelajaran E-Commerce

Sistem login unified ini mendemonstrasikan konsep penting dalam e-commerce:

1. **Authentication & Authorization**: Login page menunjukkan cara verify user dan memberikan akses sesuai role.

2. **Role-Based Access Control (RBAC)**: Sistem mengarahkan user ke halaman berbeda berdasarkan role mereka.

3. **Session Management**: Menggunakan localStorage untuk maintain user session.

4. **User Experience (UX)**: Automatic redirect membuat flow lebih smooth dan user-friendly.

5. **Data Security**: Password field ditampilkan (walaupun dalam demo mode, harusnya dienkripsi di production).

6. **Error Handling**: Login form menampilkan error message jika kredensial salah.

---

## 🔄 Backward Compatibility

Route `/admin/login` masih tersedia (legacy), namun sudah diarahkan ke form yang sama. Untuk migration ke sistem baru:

**Old**: `http://localhost:5173/admin/login`
**New**: `http://localhost:5173/login` (recommended)

Kedua URL akan bekerja, tapi recommended gunakan `/login` yang baru untuk konsistensi.

---

Setiap pertanyaan atau perlu bantuan lebih? Silakan modifikasi sesuai kebutuhan bisnis Anda! 🚀
