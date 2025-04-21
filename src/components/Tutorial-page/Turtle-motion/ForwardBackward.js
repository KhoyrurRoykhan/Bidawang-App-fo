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
import peringatan from './assets/peringatan.gif';
// Challange
import swal from 'sweetalert'; // Import SweetAlert
import papuyu from './assets/papuyu-1.png';
import broccoli from './assets/cacingtarget.png';
import map from './assets/2-forward-backward-b.png';
import tilemap from './assets/2-forward-backward-tilemap.png';
import { useNavigate } from "react-router-dom";

const correctCommands = {
  '1a': 'forward(100)',
  '1b': 'backward(50)',
  '1c': 'backward(100)'
};

const ForwardBackward = () => {
  // hint challanges
  const showHint = () => {
    swal(
      "Petunjuk Tantangan",
      "Bidawang saat ini berada di tengah layar (titik (0, 0)), sedangkan cacing berada di titik (100, 100). \n\n" +
      "1. Gerakan Bidawang menuju ke posisi cacing tanpa menabrak dinding.\n 2. Gunakan forward() atau backward() lalu kombinasikan dengan left() atau right() untuk membuat bidawang berbelok arah. \n\n",
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
    question1: "forward(150)",
    question2: "Ke timur"
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
  forward(100)
  speed(0)
  home()
  reset()

`);
  const [pythonCode2, setPythonCode2] = useState(`

for i in range(100):
  speed(1)
  backward(150)
  speed(0)
  home()
  reset()

`);

  const [pythonCodeChallanges, setPythonCodeChallanges] = useState(``);
  const [currentStep, setCurrentStep] = useState(0); // Track the current step
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

  const runitchallanges = (code = '', forceReset = false) => {
    setOutput('');
    const imports = "from turtle import *\nreset()\nshape('turtle')\nspeed(0)\npenup()\nsetposition(-100,-100)\npendown()\nspeed(2)\n";
    const prog = forceReset ? imports : imports + code;
  
    window.Sk.pre = "output4";
    window.Sk.configure({ output: outf, read: builtinRead });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-challanges';
  
    window.Sk.misceval.asyncToPromise(() =>
      window.Sk.importMainWithBody('<stdin>', false, prog, true)
    ).then(
      () => {
        if (!forceReset && code.trim().length > 0) {
          setHasRun(true);
          checkCodeChallanges(code); // Panggil dengan kode aktual
        }
      },
      (err) => setOutput((prev) => prev + err.toString())
    );
  };

  const [hasRun, setHasRun] = useState(false);

  const validCode = ["forward(200)", "left(90)", "forward(200)", "left(90)", "forward(200)"];

const checkCodeChallanges = (userCode) => {
  const trimmedCode = userCode.trim();
  if (!trimmedCode) return;

  const userCodeLines = trimmedCode
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== ""); // <--- Skip baris kosong

  const linesToCheck = userCodeLines.slice(currentStep);

  const forwardRegex = /^forward\((\d+)\)$/;
  const leftRegex = /^left\((\d+)\)$/;

  let step = currentStep;

  for (let i = 0; i < linesToCheck.length; i++) {
    const currentLine = linesToCheck[i];

    if (step >= validCode.length) break;

    // STEP 0, 2, 4 → forward(200)
    if ([0, 2, 4].includes(step)) {
      const match = currentLine.match(forwardRegex);
      if (match) {
        const value = parseInt(match[1]);
        if (value < 200) {
          return swal("Salah", "Pergerakan bidawang kurang jauh", "error").then(() => {
            initializeTurtle();
            setCurrentStep(0);
            setPythonCodeChallanges('');
            setHasRun(false);
          });
        } else if (value > 200) {
          return swal("Salah", "Bidawang keluar jalur", "error").then(() => {
            initializeTurtle();
            setCurrentStep(0);
            setPythonCodeChallanges('');
            setHasRun(false);
          });
        }
      } else {
        return swal("Salah", "Perintah yang anda masukkan salah", "error").then(() => {
          initializeTurtle();
          setCurrentStep(0);
          setPythonCodeChallanges('');
          setHasRun(false);
        });
      }
    }

    // STEP 1, 3 → left(90)
    else if ([1, 3].includes(step)) {
      const match = currentLine.match(leftRegex);
      if (match) {
        const value = parseInt(match[1]);
        if (value < 90) {
          return swal("Salah", "Sudut kurang besar", "error").then(() => {
            initializeTurtle();
            setCurrentStep(0);
            setPythonCodeChallanges('');
            setHasRun(false);
          });
        } else if (value > 90) {
          return swal("Salah", "Sudut terlalu besar", "error").then(() => {
            initializeTurtle();
            setCurrentStep(0);
            setPythonCodeChallanges('');
            setHasRun(false);
          });
        }
      } else {
        return swal("Salah", "Perintah yang anda masukkan salah", "error").then(() => {
          initializeTurtle();
          setCurrentStep(0);
          setPythonCodeChallanges('');
          setHasRun(false);
        });
      }
    }

    step++;
  }

  setCurrentStep(step);
  console.log("Step setelah cek:", step);

  if (step >= validCode.length) {
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
  setCurrentStep(0);
  setOutput('');
  setHasRun(false); // <- Penting agar tidak menjalankan evaluasi otomatis
  runitchallanges('', true);
};


  useEffect(() => {
    runit(); // Jalankan kode saat halaman dimuat
    runit1(); // Jalankan kode saat halaman dimuat
    runit2(); // Jalankan kode saat halaman dimuat
    runitchallanges(); // Jalankan kode saat halaman dimuat
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
          Forward & Backward
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
            Memahami cara menggerakkan Bidawang ke depan dan ke belakang menggunakan forward() dan backward().
          </li>
        </ol>

        <hr/>

        <p>
        Perintah `forward()` dan `backward()` digunakan untuk menggerakkan Bidawang ke arah depan (forward) searah arah yang sedang dihadapi Bidawang dan belakang (backward) berlawanan arah dengan yang sedang dihadapi Bidawang, berdasarkan jarak yang ditentukan dalam satuan piksel (pixel).
        </p>

        <h5>1. forward(<i>jarak</i>)</h5>
        <p>Menggerakkan Bidawang ke depan sejauh jarak yang ditentukan (dalam piksel), dalam arah yang sedang dihadapi oleh Bidawang.</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Gerakkan turtle ke depan sejauh 100 piksel
forward(100)`}
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
        <p><b>Hasil:</b> Bidawang akan bergerak sejauh 100 ke arah yang dihadapnya.</p>
        
        <br></br>

        <h5>2. backward(<i>jarak</i>)</h5>
        <p>Menggerakkan Bidawang ke belakang sejauh jarak yang ditentukan (dalam piksel), dalam arah berlawanan dengan arah yang sedang dihadapi oleh bidawang.</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Gerakkan turtle ke belakang sejauh 150 piksel
backward(150)`}
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
        <p><b>Hasil:</b> Bidawang akan mundur sejauh 100 dari arah yang dihadapnya.</p>

        <br />
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
            Latihan Menggunakan forward() dan backward() 🐢
          </h4>
          <p>
          Untuk lebih mudah memahami cara kerja perintah <code>forward()</code> dan <code>backward()</code>, ikuti instruksi dibawah ini
          </p>
          <Row>
            <Col xs={3} style={{ fontSize: 15 }}>
              <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
                <AccordionItem eventKey="1a">
                  <AccordionHeader>
                    <b>1. Maju</b>
                    {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                  </AccordionHeader>
                  <AccordionBody>
                    <p>Gerakkan Bidawang maju sejauh 100 langkah dengan perintah dibawah ini:</p>
                    <pre><code>forward(100)</code></pre>
                  </AccordionBody>
                </AccordionItem>
                <AccordionItem eventKey="1b">
                  <AccordionHeader>
                    <b>2. Mundur</b>
                    {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                  </AccordionHeader>
                  <AccordionBody>
                    <p>Kemudian lanjutkan lagi pada baris baru dengan perintah dibawah ini untuk membuat Bidawang mundur 50 langkah: </p>
                    <pre><code>backward(50)</code></pre>
                  </AccordionBody>
                </AccordionItem>
                <AccordionItem eventKey="1c">
                  <AccordionHeader>
                    <b>3. Mundur</b>
                    {completedSteps.includes('1c') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                  </AccordionHeader>
                  <AccordionBody>
                    <p>Gerakkan lagi bidawang mundur sejauh 100 langkah:</p>
                    <pre><code>backward(100)</code></pre>
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
            Perintah <code>forward()</code> dan <code>backward()</code> digunakan untuk menggerakkan Bidawang ke depan atau ke belakang sejauh jarak yang ditentukan dalam piksel. Perintah <code>forward()</code> dan <code>backward()</code> sering dikombinasikan dengan perintah rotasi seperti `left()` dan `right()` untuk membuat pola atau gambar yang lebih kompleks.
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
                  }}
                >
                  1. Perintah apa yang digunakan untuk menggerakkan turtle ke depan sejauh 150 piksel?
                </Form.Label>
                <div className="row d-flex">
                {[
                  "backward(150)",
                  "forward(150)",
                  "left(150)",
                  "right(150)"
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
                  }}
                >
                  2. Jika turtle menghadap ke barat dan Anda menggunakan perintah backward(100), ke arah mana turtle akan bergerak
                </Form.Label>
                <div className="row d-flex">
                  {["Ke barat", 
                  "Ke timur", 
                  "Ke utara", 
                  "Ke Selatan"].map(
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
                <div style={{ marginTop: '5px', display: 'flex', gap: '10px' }}>
                <Button variant="success" onClick={() => runitchallanges(pythonCodeChallanges)}>Run Code</Button>
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
                {/* Conditional rendering of warning images based on currentStep */}
                {currentStep === 1 && (
                  <img
                    src={peringatan}
                    alt="warning"
                    style={{
                      position: "absolute",
                      left: "330px",
                      top: "280px",
                      width: "40px",
                      height: "40px",
                      zIndex: 10,
                    }}
                  />
                )}
                {currentStep === 3 && (
                  <img
                    src={peringatan}
                    alt="warning"
                    style={{
                      position: "absolute",
                      left: "280px",
                      top: "35px",
                      width: "40px",
                      height: "40px",
                      zIndex: 10,
                    }}
                  />
                )}
                

                <img
                  src={tilemap}
                  alt="Map"
                  style={{
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                    width: "400px",
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
                    width: "400px",
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

export default ForwardBackward
