# Vite JS + React JS + Tailwind CSS - Proyek Sistem Pendidikan Online

## Deskripsi Proyek:

Proyek ini adalah sebuah sistem yang dikembangkan menggunakan Vite JS sebagai bundler, React JS sebagai framework JavaScript, dan Tailwind CSS untuk styling. Proyek ini dilengkapi dengan berbagai fitur, termasuk artikel dengan Markdown, workshop , konten education berupa video, autentikasi login dengan JWT, dan manajemen pengguna.

## Screenshot:
![image](https://github.com/FS-19-Skilvul-KM5/fe-final-project/assets/139745129/b082a008-fb76-49b7-b419-6e2b72b63ce5)


## Fitur Utama:

### 1. Artikel Menggunakan Markdown:

- Halaman untuk menampilkan artikel menggunakan format Markdown.

### 2. Workshop dengan Narasumber:

- Halaman yang menyajikan informasi tentang workshop, termasuk narasumber, waktu pelaksanaan, dll.

### 3. Pendidikan dengan Video:

- Halaman yang menampilkan konten education berupa video.

### 4. Sistem Login JWT dengan Cookie:

- Halaman login yang menggunakan JSON Web Token (JWT) untuk otentikasi.
- Penggunaan cookie untuk menyimpan token otentikasi.

### 5. Manajemen Pengguna:

- Sistem manajemen pengguna yang mencakup pendaftaran, hapus pengguna dan kontrol hak akses.

## Struktur Proyek:

```plaintext
fe-final-project/
|-- components/
|   |-- Card.jsx
|   |-- Footer.jsx
|   |-- MarkdownEditor.jsx
|   |-- ModalUpdateArticle.jsx
|   |-- Navbar.jsx
|   |-- Tab.jsx
|-- src/
|   |-- assets/
|   |-- About.jsx
|   |-- App.css
|   |-- App.jsx
|   |-- Article.jsx
|   |-- CreateArticle.jsx
|   |-- index.css
|   |-- main.jsx
|   |-- MapMini.jsx
|   |-- Profile.jsx
|   |-- Signin.jsx
|   |-- Signup.jsx
|-- public/
|-- index.html
|-- tailwind.config.js
|-- vite.config.js
|-- package.json
|-- README.md
```

## Cara Menjalankan Proyek:

1. Clone repositori ini.
   ```bash
   git clone https://github.com/FS-19-Skilvul-KM5/fe-final-project.git
   ```

2. Masuk ke direktori proyek.
   ```bash
   cd fe-final-project
   ```

3. Install dependencies.
   ```bash
   npm install
   ```

4. Pastikan untuk membuat file `.env` dan membuat variabel bernama `VITE_REACT_APP_API_URL` untuk mengakses back end.
   ```bash
   VITE_REACT_APP_API_URL=[Url back end]
   ```

5. Jalankan proyek secara lokal.
   ```bash
   npm run dev
   ```

5. Buka [http://localhost:3000](http://localhost:5173) di browser untuk melihat proyek.

## Catatan:

1. Pastikan untuk menyesuaikan proyek sesuai kebutuhan Anda.
2. Periksa dokumentasi resmi Vite JS, React JS, Tailwind CSS, dan paket-paket lain yang Anda gunakan untuk mendapatkan informasi lebih lanjut.
