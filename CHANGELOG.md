# Changelog

Semua perubahan penting pada proyek ini akan didokumentasikan dalam file ini.

Format berdasarkan [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
dan proyek ini menggunakan [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2025-5-14

### Added
- Menambahkan animasi background dengan ikon makanan yang bergerak dan berkedip secara acak
- Menambahkan fitur tampilan menu yang tidak tersedia (status unavailable) dengan desain khusus
- Memprioritaskan tampilan produk tersedia di atas produk yang tidak tersedia dalam daftar menu

### Fixed
- Memperbaiki bug di mana data terbaru dari Supabase tidak terupdate di client
- Memperbaiki masalah caching yang menyebabkan data lama masih ditampilkan setelah update di database
- Menambahkan fitur `noStore` dari Next.js untuk memastikan data selalu diambil secara real-time

### Changed
- Meningkatkan kecepatan animasi background agar lebih responsif dan tidak menumpuk
- Mengoptimalkan jumlah dan penempatan ikon dalam animasi background
- Menyempurnakan logika pembuatan dan penghapusan ikon untuk performa yang lebih baik

## [2.0.0] - 2025-5-12

### Added
- Desain UI yang sepenuhnya baru dengan tema yang lebih modern dan responsif
- Implementasi sistem grid yang lebih fleksibel untuk tampilan produk
- Integrase penuh dengan Supabase sebagai backend untuk pengelolaan data

### Changed
- Merombak seluruh arsitektur aplikasi untuk pengalaman pengguna yang lebih baik
- Meningkatkan performa loading dengan implementasi Server Components dari Next.js
- Menyederhanakan alur pemesanan untuk proses checkout yang lebih cepat

### Fixed
- Memperbaiki masalah responsivitas pada perangkat mobile
- Menyelesaikan bug pada proses penambahan item ke keranjang
- Mengoptimalkan ukuran gambar untuk loading yang lebih cepat

### Technical
- Migrasi ke Next.js App Router untuk routing yang lebih baik
- Implementasi Tailwind CSS untuk styling yang lebih konsisten
- Penggunaan TypeScript secara menyeluruh untuk type safety