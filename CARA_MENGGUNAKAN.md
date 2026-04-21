# 🚀 Cara Menggunakan Website E-Commerce Servis Elektronik

## 📋 Ringkasan
Website ini adalah **prototype lengkap** sistem e-commerce untuk bisnis servis elektronik yang sudah siap digunakan sebagai referensi UI/UX untuk development PHP Anda dengan XAMPP.

---

## 🎯 Cara Menggunakan Prototype Ini

### **1️⃣ Eksplorasi Website (Preview Mode)**

Website ini sudah running dengan mock data. Anda bisa langsung explore semua fitur:

#### **Sisi Customer:**
1. **Home Page** - Landing page utama
   - Form tracking servis
   - Informasi fitur dan layanan

2. **Track Service** - Cek nomor servis ini:
   - `SRV-2026-001` - Dalam perbaikan
   - `SRV-2026-002` - Selesai (sudah lunas)
   - `SRV-2026-003` - Menunggu konfirmasi
   - `SRV-2026-004` - Diagnosa
   - `SRV-2026-005` - Uji coba

3. **FAQ** - Pertanyaan umum

4. **Contact** - Informasi kontak

#### **Sisi Admin/Teknisi:**
1. Login ke `/admin/login` dengan:
   - **Email:** `admin@serviceelektronik.com`
   - **Password:** `admin123`

2. Setelah login, Anda bisa:
   - ✅ Lihat dashboard dengan statistik
   - ✅ Tambah servis baru
   - ✅ Edit status servis
   - ✅ Update catatan teknisi
   - ✅ Kelola inventory sparepart
   - ✅ Filter & search data

---

## 🔄 Cara Konversi ke PHP untuk XAMPP

### **Langkah 1: Persiapan Database**

1. Buka **phpMyAdmin** di XAMPP (`http://localhost/phpmyadmin`)

2. Buat database baru:
```sql
CREATE DATABASE service_elektronik;
```

3. Import semua tabel dari file `PANDUAN_KONVERSI_PHP.md`:
   - Tabel `users`
   - Tabel `services`
   - Tabel `damages`
   - Tabel `spare_parts`
   - Tabel `transactions`

### **Langkah 2: Setup Struktur Folder**

Buat struktur folder di `C:/xampp/htdocs/service-elektronik/`:

```
service-elektronik/
├── config/
│   ├── database.php
│   └── config.php
├── admin/
│   ├── login.php
│   ├── dashboard.php
│   ├── service-new.php
│   ├── service-edit.php
│   └── inventory.php
├── assets/
│   ├── css/
│   └── js/
├── index.php
├── track.php
├── faq.php
└── contact.php
```

### **Langkah 3: Convert UI/UX**

Website React ini sudah menampilkan **semua desain dan layout** yang Anda butuhkan.

**Cara convert:**
1. Buka halaman yang ingin Anda convert (misal: Home Page)
2. Inspect element untuk lihat struktur HTML
3. Screenshot layout sebagai referensi
4. Tulis ulang dalam PHP dengan HTML/CSS biasa
5. Ganti Tailwind classes dengan CSS custom

**Contoh:**
```html
<!-- React/Tailwind -->
<div class="bg-blue-600 text-white px-4 py-2 rounded-lg">
  Button
</div>

<!-- PHP/CSS -->
<div class="btn-primary">
  Button
</div>
```

```css
/* style.css */
.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
```

### **Langkah 4: Implementasi Fitur**

#### **A. Tracking Servis (track.php)**

```php
<?php
require_once 'config/database.php';

$serviceNumber = $_GET['number'] ?? '';

if ($serviceNumber) {
  $stmt = $conn->prepare("SELECT * FROM services WHERE service_number = ?");
  $stmt->bind_param("s", $serviceNumber);
  $stmt->execute();
  $result = $stmt->get_result();
  $service = $result->fetch_assoc();
  
  if ($service) {
    // Tampilkan detail servis
    // (gunakan layout dari TrackServicePage.tsx sebagai referensi)
  } else {
    echo "Servis tidak ditemukan";
  }
}
?>
```

#### **B. Admin Dashboard (admin/dashboard.php)**

```php
<?php
session_start();
require_once '../config/database.php';

// Cek login
if (!isset($_SESSION['user_id'])) {
  header('Location: login.php');
  exit;
}

// Ambil statistik
$totalServices = $conn->query("SELECT COUNT(*) FROM services")->fetch_row()[0];
$pendingServices = $conn->query("SELECT COUNT(*) FROM services WHERE status != 'selesai'")->fetch_row()[0];
$completedServices = $conn->query("SELECT COUNT(*) FROM services WHERE status = 'selesai'")->fetch_row()[0];
$revenue = $conn->query("SELECT SUM(total_cost) FROM services WHERE payment_status = 'paid'")->fetch_row()[0];

// Ambil daftar servis
$services = $conn->query("SELECT * FROM services ORDER BY created_at DESC");
?>

<!-- Tampilkan dashboard (gunakan AdminDashboardPage.tsx sebagai referensi) -->
```

#### **C. Update Status Servis (admin/service-edit.php)**

```php
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $serviceId = $_POST['service_id'];
  $newStatus = $_POST['status'];
  $now = date('Y-m-d H:i:s');
  
  // Update status
  $stmt = $conn->prepare("UPDATE services SET status = ?, updated_at = ? WHERE id = ?");
  $stmt->bind_param("ssi", $newStatus, $now, $serviceId);
  $stmt->execute();
  
  // Update timestamps based on status
  if ($newStatus === 'menunggu-konfirmasi') {
    $stmt = $conn->prepare("UPDATE services SET diagnosis_end_time = ? WHERE id = ?");
    $stmt->bind_param("si", $now, $serviceId);
    $stmt->execute();
    
    // Kirim WhatsApp notification
    sendWhatsAppNotification($customerPhone, "Diagnosa servis Anda telah selesai!");
  }
  
  header('Location: dashboard.php');
}
?>
```

### **Langkah 5: WhatsApp Integration**

Gunakan service seperti **Fonnte** atau **WooWA**:

```php
function sendWhatsAppNotification($phone, $message) {
  $url = 'https://api.fonnte.com/send';
  $token = 'YOUR_API_TOKEN';
  
  $data = [
    'target' => $phone,
    'message' => $message,
  ];
  
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: $token"
  ]);
  
  $response = curl_exec($ch);
  curl_close($ch);
  
  return $response;
}
```

### **Langkah 6: Payment Gateway**

Gunakan **Midtrans** untuk pembayaran:

```php
// Install Midtrans SDK via Composer
// composer require midtrans/midtrans-php

require_once 'vendor/autoload.php';

\Midtrans\Config::$serverKey = 'YOUR_SERVER_KEY';
\Midtrans\Config::$isProduction = false;

$params = [
  'transaction_details' => [
    'order_id' => $invoiceNumber,
    'gross_amount' => $totalCost,
  ],
  'customer_details' => [
    'first_name' => $customerName,
    'phone' => $customerPhone,
    'email' => $customerEmail,
  ],
];

$snapToken = \Midtrans\Snap::getSnapToken($params);
```

---

## 📱 Testing Workflow

### **Test sebagai Customer:**
1. Buka `http://localhost/service-elektronik/`
2. Input nomor servis di form tracking
3. Lihat detail servis dengan progress bar
4. Cek timer yang berjalan
5. Lihat detail kerusakan & biaya
6. Klik "Bayar Sekarang" (jika sudah implement payment)

### **Test sebagai Admin:**
1. Login ke `http://localhost/service-elektronik/admin/login.php`
2. Lihat dashboard statistik
3. Tambah servis baru
4. Edit status servis existing
5. Update catatan teknisi
6. Cek inventory sparepart

---

## 🎨 Customization

### **Warna & Branding:**
Edit file `assets/css/style.css`:

```css
:root {
  --primary-color: #2563eb;
  --success-color: #16a34a;
  --warning-color: #ca8a04;
  --danger-color: #dc2626;
}
```

### **Logo & Images:**
Ganti di `assets/img/`:
- `logo.png` - Logo perusahaan
- `hero-bg.jpg` - Background hero section
- dll.

### **Konten:**
Edit text di setiap halaman PHP sesuai kebutuhan bisnis Anda.

---

## 🔐 Security Best Practices

1. **Password:**
```php
// Hash saat register
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Verify saat login
if (password_verify($inputPassword, $hashedPassword)) {
  // Login success
}
```

2. **SQL Injection:**
```php
// SELALU gunakan prepared statements
$stmt = $conn->prepare("SELECT * FROM services WHERE id = ?");
$stmt->bind_param("i", $serviceId);
```

3. **XSS Protection:**
```php
// Escape output
echo htmlspecialchars($userInput, ENT_QUOTES, 'UTF-8');
```

4. **Session:**
```php
// Set session timeout
ini_set('session.gc_maxlifetime', 3600); // 1 jam

// Regenerate session ID saat login
session_regenerate_id(true);
```

---

## 📊 Mock Data untuk Testing

Setelah create tables, insert data demo:

```sql
-- Insert admin user
INSERT INTO users (name, email, password, role) VALUES 
('Teknisi Ahmad', 'admin@serviceelektronik.com', '$2y$10$abcdefghijklmnopqrstuvwxyz123456', 'admin');

-- Insert sample service
INSERT INTO services (service_number, customer_name, customer_phone, device_brand, device_model, device_type, status, total_cost, payment_status, diagnosis_start_time, created_at) VALUES 
('SRV-2026-001', 'Budi Santoso', '081234567890', 'Samsung', 'Galaxy S23', 'smartphone', 'perbaikan', 1800000, 'pending', NOW(), NOW());

-- Insert damages
INSERT INTO damages (service_id, name, estimated_cost, actual_cost) VALUES 
(1, 'LCD Pecah', 1500000, 1450000),
(1, 'Baterai Drop', 350000, 350000);

-- Insert spare parts
INSERT INTO spare_parts (name, category, stock, price, supplier) VALUES 
('LCD Samsung Galaxy S23 Original', 'Display', 5, 1450000, 'Samsung Official'),
('Baterai iPhone 14 Pro', 'Battery', 8, 450000, 'Apple Authorized');
```

---

## 🚀 Production Deployment

### **Checklist sebelum launch:**
- [ ] Ganti semua API keys dengan production keys
- [ ] Enable HTTPS (SSL Certificate)
- [ ] Set `display_errors = Off` di php.ini
- [ ] Backup database otomatis (cron job)
- [ ] Test semua fitur di berbagai device
- [ ] Load testing untuk traffic tinggi
- [ ] Setup error logging
- [ ] Configure security headers

---

## 📚 Dokumentasi Lengkap

1. **PANDUAN_KONVERSI_PHP.md** - Panduan teknis konversi React ke PHP
2. **FITUR_LENGKAP.md** - Daftar lengkap semua fitur
3. **CARA_MENGGUNAKAN.md** - Panduan ini

---

## 💡 Tips & Tricks

### **Debug Mode:**
```php
// Aktifkan untuk development
ini_set('display_errors', 1);
error_reporting(E_ALL);
```

### **Database Connection:**
```php
// config/database.php
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'service_elektronik';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
```

### **Auto-delete Old Records:**
```sql
-- Hapus servis yang sudah selesai > 90 hari
DELETE FROM services 
WHERE status = 'selesai' 
AND actual_completion < DATE_SUB(NOW(), INTERVAL 90 DAY);
```

---

## ❓ Troubleshooting

**Q: Website tidak bisa dibuka?**
- Pastikan XAMPP Apache sudah running
- Check `http://localhost/service-elektronik/`

**Q: Database error?**
- Pastikan MySQL di XAMPP sudah running
- Check credentials di `config/database.php`

**Q: CSS tidak muncul?**
- Check path file CSS di `<link>` tag
- Pastikan file ada di `assets/css/`

**Q: WhatsApp notification tidak terkirim?**
- Check API token sudah benar
- Pastikan internet connection aktif
- Check format nomor telepon (62xxx)

---

## 📞 Support

Jika ada pertanyaan atau butuh bantuan:
1. Baca dokumentasi lengkap di folder root
2. Check mock data di `/src/app/data/mockData.ts`
3. Lihat helper functions di `/src/app/utils/helpers.ts`

---

**🎉 Selamat Development! Semoga sukses dengan website servis elektronik Anda! 🚀**
