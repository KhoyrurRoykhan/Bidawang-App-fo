import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { Accordion, Container, Row, Col, Button, Form, Alert, Card, Image, AccordionItem, AccordionHeader, AccordionBody } from 'react-bootstrap';
import { BsArrowClockwise, BsCheckCircle } from 'react-icons/bs'; // Import ikon Bootstrap
import '../assets/tutor.css';
import '../asset_skulpt/SkulptTurtleRunner.css';
import forward100 from './assets/2turtle-forward.gif';
import backward100 from './assets/2turtle-backward.gif';
// import combinedForwardBackward from './assets/combinedForwardBackward.gif';

// Challange
import swal from 'sweetalert'; // Import SweetAlert
import papuyu from './assets/papuyu-1.png';
import cacingA from './assets/cacing-target-A-home.png';
import cacingB from './assets/cacing-target-B-home.png';
import map from './assets/6-home.png';

import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../assets/tutor-copy.css";

const correctCommands = {
  '1a': 'forward(100)\nright(45)\nforward(200)',
  '1b': 'home()',
};

const SetHome = () => {
  //token
  const [activeButton, setActiveButton] = useState("intro-1");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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

  // Tentukan accordion aktif berdasarkan URL
  const activeAccordionKey = location.pathname.includes("/belajar/turtlemotion") || location.pathname.includes("/belajar/turtlemotion/home")
    ? "1"
    : "0";

  // Class untuk tombol aktif
  const getButtonClass = (path) =>
    location.pathname === path ? "btn text-start mb-2 btn-success" : "btn text-start mb-2 btn-outline-success";


  // hint challanges
  const showHint = () => {
    swal(
      "Petunjuk Tantangan",
      "Bidawang saat ini berada di tengah layar (titik (0, 0)), sedangkan cacing berada di titik (100, 100). \n\n" +
      " Tugas kalian adalah Gerakan bidawang untuk mencapai 2 titik yang ditandai pada canvas kemudian buat bidawang kembali ke posisi awal. \n\n",
      "info"
    );
  };

  //accordion task
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeKey, setActiveKey] = useState('1a');

  const checkCode = () => {
    const cleanedCode = pythonCode
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  
    let newCompletedSteps = [];
  
    for (const key of Object.keys(correctCommands)) {
      const expected = correctCommands[key].split('\n').map(l => l.trim());
      const codeSlice = cleanedCode.slice(0, expected.length);
  
      const isMatch = expected.every((cmd, idx) => cmd === codeSlice[idx]);
  
      if (isMatch) {
        newCompletedSteps.push(key);
        cleanedCode.splice(0, expected.length); // hapus baris yang sudah dicek
      } else {
        break;
      }
    }
  
    setCompletedSteps(newCompletedSteps);
  
    if (newCompletedSteps.length < Object.keys(correctCommands).length) {
      setActiveKey(Object.keys(correctCommands)[newCompletedSteps.length]);
    } else {
      setActiveKey(null);
    }
  };
  

  //kuis
  //kuis
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  const correctAnswers = {
    question1: "Mengembalikan Bidawang ke posisi awal (0, 0) dan mengatur arahnya ke timur.",
    question2: "Bidawang kembali ke posisi (0, 0) dan menghadap ke timur."
  };

  const handleAnswerChange = (question, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [question]: answer
    }));
  };

  const handleSubmit = () => {
    const newFeedback = {};
    Object.keys(correctAnswers).forEach((question) => {
      newFeedback[question] =
        selectedAnswers[question] === correctAnswers[question] ? "Benar!" : "Salah!";
    });
    setFeedback(newFeedback);
  };

  const [pythonCode, setPythonCode] = useState(``);
  const [pythonCode1, setPythonCode1] = useState(`

for i in range(100):
  speed(1)
  # Pindahkan turtle ke beberapa posisi
  forward(100)
  left(90)
  forward(150)
            
  # Kembali ke posisi awal
  home()
  speed(0)
  home()
  reset()

`);

  const [pythonCodeChallanges, setPythonCodeChallanges] = useState(``);

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
    const imports = "from turtle import *\nreset()\nshape('turtle')\n";
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

  const runit1 = (code, forceReset = false) => {
    setOutput('');
    const imports = "from turtle import *\nreset()\nshape('turtle')\n";
    const prog = forceReset ? imports : imports + pythonCode1;
  
    window.Sk.pre = "output1";
    window.Sk.configure({ output: outf, read: builtinRead });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-contoh1';
  
    window.Sk.misceval.asyncToPromise(() => 
        window.Sk.importMainWithBody('<stdin>', false, prog, true)
    ).then(
        () => console.log('success'),
        (err) => setOutput((prev) => prev + err.toString())
    );
  };


  const runitchallanges = (code, forceReset = false) => {
    setOutput('');
    const imports = "from turtle import *\nreset()\nshape('turtle')\nspeed(0)\npenup()\nforward(100)\npendown()\nspeed(1)\n";
    const prog = forceReset ? imports : imports + pythonCodeChallanges;
  
    window.Sk.pre = "output4";
    window.Sk.configure({ output: outf, read: builtinRead });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-challanges';
  
    window.Sk.misceval.asyncToPromise(() => 
        window.Sk.importMainWithBody('<stdin>', false, prog, true)
    ).then(
        () => {
          console.log('success');
          setHasRun(true);
          checkCodeChallanges();
        },
        (err) => setOutput((prev) => prev + err.toString())
    );
  };

  const [hasRun, setHasRun] = useState(false);

  const checkCodeChallanges = () => {
    if (!hasRun) return;

    const validCodes = [
        ["right(90)", "forward(100)", "left(90)", "forward(80)", "right(90)", "forward(80)", "home()"]
    ];

    const userCodeLines = pythonCodeChallanges.trim().split("\n");

    // Cek apakah kode pengguna merupakan bagian awal dari salah satu jawaban yang valid
    const isPartialMatch = validCodes.some(validCode =>
        validCode.slice(0, userCodeLines.length).every((code, index) => code === userCodeLines[index])
    );

    // Cek apakah kode pengguna sudah lengkap dan benar
    const isExactMatch = validCodes.some(validCode =>
        validCode.length === userCodeLines.length && validCode.every((code, index) => code === userCodeLines[index])
    );

    if (isExactMatch) {
        swal("Jawaban Benar!", "Kamu berhasil!", "success");
    } else if (!isPartialMatch) {
        swal("Jawaban Salah", "Coba lagi dengan perintah yang benar.", "error");
    }
};

  const resetCode = () => {
    setPythonCode('');
    setOutput('');
    runit('', true);
};

  const resetCodeChallanges = () => {
    setPythonCodeChallanges('');
    setOutput('');
    runitchallanges('', true);
  };


  useEffect(() => {
    runit();
    runit1(); // Jalankan kode saat halaman dimuat
    // runitchallanges(); // Jalankan kode saat halaman dimuat
  }, []);

  return (
    <Container fluid className="sidenavigasi mt-5">
      <Row>
        <Col xs={2} className="bg-light border-end vh-100 p-0"
        style={{ overflowY: "hidden" }} // atau "auto", atau "scroll"
        >
        <Accordion defaultActiveKey={activeAccordionKey}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Pengenalan</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column">
                  <button
                    className={getButtonClass("/belajar/pendahuluan")}
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
                    className={getButtonClass("/belajar/turtlemotion/leftright")}
                    onClick={() => navigate("/belajar/turtlemotion/leftright")}
                  >
                    Left & Right
                  </button>
                  <button
                    className={getButtonClass("/belajar/turtlemotion/forwardbackward")}
                    onClick={() => navigate("/belajar/turtlemotion/forwardbackward")}
                  >
                    Forward & Backward
                  </button>
                  <button
                    className={getButtonClass("/belajar/turtlemotion/setposition")}
                    onClick={() => navigate("/belajar/turtlemotion/setposition")}
                  >
                    Set Position
                  </button>
                  <button
                    className={getButtonClass("/belajar/turtlemotion/setxy")}
                    onClick={() => navigate("/belajar/turtlemotion/setxy")}
                  >
                    Setx & sety
                  </button>
                  <button
                    className={getButtonClass("/belajar/turtlemotion/setheading")}
                    onClick={() => navigate("/belajar/turtlemotion/setheading")}
                  >
                    Setheading
                  </button>
                  <button
                    className={getButtonClass("/belajar/turtlemotion/home")}
                    onClick={() => navigate("/belajar/turtlemotion/home")}
                  >
                    Home
                  </button>
                  <button
                    className={getButtonClass("/belajar/turtlemotion/circle")}
                    onClick={() => navigate("/belajar/turtlemotion/circle")}
                  >
                    Circle
                  </button>
                  <button
                    className={getButtonClass("/belajar/turtlemotion/dot")}
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
                    className={getButtonClass("/belajar/tellstate/position")}
                    onClick={() => navigate("/belajar/tellstate/position")}
                  >
                    Position
                  </button>
                  <button
                    className={getButtonClass("/belajar/tellstate/xcorycor")}
                    onClick={() => navigate("/belajar/tellstate/xcorycor")}
                  >
                    Xcor & Ycor
                  </button>
                  <button
                    className={getButtonClass("/belajar/tellstate/heading")}
                    onClick={() => navigate("/belajar/tellstate/heading")}
                  >
                    Heading
                  </button>
                  <button
                    className={getButtonClass("/belajar/tellstate/distance")}
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
                    className={getButtonClass("/belajar/pencontrol/penuppendown")}
                    onClick={() => navigate("/belajar/pencontrol/penuppendown")}
                  >
                    Pendown & Penup
                  </button>
                  <button
                    className={getButtonClass("/belajar/pencontrol/pensize")}
                    onClick={() => navigate("/belajar/pencontrol/pensize")}
                  >
                    Pensize
                  </button>
                  <button
                    className={getButtonClass("/belajar/pencontrol/isdown")}
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
                    className={getButtonClass("/belajar/colorcontrol/pencolor")}
                    onClick={() => navigate("/belajar/colorcontrol/pencolor")}
                  >
                    Pencolor
                  </button>
                  <button
                    className={getButtonClass("/belajar/colorcontrol/fillcolor")}
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
                    className={getButtonClass("/belajar/moredrawingcontrol/reset")}
                    onClick={() => navigate("/belajar/moredrawingcontrol/reset")}
                  >
                    Reset
                  </button>
                  <button
                    className={getButtonClass("/belajar/moredrawingcontrol/clear")}
                    onClick={() => navigate("/belajar/moredrawingcontrol/clear")}
                  >
                    Clear
                  </button>
                  <button
                    className={getButtonClass("/belajar/moredrawingcontrol/write")}
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
                    className={getButtonClass("/belajar/perulangan/forloop")}
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
          <div>
            <h2 style={{
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
            }}>
              Home
            </h2>
            <hr></hr>
            <br/>

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
              Memahami cara mengembalikan posisi Bidawang ke titik awal menggunakan <code>home()</code>.
              </li>
            </ol>

            <hr/>

            <p>
            Perintah `home()` digunakan untuk memindahkan Bidawang kembali ke posisi awalnya, yaitu titik (0, 0). Selain memindahkan Bidawang ke posisi awal, perintah ini juga mengatur arah Bidawang menghadap ke timur (0 derajat). Ini berguna ketika Anda ingin memulai kembali menggambar dari posisi awal. 
            </p>

            <h5>Contoh:</h5>
            <p>Memindahkan bidawang ke posisi awal setelah menjalankan berbagai perintah.</p>
            <Row className="align-items-center">
              <Col md={6}>
                <CodeMirror
                  value={`# Pindahkan turtle ke beberapa posisi
forward(100)
left(90)
forward(150)
                
# Kembali ke posisi awal
home()`}
                  height="400px"
                  theme="light"
                  extensions={[python()]}
                  editable={false}
                  options={{ readOnly: 'nocursor' }}
                />
              </Col>
              <Col md={6} className="text-center">
                <div className="canvas-section" style={{width:400,height:400,  textAlign:'center'}}>
                  <div style={{textAlign:'center'}} id="mycanvas-contoh1"></div>
                </div>
              </Col>
            </Row>
            <br></br>
            <p><b>Hasil:</b> Fungsi <code>home()</code> akan membuat Bidawang kembali ke posisi awal setelah menjalankan perintah lainnya.</p>
            
            <br></br>

            <hr />

            <div
            style={{
              backgroundColor: '#F9F9F9',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              // maxWidth: '1000px',
              margin: 'auto',
            }}>
              <h4
              style={{
                color: '#2DAA9E',
                fontSize: '22px',
                fontWeight: 'bold',
                borderLeft: '5px solid #2DAA9E',
                paddingLeft: '10px',
                marginBottom: '15px',
              }}>
                Latihan Menggunakan home() 🐢
              </h4>
            <p>
            Untuk lebih mudah memahami cara kerja perintah <code>home()</code>, ikuti instruksi dibawah ini
            </p>
            <Row>
              <Col xs={3} style={{ fontSize: 15 }}>
                <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
                  <AccordionItem eventKey="1a">
                    <AccordionHeader>
                      <b>1. Gerakkan Bidawang</b>
                      {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                    </AccordionHeader>
                    <AccordionBody>
                      <p>Buat bidawang menjadi bergerak ke arah mana saja, sebagai contoh gunakan perintah di bawah ini untuk menggerakan bidawang: </p>
                      <pre><code>forward(100)</code></pre>
                      <pre><code>right(45)</code></pre>
                      <pre><code>forward(200)</code></pre>
                      
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem eventKey="1b">
                    <AccordionHeader>
                      <b>2. Kembali ke posisi awal</b>
                      {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                    </AccordionHeader>
                    <AccordionBody>
                      <p>Selanjutnya ketikan perintah di bawah ini pada baris baru untuk mengembalikan bidawang ke posisi awal.</p>
                      <pre><code>home()</code></pre>
                    </AccordionBody>
                  </AccordionItem>
                </Accordion>
              </Col>

              <Col xs={9}>
              <div className="skulpt-container" style={{border: "2px solid #ccc"}}>
              <div className="editor-section">
                {/* <h5>Python Turtle Code Editor</h5> */}
                <CodeMirror
                  value={pythonCode}
                  placeholder={'//Ketikan kode disini!'}
                  height="290px"
                  theme="light"
                  extensions={[python()]}
                  onChange={(value) => setPythonCode(value)}
                />
                <div style={{ marginTop: '5px', marginBottom: '5px', display: 'flex', gap: '10px' }}>
                  <Button variant="success" onClick={() => { runit(); checkCode(); }}>Run Code</Button>
                  <Button variant="secondary" onClick={resetCode}>
                    <BsArrowClockwise /> Reset
                  </Button>
                  </div>
                <pre className="output" style={{height:60}}>{output}</pre>
              </div>
              <div className="canvas-section" style={{width: 400, height: 400}}>
                <div  style={{width: 400, height: 400}} id="mycanvas"></div>
              </div>
            </div>
              </Col>
            </Row>
            </div>
            
            
            <br></br>
            <hr/>

            <div
            style={{
              backgroundColor: '#F9F9F9',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              // maxWidth: '1000px',
              margin: 'auto',
              borderLeft: '5px solid #2DAA9E',
              borderRight: '5px solid #2DAA9E',
            }}>
              <h4 style={{
                color: '#2DAA9E',
                fontSize: '24px',
                fontWeight: 'bold',
                // borderLeft: '5px solid #2DAA9E',
                // paddingLeft: '10px',
                marginBottom: '15px',
                textAlign: 'center',
              }}>
                Kesimpulan
                </h4>
              <p>
              Perintah <b>home()</b> memudahkan untuk kembali ke posisi awal (0, 0) dan mengatur arah Bidawang ke posisi semula. Ini berguna untuk memulai kembali proses menggambar dari titik awal. 
              </p>
            </div>
            
            <br/>

            <Accordion className="mb-4" style={{ outline: "3px solid #2DAA9E", borderRadius: "10px" }}>
            {/* Kuis Accordion */}
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
                      1. Apa fungsi dari perintah home()? 
                    </Form.Label>
                    <div className="row d-flex">
                    {[
                      "Menghapus seluruh gambar yang telah dibuat.",
                      "Mengembalikan Bidawang ke posisi awal (0, 0) dan mengatur arahnya ke timur.",
                      "Utara",
                      "Memindahkan Bidawang ke posisi y = 0."
                    ].map((answer) => (
                      <div key={answer} className="col-6 mb-2 d-flex">
                        <Button
                          variant={selectedAnswers.question1 === answer ? "success" : "outline-success"}
                          onClick={() => handleAnswerChange("question1", answer)}
                          className="w-100 p-3 flex-grow-1"
                          style={{
                            fontSize: "18px",
                            // fontWeight: "bold",
                            backgroundColor: selectedAnswers.question1 === answer ? "#2DAA9E" : "",
                            borderColor: "#2DAA9E",
                            minHeight: "60px" // Menjaga tinggi tetap konsisten
                          }}
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

                  <Form.Group controlId="question2">
                    <Form.Label className="p-3 mb-3"
                    style={{
                      display: "block",
                      backgroundColor: "#f8f9fa",
                      borderLeft: "5px solid #2DAA9E",
                      borderRight: "5px solid #2DAA9E",
                      fontSize: "18px",
                      // fontWeight: "bold",
                      borderRadius: "5px"
                    }}>
                      2. Jika posisi awal Bidawang adalah (100, 100) dan arahnya ke barat, apa yang terjadi setelah menggunakan home()? 
                    </Form.Label>
                    <div className="row d-flex">
                      {["Bidawang tetap di posisi (100, 100).", 
                      "Bidawang kembali ke posisi (0, 0) dengan arah tetap ke barat.", 
                      "Bidawang kembali ke posisi (0, 0) dan menghadap ke timur.", 
                      "Bidawang tetap di posisi (100, 100) tetapi menghadap ke timur."].map(
                        (answer) => (
                          <div key={answer} className="col-6 mb-2 d-flex">
                            <Button
                              variant={selectedAnswers.question2 === answer ? "success" : "outline-success"}
                              onClick={() => handleAnswerChange("question2", answer)}
                              className="w-100 p-3 flex-grow-1"
                              style={{
                                fontSize: "18px",
                                // fontWeight: "bold",
                                backgroundColor: selectedAnswers.question2 === answer ? "#2DAA9E" : "",
                                borderColor: "#2DAA9E",
                                minHeight: "60px"
                              }}
                            >
                              {answer}
                            </Button>
                          </div>
                        )
                      )}
                    </div>

                  </Form.Group>
                  {feedback.question2 && (
                    <Alert variant={feedback.question2 === "Benar!" ? "success" : "danger"} className="mt-3">
                      {feedback.question2}
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

          {/* <Accordion className="mb-4" style={{ outline: '3px solid lightblue' }}>
            <Accordion.Item eventKey="1">
              <Accordion.Header><h4>Tantangan</h4></Accordion.Header>
              <Accordion.Body>
              <p>
                Selesaikan tantangan dibawah ini!
                Klik tombol petunjuk untuk menampilkan petujuk pengerjaan.
                </p>
                <Button className=" mb-2" variant="info" onClick={showHint}>
                  Petunjuk
                </Button>

                <div className="skulpt-container" style={{border: "2px solid #ccc"}}>
                  <div className="editor-section">
                    <CodeMirror
                      value={pythonCodeChallanges}
                      placeholder={'//Ketikan kode disini!'}
                      height="290px"
                      theme="light"
                      extensions={[python()]}
                      onChange={(value) => setPythonCodeChallanges(value)}
                    />
                    <div style={{ marginTop: '5px', marginBottom: '5px', display: 'flex', gap: '10px' }}>
                      <Button variant="success" onClick={() => { runitchallanges(); checkCode(); }}>Run Code</Button>
                      <Button variant="secondary" onClick={resetCodeChallanges}>
                        <BsArrowClockwise /> Reset
                      </Button>
                      </div>
                    <pre className="output4" style={{height:60}}>{output}</pre>
                  </div>
                  <div className="canvas-section" style={{ position: "relative", width: 400, height: 400,  }}>
                    <div id="mycanvas-challanges" style={{ 
                      width: 400, 
                      height: 400, 
                      position: "relative", 
                    }}></div>
                    <img
                          src={cacingA}
                          alt="Target Broccoli"
                          style={{
                            position: "absolute",
                            left: "275px",
                            top: "275px",
                            width: "50px", // Sesuaikan ukuran jika perlu
                            height: "50px",
                          }}
                      />
                      <img
                          src={cacingB}
                          alt="Target Broccoli"
                          style={{
                            position: "absolute",
                            left: "355px",
                            top: "355px",
                            width: "50px", // Sesuaikan ukuran jika perlu
                            height: "50px",
                          }}
                      />
                      <img
                          src={map}
                          alt="Map"
                          style={{
                            position: "absolute",
                            left: "2px",
                            top: "0px",
                            width: "400px", // Sesuaikan ukuran jika perlu
                            height: "400px",
                          }}
                      />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion> */}
          </div>
        </div>
        </Col>
      </Row>
    </Container>
    
  )
}

export default SetHome
