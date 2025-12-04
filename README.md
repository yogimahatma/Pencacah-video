# 🎬 Ekstraktor Frame Video + AI

Aplikasi web modern untuk mengekstrak frame dari video dan menggunakan **Google Gemini AI** untuk membuat deskripsi/prompt video secara otomatis.

## ✨ Fitur Utama
*   🎥 **Ekstraksi Frame**: Mengambil gambar dari video setiap N detik.
*   🤖 **Analisis AI**: Menggunakan Gemini Vision untuk mendeskripsikan setiap frame.
*   ⚡ **Cepat & Lokal**: Pemrosesan video dilakukan di browser (Client-side), video tidak diupload ke server.
*   📱 **Responsif**: Tampilan rapi di HP, Tablet, dan Desktop.

---

## 🚀 Cara Deploy ke Internet (Vercel)

Cara termudah agar aplikasi ini bisa diakses dari mana saja adalah menggunakan **Vercel** (Gratis).

### Langkah 1: Push ke GitHub
1.  Buat repository baru di GitHub.
2.  Upload semua file kode ini ke repository tersebut.

### Langkah 2: Deploy di Vercel
1.  Buka [vercel.com](https://vercel.com) dan login/daftar.
2.  Klik tombol **"Add New..."** -> **"Project"**.
3.  Pilih repository GitHub yang baru Anda buat.
4.  Pada bagian konfigurasi:
    *   **Framework Preset**: Vite (biasanya otomatis terdeteksi).
    *   **Environment Variables** (Opsional tapi Disarankan):
        *   Key: `VITE_API_KEY`
        *   Value: *(Masukkan API Key Gemini Anda)*
    *   *Catatan: Jika Anda tidak mengisi Environment Variable, user (atau Anda) harus memasukkan API Key secara manual di tampilan aplikasi saat dibuka.*
5.  Klik **Deploy**.

Tunggu sebentar, dan Vercel akan memberikan link (contoh: `https://video-ai-app.vercel.app`). Link ini bisa Anda bagikan dan buka di perangkat apa saja!

---

## 💻 Cara Menjalankan di Komputer Sendiri (Lokal)

Jika hanya ingin dijalankan di laptop tanpa internet publik:

1.  **Install Dependensi**
    ```bash
    npm install
    ```

2.  **Jalankan Aplikasi**
    ```bash
    npm run dev
    ```

3.  **Akses**
    Buka browser di `http://localhost:3000`.

### Troubleshooting
*   **API Key Error**: Pastikan Anda memiliki API Key yang valid dari [Google AI Studio](https://aistudio.google.com/).
*   **Video Format**: Mendukung MP4, WEBM, MOV. Jika format tidak didukung browser, konversi dulu ke MP4.
