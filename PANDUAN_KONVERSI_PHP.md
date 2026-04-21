# Panduan Konversi Website E-Commerce Servis Elektronik ke PHP

## 📋 Struktur Website

### **Customer Side (Sisi Pelanggan)**
1. **Home Page** (`/`) - Landing page dengan form tracking
2. **Track Service** (`/track/:serviceNumber`) - Detail tracking servis real-time
3. **FAQ** (`/faq`) - Pertanyaan umum
4. **Contact** (`/contact`) - Informasi kontak

### **Admin Side (Sisi Teknisi)**
1. **Login** (`/admin/login`) - Login admin/teknisi
2. **Dashboard** (`/admin/dashboard`) - Dashboard utama dengan statistik
3. **New Service** (`/admin/services/new`) - Tambah servis baru
4. **Edit Service** (`/admin/services/:id`) - Edit & update status servis
5. **Inventory** (`/admin/inventory`) - Manajemen stok sparepart

---

## 🗄️ Database Schema untuk MySQL/PHP

### **Tabel: users**
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('customer', 'admin') DEFAULT 'customer',
  member_since DATE,
  loyalty_points INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Tabel: services**
```sql
CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255),
  device_brand VARCHAR(100) NOT NULL,
  device_model VARCHAR(100) NOT NULL,
  device_type ENUM('smartphone', 'laptop', 'computer') NOT NULL,
  status ENUM('diagnosa', 'menunggu-konfirmasi', 'perbaikan', 'uji-coba', 'selesai') DEFAULT 'diagnosa',
  technician_notes TEXT,
  test_results TEXT,
  total_cost DECIMAL(10, 2) DEFAULT 0,
  payment_status ENUM('unpaid', 'pending', 'paid') DEFAULT 'unpaid',
  payment_method VARCHAR(50),
  diagnosis_start_time DATETIME,
  diagnosis_end_time DATETIME,
  repair_start_time DATETIME,
  repair_end_time DATETIME,
  estimated_completion DATETIME,
  actual_completion DATETIME,
  warranty_parts INT DEFAULT 0,
  warranty_service INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### **Tabel: damages**
```sql
CREATE TABLE damages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  estimated_cost DECIMAL(10, 2) NOT NULL,
  actual_cost DECIMAL(10, 2),
  part_cheap_name VARCHAR(255),
  part_cheap_price DECIMAL(10, 2),
  part_expensive_name VARCHAR(255),
  part_expensive_price DECIMAL(10, 2),
  recommended_part ENUM('cheap', 'expensive'),
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);
```

### **Tabel: spare_parts**
```sql
CREATE TABLE spare_parts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  stock INT DEFAULT 0,
  price DECIMAL(10, 2) NOT NULL,
  supplier VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### **Tabel: transactions**
```sql
CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_id INT NOT NULL,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50),
  payment_status ENUM('unpaid', 'pending', 'paid') DEFAULT 'unpaid',
  paid_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);
```

---

## 📁 Struktur File PHP yang Disarankan

```
/xampp/htdocs/service-elektronik/
├── config/
│   ├── database.php          # Koneksi database
│   └── config.php            # Konfigurasi umum
├── includes/
│   ├── header.php            # Header HTML
│   ├── footer.php            # Footer HTML
│   └── functions.php         # Helper functions
├── admin/
│   ├── login.php             # Login admin
│   ├── dashboard.php         # Dashboard admin
│   ├── service-new.php       # Tambah servis baru
│   ├── service-edit.php      # Edit servis
│   ├── inventory.php         # Manajemen inventory
│   └── logout.php            # Logout
├── api/
│   ├── track-service.php     # API tracking servis
│   ├── update-status.php     # API update status
│   └── notifications.php     # WhatsApp notifications
├── assets/
│   ├── css/
│   │   └── style.css         # Styling (convert dari Tailwind)
│   ├── js/
│   │   └── main.js           # JavaScript
│   └── img/
├── index.php                 # Home page
├── track.php                 # Track service page
├── faq.php                   # FAQ page
└── contact.php               # Contact page
```

---

## 🔄 Konversi React ke PHP

### **1. Routing**
React Router → PHP dengan `$_GET` parameters

**React:**
```javascript
/track/:serviceNumber
```

**PHP:**
```php
// track.php?number=SRV-2026-001
$serviceNumber = $_GET['number'];
```

### **2. State Management**
React useState → PHP Session/Database

**React:**
```javascript
const [services, setServices] = useState([]);
```

**PHP:**
```php
// Ambil dari database
$stmt = $conn->prepare("SELECT * FROM services WHERE service_number = ?");
$stmt->bind_param("s", $serviceNumber);
$stmt->execute();
$result = $stmt->get_result();
$service = $result->fetch_assoc();
```

### **3. Form Handling**
React onSubmit → PHP POST

**React:**
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  // process form
}
```

**PHP:**
```php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $customerName = $_POST['customer_name'];
  // process form
}
```

---

## 🎨 Styling dengan CSS

Anda perlu convert Tailwind classes ke CSS biasa. Contoh:

**Tailwind:**
```html
<div class="bg-blue-600 text-white px-4 py-2 rounded-lg">
```

**CSS:**
```css
.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
```

---

## ⏱️ Timer Real-Time dengan JavaScript

```javascript
// Untuk timer yang berjalan real-time
function updateTimer(startTime) {
  const start = new Date(startTime);
  const now = new Date();
  const diff = now - start;
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  document.getElementById('timer').innerHTML = `${hours}j ${minutes}m`;
}

// Update setiap menit
setInterval(() => updateTimer('2026-03-12 09:00:00'), 60000);
```

---

## 📱 WhatsApp Notifications API

Gunakan WhatsApp Business API atau layanan seperti **Twilio**, **Fonnte**, atau **WooWA**.

**Contoh dengan cURL:**
```php
function sendWhatsAppNotification($phone, $message) {
  $apiUrl = "https://api.whatsapp.com/send";
  $apiKey = "YOUR_API_KEY";
  
  $data = [
    'phone' => $phone,
    'message' => $message,
    'apikey' => $apiKey
  ];
  
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $apiUrl);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  
  $response = curl_exec($ch);
  curl_close($ch);
  
  return $response;
}

// Penggunaan
sendWhatsAppNotification('081234567890', 'Diagnosa servis Anda telah selesai!');
```

---

## 🔐 Keamanan

1. **Password Hashing:**
```php
// Saat registrasi/create user
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Saat login
if (password_verify($inputPassword, $hashedPassword)) {
  // Login berhasil
}
```

2. **SQL Injection Prevention:**
```php
// Gunakan prepared statements
$stmt = $conn->prepare("SELECT * FROM services WHERE id = ?");
$stmt->bind_param("i", $serviceId);
```

3. **XSS Prevention:**
```php
echo htmlspecialchars($userInput, ENT_QUOTES, 'UTF-8');
```

4. **Session Management:**
```php
session_start();
$_SESSION['user_id'] = $userId;
$_SESSION['role'] = 'admin';
```

---

## 💳 Payment Gateway Integration

### **Midtrans (Recommended untuk Indonesia):**

```php
require_once 'Midtrans.php';

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

**HTML:**
```html
<button id="pay-button">Bayar Sekarang</button>
<script src="https://app.midtrans.com/snap/snap.js" data-client-key="YOUR_CLIENT_KEY"></script>
<script>
document.getElementById('pay-button').onclick = function() {
  snap.pay('<?php echo $snapToken; ?>');
};
</script>
```

---

## 📊 Dashboard Statistics

```php
// admin/dashboard.php
$totalServices = $conn->query("SELECT COUNT(*) FROM services")->fetch_row()[0];
$pendingServices = $conn->query("SELECT COUNT(*) FROM services WHERE status != 'selesai'")->fetch_row()[0];
$completedServices = $conn->query("SELECT COUNT(*) FROM services WHERE status = 'selesai'")->fetch_row()[0];
$revenue = $conn->query("SELECT SUM(total_cost) FROM services WHERE payment_status = 'paid'")->fetch_row()[0];
```

---

## 🚀 Deployment ke Production

1. **Setup XAMPP/LAMP:**
   - Install Apache, MySQL, PHP
   - Import database schema
   - Configure `php.ini` untuk production

2. **Virtual Host Setup:**
```apache
<VirtualHost *:80>
    ServerName serviceelektronik.local
    DocumentRoot "C:/xampp/htdocs/service-elektronik"
    <Directory "C:/xampp/htdocs/service-elektronik">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

3. **Security Checklist:**
   - [ ] Ganti semua API keys dengan production keys
   - [ ] Enable HTTPS (SSL Certificate)
   - [ ] Set `display_errors = Off` di php.ini
   - [ ] Backup database secara berkala
   - [ ] Implement rate limiting untuk API

---

## 📝 Demo Data

Website ini sudah dilengkapi dengan mock data di localStorage. Untuk PHP, insert data demo ke database:

```sql
-- Demo service record
INSERT INTO services (service_number, customer_name, customer_phone, device_brand, device_model, device_type, status, total_cost, payment_status, created_at) 
VALUES ('SRV-2026-001', 'Budi Santoso', '081234567890', 'Samsung', 'Galaxy S23', 'smartphone', 'perbaikan', 1800000, 'pending', NOW());

-- Demo admin user
INSERT INTO users (name, email, password, role) 
VALUES ('Teknisi Ahmad', 'admin@serviceelektronik.com', '$2y$10$...hashed_password...', 'admin');
```

---

## 🎯 Fitur Utama yang Harus Diimplementasi

- [x] Tracking servis tanpa login (by nomor servis)
- [x] Timer real-time diagnosa & perbaikan
- [x] Progress bar 5 tahap (Diagnosa → Selesai)
- [x] Pilihan sparepart murah/mahal
- [x] Notifikasi WhatsApp otomatis
- [x] Dashboard admin dengan statistik
- [x] Manajemen inventory
- [x] Payment gateway integration
- [x] Garansi tracking
- [x] Invoice digital

---

## 📞 Bantuan & Support

Jika ada pertanyaan saat development PHP:
1. Cek dokumentasi di `/PANDUAN_KONVERSI_PHP.md` (file ini)
2. Review mock data di `/src/app/data/mockData.ts`
3. Lihat helper functions di `/src/app/utils/helpers.ts`

**Good luck dengan konversi ke PHP! 🚀**
