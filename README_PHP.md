# 🔧 Servis Elektronik - Website PHP

Website manajemen servis elektronik yang dibangun menggunakan **PHP murni** dengan database **MySQL**.

## 📋 Fitur Utama

### Sisi Pelanggan (Customer)
- ✅ **Home Page** - Tampilan utama dengan informasi layanan
- ✅ **Lacak Servis** - Tracking real-time status perbaikan menggunakan nomor servis
- ✅ **FAQ** - Pertanyaan umum dengan jawaban interaktif
- ✅ **Hubungi Kami** - Form kontak dan informasi komunikasi
- ✅ **WhatsApp Integration** - Tombol langsung hubungi via WhatsApp

### Sisi Admin (Admin/Teknisi)
- ✅ **Login Admin** - Autentikasi dengan demo credentials
- ✅ **Dashboard** - Statistik dan ringkasan servis
- ✅ **Tambah Servis Baru** - Form input servis pelanggan baru
- ✅ **Edit Servis** - Update status dan biaya perbaikan
- ✅ **Manajemen Inventory** - Kelola stok spare parts

## 🛠️ Teknologi

- **Backend**: PHP 7.4+
- **Database**: MySQL 5.7+
- **Frontend**: HTML5 + CSS3 (Vanilla CSS)
- **Session Management**: PHP Sessions

## 📦 Persyaratan Sistem

- XAMPP atau Laragon (PHP + MySQL)
- PHP 7.4 atau lebih tinggi
- MySQL 5.7 atau lebih tinggi
- Web Browser modern (Chrome, Firefox, Safari, Edge)

## 🚀 Setup & Instalasi

### 1. **Setup XAMPP/Laragon**

#### Windows:
```bash
# Download XAMPP dari https://www.apachefriends.org/
# Install XAMPP
# Jalankan XAMPP Control Panel
# Start Apache dan MySQL
```

### 2. **Persiapan Database**

#### Buka phpMyAdmin:
- Buka browser: `http://localhost/phpmyadmin`
- Login dengan username: `root` dan password kosong

#### Buat Database:
```sql
CREATE DATABASE ecommerce_service CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ecommerce_service;
```

#### Import Tabel-Tabel:
Salin dan jalankan query SQL dari `PANDUAN_KONVERSI_PHP.md` untuk membuat semua tabel.

### 3. **Setup Website**

#### Letakkan File di Folder XAMPP:
```bash
# Windows
C:\xampp\htdocs\ecommerce\

# Struktur folder yang diharapkan:
C:\xampp\htdocs\ecommerce\
├── public/
│   ├── index.php          (home page)
│   ├── css/
│   │   └── style.css      (stylesheet utama)
│   └── assets/
└── src/
    ├── config/
    │   └── database.php    (konfigurasi database)
    ├── functions/
    │   └── helpers.php     (fungsi bantuan)
    ├── includes/
    │   ├── header.php      (header template)
    │   └── footer.php      (footer template)
    └── pages/
        ├── customer/
        │   ├── track.php   (lacak servis)
        │   ├── faq.php     (faq)
        │   └── contact.php (kontak)
        └── admin/
            ├── login.php               (login)
            ├── dashboard.php           (dashboard)
            ├── new-service.php         (tambah servis)
            ├── edit-service.php        (edit servis)
            ├── inventory.php           (inventory)
            └── logout.php              (logout)
```

### 4. **Konfigurasi Database**

Edit file `src/config/database.php`:

```php
define('DB_HOST', 'localhost');     // Host MySQL
define('DB_USER', 'root');          // Username MySQL
define('DB_PASS', '');              // Password MySQL (kosong untuk XAMPP)
define('DB_NAME', 'ecommerce_service'); // Nama database
```

### 5. **Jalankan Website**

Buka browser dan akses:
```
http://localhost/ecommerce/public/index.php
```

Atau jika sudah di-setup dengan virtual host:
```
http://ecommerce.local/public/index.php
```

## 🔐 Login Demo

**Admin Panel**: `http://localhost/ecommerce/src/pages/admin/login.php`

**Credentials:**
- Email: `admin@serviselektronik.com`
- Password: `admin123`

## 📱 Nomor Servis Demo

Untuk testing tracking pelanggan, gunakan nomor servis:
- `SRV-2026-001` - Status: Perbaikan
- `SRV-2026-002` - Status: Selesai, Dibayar
- `SRV-2026-003` - Status: Menunggu Konfirmasi
- `SRV-2026-004` - Status: Diagnosa
- `SRV-2026-005` - Status: Uji Coba

## 📖 Struktur File

```
Ecommerce/
├── public/
│   ├── index.php                 # Entry point / Home page
│   ├── css/
│   │   └── style.css             # Stylesheet utama (800+ lines)
│   ├── js/
│   │   └── (untuk JavaScript tambahan di masa depan)
│   └── assets/
│       └── img/
│           └── (untuk gambar dan foto)
│
├── src/
│   ├── config/
│   │   └── database.php          # Konfigurasi koneksi database
│   │
│   ├── functions/
│   │   └── helpers.php           # Fungsi-fungsi utility
│   │
│   ├── includes/
│   │   ├── header.php            # Template header (navbar)
│   │   └── footer.php            # Template footer
│   │
│   └── pages/
│       ├── customer/
│       │   ├── track.php         # Tracking servis pelanggan
│       │   ├── faq.php           # FAQ page
│       │   └── contact.php       # Form kontak
│       │
│       └── admin/
│           ├── login.php         # Login admin
│           ├── dashboard.php     # Dashboard admin
│           ├── new-service.php   # Tambah servis baru
│           ├── edit-service.php  # Edit servis
│           ├── inventory.php     # Manajemen inventory
│           └── logout.php        # Logout
│
├── PANDUAN_KONVERSI_PHP.md       # Database schema dan panduan
├── README.md                      # File ini
└── package.json                   # Info project
```

## 🎨 Styling

Website ini menggunakan **CSS Vanilla** dengan design system yang rapi (warna, spacing, typography).

### Color Palette:
```
Primary:    #2563eb (Biru)
Success:    #16a34a (Hijau)
Warning:    #ca8a04 (Kuning/Orange)
Danger:     #dc2626 (Merah)
Info:       #7c3aed (Ungu)
Secondary:  #6b7280 (Abu-abu)
```

## 🔧 Fungsi Bantuan (Helper Functions)

File `src/functions/helpers.php` menyediakan:

```php
formatRupiah($amount)              // Format angka menjadi Rupiah
generateServiceNumber()            // Generate nomor servis
formatDateID($date)                // Format tanggal ke bahasa Indonesia
getStatusBadge($status)            // Badge status servis
getPaymentBadge($status)           // Badge status pembayaran
isValidEmail($email)               // Validasi email
getServiceProgress($status)        // Persentase progress servis
sanitize($data)                    // Sanitize input
isLoggedIn()                       // Check login status
isAdmin()                          // Check admin role
getTimeElapsed($startTime)         // Hitung waktu yang berlalu
```

## 🐛 Mock Data

Saat ini, aplikasi menggunakan **mock data** (data contoh yang disimpan di array). Untuk production, Anda perlu:

1. **Menghubungkan ke Database MySQL** - Ubah mock array menjadi query SQL
2. **Implementasi CRUD Operations** - Create, Read, Update, Delete ke database
3. **File Upload untuk Images** - Setup folder untuk upload gambar

## 📝 Migrasi ke Database Real

Lihat file `PANDUAN_KONVERSI_PHP.md` untuk:
- Schema database lengkap
- SQL queries untuk membuat tabel
- Relasi antar tabel
- Data types yang digunakan

Query yang disediakan:
```sql
CREATE TABLE users { ... }
CREATE TABLE services { ... }
CREATE TABLE damages { ... }
CREATE TABLE spare_parts { ... }
CREATE TABLE transactions { ... }
```

## 🚀 Langkah Berikutnya

1. **Setup Database dengan Schema SQL**
   - Buat semua tabel dari PANDUAN_KONVERSI_PHP.md
   - Insert data awal (user admin, spare parts, dll)

2. **Ubah Mock Data menjadi Database Queries**
   - Ganti array mock dengan MySQLi atau PDO queries
   - Update form submission untuk save ke database

3. **Implementasi Authentication Real**
   - Password hashing dengan `password_hash()`
   - Session management yang lebih aman
   - Remember me functionality

4. **Upload & Image Handling**
   - Setup folder untuk upload foto device/servis
   - Validasi file upload
   - Image optimization

5. **Payment Gateway Integration**
   - Integrasikan Midtrans, Stripe, atau payment provider lainnya
   - Tracking pembayaran

6. **Notifikasi**
   - WhatsApp API Integration
   - Email notifications
   - SMS notifications

7. **Testing & Security**
   - Unit testing
   - SQL injection prevention
   - XSS protection
   - CSRF token protection

## 📞 Support & Troubleshooting

### Database Connection Error
```
Solusi:
1. Pastikan MySQL sudah berjalan di XAMPP
2. Cek DB_HOST, DB_USER, DB_PASS di database.php
3. Pastikan database 'ecommerce_service' sudah dibuat
```

### 404 Not Found
```
Solusi:
1. Pastikan file structure sesuai dengan dokumentasi
2. Cek URL path, harus dimulai dari /ecommerce/
3. Pastikan htaccess tidak blocking akses
```

### Session Lost
```
Solusi:
1. Pastikan session_start() dipanggil di awal file
2. Cek PHP session storage configuration
3. Pastikan cookie tidak di-disable di browser
```

## 📄 Lisensi

Project ini menggunakan komponen dari:
- **Figma Make** - Design framework
- **shadcn/ui** - UI Component inspiration
- **Unsplash** - Free images

## 👨‍💻 Developer Notes

- **Environment**: PHP 7.4+, MySQL 5.7+
- **Date Generated**: 2026-03-12
- **Last Updated**: 2026-03-12
- **Status**: Development / Demo

---

**Selamat menggunakan Servis Elektronik Website!** 🎉

Untuk pertanyaan lebih lanjut atau kontribusi, silakan hubungi tim development.
