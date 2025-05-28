import NextImage from 'next/image'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"

export default function About() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-64 bg-gradient-to-r from-blue-700 to-blue-900 overflow-hidden">
        <div className="absolute inset-0">
          <NextImage
            src="/background_angka.png"
            alt="Numbers Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container relative h-full flex items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Deteksi Angka dari
            <br />
            Tulisan Tangan
          </h2>
        </div>
      </section>

      {/* Description */}
      <section className="py-8 bg-gray-100">
        <div className="container">
          <Card className="bg-blue-100/50 p-6 text-center">
            <h3 className="text-xl font-bold text-blue-800 mb-2">
              Otomatisasi Deteksi Angka dari Gambar Tulisan Tangan
            </h3>
          </Card>

          <Card className="mt-6 bg-blue-50 p-6 text-center">
            <p className="text-gray-800">
              Aplikasi ini dirancang untuk mengubah angka tulisan tangan menjadi format digital secara otomatis.
              Memanfaatkan teknologi deep learning terkini, khususnya Convolutional Neural Networks (CNN), sistem ini
              memungkinkan Anda mengunggah gambar tulisan tangan dan mendapatkan hasil deteksi angka dengan cepat dan
              akurat.
            </p>
          </Card>
        </div>
      </section>

      {/* Additional About Content */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-800">Tentang Teknologi</h3>
              <p className="text-gray-700 mb-4">
                Aplikasi ini menggunakan Convolutional Neural Networks (CNN), sebuah jenis jaringan saraf tiruan yang
                sangat efektif untuk pengenalan pola visual. CNN telah terbukti sangat akurat dalam mengenali digit
                tulisan tangan, dengan tingkat akurasi mencapai lebih dari 80% pada dataset MNIST standar.
              </p>
              <p className="text-gray-700">
                Untuk multi-digit detection, kami menggunakan kombinasi teknik segmentasi dan klasifikasi. Pertama,
                gambar input diproses untuk memisahkan setiap digit individual, kemudian setiap digit dikenali
                menggunakan model CNN yang telah dilatih.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-800">Tentang Tim</h3>
              <p className="text-gray-700 mb-4">
                Kelompok 6 kelas 3 TI E terdiri dari 3 orang : Rafid Zain - Fatih Muhammad Rizqi - Syahriza Bayu Pratama.
                Proyek ini dikembangkan sebagai bagian dari mata kuliah Deep Learning.
              </p>
              <p className="text-gray-700">
                Kelompok kami berkomitmen untuk terus mengembangkan aplikasi ini dengan menambahkan fitur-fitur baru dan
                meningkatkan akurasi deteksi. Kami juga terbuka untuk saran dan masukan dari pengguna untuk perbaikan di
                masa depan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
