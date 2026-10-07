# Portal ICC

Pintu masuk tunggal ke sistem dalaman warga ICC (**e-PinjamAset** dan **e-LogKenderaan**).
Portal ini ialah **PWA (Progressive Web App)**, jadi ia boleh di-*install* di Android, iPhone dan komputer tanpa melalui Play Store atau App Store. Ia dihoskan secara percuma di **GitHub Pages**.

## Cara ia berfungsi

```
Telefon / PC ──► Portal ICC (GitHub Pages)
                    ├─► e-PinjamAset    ┐ Google sahkan akaun @uthm.edu.my
                    └─► e-LogKenderaan  ┘ Setiap sistem semak senarai pengguna & peranannya sendiri
```

- Portal hanya mengandungi **pautan**. Ia tidak menyimpan data atau kata laluan.
- Keselamatan dikawal oleh **setiap sistem**: login Google UTHM, senarai pengguna dan peranan masing-masing.
- Bila pengguna dah log masuk Google UTHM, mereka akan dikenali secara automatik di kedua-dua sistem.

## Fail

| Fail | Fungsi |
|---|---|
| `index.html` | Halaman portal. **Pautan sistem ditetapkan di sini** (`SISTEM` di bahagian atas). |
| `manifest.webmanifest` | Maklumat aplikasi (nama, ikon, warna) untuk install |
| `sw.js` | Service worker, supaya portal boleh di-install dan dibuka pantas |
| `icons/` | Ikon aplikasi. `jana-ikon.js` menjana semula ikon jika perlu. |

---

## Pemasangan di GitHub Pages (percuma, lebih kurang 10 minit)

1. **Tampal pautan sistem.** Buka `index.html` dan cari `const SISTEM`. Tampal URL Web App (`…/exec`) dalam medan `url:` bagi setiap sistem.
2. **Daftar / log masuk GitHub** di <https://github.com>.
3. **Cipta repositori:** klik **＋ → New repository**.
   - Nama: `portal-icc`
   - Pilih **Public** (GitHub Pages percuma memerlukan repo awam. Repo ini tidak mengandungi data sulit, dan sistem tetap dilindungi oleh login UTHM.)
   - Klik **Create repository**.
4. **Upload fail:** klik **uploading an existing file**. Seret **semua isi** folder `Portal-ICC` (`index.html`, `manifest.webmanifest`, `sw.js` dan folder `icons`), kemudian klik **Commit changes**.
5. **Hidupkan Pages:** pilih **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
6. Tunggu 1–2 minit. Portal anda akan berada di:
   **`https://<nama-pengguna-github>.github.io/portal-icc/`**
7. **Kongsi pautan** kepada warga ICC melalui WhatsApp/emel, atau jadikan kod QR dan tampal di pejabat.

## Install di telefon

- **Android (Chrome):** buka pautan dan tekan **Pasang aplikasi**, atau pilih menu **⋮ → Install app**.
- **iPhone/iPad (Safari):** buka pautan, tekan **Kongsi** dan pilih **Add to Home Screen**.
- **Komputer (Chrome/Edge):** klik ikon pasang di hujung bar alamat.

## Kemas kini portal

1. Di GitHub, buka `index.html`, klik ✏️, buat perubahan, dan klik **Commit changes**.
2. Buka `sw.js` dan naikkan versi (contohnya `portal-icc-v1` → `portal-icc-v2`) supaya telefon pengguna menerima versi baharu.

## Tambah sistem baharu kemudian

Dalam `index.html`, salin satu blok `{ nama, keterangan, url, warna, ikon }` dalam `SISTEM` dan ubah isinya.

## Pilihan hosting lain (juga percuma)

- **Cloudflare Pages**: <https://pages.cloudflare.com>. Pilih *Upload assets* dan seret folder ini.
- **Netlify Drop**: <https://app.netlify.com/drop>. Seret folder ini.
