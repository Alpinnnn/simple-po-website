# OrderEase - Sistem Pre-Order

Aplikasi pre-order modern berbasis web dengan integrasi WhatsApp untuk restoran, kafe, dan bisnis kuliner lainnya. Memungkinkan pelanggan melihat menu, menambahkan item ke keranjang, dan mengirimkan pesanan melalui WhatsApp.

## Fitur Utama

- ✅ Tampilan responsif untuk desktop & mobile
- ✅ Daftar produk dengan gambar, deskripsi, dan harga
- ✅ Keranjang belanja interaktif dengan perhitungan total
- ✅ Form checkout dengan validasi data
- ✅ Integrasi WhatsApp untuk pengiriman pesanan
- ✅ Theme warna yang dapat disesuaikan
- ✅ Mata uang yang dapat dikonfigurasi (IDR, USD, dll)
- ✅ Tampilan admin untuk pengelolaan produk (coming soon)
- ✅ OpenGraph metadata untuk berbagi di media sosial
- ✅ Smooth scrolling dengan Lenis
- ✅ Animasi scroll dengan GSAP

## Teknologi yang Digunakan

- **Next.js 15** - Framework React dengan Server Side Rendering
- **TypeScript** - Untuk type-safety dan developer experience yang lebih baik
- **Tailwind CSS** - Untuk styling dengan pendekatan utility-first
- **Supabase** - Database & Authentication (opsional, belum diimplementasi)
- **React Hook Form & Zod** - Untuk validasi form
- **Radix UI** - Komponen accessible UI
- **Lucide Icons** - Untuk ikon-ikon aplikasi
- **GSAP** - Untuk animasi menarik pada saat scrolling
- **Lenis** - Untuk smooth scrolling yang halus

## Cara Instalasi

### Persyaratan
- Node.js versi 18.0 atau lebih tinggi
- npm atau yarn atau pnpm

### Langkah Instalasi

1. Clone repository ini

```bash
git clone https://github.com/Alpinnnn/simple-po-website.git
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

3. Konfigurasi environment variables (opsional)

Buat file `.env` di root project dan tambahkan variabel berikut:

```
# Konfigurasi Supabase
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""

# Nomor WhatsApp Admin
NEXT_PUBLIC_ADMIN_WHATSAPP="+62812345678"

# Konfigurasi Mata Uang (opsional, dengan default USD)
NEXT_PUBLIC_CURRENCY_SYMBOL="Rp"
NEXT_PUBLIC_CURRENCY_CODE="IDR"
NEXT_PUBLIC_CURRENCY_LOCALE="id-ID"
```

4. Jalankan server development

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

5. Buka [http://localhost:9002](http://localhost:9002) di browser untuk melihat aplikasi

## Konfigurasi

### Konfigurasi WhatsApp dan Mata Uang

Aplikasi ini menggunakan environment variables untuk konfigurasi utama:

1. **Nomor WhatsApp Admin**
   - Variable: `NEXT_PUBLIC_ADMIN_WHATSAPP`
   - Format: String dengan format nomor internasional (contoh: "+628588816751")
   - Default: "+628588816751"

2. **Mata Uang**
   - `NEXT_PUBLIC_CURRENCY_SYMBOL`: Simbol mata uang (contoh: "Rp", "$", "€")
   - `NEXT_PUBLIC_CURRENCY_CODE`: Kode mata uang (contoh: "IDR", "USD", "EUR")
   - `NEXT_PUBLIC_CURRENCY_LOCALE`: Locale untuk format angka (contoh: "id-ID", "en-US")
   - Default: "$" dengan kode "USD" dan locale "en-US"

Anda dapat mengubah konfigurasi ini dengan membuat file `.env.local` di root project, atau mengatur environment variables di platform deployment Anda (Vercel, Netlify, dll).

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

### Konfigurasi OpenGraph

Aplikasi ini mendukung OpenGraph untuk membuat pratinjau yang menarik saat dibagikan di media sosial. Konfigurasi metadata ada di `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  // ... konfigurasi lainnya ...
  openGraph: {
    // Ubah sesuai dengan detail website Anda
    type: 'website',
    locale: 'id_ID',
    url: 'https://orderease.vercel.app',
    siteName: 'OrderEase',
    title: 'OrderEase - Sistem Pre-Order Makanan',
    description: 'Pesan makanan favorit Anda dengan mudah...',
    // ...
  },
  // ...
};
```

Gambar OpenGraph dihasilkan secara dinamis dari file `src/app/opengraph-image.tsx` dan `src/app/twitter-image.tsx`.

### Konfigurasi Animasi

Aplikasi menggunakan GSAP dan Lenis untuk memberikan pengalaman scrolling yang halus dan animasi yang menarik.

#### Smooth Scrolling dengan Lenis

Smooth scrolling diimplementasikan menggunakan library Lenis di `src/providers/SmoothScrollProvider.tsx`. Konfigurasi Lenis dapat disesuaikan:

```typescript
const lenisInstance = new Lenis({
  duration: 1.2, // Durasi animasi (dapat disesuaikan)
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  wheelMultiplier: 1, // Multiplier kecepatan scroll (angka lebih tinggi = scroll lebih cepat)
});
```

#### Animasi dengan GSAP

Produk-produk dalam aplikasi dianimasikan saat muncul di viewport menggunakan GSAP ScrollTrigger. Animasi dapat disesuaikan di `src/providers/SmoothScrollProvider.tsx`:

```typescript
gsap.fromTo(
  card,
  {
    opacity: 0,
    y: 50, // Mulai 50px di bawah posisi akhir
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.8, // Durasi animasi
    delay: i * 0.1, // Delay bertahap untuk setiap card
    ease: 'power3.out', // Efek easing
    scrollTrigger: {
      trigger: card,
      start: 'top bottom-=100', // Mulai animasi saat elemen 100px dari bawah viewport
      end: 'bottom top',
      toggleActions: 'play none none reverse', // Membalik animasi saat scroll naik
    },
  }
);
```

Untuk menonaktifkan animasi, Anda dapat menghapus inisialisasi GSAP di file `SmoothScrollProvider.tsx`.

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