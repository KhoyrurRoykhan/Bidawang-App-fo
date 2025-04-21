import React from 'react';
import SidebarTutor from '../SidebarTutor';
import '../assets/tutor.css';

const UndoSpeed = () => {
  return (
    <div className='mt-5'>
      <SidebarTutor />
      <div className='main-content' style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 className='mt-3'>Turtle Undo & Speed</h1>

        <h3>Prasyarat</h3>
        <p>Pemahaman dasar tentang pemrograman Python.</p>

        <h3>Tujuan Pembelajaran</h3>
        <ul>
          <li>Memahami cara membatalkan perintah terakhir menggunakan <code>undo()</code>.</li>
          <li>Memahami cara mengatur kecepatan turtle dengan <code>speed()</code>.</li>
        </ul>

        <hr />

        <h2>Definisi Turtle <code>undo()</code> dan <code>speed()</code></h2>
        <h4>1. <code>undo()</code></h4>
        <p>
          Metode ini digunakan untuk membatalkan perintah terakhir yang dijalankan oleh turtle. Ini berguna ketika Anda ingin membatalkan langkah yang tidak diinginkan tanpa harus mengulang seluruh proses menggambar.
        </p>
        <pre><code>{`import turtle

t = turtle.Turtle()

# Menggambar garis
t.forward(100)

# Menggunakan undo untuk membatalkan pergerakan
t.undo()

turtle.done()`}</code></pre>

        <h4>2. <code>speed()</code></h4>
        <p>
          Metode ini digunakan untuk mengatur kecepatan pergerakan turtle. Anda dapat mengatur kecepatan dengan angka dari 0 hingga 10, di mana 0 adalah kecepatan maksimum (tanpa animasi), dan 1 adalah kecepatan paling lambat. Anda juga dapat menggunakan kata kunci seperti "fastest", "fast", "normal", "slow", dan "slowest".
        </p>
        <pre><code>{`import turtle

t = turtle.Turtle()

# Mengatur kecepatan turtle ke maksimum
t.speed(0)

# Menggambar lingkaran
t.circle(100)

turtle.done()`}</code></pre>

        <hr />

        <h2>Contoh Penggunaan <code>undo()</code> dan <code>speed()</code></h2>
        <h3>Menggunakan <code>undo()</code> untuk Membatalkan Perintah</h3>
        <pre><code>{`import turtle

t = turtle.Turtle()

# Mengatur kecepatan turtle ke normal
t.speed(5)

# Menggambar garis
t.forward(100)

# Menghapus garis terakhir
t.undo()

# Menggambar garis baru
t.forward(50)

turtle.done()`}</code></pre>

        <h3>Mengatur Kecepatan Turtle</h3>
        <p>Anda dapat menggunakan <code>speed()</code> untuk mengatur seberapa cepat turtle bergerak. Berikut adalah contoh menggambar segitiga dengan kecepatan yang berbeda:</p>
        <pre><code>{`import turtle

t = turtle.Turtle()

# Mengatur kecepatan turtle ke cepat
t.speed(3)

# Menggambar segitiga
for _ in range(3):
    t.forward(100)
    t.left(120)

turtle.done()`}</code></pre>

        <h3>Mengganti Kecepatan Selama Menggambar</h3>
        <p>Anda juga bisa mengubah kecepatan turtle saat menggambar:</p>
        <pre><code>{`import turtle

t = turtle.Turtle()

# Mengatur kecepatan awal
t.speed(1)

# Menggambar segitiga lambat
for _ in range(3):
    t.forward(100)
    t.left(120)

# Mengubah kecepatan menjadi cepat
t.speed(10)

# Menggambar segitiga lebih cepat
for _ in range(3):
    t.forward(100)
    t.left(120)

turtle.done()`}</code></pre>

        <hr />

        <h2>Kesimpulan</h2>
        <p>
          Perintah <code>undo()</code> dalam pustaka <strong>Turtle Graphics</strong> memungkinkan Anda untuk membatalkan perintah terakhir, memberi Anda fleksibilitas dalam menggambar. Sementara itu, metode <code>speed()</code> memungkinkan Anda mengontrol kecepatan gerakan turtle, membuat proses menggambar lebih cepat atau lambat sesuai kebutuhan.
        </p>

        <hr />

        <h2>Kuis</h2>
        <p>Apa yang dilakukan perintah <code>t.undo()</code>?</p>
        <ul>
          <li>[ ] Menghapus semua garis yang telah digambar</li>
          <li>[ ] Mengembalikan turtle ke posisi awal</li>
          <li>[ ] Membatalkan perintah terakhir yang dijalankan</li>
          <li>[ ] Mengubah kecepatan turtle menjadi lambat</li>
        </ul>

        <p>Apa yang dilakukan perintah <code>t.speed(0)</code>?</p>
        <ul>
          <li>[ ] Mengatur turtle menjadi kecepatan paling lambat</li>
          <li>[ ] Mengatur turtle menjadi kecepatan maksimum</li>
          <li>[ ] Menghapus semua perintah yang telah dilakukan</li>
          <li>[ ] Menghentikan pergerakan turtle</li>
        </ul>
      </div>
    </div>
  )
}

export default UndoSpeed
