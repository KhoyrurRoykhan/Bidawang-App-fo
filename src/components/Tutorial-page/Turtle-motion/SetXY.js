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
import map from './assets/4-setx-sety-tilemap.png';
import grid from './assets/3-setposition-b.png';
import { useNavigate } from "react-router-dom";

const correctCommands = {
  '1a': 'setx(100)',
  '1b': 'sety(-50)',
  '1c': 'setx(0) '
};

const SetXY = () => {
  //hh
  const showHint = () => {
    swal(
      "Petunjuk Tantangan",
      "Bidawang saat ini berada di tengah layar (titik (0, 0)), sedangkan cacing berada di titik (100, 100). \n\n" +
      "Tugas kalian adalah memindahkan posisi Bidawang menuju ke posisi cacing dengan menggunakan perintah setx dan sety. \n\n",
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
    question1: "Posisi baru menjadi (200, 50).",
    question2: "sety(-50)"
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
  setx(100)
  speed(0)
  home()
  reset()

`);
  const [pythonCode2, setPythonCode2] = useState(`

for i in range(100):
  speed(1)
  sety(150)
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

  const runitchallanges = (code, forceReset = false) => {
    setOutput('');
    const imports = "from turtle import *\nreset()\nshape('turtle')\nspeed(2)\n";
    const prog = forceReset ? imports : imports + pythonCodeChallanges;
  
    window.Sk.pre = "output4";
    window.Sk.configure({ output: outf, read: builtinRead });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-challanges';
  
    window.Sk.misceval.asyncToPromise(() =>
      window.Sk.importMainWithBody('<stdin>', false, prog, true)
    ).then(
      () => {
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
      ["setx(100)", "sety(100)"],
      ["sety(100)", "setx(100)"]
    ];
  
    const userCodeLines = pythonCodeChallanges.trim().split("\n").map(line => line.trim()).filter(line => line !== "");
    if (userCodeLines.length === 0) return;
  
    const step1 = userCodeLines[0];
  
    // Validasi step 1
    if (!step1.startsWith("setx(") && !step1.startsWith("sety(")) {
      return swal("Salah", "Anda harus menggunakan setx atau sety di langkah pertama", "error").then(() => {
        setPythonCodeChallanges('');
        initializeTurtle();
      });
    }
  
    if (!step1.includes("(100)")) {
      return swal("Salah", "Koordinat yang Anda masukkan salah pada langkah pertama", "error").then(() => {
        setPythonCodeChallanges('');
        initializeTurtle();
      });
    }
  
    // Kalau user sudah menulis step ke-2
    if (userCodeLines.length > 1) {
      const step2 = userCodeLines[1];
      const isFirstSetx = step1.startsWith("setx");
      const isSecondSetx = step2.startsWith("setx");
      const isSecondSety = step2.startsWith("sety");
  
      if (!(isSecondSetx || isSecondSety)) {
        return swal("Salah", "Gunakan setx atau sety di langkah kedua", "error").then(() => {
          setPythonCodeChallanges('');
          initializeTurtle();
        });
      }
  
      if (isFirstSetx && isSecondSetx) {
        return swal("Salah", "Gunakan sety pada langkah kedua", "error").then(() => {
          setPythonCodeChallanges('');
          initializeTurtle();
        });
      }
  
      if (!isFirstSetx && isSecondSety) {
        return swal("Salah", "Gunakan setx pada langkah kedua", "error").then(() => {
          setPythonCodeChallanges('');
          initializeTurtle();
        });
      }
  
      if (!step2.includes("(100)")) {
        return swal("Salah", "Koordinat yang Anda masukkan salah pada langkah kedua", "error").then(() => {
          setPythonCodeChallanges('');
          initializeTurtle();
        });
      }
    }
  
    // Cek apakah semua langkah sudah benar
    const isCorrect = validCodes.some(valid =>
      valid.length === userCodeLines.length &&
      valid.every((line, idx) => line === userCodeLines[idx])
    );
  
    if (isCorrect) {
      swal("Benar!", "Kamu berhasil menyelesaikan tantangan!", "success");
    }
  };
  
  

  const initializeTurtle = () => {
    const initCode = `from turtle import *
reset()
shape("turtle")
speed(2)`;
  
    window.Sk.pre = "output4";
    window.Sk.configure({ output: outf, read: builtinRead });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-challanges';
  
    window.Sk.misceval.asyncToPromise(() =>
      window.Sk.importMainWithBody("<stdin>", false, initCode, true)
    ).then(() => {
      console.log("Turtle initialized to default state.");
    });
  };


  const resetCode = () => {
    setPythonCode('');
    setOutput('');
    runit('', true);
};

const resetCodeChallanges = () => {
  setPythonCodeChallanges('');
  setOutput('');
  initializeTurtle(); // Reset posisi turtle
};


  useEffect(() => {
    runit(); // Jalankan kode saat halaman dimuat
    runit1(); // Jalankan kode saat halaman dimuat
    runit2(); // Jalankan kode saat halaman dimuat
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
        }}>
          Setx & Sety
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
          Memahami cara mengatur posisi bidawang pada sumbu x dan y secara terpisah menggunakan `setx()` dan `sety()`.
          </li>
        </ol>

        <hr/>

        <p>
        Fungsi <b>setx()</b> dan <b>sety()</b> digunakan untuk memindahkan Bidawang ke posisi tertentu hanya pada sumbu x (<b>setx()</b>) atau sumbu y (<b>sety()</b>), tanpa mengubah koordinat lainnya. Perintah ini berguna untuk memindahkan turtle secara horizontal atau vertikal.
        </p>

        <h5>1. setx(<i>koordinat x</i>)</h5>
        <p>Memindahkan Bidawang ke posisi x yang ditentukan, tanpa mengubah posisi pada sumbu y.</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Pindahkan turtle ke posisi x = 100, 
# tanpa mengubah posisi y
setx(100)`}
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
        <p><b>Hasil:</b> Posisi awal Bidawang adalah x=0,y=0. Setelah dijalankan kode tersebut maka nilai x akan menjadi 100. Dan Bidawang akan berpindah ke titik x=100,y=0</p>
        
        <br></br>

        <h5>2. sety(<i>koordinat y</i>)</h5>
        <p>Memindahkan Bidawang ke posisi y yang ditentukan, tanpa mengubah posisi pada sumbu x.</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Pindahkan turtle ke posisi y = 150, 
# tanpa mengubah posisi x
sety(150)`}
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
        <p><b>Hasil:</b> Posisi awal bidawang adalah x=0,y=0. Setelah dijalankan kode tersebut maka nilai y akan menjadi 150. Dan bidawang akan berpindah ke titik x=0,y=150.</p>

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
            Latihan Menggunakan setx() dan sety() 🐢
          </h4>
        <p>
        Untuk lebih mudah memahami cara kerja perintah <code>setx()</code> dan <code>sety()</code>, ikuti instruksi dibawah ini
        </p>
        <Row>
          <Col xs={3} style={{ fontSize: 15 }}>
            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
              <AccordionItem eventKey="1a">
                <AccordionHeader>
                  <b>1. Ubah titik X</b>
                  {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Ubah nilai titik X bidawang yang awaknya berada di titik awal (0,0) ubah titik X nya menjadi 100 dengan perintah dibawah ini: </p>
                  <pre><code>setx(100)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1b">
                <AccordionHeader>
                  <b>2. Ubah titik Y</b>
                  {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Kemudian lanjutkan pada baris baru untuk mengubah nilai titik Y menjadi -50 dengan perintah dibawah ini: </p>
                  <pre><code>sety(-50)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1c">
                <AccordionHeader>
                  <b>3. Ubah titik X </b>
                  {completedSteps.includes('1c') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Lalu ubah lagi nilai titik X menjadi 0 dengan perintah dibawah ini: </p>
                  <pre><code>setx(0)</code></pre>
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
          Perintah <code>setx()</code> dan <code>sety()</code> digunakan untuk memindahkan Bidawang secara horizontal atau vertikal tanpa mengubah koordinat lainnya. Perintah ini berguna untuk memindahkan Bidawang ke posisi yang diinginkan dengan lebih fleksibel, terutama saat mengatur pola atau jalur yang spesifik.
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
                  1. Apa hasil dari perintah setx(200) jika posisi awal turtle adalah (100,50)? 
                </Form.Label>
                <div className="row d-flex">
                {[
                  "Posisi baru menjadi (200, 50).",
                  "Posisi baru menjadi (100, 200).",
                  "Posisi baru menjadi (200, 200).",
                  "Posisi baru tetap (100, 50). "
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
                  2. Jika Anda ingin memindahkan turtle secara vertikal ke posisi y = -50 tanpa mengubah posisi x, perintah apa yang harus digunakan?
                  </Form.Label>
                  <div className="row d-flex">
                  {["sety(-50)", 
                  "setx(-50)", 
                  "setposition(-50, 0)", 
                  "home()"].map(
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
            <p>
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
                      src={broccoli}
                      alt="Target Broccoli"
                      style={{
                        position: "absolute",
                        left: "275px",
                        top: "75px",
                        width: "50px", // Sesuaikan ukuran jika perlu
                        height: "50px",
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

export default SetXY
