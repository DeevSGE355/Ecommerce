import { Link } from 'react-router';
import { ArrowLeft, HelpCircle, Clock, CreditCard, Shield, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';

export function FAQPage() {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pertanyaan yang Sering Diajukan</h1>
          <p className="text-lg text-gray-600">Temukan jawaban untuk pertanyaan umum seputar servis elektronik</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Clock className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle className="text-lg">Tracking Real-Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Pantau progress perbaikan perangkat Anda secara langsung dengan timer otomatis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CreditCard className="w-8 h-8 text-green-600 mb-2" />
              <CardTitle className="text-lg">Pembayaran Digital</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">E-wallet, transfer bank, kartu kredit, dan QR code</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="w-8 h-8 text-purple-600 mb-2" />
              <CardTitle className="text-lg">Garansi Resmi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Garansi sparepart hingga 90 hari dan servis 30 hari</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Smartphone className="w-8 h-8 text-orange-600 mb-2" />
              <CardTitle className="text-lg">Notifikasi WhatsApp</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Update otomatis setiap tahap perbaikan selesai</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pertanyaan Umum</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Bagaimana cara melacak status servis saya?</AccordionTrigger>
                <AccordionContent>
                  Anda dapat melacak status servis dengan memasukkan nomor servis yang tertera di nota Anda pada halaman utama website. 
                  Tidak perlu login untuk melihat status, cukup gunakan nomor servis Anda.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Berapa lama estimasi waktu perbaikan?</AccordionTrigger>
                <AccordionContent>
                  Estimasi waktu perbaikan bervariasi tergantung jenis kerusakan. Umumnya:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Servis ringan (software, cleaning): 1-2 hari</li>
                    <li>Pergantian LCD/baterai: 2-3 hari</li>
                    <li>Perbaikan motherboard: 3-5 hari</li>
                  </ul>
                  Anda akan mendapat estimasi spesifik setelah diagnosa selesai.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Apa saja metode pembayaran yang tersedia?</AccordionTrigger>
                <AccordionContent>
                  Kami menerima berbagai metode pembayaran:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>E-wallet (GoPay, OVO, Dana, ShopeePay)</li>
                    <li>Transfer Bank (BCA, Mandiri, BNI, BRI)</li>
                    <li>Kartu Kredit/Debit</li>
                    <li>QRIS</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Bagaimana sistem garansi yang diberikan?</AccordionTrigger>
                <AccordionContent>
                  Kami memberikan garansi untuk memberikan ketenangan:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Garansi sparepart original: 60-90 hari</li>
                    <li>Garansi servis: 30 hari</li>
                    <li>Garansi tidak berlaku untuk kerusakan akibat jatuh/benturan setelah perbaikan</li>
                  </ul>
                  Detail garansi dapat dilihat di dashboard tracking setelah servis selesai.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Apakah saya bisa memilih jenis sparepart?</AccordionTrigger>
                <AccordionContent>
                  Ya, untuk beberapa jenis kerusakan kami menyediakan pilihan sparepart:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Sparepart Original: Kualitas terbaik dengan garansi lebih panjang</li>
                    <li>Sparepart Aftermarket: Harga lebih terjangkau dengan kualitas terjamin</li>
                  </ul>
                  Teknisi kami akan memberikan rekomendasi terbaik untuk perangkat Anda.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Bagaimana jika estimasi waktu terlewati?</AccordionTrigger>
                <AccordionContent>
                  Jika estimasi waktu selesai terlewati, sistem akan memberi notifikasi dan Anda dapat:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Menghubungi teknisi langsung via tombol chat di halaman tracking</li>
                    <li>Menghubungi via WhatsApp untuk update terbaru</li>
                    <li>Teknisi akan menjelaskan kendala dan memberikan estimasi baru</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>Apakah data di perangkat saya aman?</AccordionTrigger>
                <AccordionContent>
                  Keamanan data pelanggan adalah prioritas kami:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Teknisi kami tidak akan mengakses data pribadi tanpa izin</li>
                    <li>Kami sarankan backup data penting sebelum servis</li>
                    <li>Untuk servis software, konfirmasi akan diminta terlebih dahulu</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>Bagaimana proses servis berlangsung?</AccordionTrigger>
                <AccordionContent>
                  Proses servis kami transparan dengan 5 tahap:
                  <ol className="list-decimal pl-6 mt-2 space-y-1">
                    <li><strong>Diagnosa:</strong> Pemeriksaan awal untuk identifikasi kerusakan</li>
                    <li><strong>Menunggu Konfirmasi:</strong> Menunggu persetujuan customer untuk biaya dan parts</li>
                    <li><strong>Perbaikan:</strong> Proses perbaikan perangkat</li>
                    <li><strong>Uji Coba:</strong> Testing menyeluruh setelah perbaikan</li>
                    <li><strong>Selesai:</strong> Perangkat siap diambil</li>
                  </ol>
                  Anda dapat memantau setiap tahap dengan timer real-time.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Masih ada pertanyaan?</p>
          <Link to="/">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Hubungi Kami
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
