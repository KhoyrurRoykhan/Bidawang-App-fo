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
import kepiting from './assets/kepiting.png';
import map from './assets/forloop-tilemap.png';
import grid from './assets/3-setposition-b.png';

import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../assets/tutor-copy.css";

const correctCommands = {
    '1a': 'forward(100)',
    '1b': 'right(90)',
  };

const ForLoop = () => {
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
  const activeAccordionKey = location.pathname.includes("/belajar/perulangan") || location.pathname.includes("/belajar/perulangan/forloop")
    ? "6"
    : "0";

  // Class untuk tombol aktif
  const getButtonClass = (path) =>
    location.pathname === path ? "btn text-start mb-2 btn-success" : "btn text-start mb-2 btn-outline-success";


    // hint challanges
    const showHint = () => {
      swal({
        title: "Petunjuk Tantangan",
        content: {
          element: "div",
          attributes: {
            innerHTML: `
              <p>Tantangan kali ini adalah <b>menggerakkan Bidawang hingga ke ujung sungai</b> dengan mengikuti pola sungai yang berulang-ulang.</p>
              <p>Gunakan perulangan <b>for</b> untuk menghindari penulisan kode yang panjang dan berulang.</p>
              <p>Di dalam perulangan, gunakan perintah <b>forward()</b> untuk bergerak maju dan <b>left()</b> atau <b>right()</b> untuk berbelok sesuai pola alur sungai.</p>
              <p>Perhatikan garis bantu pada canvas untuk membantu menentukan jarak dan sudut belokan yang tepat.</p>
            `
          }
        },
        icon: "info"
      });
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

  //kuis
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  const correctAnswers = {
    question1: "Mempercepat dan mempersingkat kode yang berulang",
    question2: "5"
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
  # Menggambar lingkaran dengan jari-jari 50
  for x in range(3):
    forward(100)
    left(120)
  speed(0)
  home()
  reset()
`);

const [pythonCode2, setPythonCode2] = useState(`

for i in range(100):
  speed(1)
  for x in range(4):
    forward(100)
    left(90)
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

  const runit2 = (code, forceReset = false) => {
    setOutput('');
    const imports = "from turtle import *\nreset()\nshape('turtle')\n";
    const prog = forceReset ? imports : imports + pythonCode2;
  
    window.Sk.pre = "output2";
    window.Sk.configure({ output: outf, read: builtinRead });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-contoh2';
  
    window.Sk.misceval.asyncToPromise(() => 
        window.Sk.importMainWithBody('<stdin>', false, prog, true)
    ).then(
        () => console.log('success'),
        (err) => setOutput((prev) => prev + err.toString())
    );
  };


  const runitchallanges = (code, forceReset = false, isInitial = false) => {
    setOutput('');
    const imports = "from turtle import *\nreset()\nshape('turtle')\nspeed(0)\npenup()\nsetposition(-150,150)\npendown()\nspeed(2)\n";
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
        if (!isInitial) {
          checkCodeChallanges();
        }
      },
      (err) => setOutput((prev) => prev + err.toString())
    );
  };

  const [hasRun, setHasRun] = useState(false);

  const extractCircleValue = (line) => {
    const match = line.match(/circle\((\d+)\)/);
    return match ? parseInt(match[1], 10) : null;
  };
  

  const checkCodeChallanges = () => {
    if (!hasRun) return;
  
    const userCode = pythonCodeChallanges.trim();
    const userLines = userCode.split('\n').map(line => line.trim());
  
    // Pastikan seluruh kode ditulis sekaligus (5 baris)
    if (userLines.length !== 5) {
      swal("Perintah Tidak Lengkap", "Harap tuliskan seluruh instruksi sebanyak 5 baris langsung, bukan satu per satu.", "error")
        .then(resetCodeChallanges);
      return;
    }
  
    // Cek baris pertama: for x in range(3):
    const forRegex = /^for\s+\w+\s+in\s+range\((\d+)\):$/;
    const forMatch = userLines[0].match(forRegex);
    if (!forMatch) {
      swal("Kesalahan Sintaks", "Baris pertama harus 'for x in range(3):'", "error")
        .then(resetCodeChallanges);
      return;
    }
  
    const rangeValue = parseInt(forMatch[1]);
    if (rangeValue < 3) {
      swal("Range Kurang", "Nilai range kurang dari 3. Ulangi dengan range(3).", "warning")
        .then(resetCodeChallanges);
      return;
    } else if (rangeValue > 3) {
      swal("Range Berlebihan", "Nilai range lebih dari 3. Ulangi dengan range(3).", "warning")
        .then(resetCodeChallanges);
      return;
    }
  
    // Cek baris 2–5
    const expectedLines = [
      { keyword: 'forward', value: 100, index: 1 },
      { keyword: 'right', value: 90, index: 2 },
      { keyword: 'forward', value: 100, index: 3 },
      { keyword: 'left', value: 90, index: 4 }
    ];
  
    for (const { keyword, value, index } of expectedLines) {
      const regex = new RegExp(`^${keyword}\\((\\d+)\\)$`);
      const match = userLines[index].match(regex);
  
      if (!match) {
        swal("Perintah Salah", `Baris ${index + 1} harus menggunakan '${keyword}(${value})'`, "error")
          .then(resetCodeChallanges);
        return;
      }
  
      const val = parseInt(match[1]);
      if (val < value) {
        swal("Nilai Kurang", `Nilai pada '${keyword}(${val})' terlalu kecil. Harus ${value}.`, "warning")
          .then(resetCodeChallanges);
        return;
      } else if (val > value) {
        swal("Nilai Berlebihan", `Nilai pada '${keyword}(${val})' terlalu besar. Harus ${value}.`, "warning")
          .then(resetCodeChallanges);
        return;
      }
    }
  
    // Jika semua benar
    swal("Sukses!", "Instruksi kamu benar! Bidawang siap bergerak!", "success");
  };
  


  const resetCode = () => {
    setPythonCode('');
    setOutput('');
    runit('', true);
};

  const resetCodeChallanges = () => {
    setPythonCodeChallanges('');
    setOutput('');
    runitchallanges('', true, true); // <-- true artinya isInitial, jadi gak manggil validasi
  };


  useEffect(() => {
    runit();
    runit1(); // Jalankan kode saat halaman dimuat
    runit2(); // Jalankan kode saat halaman dimuat
    runitchallanges(); // Jalankan kode saat halaman dimuat
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
              For Loops
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
              Memahami cara menggunakan perulangan (for) dalam untuk mengontrol pergerakan Bidawang secara berulang..
              </li>
            </ol>

            <hr/>

            <p>
            Perintah for digunakan untuk mengulangi satu atau beberapa baris perintah dalam jumlah tertentu yang sudah ditentukan. Kita bisa menggunakan perulangan for untuk membuat Bidawang menggambar bentuk yang berulang, seperti segitiga, persegi, atau lingkaran secara efisien.</p>

            <p>Dua konsep penting yang harus dipahami dalam for loop adalah:</p>
            <br></br>

            <h5>1. range()</h5>

            <p>Fungsi range() menentukan berapa kali perulangan akan dilakukan. Misalnya:</p>

            <CodeMirror
                  value={`range(4)`}
                  height="50px"
                  theme="light"
                  extensions={[python()]}
                  editable={false}
                  options={{ readOnly: 'nocursor' }}
                />
            
            {/* <br></br> */}
            <p>Berarti perulangan akan dilakukan sebanyak 4 kali, dimulai dari 0 hingga 3. Umumnya digunakan seperti ini:</p>

            <CodeMirror
                  value={`for x in range(4):
  # perintah yang diulang`}
                  height="70px"
                  theme="light"
                  extensions={[python()]}
                  editable={false}
                  options={{ readOnly: 'nocursor' }}
                />
              
              {/* <br></br> */}

              <p>Variabel x hanya digunakan sebagai penghitung jumlah putaran.</p>

              <br></br>

            <h5>2. Indentasi (Spasi Masuk ke Dalam)</h5>

            <p>Indentasi digunakan untuk menentukan blok kode yang berada perulangan. Semua perintah yang ingin diulang harus ditulis menjorok ke kanan (biasanya 1 tab).</p>

            {/* <br></br> */}
            <hr></hr>

            <h5>Contoh 1:</h5>
            <p>Menggambar segitiga dengan perulangan for:</p>
            <Row className="align-items-center">
              <Col md={6}>
                <CodeMirror
                  value={`for x in range(3):
  forward(100)
  left(120)`}
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
            <p><b>Hasil:</b> Fungsi <code>for</code> dengan nilai range(3) akan menjalankan perintah forward(100) dan left(120) berulang sebanyak 3 kali, sehingga membentuk segitiga.</p>
            
            <br></br>

            <h5>Contoh 2:</h5>
            <p>Menggambar persegi dengan perulangan for:</p>
            <Row className="align-items-center">
              <Col md={6}>
                <CodeMirror
                  value={`for x in range(4):
  forward(100)
  left(90)`}
                  height="400px"
                  theme="light"
                  extensions={[python()]}
                  editable={false}
                  options={{ readOnly: 'nocursor' }}
                />
              </Col>
              <Col md={6} className="text-center">
                <div className="canvas-section" style={{width:400,height:400,  textAlign:'center'}}>
                  <div style={{textAlign:'center'}} id="mycanvas-contoh2"></div>
                </div>
              </Col>
            </Row>
            <br></br>
            <p><b>Hasil:</b> Fungsi <code>for</code> dengan nilai range(4) akan menjalankan perintah forward(100) dan left(90) berulang sebanyak 4 kali, sehingga membentuk persegi.</p>
            
            <br></br>

            <hr />

            <div style={{
              backgroundColor: '#F9F9F9',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              // maxWidth: '1000px',
              margin: 'auto',
            }}>
              <h4 style={{
                color: '#2DAA9E',
                fontSize: '22px',
                fontWeight: 'bold',
                borderLeft: '5px solid #2DAA9E',
                paddingLeft: '10px',
                marginBottom: '15px',
              }}>
                Latihan Menggunakan for 🐢
              </h4>
            <p>
            Untuk lebih mudah memahami cara kerja perintah <code>for</code>, ikuti instruksi dibawah ini
            </p>
            <Row>
              <Col xs={3} style={{ fontSize: 15 }}>
                <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
                  <AccordionItem eventKey="1a">
                    <AccordionHeader>
                      <b>1. Membuat Hexagon</b>
                      {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                    </AccordionHeader>
                    <AccordionBody>
                      <p>Membuat hexagon dengan perulangan for dengan kode perintah dibawah ini:</p>
                      <pre><code>for x in range(6):</code></pre>
                      <pre><code>forward(100)</code></pre>
                      <pre><code>left(60)</code></pre>
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem eventKey="1b">
                    <AccordionHeader>
                      <b>2. Membuat Bintang</b>
                      {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                    </AccordionHeader>
                    <AccordionBody>
                    <p>Hapus semua kode yang sudah di ketik sebelumnya lalu gunakan kode perintah dibawah ini untuk membuat bintang sederhana dengan perulangan for:</p>
                      <pre><code>for x in range(5):</code></pre>
                      <pre><code>forward(100)</code></pre>
                      <pre><code>right(144)</code></pre>
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
            
            <div style={{
                backgroundColor: '#F9F9F9',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                // maxWidth: '1000px',
                margin: 'auto',
                borderLeft: '5px solid #2DAA9E',
                borderRight: '5px solid #2DAA9E',
              }}>
                <h4
                style={{
                  color: '#2DAA9E',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  // borderLeft: '5px solid #2DAA9E',
                  // paddingLeft: '10px',
                  marginBottom: '15px',
                  textAlign: 'center',
                }}
              >
                Kesimpulan
              </h4>
              <p>
              Perintah <b>for</b> membantu mengulang langkah-langkah yang sama tanpa harus menulis ulang kode secara manual. Ini sangat berguna untuk menggambar bentuk-bentuk berulang seperti persegi, segitiga, atau bentuk lainnya.
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
                    <Form.Label className="p-3 mb-3"
                    style={{
                      display: "block",
                      backgroundColor: "#f8f9fa",
                      borderLeft: "5px solid #2DAA9E",
                      borderRight: "5px solid #2DAA9E",
                      fontSize: "18px",
                      fontWeight: "bold",
                      borderRadius: "5px"
                    }}
                    >
                      1. Apa manfaat utama menggunakan perulangan for dalam membuat pola gambar dengan Bidawang? 
                    </Form.Label>
                    <div className="row d-flex">
                    {[
                      "Menghapus kode secara otomatis",
                      "Mempercepat dan mempersingkat kode yang berulang",
                      "Mengubah arah turtle secara acak",
                      "Menyimpan file hasil gambar"
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
                      2. Jika kamu ingin menggambar segilima beraturan, berapa kali perulangan yang harus digunakan?
                    </Form.Label>
                    <div className="row d-flex">
                      {["4", 
                      "5", 
                      "6", 
                      "8"].map(
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

          <Accordion className="mb-4" style={{ outline: "3px solid #2DAA9E", borderRadius: "10px" }}>
            {/* Tantangan Accordion */}
            <Accordion.Item eventKey="1">
            <Accordion.Header>
                <h4 style={{ color: "#2DAA9E", fontWeight: "bold" }}>Tantangan</h4>
              </Accordion.Header>
              <Accordion.Body>
                <p style={{ fontSize: "16px", marginBottom: "10px" }}>
                Selesaikan tantangan dibawah ini!
                Klik tombol petunjuk untuk menampilkan petujuk pengerjaan.
                </p>
                <Button className='mb-2' variant="info" onClick={showHint} style={{ color: 'white', fontWeight: 'bold' }}>
                        Petunjuk
                    </Button>

                <div className="skulpt-container" style={{
                      border: "3px solid #ccc",
                      borderRadius: "10px",
                      padding: "15px",
                      // display: "flex",
                      // flexWrap: "wrap",
                      gap: "20px",
                      justifyContent: "center",
                      backgroundColor: "#f9f9f9",
                    }}>
                      
                  <div className="editor-section">
                    <CodeMirror
                      value={pythonCodeChallanges}
                      placeholder={'//Ketikan kode disini!'}
                      height="290px"
                      theme="light"
                      extensions={[python()]}
                      onChange={(value) => setPythonCodeChallanges(value)}
                      style={{
                        border: "2px solid #2DAA9E",
                        borderRadius: "8px",
                        padding: "5px",
                      }}
                    />
                    <div style={{ marginTop: '5px', marginBottom: '5px', display: 'flex', gap: '10px' }}>
                      <Button variant="success" onClick={() => { runitchallanges(); checkCode(); }}>Run Code</Button>
                      <Button variant="secondary" onClick={resetCodeChallanges}>
                        <BsArrowClockwise /> Reset
                      </Button>
                      </div>
                    <pre className="output"style={{
                        height: "60px",
                        marginTop: '5px',
                        border: "2px solid #ccc",
                        borderRadius: "5px",
                        padding: "5px",
                        backgroundColor: "#fff",
                      }}>{output}</pre>
                  </div>
                  <div className="canvas-section" 
                  style={{
                    position: "relative",
                    width: "400px",
                    height: "405px",
                    borderRadius: "10px",
                    border: "3px solid #2DAA9E",
                    // overflow: "hidden"
                  }}>
                    <div id="mycanvas-challanges" style={{ 
                      width: 400, 
                      height: 400, 
                      position: "relative", 
                    }}></div>
                    {/* <img
                          src={kepiting}
                          alt="Target Kepiting"
                          style={{
                            position: "absolute",
                            left: "175px",
                            top: "95px",
                            width: "50px", // Sesuaikan ukuran jika perlu
                            height: "50px",
                          }}
                      /> */}
                      <img
                          src={map}
                          alt="Map"
                          style={{
                            position: "absolute",
                            left: "0px",
                            top: "0px",
                            width: "400px", // Sesuaikan ukuran jika perlu
                            height: "400px",
                          }}
                      />
                      <img
                          src={grid}
                          alt="grid"
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
          </Accordion>
          </div>
        </div>
            </Col>
        </Row>
    </Container>
  )
}

export default ForLoop
