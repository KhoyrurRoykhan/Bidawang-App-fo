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
import broccoli from './assets/cacingtarget.png';
import targetA from './assets/cacing-target-1.png';
import targetB from './assets/cacing-target-2.png';
import targetC from './assets/cacing-target-3.png';
import targetD from './assets/cacing-target-4.png';
import map from './assets/3-setposition-b.png';
import tilemap from './assets/3-setposition-tilemap.png';
import maptitik from './assets/3-setposition-a-titik.png';
import { useNavigate } from "react-router-dom";

const correctCommands = {
  '1a': 'setposition(100,100)',
  '1b': 'setposition(0,100)'
};

const SetPosition = () => {
  const showHint = () => {
    swal(
      "Petunjuk Tantangan",
      "Bidawang saat ini berada di tengah layar (titik (0, 0)). \n\n" +
      "Tugas kalian adalah memindahkan posisi Bidawang menuju ke 4 posisi yang sudah di tandai pada canvas secara berurutan dengan menggunakan perintah setposition(). \n\n",
      "info"
    );
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
    question1: "Memindahkan bidawang ke koordinat tertentu dalam ruang gambar.",
    question2: "(50, 100)"
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
  setposition(100,100)
  speed(0)
  home()
  reset()

`);

  const [pythonCodeChallanges, setPythonCodeChallanges] = useState(``);
  const [currentStep, setCurrentStep] = useState(0); // Track the current step
  const [output, setOutput] = useState('');
  const pythonCodeRef = useRef('');


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


  const runitchallanges = (code, forceReset = false, skipCheck = false) => {
    setOutput('');
    const imports = "from turtle import *\nreset()\nshape('turtle')\nspeed(0)\npenup()\nsetposition(-100,-100)\nspeed(2)\npendown()\n";
    const prog = forceReset ? imports : imports + pythonCodeChallanges;
  
    window.Sk.pre = "output4";
    window.Sk.configure({ output: outf, read: builtinRead });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-challanges';
  
    window.Sk.misceval.asyncToPromise(() =>
      window.Sk.importMainWithBody('<stdin>', false, prog, true)
    ).then(
      () => {
        console.log('success');
        if (!skipCheck) {
          checkCodeChallanges(); // Langsung panggil tanpa syarat
        }
      },
      (err) => setOutput((prev) => prev + err.toString())
    );
  };
  

  const [hasRun, setHasRun] = useState(false);

  const checkCodeChallanges = () => {
    const validCode = [
      "setposition(100,-100)",
      "setposition(100,0)",
      "setposition(0,100)",
      "setposition(-100,0)",
      "setposition(-100,-100)",
    ];
  
    // Bersihkan dan buang baris kosong
    const userCodeLines = pythonCodeRef.current
      .trim()
      .split("\n")
      .map(line => line.trim())
      .filter(line => line !== ""); // ← Skip baris kosong
  
    for (let i = 0; i < userCodeLines.length; i++) {
      const line = userCodeLines[i];
  
      if (!line.startsWith("setposition")) {
        swal("Salah", "Anda harus menggunakan setposition", "error").then(() => {
          pythonCodeRef.current = '';
          resetCodeChallanges();
        });
        return;
      }
  
      if (line !== validCode[i]) {
        swal("Salah", "Posisi x y yang anda masukan tidak tepat", "error").then(() => {
          pythonCodeRef.current = '';
          resetCodeChallanges();
        });
        return;
      }
    }
  
    // Jika semua langkah yang dimasukkan benar, tapi tidak perlu cek panjang sama persis
    if (userCodeLines.length + currentStep === validCode.length) {
      swal("Benar!", "Kamu berhasil menyelesaikan tantangan!", "success");
    }
  };
  
  
  

const initializeTurtle = () => {
  const imports = "from turtle import *\nshape('turtle')\n";
  const initialPosition = "reset()\nspeed(0)\npenup()\nsetpos(-100, -100)\npendown()\nspeed(2)\n"; // Set initial position
  const prog = imports + initialPosition;

  window.Sk.pre = "output";
  window.Sk.configure({ output: outf, read: builtinRead });
  (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-challanges';

  window.Sk.misceval.asyncToPromise(() => 
    window.Sk.importMainWithBody('<stdin>', false, prog, true)
  ).then(
    () => {},
    (err) => setOutput((prev) => prev + err.toString())
  );
};


  const resetCode = () => {
    setPythonCode('');
    setOutput('');
    runit('', true);
};

const resetCodeChallanges = () => {
  setPythonCodeChallanges('');
  pythonCodeRef.current = '';
  setCurrentStep(0);
  setOutput('');
  setHasRun(false);
  runitchallanges('', true, true); // <- kirim skipCheck = true
};


  useEffect(() => {
    runit();
    runit1(); // Jalankan kode saat halaman dimuat
    initializeTurtle(); // Jalankan kode saat halaman dimuat
  }, []);

  return (
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
          Setposition
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
            Memahami cara mengatur posisi Bidawang secara langsung menggunakan `setposition()`.
          </li>
        </ol>

        <hr/>

        <p>
        Perintah `setposition()` (bisa juga disingkat `setpos()`) digunakan untuk memindahkan Bidawang ke titik tertentu dalam ruang canvas, berdasarkan koordinat yang ditentukan. Saat perintah ini digunakan, Bidawang akan menggambar jalur dari posisi sebelumnya ke posisi baru.
        </p>

        <h5>Contoh:</h5>
        <p>Memindahkan Bidawang ke koordinat <code>(<i>x</i> = 100, <i>y</i> = 100)</code> dalam ruang canvas.</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Pindahkan Bidawang ke koordinat (100, 100)
setposition(100, 100)`}
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
        <p><b>Hasil:</b> Bidawang akan bergerak ke posisi x=100 dan y=100.</p>
        
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
            Latihan Menggunakan setposition() 🐢
          </h4>
          <p>
          Untuk lebih mudah memahami cara kerja perintah <code>setposition()</code>, ikuti instruksi dibawah ini
          </p>
          <Row>
            <Col xs={3} style={{ fontSize: 15 }}>
              <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
                <AccordionItem eventKey="1a">
                  <AccordionHeader>
                    <b>1. Berpindah posisi</b>
                    {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                  </AccordionHeader>
                  <AccordionBody>
                    <p>Ubah posisi bidawang yang berada di titik awal menjadi ke titik (100,100) dengan perintah dibawah ini: </p>
                    <pre><code>setposition(100,100)</code></pre>
                  </AccordionBody>
                </AccordionItem>
                <AccordionItem eventKey="1b">
                  <AccordionHeader>
                    <b>2. Berpindah posisi</b>
                    {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                  </AccordionHeader>
                  <AccordionBody>
                    <p>Lanjutkan pada baris baru untuk mengubah posisi bidawang lagi ke titik (0,100) dengan perintah dibawah ini: </p>
                    <pre><code>setposition(0,100)</code></pre>
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
          }}
        >
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
          Perintah `setposition()` atau `setpos()` digunakan untuk memindahkan Bidawang ke koordinat tertentu dalam ruang canvas. Perintah ini sangat berguna untuk mengatur posisi awal Bidawang atau membuat jalur menggambar yang kompleks dengan mengombinasikan pergerakan dan kontrol pena.
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
                  fontWeight: "bold",
                  borderRadius: "5px"
                }}>
                  1. Apa fungsi utama dari perintah setposition(x, y)?
                </Form.Label>
                <div className="row d-flex">
                {[
                  "Mengatur warna garis.",
                  "Memutar turtle ke arah tertentu.",
                  "Memindahkan bidawang ke koordinat tertentu dalam ruang gambar.",
                  "Mengubah ukuran turtle."
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
                }}>
                  2. Jika posisi awal Bidawang adalah (0, 0), dan Anda menggunakan perintah setposition(50, 100), di mana posisi akhir Bidawang?
                </Form.Label>
                <div className="row d-flex">
                  {["(100, 50)", 
                  "(50, 0)", 
                  "(0, 100)", 
                  "(50, 100)"].map(
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
        <Accordion.Header><h4 style={{ color: "#2DAA9E", fontWeight: "bold" }}>Tantangan</h4></Accordion.Header>
          <Accordion.Body>
            <p style={{ fontSize: "16px", marginBottom: "10px" }}>
            Selesaikan tantangan dibawah ini!
            Klik tombol petunjuk untuk menampilkan petujuk pengerjaan.
            </p>
            <Button className=" mb-2" variant="info" onClick={showHint}>
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
                  onChange={(value) => {
                    setPythonCodeChallanges(value);
                    pythonCodeRef.current = value;
                  }}                  
                  style={{
                    border: "2px solid #2DAA9E",
                    borderRadius: "8px",
                    padding: "5px",
                  }}
                />
                <div style={{ marginTop: '5px', marginBottom: '5px', display: 'flex', gap: '10px' }}>
                  <Button variant="success" onClick={() => { runitchallanges() }}>Run Code</Button>
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
                  }}>
                  {output}
                </pre>
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
                      src={targetA}
                      alt="Target Broccoli"
                      style={{
                        position: "absolute",
                        left: "275px",
                        top: "75px",
                        width: "50px", // Sesuaikan ukuran jika perlu
                        height: "50px",
                      }}
                  />
                  <img
                      src={targetB}
                      alt="Target Broccoli"
                      style={{
                        position: "absolute",
                        left: "175px",
                        top: "75px",
                        width: "50px", // Sesuaikan ukuran jika perlu
                        height: "50px",
                      }}
                  />
                  <img
                      src={targetC}
                      alt="Target Broccoli"
                      style={{
                        position: "absolute",
                        left: "75px",
                        top: "75px",
                        width: "50px", // Sesuaikan ukuran jika perlu
                        height: "50px",
                      }}
                  />
                  <img
                      src={targetD}
                      alt="Target Broccoli"
                      style={{
                        position: "absolute",
                        left: "75px",
                        top: "275px",
                        width: "50px", // Sesuaikan ukuran jika perlu
                        height: "50px",
                      }}
                  /> */}
                  {/* <img
                      src={map}
                      alt="Map"
                      style={{
                        position: "absolute",
                        left: "0px",
                        top: "0px",
                        width: "400px", // Sesuaikan ukuran jika perlu
                        height: "400px",
                      }}
                  /> */}
                  <img
                      src={tilemap}
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
                      src={maptitik}
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
      </Accordion>
      </div>
    </div>
  )
}

export default SetPosition
