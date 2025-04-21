import React, { useEffect, useState } from 'react'; 
import '../assets/tutor.css'; 
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import contohhasil from './assets/contoh-hasil.png';
import { Accordion, Container, Row, Col, Button, Form, Alert, Card, Image, AccordionItem, AccordionHeader, AccordionBody } from 'react-bootstrap';
import canvas from './assets/koordinat-kartesius.jpg';
import lingkungankerja from './assets/kode-editor.png'
import { BsArrowClockwise, BsCheckCircle } from 'react-icons/bs'; // Import ikon Bootstrap
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../assets/tutor-copy.css";

const correctCommands = {
  '1a': 'forward(100)',
  '1b': 'right(90)',
  '1c': 'forward(100)',
  '1d': 'left(45)',
  '1e': 'forward(50)'
};

const Pendahuluan = () => {
  //token
  const [activeButton, setActiveButton] = useState("intro-1");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  //accordion task
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeKey, setActiveKey] = useState('1a');

  const checkCode = () => {
    const lines = pythonCode.split('\n').map(line => line.trim());
    let newCompletedSteps = [];
    let keys = Object.keys(correctCommands);
    
    for (let i = 0; i < keys.length; i++) {
      if (lines[i] === correctCommands[keys[i]]) {
        newCompletedSteps.push(keys[i]);
      } else {
        break;
      }
    }
    
    setCompletedSteps(newCompletedSteps);
    if (newCompletedSteps.length < keys.length) {
      setActiveKey(keys[newCompletedSteps.length]);
    } else {
      setActiveKey(null);
    }
  };



  //Kuis
  
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState({});

  const handleAnswerChange = (question, answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    const correctAnswer = '(200, -150)';
    setFeedback({
      question1: selectedAnswer === correctAnswer ? 'Benar!' : 'Salah!',
    });
  };


  const [pythonCode, setPythonCode] = useState(``);
  const [pythonCode2, setPythonCode2] = useState(`

for i in range(100):
  speed(1)
  forward(150)
  left(90)    
  forward(150)
  left(90)
  forward(150)
  left(90)    
  forward(150)
  left(90)
  
  clear()

  forward(150)
  left(120)
  forward(150)
  left(120)
  forward(150)
  left(120)
  
  clear()
  
  circle(100)
  
  clear()
  
  speed(2)
  for i in range(9):
    for _ in range(4):  
        forward(100)  
        right(90)  
    right(40)
  
  clear()

  speed(2)
  for i in range(9):
    for _ in range(3):  
        forward(100)  
        right(120)  
    right(40)
  
  clear()

  speed(2)
  for i in range(9):
    circle(50)  
    right(40)
  
  clear()
`);

  const [output, setOutput] = useState('');

  const outf = (text) => {
    setOutput((prev) => prev + text);
  };

  const builtinRead = (x) => {
    if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles['files'][x] === undefined) {
      throw `File not found: '${x}'`;
    }
    return window.Sk.builtinFiles['files'][x];
  };

  const runit = (code, forceReset = false) => {
    setOutput('');
    const imports = "from turtle import *\nreset()\nshape('turtle')\nspeed(1)\n";
    const prog = forceReset ? imports : imports + pythonCode;

    window.Sk.pre = "output";
    window.Sk.configure({ output: outf, read: builtinRead });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas';

    window.Sk.misceval.asyncToPromise(() => 
        window.Sk.importMainWithBody('<stdin>', false, prog, true)
    ).then(
        () => console.log('success'),
        (err) => setOutput((prev) => prev + err.toString())
    );
};

const runit2 = (code, forceReset = false) => {
  setOutput('');
  const imports = "from turtle import *\nreset()\nshape('turtle')\n";
  const prog = forceReset ? imports : imports + pythonCode2;

  window.Sk.pre = "output2";
  window.Sk.configure({ output: outf, read: builtinRead });
  (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-contoh';

  window.Sk.misceval.asyncToPromise(() => 
      window.Sk.importMainWithBody('<stdin>', false, prog, true)
  ).then(
      () => console.log('success'),
      (err) => setOutput((prev) => prev + err.toString())
  );
};


  const resetCode = () => {
    setPythonCode('');
    setOutput('');
    runit('', true);
};


  useEffect(() => {
    runit(); // Jalankan kode saat halaman dimuat
    runit2(); // Jalankan kode saat halaman dimuat
  }, []);


  return (
    <Container fluid className="sidenavigasi mt-5">
      <Row>
      <Col xs={2} className="bg-light border-end vh-100 p-0"
        style={{ overflowY: "hidden" }} // atau "auto", atau "scroll"
        >
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Pengenalan</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column">
                  <button
                    className="btn text-start mb-2 btn-success"
                    onClick={() => navigate("/belajar/pendahuluan")}
                  >
                    Pengenalan
                  </button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Turtle Motion</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column">
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/turtlemotion/leftright")}
                  >
                    Left & Right
                  </button>
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/turtlemotion/forwardbackward")}
                  >
                    Forward & Backward
                  </button>
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/turtlemotion/setposition")}
                  >
                    Set Position
                  </button>
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/turtlemotion/setxy")}
                  >
                    Setx & sety
                  </button>
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/turtlemotion/setheading")}
                  >
                    Setheading
                  </button>
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/turtlemotion/home")}
                  >
                    Home
                  </button>
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/turtlemotion/circle")}
                  >
                    Circle
                  </button>
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/turtlemotion/dot")}
                  >
                    Dot
                  </button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Tell State</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column">
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/tellstate/position")}
                  >
                    Position
                  </button>
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/tellstate/xcorycor")}
                  >
                    Xcor & Ycor
                  </button>
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/tellstate/heading")}
                  >
                    Heading
                  </button>
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/tellstate/distance")}
                  >
                    Distance
                  </button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Pen Control</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column">
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/pencontrol/penuppendown")}
                  >
                    Pendown & Penup
                  </button>
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/pencontrol/pensize")}
                  >
                    Pensize
                  </button>
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/pencontrol/isdown")}
                  >
                    Isdown
                  </button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>Color Control</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column">
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/colorcontrol/pencolor")}
                  >
                    Pencolor
                  </button>
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/colorcontrol/fillcolor")}
                  >
                    Pengisian Warna (Fillcolor, Begin_fill, dan End_fill)
                  </button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>More Drawing Control</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column">
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/moredrawingcontrol/reset")}
                  >
                    Reset
                  </button>
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/moredrawingcontrol/clear")}
                  >
                    Clear
                  </button>
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/moredrawingcontrol/write")}
                  >
                    Write
                  </button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>Perulangan</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column">
                  <button
                    className="btn text-start mb-2 btn-outline-success"
                    onClick={() => navigate("/belajar/perulangan/forloop")}
                  >
                    For Loops
                  </button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

          </Accordion>
        </Col>

        <Col xs={10} className="p-4">
        <div className='content' style={{paddingLeft:50, paddingRight:50}}>
          {/* <SidebarTutor /> */}
          <div>
            {/* Main Content Area */}
            <h2
              style={{
                textAlign: 'center',
                backgroundColor: '#2DAA9E',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                fontWeight: 'bold',
                fontSize: '24px',
                letterSpacing: '1px',
                borderLeft: '10px solid orange' // Border kiri dengan warna oranye
              }}
            >
              Pengenalan
            </h2>

            <hr></hr>
            <br></br>

            <h4
              style={{
                color: '#2DAA9E',
                fontSize: '22px',
                fontWeight: 'bold',
                borderLeft: '5px solid #2DAA9E',
                paddingLeft: '10px',
                marginBottom: '10px',
              }}
            >
              Tujuan Pembelajaran
            </h4>
            <ol
              style={{
                backgroundColor: '#F9F9F9',
                padding: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                listStylePosition: 'inside',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                Memahami konsep canvas sebagai ruang pergerakan Bidawang.
              </li>
              <li>
                Mengenali tampilan lingkungan kerja dan perintah dasar untuk menggerakan
                Bidawang pada canvas.
              </li>
            </ol>


            <hr></hr>

            {/* Video Section */}
            <div
              style={{
                textAlign: 'center',
                marginTop: '20px',
                padding: '20px',
                backgroundColor: '#F9F9F9',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                maxWidth: '1080px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              <h5
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#2DAA9E',
                  marginBottom: '15px',
                }}
              >
                Perhatikan Video Ilustrasi di bawah ini:
              </h5>
              <iframe
                width="100%"
                height="500"
                src="https://www.youtube.com/embed/iefPvNd_diM?si=_Ou4N5Xe9TA-cezk"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{
                  borderRadius: '10px',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                }}
              ></iframe>
            </div>


            <hr></hr>

            <p>Canvas adalah area tempat Bidawang bergerak menggambar pola geometri secara interaktif. Bidawang tersebut dapat dikontrol untuk bergerak maju (forward), mundur (backward), berbelok ke kiri (left), berbelok ke kanan (right), dan melakukan berbagai aksi lainnya menggunakan perintah-perintah tertentu. Ukuran default canvas adalah 400x400 piksel. Berikut adalah contoh gambaran canvas dan contoh Bidwang bergerak dalam canvas:</p>
            
            <Row>
              <Col xs={6} style={{textAlign:'center'}}>
              <Image
                src={canvas}
                alt="Hasil left(120)"
                width="470px"
                height="470px"
              />
              <p>(Gambaran koordinat canvas)</p>
              </Col>

              <Col xs={6}>
              <div className="canvas-section" style={{width:400,height:400, marginTop:40, textAlign:'center'}}>
                <div style={{textAlign:'center'}} id="mycanvas-contoh"></div>
                
              </div>
              <br></br>
              <p style={{paddingLeft:20}}>(Contoh pergerakan bidawang dalam canvas)</p>
              </Col>
            </Row>
            
              <br></br>
            
              <h5
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#2DAA9E',
                  marginBottom: '8px',
                }}
              >
                🔎 Penjelasan:
              </h5>
            <ul>
              <li>Titik awal posisi Bidawang adalah (0, 0), yang berada di tengah canvas.</li>
              <li>Batas pergerakan ke atas (sumbu Y positif) adalah 200, yang merupakan batas atas canvas.</li>
              <li>Batas pergerakan ke bawah (sumbu Y negatif) adalah -200, yang merupakan batas bawah canvas.</li>
              <li>Batas pergerakan ke kanan (sumbu X positif) adalah 200.</li>
              <li>Batas pergerakan ke kiri (sumbu X negatif) adalah -200.</li>
            </ul>

            {/* <br></br> */}
            <hr></hr>
            <br></br>

            {/* Tampilan Lingkungan Kerja */}
            <div
              style={{
                margin: 'auto',
              }}
            >
              <h4
                style={{
                  color: '#2DAA9E',
                  fontSize: '22px',
                  fontWeight: 'bold',
                  borderLeft: '5px solid #2DAA9E',
                  paddingLeft: '10px',
                  marginBottom: '10px',
                }}
              >
                🖥️ Tampilan Lingkungan Kerja
              </h4>
              <p style={{ fontSize: '16px', color: '#444', lineHeight: '1.6' }}>
                Untuk mempermudah mengontrol <b>Bidawang</b>, tersedia lingkungan kerja yang terdiri dari beberapa komponen seperti gambar di bawah ini:
              </p>

              {/* Gambar Lingkungan Kerja */}
              <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                <Image
                  src={lingkungankerja}
                  alt="Tampilan Lingkungan Kerja"
                  width="100%"
                  style={{
                    borderRadius: '10px',
                    // boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </div>

              {/* Penjelasan */}
              <h5
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#2DAA9E',
                  marginBottom: '8px',
                }}
              >
                🔎 Penjelasan:
              </h5>
              <ul
                style={{
                  // backgroundColor: '#fff',
                  padding: '15px',
                  // borderRadius: '8px',
                  // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  // listStyleType: 'none',
                  lineHeight: '1.6',
                }}
              >
                {[
                  { label: '(A) Text Editor', desc: 'Area tempat pengguna mengetik perintah kode untuk menggerakkan Bidawang.' },
                  { label: '(B) Canvas', desc: 'Area tampilan di mana pergerakan Bidawang divisualisasikan. Semua perintah yang dijalankan akan langsung terlihat pada canvas.' },
                  { label: '(C) Bidawang', desc: 'Objek yang digerakkan menggunakan perintah kode.' },
                  { label: '(D) Tombol "Run Code"', desc: 'Digunakan untuk menjalankan kode yang telah ditulis di text editor. Setelah ditekan, Bidawang akan menjalankan perintah dan menggambar sesuai instruksi.' },
                  { label: '(E) Tombol "Reset"', desc: 'Menghapus kode serta hasil gambar di canvas dan mengembalikan Bidawang ke posisi awal.' },
                  { label: '(F) Output Log', desc: 'Digunakan untuk menampilkan output dari program yang dijalankan atau pesan error.' },
                ].map((item, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>
                    <b style={{ color: '#2DAA9E' }}>{item.label}</b>: {item.desc}
                  </li>
                ))}
              </ul>
            </div>
            
            <hr></hr>
            <br></br>

            {/* Contoh Menggerakkan Bidawang dalam Canvas */}
            <div
              style={{
                backgroundColor: '#F9F9F9',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                // maxWidth: '1000px',
                margin: 'auto',
              }}
            >
              <h4
                style={{
                  color: '#2DAA9E',
                  fontSize: '22px',
                  fontWeight: 'bold',
                  borderLeft: '5px solid #2DAA9E',
                  paddingLeft: '10px',
                  marginBottom: '15px',
                }}
              >
                🐢 Contoh Menggerakkan Bidawang dalam Canvas
              </h4>
              <p style={{ color: '#444', lineHeight: '1.6' }}>
                Kita bisa menggerakkan <b>Bidawang</b> dengan berbagai perintah. Berikut adalah contoh perintah dasar untuk membuat
                Bidawang dapat bergerak dan berputar. Agar lebih mudah untuk memahaminya, coba ikuti instruksi di bawah ini dengan
                mengetikkan perintah tersebut, lalu tekan tombol <b>"Run Code"</b> untuk melihat pergerakan Bidawang. Lakukan
                secara bertahap:
              </p>

              <Row>
                {/* Kolom untuk Accordion */}
                <Col xs={3} style={{ fontSize: '15px' }}>
                  <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
                    {[
                      { step: '1a', title: 'Maju', code: 'forward(100)', description: 'Gerakkan Bidawang maju sejauh 100 langkah.' },
                      { step: '1b', title: 'Berbelok ke kanan', code: 'right(90)', description: 'Putar Bidawang ke kanan sebesar 90 derajat.' },
                      { step: '1c', title: 'Maju', code: 'forward(100)', description: 'Gerakkan Bidawang maju sejauh 100 langkah.' },
                      { step: '1d', title: 'Berbelok ke kiri', code: 'left(45)', description: 'Putar Bidawang ke kiri sebesar 45 derajat.' },
                      { step: '1e', title: 'Maju', code: 'forward(50)', description: 'Gerakkan Bidawang maju sejauh 50 langkah.' },
                    ].map((step, index) => (
                      <AccordionItem eventKey={step.step} key={index}>
                        <AccordionHeader>
                          <b>{step.title}</b>
                          {completedSteps.includes(step.step) && (
                            <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />
                          )}
                        </AccordionHeader>
                        <AccordionBody>
                          <p>{step.description}</p>
                          <pre>
                            <code>{step.code}</code>
                          </pre>
                        </AccordionBody>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Col>

                {/* Kolom untuk Editor dan Canvas */}
                <Col xs={9}>
                  <div className="skulpt-container" style={{ border: '2px solid #ccc', borderRadius: '8px', padding: '15px' }}>
                    <div className="editor-section">
                      <CodeMirror
                        value={pythonCode}
                        placeholder={'//Ketikan kode disini!'}
                        height="300px"
                        theme="light"
                        extensions={[python()]}
                        onChange={(value) => setPythonCode(value)}
                      />
                      <div
                        style={{
                          marginTop: '5px',
                          marginBottom: '5px',
                          display: 'flex',
                          gap: '10px',
                          // justifyContent: 'center',
                        }}
                      >
                        <Button variant="success" onClick={() => { runit(); checkCode(); }}>
                          Run Code
                        </Button>
                        <Button variant="secondary" onClick={resetCode}>
                          <BsArrowClockwise /> Reset
                        </Button>
                      </div>
                      <pre className="output" style={{ height: 60, width: 330, overflow: 'auto' }}>{output}</pre>
                    </div>
                    <div className="canvas-section">
                      <div id="mycanvas"></div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>


            
            <br/>
              <hr/> 

              <Accordion className="mb-4" style={{ outline: "3px solid #2DAA9E", borderRadius: "10px" }}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h4 style={{ color: "#2DAA9E", fontWeight: "bold" }}>Kuis</h4>
            </Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group controlId="question1">
                  <Form.Label
                    className="p-3 mb-3"
                    style={{
                      display: "block",
                      backgroundColor: "#f8f9fa",
                      borderLeft: "5px solid #2DAA9E",
                      borderRight: "5px solid #2DAA9E",
                      fontSize: "18px",
                      // fontWeight: "bold",
                      borderRadius: "5px"
                    }}
                  >
                    Jika pergerakan Bidawang ke kanan adalah 200 dan ke bawah adalah -150, bagaimana koordinat tersebut dijelaskan?
                  </Form.Label>
                  <div className="row">
                    {["(200, 150)", "(-200, 150)", "(200, -150)", "(-200, -150)"].map((answer) => (
                      <div key={answer} className="col-6 mb-2">
                        <Button
                          variant={selectedAnswer === answer ? "success" : "outline-success"}
                          onClick={() => handleAnswerChange("question1", answer)}
                          className="w-100 p-3"
                          style={{ fontSize: "18px", backgroundColor: selectedAnswer === answer ? "#2DAA9E" : "", borderColor: "#2DAA9E" }}
                        >
                          {answer}
                        </Button>
                      </div>
                    ))}
                  </div>
                </Form.Group>
                {feedback.question1 && (
                  <Alert variant={feedback.question1 === "Benar!" ? "success" : "danger"} className="mt-3">
                    {feedback.question1}
                  </Alert>
                )}
                <div className="text-center">
                  <Button variant="success" onClick={handleSubmit} className="mt-3 p-3" style={{ fontSize: "18px", backgroundColor: "#2DAA9E", borderColor: "#2DAA9E" }}>
                    Periksa Jawaban
                  </Button>
                </div>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>     
          </div>
        </div>
        </Col>
      </Row>
    </Container>
    
  );
};

export default Pendahuluan;
