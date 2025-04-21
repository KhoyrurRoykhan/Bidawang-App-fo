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
import ikan from './assets/ikan.png';
import sawi from './assets/sawi.png';
import map from './assets/1-position.png';
import grid from './assets/grid.png';
import { useNavigate } from "react-router-dom";

const correctCommands = {
  '1a': 'print(position())',
  '1b': 'forward(150)',
  '1c': 'print(position())',
  '1d': 'setposition(75,75)',
  '1e': 'print(position())',
  '1f': 'home()'

};

const Position = () => {
  // hint challanges
  const showHint = () => {
    swal(
      "Petunjuk Tantangan",
      "Tugas kalian adalah memeriksa jarak target dari posisi bidawang, kemudian bergerak lah ke arah target sesuai dengan jarak yang sudah di dapatkan",
      "info"
    );
  };

  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");

  const checkAnswer = () => {
    const correctAnswersA = ["(-100.0, 100.0)", "(-100, 100)", "(-100,100)"];
    const correctAnswersB = ["(-150.0, -100.0)", "(-150, -100)", "(-150,-100)"];
    
    if (correctAnswersA.includes(inputA) && correctAnswersB.includes(inputB)) {
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
    question1: "Memberitahu posisi turtle saat ini dalam bentuk koordinat (x, y).",
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

for i in range(1):
  speed(1)
  #  Menampilkan posisi saat ini dari bidawang
  speed(0)
  home()
  reset()
`);

const [pythonCode2, setPythonCode2] = useState(`

for i in range(1):
  speed(1)
  # Posisi awal 
  # Gerakkan turtle ke depan sejauh 100 satuan 
  forward(100) 
  # Cek posisi baru 
  speed(0)
`);

  const [pythonCodeChallanges, setPythonCodeChallanges] = useState(``);

  const [output, setOutput] = useState('');
  const [output1, setOutput1] = useState('');
  const [output2, setOutput2] = useState('');
  const [outputChallanges, setOutputChallanges] = useState('');

  const outf = (text) => {
    setOutput((prev) => prev + text);
  };

  const outf1 = (text) => {
    setOutput1((prev) => prev + text);
  };

  const outf2 = (text) => {
    setOutput2((prev) => prev + text);
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

  const builtinRead2 = (x) => {
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

  // ✅ Fungsi untuk menjalankan pythonCode1 (Contoh 1) - Perbaikan disini
  const runit1 = (code, forceReset = false) => {
    setOutput1('(0.0, 0.0)');
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

  const runit2 = (code, forceReset = false) => {
    setOutput2('Posisi awal: (0.0, 0.0) \nPosisi setelah bergerak: (100.0, 0.0)');
    const imports = "from turtle import *\nreset()\nshape('turtle')\n";
    const prog = forceReset ? imports : imports + pythonCode2;
  
    window.Sk.pre = "output2";
    window.Sk.configure({ output: outf2, read: builtinRead2 });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-contoh2';
  
    window.Sk.misceval.asyncToPromise(() => 
        window.Sk.importMainWithBody('<stdin>', false, prog, true)
    ).then(
        () => console.log('Contoh 2 berhasil dijalankan!'),
        (err) => setOutput((prev) => prev + err.toString())
    );
  };


  const [isResetting, setIsResetting] = useState(false);

  const runitchallanges = (code, forceReset = false) => {
    setOutputChallanges('');
    if (forceReset) setIsResetting(true);
  
    const imports = "from turtle import *\nreset()\nshape('turtle')\nspeed(2)\n";
    const prog = forceReset ? imports : imports + (code || pythonCodeChallanges);
  
    window.Sk.pre = "outputChallanges";
    window.Sk.configure({ output: outfchallanges, read: builtinReadChallanges });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-challanges';
  
    window.Sk.misceval.asyncToPromise(() =>
      window.Sk.importMainWithBody('<stdin>', false, prog, true)
    ).then(
      () => {
        setHasRun(true);
  
        // ❌ Jangan validasi jika sedang reset
        if (!forceReset && !isResetting) {
          checkCodeChallanges();
        }
  
        // ✅ Matikan flag reset setelah jalan
        if (forceReset) setIsResetting(false);
      },
      (err) => {
        setOutput((prev) => prev + err.toString());
        if (forceReset) setIsResetting(false);
      }
    );
  };

  const [hasRun, setHasRun] = useState(false);

  const checkCodeChallanges = () => {
    if (!hasRun) return;
  
    const correctSteps = [
      { cmd: "left", val: 90 },
      { cmd: "forward", val: 100 },
      { cmd: "left", val: 90 },
      { cmd: "forward", val: 100 },
      { cmd: "print", val: "position()" },
      { cmd: "forward", val: 50 },
      { cmd: "left", val: 90 },
      { cmd: "forward", val: 200 },
      { cmd: "print", val: "position()" }
    ];
  
    // Bersihkan baris dan buang baris kosong
    const userLines = pythonCodeChallanges
      .trim()
      .split("\n")
      .map(line => line.trim())
      .filter(line => line !== ""); // ← ini yang penting
  
    const showStepError = (stepIndex, message) => {
      swal("Salah!", `Langkah ke-${stepIndex + 1}: ${message}`, "error").then(() => resetCodeChallanges());
    };
  
    const isMatchingCommand = (line, expected) => {
      const match = line.match(/(\w+)\s*\((\d+)\)/);
      if (!match) return { valid: false, message: "Format perintah tidak dikenali." };
  
      const [_, cmd, valStr] = match;
      const val = parseInt(valStr);
  
      const equivalent = {
        left: {
          90: { cmd: "right", val: 270 },
          180: { cmd: "right", val: 180 },
          270: { cmd: "right", val: 90 }
        },
        right: {
          90: { cmd: "left", val: 270 },
          180: { cmd: "left", val: 180 },
          270: { cmd: "left", val: 90 }
        }
      };
  
      const isExactMatch = cmd === expected.cmd && val === expected.val;
      const isEquivalentMatch =
        equivalent[expected.cmd]?.[expected.val]?.cmd === cmd &&
        equivalent[expected.cmd]?.[expected.val]?.val === val;
  
      if (!isExactMatch && !isEquivalentMatch) {
        return { valid: false, message: `Gunakan ${expected.cmd}(${expected.val}) atau ekuivalennya.` };
      }
  
      return { valid: true };
    };
  
    const isMatchingPrint = (line, expectedVal) => {
      if (!line.startsWith("print")) {
        return { valid: false, message: `Gunakan perintah print(${expectedVal}).` };
      }
  
      const inside = line.match(/print\s*\((.*)\)/);
      if (!inside || inside[1].replace(/\s+/g, '') !== expectedVal) {
        return { valid: false, message: `Isi print harus print(${expectedVal}).` };
      }
  
      return { valid: true };
    };
  
    for (let i = 0; i < userLines.length; i++) {
      const line = userLines[i];
      const expectedStep = correctSteps[i];
  
      if (!expectedStep) {
        return showStepError(i, "Langkah ini tidak diperlukan.");
      }
  
      const result = expectedStep.cmd === "print"
        ? isMatchingPrint(line, expectedStep.val)
        : isMatchingCommand(line, expectedStep);
  
      if (!result.valid) {
        return showStepError(i, result.message);
      }
    }
  
    // Jangan terlalu ketat, biarkan multi-step
    if (userLines.length === correctSteps.length) {
      swal("Benar!", "Seluruh langkah sudah benar!", "success");
    }
  };
  


  const resetCode = () => {
    setPythonCode('');
    setOutput('');
    runit('', true);
};

  const handleRunClick = () => {
    runitchallanges();
  };

  const resetCodeChallanges = () => {
    setPythonCodeChallanges('');
    setOutput('');
    runitchallanges('', true);
  };


  useEffect(() => {
    runit();
    runit1(); // Jalankan kode saat halaman dimuat
    runit2(); // Jalankan kode saat halaman dimuat
    runitchallanges(); // Jalankan kode saat halaman dimuat
  }, []);

  return (
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
            Position
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
            Memahami fungsi dan penggunaan <code>position()</code>.
          </li>
        </ol>

        <hr/>

        <p>
        Fungsi <code>position()</code> digunakan untuk mendapatkan posisi saat ini dari bidawang di dalam canvas. Posisi ini dinyatakan dalam bentuk pasangan koordinat (x, y). Untuk menampilkan koordinatnya kita bisa menggunakan fungsi <code>print()</code>.
        </p>

        <br></br>

        <h5>Contoh 1:</h5>
        <p>Menampilkan posisi saat ini dari bidawang:</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`#  Menampilkan posisi saat ini dari bidawang
print(position())`}
              height="340px"
              theme="light"
              extensions={[python()]}
              editable={false}
              options={{ readOnly: 'nocursor' }}
            />
            <pre id='output1' className="output mt-2" style={{height:60}}>{output1}</pre>
          </Col>
          <Col md={6} className="text-center">
            <div className="canvas-section" style={{width:400,height:400,  textAlign:'center'}}>
              <div style={{textAlign:'center'}} id="mycanvas-contoh1"></div>
            </div>
          </Col>
        </Row>
        <br></br>
        <p><b>Hasil:</b> Fungsi <code>position()</code> digunakan untuk mencari tahu posisi bidawang saat ini, kemudian <code>position()</code> akan membuat posisi tersebut di tampilkan pada bagian output log.</p>
        
        <br></br>

        <h5>Contoh 2:</h5>
        <p>Memeriksa posisi Bidawang sebelum dan sesudah pergerakan.:</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Posisi awal 
print("Posisi awal:", position()) 
# Gerakkan Bidawang ke depan sejauh 100 langkah
forward(100) 
# Cek posisi baru 
print("Posisi setelah bergerak:", position())`}
              height="300px"
              theme="light"
              extensions={[python()]}
              editable={false}
              options={{ readOnly: 'nocursor' }}
            />
            <pre id='output2' className="output mt-2" style={{height:100}}>{output2}</pre>
          </Col>
          <Col md={6} className="text-center">
            <div className="canvas-section" style={{width:400,height:400,  textAlign:'center'}}>
              <div style={{textAlign:'center'}} id="mycanvas-contoh2"></div>
            </div>
          </Col>
        </Row>
        <br></br>
        <p><b>Hasil:</b> Sebelum di gerakan posisi awal Bidawang adalah <i>(0,0)</i>, kemudian setelah diigerakan dengan <code>forward(100)</code> posisinya menjadi <i>(100, 0)</i></p>
        
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
                  <b>1. Cek Posisi</b>
                  {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Lakukan posisi bidawang terlebih dahulu menggunakan perintah di bawah ini:</p>
                  <pre><code>print(position())</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1b">
                <AccordionHeader>
                  <b>2. Maju</b>
                  {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Kemudian lanjutkan pada baris baru untuk membuat bidawang maju sejauh 150 langkah dengan perintah dibawah ini:</p>
                  <pre><code>forward(150)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1c">
                <AccordionHeader>
                  <b>3. Cek Posisi</b>
                  {completedSteps.includes('1c') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Lalu periksa lagi posisi bidawang tersebut:</p>
                  <pre><code>print(position())</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1d">
                <AccordionHeader>
                  <b>4. Pindah Posisi</b>
                  {completedSteps.includes('1d') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Selanjutnya pindahkan lagi bidawang ke posisi x=75 dan y=75 dengan perintah di bawah ini:</p>
                  <pre><code>setposition(75,75)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1e">
                <AccordionHeader>
                  <b>5. Cek Posisi</b>
                  {completedSteps.includes('1e') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Lanjutkan dengan memeriksa posisi bidawang lagi:</p>
                  <pre><code>print(position())</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1f">
                <AccordionHeader>
                  <b>5. Kembali ke posisi awal</b>
                  {completedSteps.includes('1f') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Gunakan perintah home untuk membuat bidawang kembali ke titik awal (0,0):</p>
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
          Perintah <code>position()</code> untuk mengetahui posisi saat ini dari Bidawang. Fungsi ini berguna untuk memantau pergerakan dan membantu dalam menggambar pola atau bentuk yang presisi.
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
                  }}>
                    1. Apa fungsi dari position()? 
                  </Form.Label>
                  <div className="row d-flex">
                {[
                  "Memberitahu arah pergerakan turtle saat ini.",
                  "Menghapus posisi turtle sebelumnya.",
                  "Memberitahu posisi turtle saat ini dalam bentuk koordinat (x, y).",
                  "Mengatur posisi turtle ke titik tertentu."
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
                    2. Apa hasil dari perintah berikut jika turtle berada di posisi (50, 100)? <pre>print(position()) </pre> 
                  </Form.Label>
                  <div className="row d-flex">
                  {["(50, 100)", 
                  "0", 
                  "(0, 0)", 
                  "[50, 100]"].map(
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

            <div className="mb-3 mt-3">
            <label className="me-2"><b>A</b> :</label>
            <input type="text" value={inputA} onChange={(e) => setInputA(e.target.value)} />
            <label className="ms-3 me-2"><b>B</b> :</label>
            <input type="text" value={inputB} onChange={(e) => setInputB(e.target.value)} />
            <Button className="ms-3" variant="primary" onClick={checkAnswer}>
              Periksa Jawaban
            </Button>
            </div>

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
                  height="250px"
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
                <pre id='outputChallanges' className="output"style={{
                    height: "60px",
                    marginTop: '5px',
                    border: "2px solid #ccc",
                    borderRadius: "5px",
                    padding: "5px",
                    backgroundColor: "#fff",
                  }}>{outputChallanges}</pre>
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
                      alt="grid"
                      style={{
                        position: "absolute",
                        left: "0px",
                        top: "0px",
                        width: "400px", // Sesuaikan ukuran jika perlu
                        height: "400px",
                      }}
                  />
                  <img
                      src={sawi}
                      alt="Target Sawi"
                      style={{
                        position: "absolute",
                        left: "81px",
                        top: "79px",
                        width: "40px", // Sesuaikan ukuran jika perlu
                        height: "40px",
                      }}
                  />
                  <img
                      src={ikan}
                      alt="Target Ikan"
                      style={{
                        position: "absolute",
                        left: "32px",
                        top: "275px",
                        width: "40px", // Sesuaikan ukuran jika perlu
                        height: "40px",
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

export default Position
