import React from 'react';
import SidebarTutor from '../SidebarTutor';
import '../assets/tutor.css';

const Stamp = () => {
  return (
    <div className='mt-5'>
      <SidebarTutor />
      <div className='main-content' style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 className='mt-3'>Turtle Stamp & Clearstamp</h1>

        <h3>Prasyarat</h3>
        <p>Pemahaman dasar tentang pemrograman Python.</p>

        <h3>Tujuan Pembelajaran</h3>
        <ul>
          <li>Memahami cara menggambar stempel menggunakan <code>stamp()</code>.</li>
          <li>Memahami cara menghapus stempel yang telah dibuat dengan <code>clearstamp()</code>.</li>
        </ul>

        <hr />

        <h2>Definisi Turtle <code>stamp()</code> dan <code>clearstamp()</code></h2>
        <p>
          Dalam pustaka <strong>Turtle Graphics</strong>, metode <code>stamp()</code> digunakan untuk membuat stempel dari gambar turtle saat ini, sedangkan <code>clearstamp()</code> digunakan untuk menghapus stempel tertentu berdasarkan ID yang diberikan. Fungsi-fungsi ini berguna untuk menciptakan pola berulang tanpa harus menggambar ulang gambar setiap kali.
        </p>

        <h4>Fungsi:</h4>
        <ul>
          <li><strong><code>stamp()</code></strong>: Membuat stempel dari posisi dan bentuk turtle saat ini. Mengembalikan ID stempel yang dapat digunakan untuk menghapusnya di kemudian hari.
            <pre><code>{`import turtle

t = turtle.Turtle()

# Menggambar stempel
stamp_id = t.stamp()

turtle.done()`}</code></pre>
          </li>
          <li><strong><code>clearstamp(stamp_id)</code></strong>: Menghapus stempel yang telah dibuat berdasarkan ID yang diberikan.
            <pre><code>{`import turtle

t = turtle.Turtle()

# Menggambar stempel dan menyimpan ID
stamp_id = t.stamp()

# Menghapus stempel menggunakan ID
t.clearstamp(stamp_id)

turtle.done()`}</code></pre>
          </li>
        </ul>

        <hr />

        <h2>Contoh Penggunaan <code>stamp()</code> dan <code>clearstamp()</code></h2>
        <h3>Menggambar Stempel</h3>
        <pre><code>{`import turtle

t = turtle.Turtle()

# Menggambar stempel pertama
stamp_id1 = t.stamp()

# Pindahkan turtle untuk stempel berikutnya
t.penup()
t.setposition(50, 50)
t.pendown()

# Menggambar stempel kedua
stamp_id2 = t.stamp()

# Kembali ke posisi awal dan menghapus stempel pertama
t.penup()
t.home()
t.clearstamp(stamp_id1)

turtle.done()`}</code></pre>

        <h3>Menggambar Pola dengan Stempel</h3>
        <p>Anda dapat menggunakan <code>stamp()</code> dalam loop untuk membuat pola yang lebih kompleks. Berikut adalah contohnya:</p>
        <pre><code>{`import turtle

t = turtle.Turtle()

# Menggambar pola dengan stempel
for i in range(5):
    t.stamp()  # Menggambar stempel di posisi saat ini
    t.forward(50)  # Bergerak maju
    t.right(72)  # Mengubah arah untuk pola bintang

turtle.done()`}</code></pre>

        <h3>Menghapus Semua Stempel</h3>
        <p>Jika Anda ingin menghapus semua stempel yang telah dibuat, Anda dapat menyimpan semua ID dan menghapus satu per satu, atau menggunakan pendekatan lain dengan mengingat semua stempel yang telah dibuat. Berikut adalah contohnya:</p>
        <pre><code>{`import turtle

t = turtle.Turtle()
stamp_ids = []  # Daftar untuk menyimpan ID stempel

# Menggambar beberapa stempel dan menyimpan ID
for _ in range(5):
    stamp_ids.append(t.stamp())
    t.forward(30)

# Menghapus semua stempel yang telah dibuat
for stamp_id in stamp_ids:
    t.clearstamp(stamp_id)

turtle.done()`}</code></pre>

        <hr />

        <h2>Kesimpulan</h2>
        <p>
          Perintah <code>stamp()</code> dan <code>clearstamp()</code> dalam pustaka <strong>Turtle Graphics</strong> memungkinkan Anda untuk menciptakan dan menghapus stempel dari turtle dengan mudah. Ini berguna untuk membuat pola berulang dan mengelola gambar tanpa harus menggambar ulang setiap elemen.
        </p>

        <hr />

        <h2>Kuis</h2>
        <p>Apa yang dilakukan perintah <code>t.clearstamp(stamp_id)</code>?</p>
        <ul>
          <li>[ ] Menghapus semua stempel yang telah dibuat</li>
          <li>[ ] Menghapus stempel berdasarkan ID yang diberikan</li>
          <li>[ ] Mengubah bentuk turtle menjadi stempel</li>
          <li>[ ] Menggambar stempel baru di posisi turtle saat ini</li>
        </ul>
      </div>
    </div>
  )
}

export default Stamp
