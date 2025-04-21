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
import peringatan from './assets/peringatan.gif';

// Challange
import swal from 'sweetalert'; // Import SweetAlert
import papuyu from './assets/papuyu-1.png';
import broccoli from './assets/kepiting.png';
import map from './assets/1-left-right-c.png';
import tilemap from './assets/1-left-right-tilemap.png';

const correctCommands = {
  '1a': 'left(90)',
  '1b': 'right(180)'
};

const positions = [
  { left: '294px', top: '174px', angle: 0 },
  { left: '281px', top: '107px', angle: 30 },
  { left: '241px', top: '67px', angle: 60 },
  { left: '175px', top: '50px', angle: 90 },
  { left: '282px', top: '245px', angle: -30 },
  { left: '238px', top: '285px', angle: -60 },
  { left: '173px', top: '298px', angle: -90 }
];

const LeftRight = () => {
  // hint challanges
  const showHint = () => {
    swal(
      "Petunjuk Tantangan",
      "Bidawang saat ini berada di tengah layar (titik (0, 0)), sedangkan cacing berada di titik (100, 100). \n\n" +
      "Tugas kalian adalah membuat Bidawang menghadap ke arah cacing dengan 1x perintah, gunakan perintah left() atau right(): \n\n",
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
    question1: "left() memutar bidawang ke arah kiri, sementara right() memutar bidawang ke arah kanan.",
    question2: "Selatan (bawah layar)"
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

  

  //contoh
  const [pythonCode, setPythonCode] = useState(``);
  const [pythonCode2, setPythonCode2] = useState(`

for i in range(100):
  speed(1)
  left(120)
  speed(0)
  home()

`);

  const [pythonCode3, setPythonCode3] = useState(`

for i in range(100):
  speed(1)
  right(90)
  speed(0)
  home()

`);

  // Challenge state
  const [pythonCodeChallanges, setPythonCodeChallanges] = useState('');
  const [output, setOutput] = useState('');
  const [usedIndexes, setUsedIndexes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(Math.random() * positions.length)
  );

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

  const runit2 = (code, forceReset = false) => {
    setOutput('');
    const imports = "from turtle import *\nreset()\nshape('turtle')\n";
    const prog = forceReset ? imports : imports + pythonCode2;
  
    window.Sk.pre = "output2";
    window.Sk.configure({ output: outf, read: builtinRead });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-contoh1';
  
    window.Sk.misceval.asyncToPromise(() => 
        window.Sk.importMainWithBody('<stdin>', false, prog, true)
    ).then(
        () => console.log('success'),
        (err) => setOutput((prev) => prev + err.toString())
    );
  };

  const runit3 = (code, forceReset = false) => {
    setOutput('');
    const imports = "from turtle import *\nreset()\nshape('turtle')\n";
    const prog = forceReset ? imports : imports + pythonCode3;
  
    window.Sk.pre = "output3";
    window.Sk.configure({ output: outf, read: builtinRead });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-contoh2';
  
    window.Sk.misceval.asyncToPromise(() => 
        window.Sk.importMainWithBody('<stdin>', false, prog, true)
    ).then(
        () => console.log('success'),
        (err) => setOutput((prev) => prev + err.toString())
    );
  };


  const initializeTurtle = () => {
    const imports = "from turtle import *\nshape('turtle')\nspeed(2)\n";
    const initialPosition = "penup()\nsetpos(0, 0)\ndown()\n"; // Set initial position
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

  const resetTurtlePosition = () => {
    const resetProg = "from turtle import *\npenup()\nhome()\nshape('turtle')\npendown()\n"; // Reset position to (0, 0)
    window.Sk.misceval.asyncToPromise(() => 
      window.Sk.importMainWithBody('<stdin>', false, resetProg, true)
    ).then(
      () => {},
      (err) => setOutput((prev) => prev + err.toString())
    );
  };

  const runitchallanges = () => {
    setOutput('');
    const imports = "from turtle import *\nshape('turtle')\nspeed(2)\n";
    const prog = imports + pythonCodeChallanges;

    window.Sk.pre = "output4";
    window.Sk.configure({ output: outf, read: builtinRead });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas-challanges';

    window.Sk.misceval.asyncToPromise(() => 
      window.Sk.importMainWithBody('<stdin>', false, prog, true)
    ).then(
      () => checkCodeChallanges(),
      (err) => setOutput((prev) => prev + err.toString())
    );
  };

  const checkCodeChallanges = () => {
    const validAngles = [0, 15, 30, 45, 60, 75, 90];
    const correctAngle = positions[currentIndex].angle;
  
    // Determine the expected command based on the angle
    let isCorrect = false;
  
    if (correctAngle === 0) {
      // For 0 degrees, check for both left(0) and right(0)
      isCorrect = pythonCodeChallanges.includes(`left(0)`) || pythonCodeChallanges.includes(`right(0)`);
    } else if (correctAngle > 0) {
      // For positive angles, check for left()
      isCorrect = pythonCodeChallanges.includes(`left(${correctAngle})`);
    } else {
      // For negative angles, check for right()
      isCorrect = pythonCodeChallanges.includes(`right(${Math.abs(correctAngle)})`);
    }
  
    // Check if the angle is valid
    if (validAngles.includes(Math.abs(correctAngle)) && isCorrect) {
      swal("Benar!", "Cacing berpindah ke posisi lain.", "success").then(() => {
        resetTurtlePosition(); // Reset turtle position after the alert is confirmed
        moveBroccoli();
        setPythonCodeChallanges('');
      });
    } else {
      swal("Salah", "Coba lagi!", "error").then(() => {
        resetTurtlePosition(); // Reset turtle position after the alert is confirmed
        setPythonCodeChallanges('');
      });
    }
  };

  const moveBroccoli = () => {
    let availableIndexes = positions.map((_, i) => i).filter(i => !usedIndexes.includes(i));
    if (availableIndexes.length === 0) {
      swal("Tantangan Selesai!", "Kamu telah menyelesaikan semua posisi!", "success");
      setUsedIndexes([]);
      availableIndexes = positions.map((_, i) => i);
    }
    const nextIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    setUsedIndexes([...usedIndexes, nextIndex]);
    setCurrentIndex(nextIndex);
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
    runit(); // Jalankan kode saat halaman dimuat
    runit2(); // Jalankan kode saat halaman dimuat
    runit3(); // Jalankan kode saat halaman dimuat
    initializeTurtle(); // Initialize turtle for challenges
  }, []);

  return (
    <div>
      {/* <SidebarTutor /> */}
      <div className='content' style={{paddingLeft:50, paddingRight:50}}>
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
          Left & Right
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
            Memahami cara mengendalikan arah rotasi Bidawang menggunakan left() dan right().
          </li>
        </ol>


        <hr />

        <p>
           Perintah left() dan right() digunakan untuk memutar arah gerakan Bidawang berdasarkan sudut derajat yang diberikan, tanpa harus memindahkan posisinya. Ini berguna untuk mengatur arah Bidawang sebelum melanjutkan dengan perintah lainnya seperti bergerak.
        </p><br />
        
        <h5>1. left(<i>derajat</i>)</h5>
        <p>Memutar arah Bidawang berlawanan arah jarum jam (kiri) sebesar derajat yang ditentukan.</p>
        <p>Contoh:</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Putar Bidawang ke kiri sejauh 120 derajat 
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
        <p><b>Hasil:</b> Bidawang yang awalnya menghadap ke kanan layar, akan berputar 120 derajat ke kiri.</p>

        <br/>

        <h5>2. right(<i>derajat</i>)</h5>
        <p>Memutar arah Bidawang searah jarum jam (kanan) sebesar derajat yang ditentukan.</p>
        <p>Contoh:</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Putar Bidawang ke kanan sejauh 90 derajat 
right(90)`}
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
        
        <p><b>Hasil:</b> Bidawang yang awalnya menghadap ke kanan layar, akan berputar 90 derajat ke kanan.</p>
        
        <br/>
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
          Latihan menggunakan left() dan right() 🐢 
        </h4>
        <p style={{ color: '#444', lineHeight: '1.6' }}>
          Untuk lebih mudah memahami cara kerja perintah <code>left()</code> dan <code>right()</code>, ikuti instruksi di bawah ini.
        </p>

        <Row>
          <Col xs={3} style={{ fontSize: 15 }}>
            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
              <AccordionItem eventKey="1a">
                <AccordionHeader>
                  <b>1. Berputar ke kiri</b>
                  {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Buat bidawang berputar 90 derajat ke kiri dengan perintah di bawah ini:</p>
                  <pre><code>left(90)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1b">
                <AccordionHeader>
                  <b>2. Berputar ke kanan</b>
                  {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Kemudian lanjutkan pada baris baru dengan perintah dibawah ini untuk memutar Bidawang ke kanan sebesar 180 derajat:</p>
                  <pre><code>right(180)</code></pre>
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
        
        <br />
        <hr />
        
        {/* Kesimpulan */}
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
          Perintah `left()` dan `right()` memungkinkan pengaturan arah gerakan bidawang dengan rotasi ke kiri atau ke kanan berdasarkan derajat yang ditentukan. Perintah ini sangat berguna untuk kontrol arah sebelum melakukan perintah lain dalam pembuatan gambar atau pola.
        </p>
        </div>
        
        <br />

        <hr />

        {/* kuis */}
        <Accordion className="mb-4" style={{ outline: "3px solid #2DAA9E", borderRadius: "10px" }}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h4 style={{ color: "#2DAA9E", fontWeight: "bold" }}>Kuis</h4>
        </Accordion.Header>
        <Accordion.Body>
          <Form>
            {/* Soal 1 */}
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
                1. Apa perbedaan utama antara perintah left() dan right()?
              </Form.Label>

              <div className="row d-flex">
                {[
                  "left() memutar bidawang ke arah kanan, sementara right() memutar bidawang ke arah kiri.",
                  "left() memutar bidawang ke arah kiri, sementara right() memutar bidawang ke arah kanan.",
                  "left() dan right() hanya digunakan untuk mengubah warna bidawang.",
                  "Keduanya memindahkan bidawang ke posisi (0, 0)."
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

            <br></br>
            {/* Soal 2 */}
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
                2. Jika turtle menghadap ke timur (kanan layar), dan Anda menggunakan perintah right(90), ke arah mana turtle akan menghadap?
              </Form.Label>

              <div className="row d-flex">
                {["Utara (atas layar)", "Barat (kiri layar)", "Selatan (bawah layar)", "Timur (kanan layar)"].map(
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
                Selesaikan tantangan dengan perintah <code>left()</code> dan <code>right()</code>. Klik petunjuk untuk bantuan.
              </p>
              <Button className="mb-2" variant="info" onClick={showHint}>Petunjuk</Button>
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
                    <Button variant="success" onClick={runitchallanges}>Run Code</Button>
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
                  }}
                >
                  <div id="mycanvas-challanges" style={{ width: 400, height: 400, position: "relative" }}></div>
                  <img
                    src={broccoli}
                    alt="broccoli"
                    style={{
                      position: "absolute",
                      borderRadius: "10px",
                      left: positions[currentIndex].left,
                      top: positions[currentIndex].top,
                      zIndex: 100,
                      width: "50px",
                      height: "50px",
                      objectFit: "cover"
                    }}
                  />
                  <img
                    src={tilemap}
                    alt="Map"
                    style={{ position: "absolute", left: "0px", top: "0px", width: "400px", height: "400px" }}
                  />
                  <img
                    src={map}
                    alt="Map"
                    style={{ position: "absolute", left: "0px", top: "0px", width: "400px", height: "400px" }}
                  />
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
      </Accordion>

      </div>
    </div>
  );
}

export default LeftRight;
