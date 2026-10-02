# MS99 - Website Store Joki (NestJS)

## Menjalankan
```bash
npm install
cp .env.example .env      # lalu isi ADMIN_TOKEN
npm run build
ADMIN_TOKEN=rahasia npm start      # buka http://localhost:3000
```
Mode pengembangan: `npm run start:dev`

## Dua halaman
- `/` = halaman **Joki Game**
- `/jualan` = halaman **Jualan Lain**
Keduanya punya tombol pindah halaman di bagian atas.

## Mengedit isi website
Edit `data/site.json`: nomor WhatsApp, Instagram, jam buka, lalu di `pages.joki` dan `pages.jualan` (judul, daftar `items` dengan harga, FAQ, langkah pesan).
Perubahan langsung tampil saat halaman dimuat ulang, tanpa restart server.

## Statistik klik tombol pesan
```bash
curl -H "x-admin-token: rahasia" http://localhost:3000/api/stats
```

## Deploy
Butuh hosting Node.js (Render, Railway, VPS). Build command: `npm install && npm run build`,
start command: `npm start`. Atur environment variable `ADMIN_TOKEN`.
Catatan: sebagian hosting gratis menghapus file yang ditulis saat berjalan, sehingga `data/clicks.json` bisa ikut hilang.

## API
- `GET /api/config`  data situs
- `POST /api/track`  catat klik `{ "label": "nama layanan" }`
- `GET /api/stats`   statistik (butuh header `x-admin-token`)
