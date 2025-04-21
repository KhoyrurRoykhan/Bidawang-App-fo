import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { Accordion, Container, Row, Col, Button, Form, Alert, Card, Image, AccordionItem, AccordionHeader, AccordionBody } from 'react-bootstrap';
import '../assets/tutor.css';
import '../asset_skulpt/SkulptTurtleRunner.css';
import { BsArrowClockwise, BsCheckCircle } from 'react-icons/bs'; // Import ikon Bootstrap
import left120 from './assets/1left120.gif';
import right90 from './assets/1right90.gif';
import gabunganleftright from './assets/1gabunganleftright.gif';

// Challange
import swal from 'sweetalert'; // Import SweetAlert
import papuyu from './assets/papuyu-1.png';
import broccoli from './assets/cacingtarget.png';
import map from './assets/3-heading.png';

import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../assets/tutor-copy.css";

const correctCommands = {
  '1a': 'print(heading())',
  '1b': 'left(90)',
  '1c': 'print(heading())',
  '1d': 'right(180)',
  '1e': 'print(heading())'
};

const Heading = () => {
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
  const activeAccordionKey = location.pathname.includes("/belajar/tellstate") || location.pathname.includes("/belajar/tellstate/heading")
    ? "2"
    : "0";

  // Class untuk tombol aktif
  const getButtonClass = (path) =>
    location.pathname === path ? "btn text-start mb-2 btn-success" : "btn text-start mb-2 btn-outline-success";


    // hint challanges
    const showHint = () => {
      swal(
        "Petunjuk Tantangan",
        "Tugas kalian adalah memeriksa arah mana yg tidak buntu (periksa menggunakan heading), masukan jawabannya pada kolom yang sudah disediakan!",
        "info"
      );
    };
    
    const [inputA, setInputA] = useState("");

    const checkAnswer = () => {
      const correctAnswersA = ["180.0", "180", "180,0"];
      
      if (correctAnswersA.includes(inputA)) {
        swal("Benar!", "Jawaban Anda benar.", "success");
      } else {
        swal("Salah!", "Jawaban Anda salah.", "error");
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
  
    //kuis
    const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  const correctAnswers = {
    question1: "Timur (kanan).",
    question2: "90"
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
    # Putar turtle ke kiri sebesar 90 derajat 
    left(90) 
    speed(0)
    home()
    reset()

`);
  
  
    const [pythonCodeChallanges, setPythonCodeChallanges] = useState(``);
  
    const [output, setOutput] = useState('');
    const [output1, setOutput1] = useState('');
    const [outputChallanges, setOutputChallanges] = useState('');
  
    const outf = (text) => {
      setOutput((prev) => prev + text);
    };
  
    const outf1 = (text) => {
      setOutput1((prev) => prev + text);
    };
  
    const outfchallanges = (text) => {
      setOutputChallanges((prev) => prev + text);
    };
  
    const builtinRead = (x) => {
      if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles['files'][x] === undefined) {
        throw `File not found: '${x}'`;
      }
      return window.Sk.builtinFiles['files'][x];
    };
  
    const builtinRead1 = (x) => {
      if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles['files'][x] === undefined) {
        throw `File not found: '${x}'`;
      }
      return window.Sk.builtinFiles['files'][x];
    };
  
    const builtinReadChallanges = (x) => {
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
  
    // ✅ Fungsi untuk menjalankan pythonCode1 (Contoh 1) - Perbaikan disini
    const runit1 = (code, forceReset = false) => {
      setOutput1('Arah awal: 0.0\nArah setelah putaran: 90.0');
      const imports = "from turtle import *\nreset()\nshape('turtle')\n";
      const prog = forceReset ? imports : imports + pythonCode1;
  
      window.Sk.pre = "output1"; // ID untuk <pre> output
      window.Sk.configure({ output: outf1, read: builtinRead1 }); // ✅ Perbaikan: output => outf1
      (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-contoh1';
  
      window.Sk.misceval.asyncToPromise(() =>
        window.Sk.importMainWithBody('<stdin>', false, prog, true)
      ).then(
        () => console.log('Contoh 1 berhasil dijalankan!'),
        (err) => setOutput1((prev) => prev + err.toString())
      );
    };
  
  
    const runitchallanges = (code, forceReset = false) => {
      setOutputChallanges('');
      const imports = "from turtle import *\nreset()\nshape('turtle')\nspeed(2)\n";
      const prog = forceReset ? imports : imports + pythonCodeChallanges;
    
      window.Sk.pre = "outputChallanges";
      window.Sk.configure({ output: outfchallanges, read: builtinReadChallanges });
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
          ["left(90)","left(90)","print(heading())"], 
          ["right(90)","right(90)","print(heading())"],
          ["right(180)","print(heading())"],
          ["left(180)","print(heading())"],
      ];
  
      const userCodeLines = pythonCodeChallanges.trim().split("\n");
  
      // Cek apakah input pengguna merupakan bagian awal dari salah satu jawaban yang valid
      const isPartialMatch = validCodes.some(validCode =>
          validCode.slice(0, userCodeLines.length).every((code, index) => code === userCodeLines[index])
      );
  
      // Cek apakah input pengguna sudah benar secara keseluruhan
      const isExactMatch = validCodes.some(validCode =>
          validCode.length === userCodeLines.length && validCode.every((code, index) => code === userCodeLines[index])
      );
  
      if (isExactMatch) {
          // swal("Jawaban Benar!", "Kamu berhasil!", "success");
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
    //   runit2(); // Jalankan kode saat halaman dimuat
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
                Heading
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
              Mengetahui cara memeriksa arah pergerakan dari bidawang menggunakan heading().
              </li>
            </ol>

            <hr/>

            <p>
            Fungsi <code>heading()</code> digunakan untuk menampilkan arah pergerakan bidawang dalam satuan derajat. Sama seperti perintah sebelumnya (<i>Position()</i>) Untuk menampilkan hasilnya kita bisa menggunakan fungsi <code>print()</code>.
            </p>

            <ul>
              <li><strong>0°</strong>: Timur (Kanan Layar)</li>
              <li><strong>90°</strong>: Utara (Atas Layar)</li>
              <li><strong>180°</strong>: Barat (Kiri Layar)</li>
              <li><strong>270°</strong>: Selatan (Bawah Layar)</li>
            </ul>

            <br></br>

            <h5>Contoh:</h5>
            <p>Menampilkan posisi arah pergerakan dari bidawang sebelum dan sesudah berotasi:</p>
            <Row className="align-items-center">
              <Col md={6}>
                <CodeMirror
                  value={`# Periksa arah awal 
print("Arah awal:", heading()) 

# Putar turtle ke kiri sebesar 90 derajat 
left(90) 

# Periksa arah setelah putaran 
print("Arah setelah putaran:", heading()) `}
                  height="280px"
                  theme="light"
                  extensions={[python()]}
                  editable={false}
                  options={{ readOnly: 'nocursor' }}
                />
                <pre id='output1' className="output mt-2" style={{height:120}}>{output1}</pre>
              </Col>
              <Col md={6} className="text-center">
                <div className="canvas-section" style={{width:400,height:400,  textAlign:'center'}}>
                  <div style={{textAlign:'center'}} id="mycanvas-contoh1"></div>
                </div>
              </Col>
            </Row>
            <br></br>
            <p><b>Hasil:</b> Fungsi <code>heading()</code> digunakan untuk mendapatkan arah pergerakan dari bidawang, kemudian untuk menampilkan nilainya kita bisa menggunakan fungsi <code>print()</code>.</p>
            
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
              }}
            >
              <h4 style={{
                  color: '#2DAA9E',
                  fontSize: '22px',
                  fontWeight: 'bold',
                  borderLeft: '5px solid #2DAA9E',
                  paddingLeft: '10px',
                  marginBottom: '15px',
                }}>
                  Latihan Menggunakan heading() 🐢
                </h4>
            <p>
            Untuk lebih mudah memahami cara kerja perintah <code>xcor()</code> dan <code>ycor()</code>, ikuti instruksi dibawah ini
            </p>
            <Row>
              <Col xs={3} style={{ fontSize: 15 }}>
                <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
                  <AccordionItem eventKey="1a">
                    <AccordionHeader>
                      <b>1. Periksa Arah</b>
                      {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                    </AccordionHeader>
                    <AccordionBody>
                      <p>Periksa arah bidawang dengan menggunakan perintah dibawah ini:</p>
                      <pre><code>print(heading())</code></pre>
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem eventKey="1b">
                    <AccordionHeader>
                      <b>2. Berputar ke Kiri</b>
                      {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                    </AccordionHeader>
                    <AccordionBody>
                      <p>Kemudian lanjutkan lagi pada baris baru dengan perintah dibawah ini untuk memutar Bidawang ke kiri sebesar 90 derajat:</p>
                      <pre><code>left(90)</code></pre>
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem eventKey="1c">
                    <AccordionHeader>
                      <b>3. Periksa Arah</b>
                      {completedSteps.includes('1c') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                    </AccordionHeader>
                    <AccordionBody>
                      <p>Periksa lagi arah bidawang dengan perintah dibawah ini:</p>
                      <pre><code>print(heading())</code></pre>
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem eventKey="1d">
                    <AccordionHeader>
                      <b>4. Berputar ke Kanan</b>
                      {completedSteps.includes('1d') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                    </AccordionHeader>
                    <AccordionBody>
                      <p>Putar Bidawang ke kanan sebesar 180 derajat agar menghadap kebawah layar:</p>
                      <pre><code>right(180)</code></pre>
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem eventKey="1e">
                    <AccordionHeader>
                      <b>5. Periksa Arah</b>
                      {completedSteps.includes('1e') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                    </AccordionHeader>
                    <AccordionBody>
                      <p>Periksa lagi arah bidawang:</p>
                      <pre><code>print(heading())</code></pre>
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
                  height="250px"
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
                <pre id='output' className="output" style={{height:100}}>{output}</pre>
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
              }}
            >
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
            Perintah <code>heading()</code> berguna untuk memantau arah gerakan bidawang dengan lebih tepat. Pemahaman tentang sistem derajat akan membantu siswa menggambar bentuk dan pola secara lebih akurat. 
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
                        // fontWeight: "bold",
                        borderRadius: "5px"
                      }}>
                        1. Dalam canvas Bidawang, arah 0 derajat mengarah ke mana? 
                      </Form.Label>
                      <div className="row d-flex">
                    {[
                      "Utara (atas).",
                      "Timur (kanan).",
                      "Barat (kiri).",
                      "Selatan (bawah)."
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
                        2. Apa hasil dari perintah berikut jika turtle sudah diputar 90 derajat ke kiri?  <pre>print(heading())</pre> 
                      </Form.Label>
                      <div className="row d-flex">
                      {["0", 
                      "90", 
                      "180", 
                      "270"].map(
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

                <div className="mb-3 mt-3">
                <label className="me-2"><b>X</b> :</label>
                <input type="text" value={inputA} onChange={(e) => setInputA(e.target.value)} />
                <Button className="ms-3" variant="primary" onClick={checkAnswer}>
                  Periksa Jawaban
                </Button>
                </div>

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
                    <pre id='outputChallanges' className="output" style={{height:60}}>{outputChallanges}</pre>
                  </div>
                  <div className="canvas-section" style={{ position: "relative", width: 400, height: 400,  }}>
                    <div id="mycanvas-challanges" style={{ 
                      width: 400, 
                      height: 400, 
                      position: "relative", 
                    }}></div>
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

export default Heading
