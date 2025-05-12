# OrderEase - Sistem Pre-Order

Aplikasi pre-order modern berbasis web dengan integrasi WhatsApp untuk restoran, kafe, dan bisnis kuliner lainnya. Memungkinkan pelanggan melihat menu, menambahkan item ke keranjang, dan mengirimkan pesanan melalui WhatsApp.

## Fitur Utama

- ✅ Tampilan responsif untuk desktop & mobile
- ✅ Daftar produk dengan gambar, deskripsi, dan harga
- ✅ Keranjang belanja interaktif dengan perhitungan total
- ✅ Form checkout dengan validasi data
- ✅ Integrasi WhatsApp untuk pengiriman pesanan
- ✅ Theme warna yang dapat disesuaikan
- ✅ Tampilan admin untuk pengelolaan produk (coming soon)

## Teknologi yang Digunakan

- **Next.js 15** - Framework React dengan Server Side Rendering
- **TypeScript** - Untuk type-safety dan developer experience yang lebih baik
- **Tailwind CSS** - Untuk styling dengan pendekatan utility-first
- **Supabase** - Database & Authentication (opsional, belum diimplementasi)
- **React Hook Form & Zod** - Untuk validasi form
- **Radix UI** - Komponen accessible UI
- **Lucide Icons** - Untuk ikon-ikon aplikasi

## Cara Instalasi

### Persyaratan
- Node.js versi 18.0 atau lebih tinggi
- npm atau yarn atau pnpm

### Langkah Instalasi

1. Clone repository ini

```bash
git clone [URL_REPOSITORY]
cd sistem-po
```

2. Install dependencies

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

3. Jalankan server development

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

4. Buka [http://localhost:9002](http://localhost:9002) di browser untuk melihat aplikasi

## Konfigurasi

### Mengganti Nomor WhatsApp Admin

Untuk mengganti nomor WhatsApp yang menerima pesanan, buka file `src/components/cart/CheckoutForm.tsx` dan ubah nilai konstanta `ADMIN_WHATSAPP`:

```typescript
// Nomor WhatsApp admin untuk dikirimkan pre-order
const ADMIN_WHATSAPP = "+628588816751"; // Ganti dengan nomor WhatsApp Anda
```

### Konfigurasi Tema

Warna tema dapat diubah di file `src/app/globals.css`. Aplikasi menggunakan CSS Variables untuk mengelola tema, sehingga semua warna dapat diubah pada satu lokasi:

```css
:root {
  --background: hsl(220 15% 15%);
  --foreground: hsl(220 10% 85%);
  --primary: hsl(30 80% 55%);
  /* ... warna lainnya ... */
}
```

## Penggunaan

### Untuk Pelanggan

1. **Browse Menu**: Lihat daftar produk yang tersedia
2. **Tambah ke Keranjang**: Klik tombol "Add to Cart" pada produk yang diinginkan
3. **Lihat Keranjang**: Klik icon keranjang di header untuk melihat items yang sudah ditambahkan
4. **Checkout**: Isi form dengan data diri (nama, telepon, alamat)
5. **Kirim Pesanan**: Klik "Submit Pre-Order" dan aplikasi akan membuka WhatsApp dengan pesanan yang sudah diformat
6. **Konfirmasi di WhatsApp**: Klik tombol kirim di WhatsApp untuk mengirim pesanan ke admin

### Untuk Admin

1. **Terima Pesanan**: Pesanan akan masuk melalui WhatsApp dengan format yang terstruktur
2. **Kelola Menu**: (Coming soon) Panel admin untuk menambah/mengedit/menghapus produk

## Pengembangan Selanjutnya

Beberapa fitur yang dapat ditambahkan pada pengembangan selanjutnya:

1. Integrasi dengan database seperti Supabase atau Firebase
2. Panel admin untuk manajemen produk dan pesanan
3. Autentikasi pengguna
4. Riwayat pesanan untuk pelanggan
5. Sistem notifikasi
6. Pembayaran online

## Kontribusi

Kontribusi sangat diterima! Silakan buat pull request atau laporkan issues.

## Lisensi

[MIT License](LICENSE)