# 🎬 Ekstraktor Frame Video + AI (Local Deployment)

Aplikasi web berbasis React untuk mengekstrak frame dari video dan menggunakan Google Gemini AI untuk membuat prompt video.

## 📋 Prasyarat (Hanya di Komputer Host)
Pastikan di komputer/laptop yang akan menjalankan server sudah terinstall:
1.  **Node.js** (versi 18 atau terbaru): [Download di sini](https://nodejs.org/)
2.  **Koneksi Internet**: Diperlukan untuk installasi dan akses API Gemini.

## 🚀 Cara Menjalankan (Lokal / Satu WiFi)

### 1. Setup Awal (Hanya Sekali)
Buka terminal/CMD di folder proyek ini, lalu ketik:
```bash
npm install
```

### 2. Konfigurasi API Key
Buat file baru bernama `.env` di folder root (sejajar dengan package.json), isi dengan:
```env
VITE_API_KEY=masukkan_api_key_gemini_anda_disini
```
*Dapatkan API Key di: https://aistudio.google.com/*

### 3. Jalankan Aplikasi
Ketik perintah ini setiap kali ingin menggunakan aplikasi:
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:3000`.

---

## 🌍 Cara Mengakses dari Jaringan Berbeda (Internet / Remote)

Jika Anda ingin teman Anda mengakses aplikasi ini dari rumah mereka, atau Anda ingin membukanya dari HP menggunakan Data Seluler (bukan WiFi yang sama), ikuti langkah ini:

### Menggunakan Ngrok (Gratis & Paling Stabil)

1.  **Jalankan Aplikasi**
    Pastikan aplikasi sedang berjalan di terminal pertama:
    ```bash
    npm run dev
    ```

2.  **Download & Install Ngrok**
    *   Download di: [ngrok.com/download](https://ngrok.com/download)
    *   Daftar akun gratis (diperlukan untuk mendapatkan token).

3.  **Jalankan Ngrok**
    Buka terminal **baru** (jangan tutup terminal aplikasi), lalu ketik:
    ```bash
    ngrok http 3000
    ```
    *(Jika menggunakan Windows dan belum set path, seret file ngrok.exe ke terminal, lalu tambahkan `http 3000` di belakangnya)*.

4.  **Bagikan Link**
    Ngrok akan menampilkan link seperti ini:
    ```
    Forwarding      https://a1b2-c3d4.ngrok-free.app -> http://localhost:3000
    ```
    Copy link `https://...` tersebut dan kirimkan ke device mana pun di seluruh dunia. Mereka bisa mengakses aplikasi Anda selama terminal di komputer Anda tetap terbuka.

---

## 🔧 Troubleshooting

1.  **Error API Key**: Pastikan file `.env` sudah terisi dengan benar.
2.  **Ngrok Expired**: Link Ngrok versi gratis akan berubah setiap kali Anda mematikan dan menyalakan ulang ngrok. Pastikan mengirim link yang baru.
3.  **Firewall**: Jika link tidak bisa dibuka, matikan sementara Windows Firewall atau izinkan akses publik.
