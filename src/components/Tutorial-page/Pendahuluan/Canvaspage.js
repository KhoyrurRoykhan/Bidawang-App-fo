import React, { useEffect, useState } from 'react'; 
import Swal from 'sweetalert2';
import '../assets/tutor.css'; 
import canvas from './assets/koordinat-kartesius.jpg';
import { Button, Form, Alert, Card, Image } from 'react-bootstrap';



const Canvaspage = () => {
  const [answers, setAnswers] = useState({
    question1: '',
  });

  const [feedback, setFeedback] = useState({
    question1: '',
  });

  const handleAnswerChange = (question, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: answer,
    }));
  };

  const handleSubmit = () => {
    const feedbackMessages = {
      question1:
        answers.question1 ===
        '(200, -150) adalah koordinat yang menunjukkan batas pergerakan ke kanan (200) dan ke bawah (-150).'
          ? {
              message: 'Benar! Anda sudah memahami canvas/ruang pergerakan turtle. Selanjutnya mari kita pelajari cara menggerakkan objek turtle.',
              variant: 'success', 
            }
          : {
              message: 'Salah! Coba lagi.',
              variant: 'danger', 
            },
    };

    setFeedback(feedbackMessages.question1);

    // Menampilkan SweetAlert dengan icon berbeda
    Swal.fire({
      title: feedbackMessages.question1.message,
      icon: feedbackMessages.question1.variant === 'success' ? 'success' : 'error',
      confirmButtonText: 'OK',
      didClose: () => {
        // Jika jawaban benar, arahkan ke halaman /tutorial/leftright
        if (feedbackMessages.question1.variant === 'success') {
          window.location.href = '/tutorial/leftright';
        }
      },
    });
  };



  return (
    <div className='content' style={{paddingLeft:50, paddingRight:50}}>

        <h2 className="mt-3" style={{textAlign:'center'}}>
          Canvas : Ruang pergerakan Turtle
        </h2>
        <hr></hr>
        <br />

        <h4>Tujuan Pembelajaran:</h4>
        <ol>
          <li>
            Siswa memahami ukuran ruang pergerakan turtle dan memahami sistem
            koordinat untuk menentukan posisi dan batas area kerja turtle.
          </li>
        </ol>
        <br />

        <h4>Definisi</h4>
        <p>
          Canvas adalah ruang virtual tempat turtle menggambar. Ukuran canvas
          menentukan seberapa luas area kerja, sedangkan koordinat menentukan
          posisi turtle di dalamnya. Posisi awal turtle berada di titik tengah
          canvas, yaitu (0, 0). Ukuran default canvas adalah 400x400 piksel.
        </p>
        <br />

        <h4>Contoh:</h4>
        <ul>
          <li>
            - Titik awal posisi turtle adalah (0, 0), yang berada di tengah
            canvas.
          </li>
          <li>
            - Batas pergerakan ke atas (sumbu Y positif) adalah 200, yang
            merupakan batas atas canvas.
          </li>
          <li>
            - Batas pergerakan ke bawah (sumbu Y negatif) adalah -200, yang
            merupakan batas bawah canvas.
          </li>
          <li>- Batas pergerakan ke kanan (sumbu X positif) adalah 200.</li>
          <li>- Batas pergerakan ke kiri (sumbu X negatif) adalah -200.</li>
        </ul>

        <div style={{ marginLeft: '20px' }}>
          <Image
            src={canvas}
            alt="Hasil left(120)"
            width="400px"
            height="400px"
          />
          <br />
          <br />
          <p>Contoh posisi koordinat pada canvas:</p>
          <ul>
            <li>- (0, 0): Pusat canvas.</li>
            <li>- (200, 200): Pojok kanan atas.</li>
            <li>- (-200, 200): Pojok kiri atas.</li>
            <li>- (-200, -200): Pojok kiri bawah.</li>
            <li>- (200, -200): Pojok kanan bawah.</li>
          </ul>
        </div>

        <h4>Kuis</h4>
        <Card className="mb-4">
          <Card.Body>
            <Form>
              <Form.Group controlId="question1">
                <Form.Label>
                  1. Jika batas pergerakan ke kanan adalah 200 dan ke bawah
                  adalah -150, bagaimana koordinat tersebut dijelaskan?
                </Form.Label>
                <Form.Check
                  type="radio"
                  label="(200, 150)"
                  name="question1"
                  onChange={() =>
                    handleAnswerChange(
                      'question1',
                      '(200, 150)'
                    )
                  }
                />
                <Form.Check
                  type="radio"
                  label="(-200, 150)"
                  name="question1"
                  onChange={() =>
                    handleAnswerChange(
                      'question1',
                      '(-200, 150)'
                    )
                  }
                />
                <Form.Check
                  type="radio"
                  label="(200, -150)"
                  name="question1"
                  onChange={() =>
                    handleAnswerChange(
                      'question1',
                      '(200, -150) adalah koordinat yang menunjukkan batas pergerakan ke kanan (200) dan ke bawah (-150).'
                    )
                  }
                />
                <Form.Check
                  type="radio"
                  label="(-200, -150)"
                  name="question1"
                  onChange={() =>
                    handleAnswerChange(
                      'question1',
                      '(-200, -150)'
                    )
                  }
                />
              </Form.Group>
              {feedback.question1 && (
                <Alert
                  variant={feedback.question1.variant} // Gunakan variant dari feedback untuk menentukan warna alert
                >
                  {feedback.question1.message}
                </Alert>
              )}

              <Button
                variant="primary"
                onClick={handleSubmit}
                className="mt-3"
              >
                Periksa Jawaban
              </Button>
            </Form>
          </Card.Body>
        </Card>

      
    </div>
  )
}

export default Canvaspage;
