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
import grid from './assets/3-setposition-b.png';
import map from './assets/5-setheading-tilemap.png';
import { useNavigate } from "react-router-dom";

const correctCommands = {
  '1a': 'setheading(90)',
  '1b': 'forward(100)',
  '1c': 'setheading(0)',
  '1d': 'forward(50)'
};

const SetHeading = () => {
  //hh
  const showHint = () => {
    swal(
      "Petunjuk Tantangan",
      "Bidawang saat ini berada di tengah layar (titik (0, 0)), sedangkan cacing berada di titik (100, 100). \n\n" +
      "Tugas kalian adalah buat bidawang bergerak mencapai ujung canvas arah selatan. Gunakan perintah setheading untuk mengubah arahnya dan forward untuk bergerak. \n\n",
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
    question1: "Utara",
    question2: "Mengatur arah turtle ke sudut tertentu berdasarkan derajat."
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
  # Atur arah turtle menghadap utara (90 derajat)
  setheading(90)
  forward(100)  # Bergerak maju ke atas
              
  # Atur arah turtle menghadap barat (180 derajat)
  setheading(180)
  forward(100)  # Bergerak maju ke kiri
  speed(0)
  home()
  reset()

`);

const [pythonCodeChallanges, setPythonCodeChallanges] = useState('');
const [output, setOutput] = useState('');
const [step, setStep] = useState(0);
const [hasRun, setHasRun] = useState(false);
const [processingAlert, setProcessingAlert] = useState(false);

const headingAnswers = [0, 90, 180, 270];
const broccoliPositions = [
  { left: '345px', top: '175px' }, // setheading(0)
  { left: '175px', top: '5px' },   // setheading(90)
  { left: '5px', top: '175px' },   // setheading(180)
  { left: '175px', top: '345px' }, // setheading(270)
];

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
    if (processingAlert) return;
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
        if (!forceReset) checkCodeChallanges();
      },
      (err) => setOutput((prev) => prev + err.toString())
    );
  };

  const checkCodeChallanges = async () => {
    if (!hasRun || processingAlert) return;

    const userCode = pythonCodeChallanges
      .replace(/\s/g, '')
      .replace(/setheading/gi, 'setheading');
    const expectedAngle = headingAnswers[step];

    const isCorrect = userCode.includes(`setheading(${expectedAngle})`);

    setProcessingAlert(true);
    if (isCorrect) {
      await swal("Jawaban Benar!", "Kamu berhasil!", "success").then(() => {
        if (step < headingAnswers.length - 1) {
          setStep((prev) => prev + 1);
        } else {
          swal("Selamat!", "Kamu berhasil menyelesaikan semua tantangan!", "success");
        }
        resetCodeChallanges();
      });
    } else if (userCode !== '') {
      await swal("Jawaban Salah", "Gunakan setheading() untuk mengatur arahnya.", "error").then(() => {
        resetCodeChallanges();
      });
    }
    setProcessingAlert(false);
  };


  const resetCode = () => {
    setPythonCode('');
    setOutput('');
    runit('', true);
};

  const resetCodeChallanges = () => {
    setPythonCodeChallanges('');
    setOutput('');
    setHasRun(false);
    setTimeout(() => runitchallanges('', true), 100);
  };


  useEffect(() => {
    runit();
    runit1(); // Jalankan kode saat halaman dimuat
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
          Setheading
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
          Memahami cara mengatur arah Bidawang menggunakan setheading().
          </li>
        </ol>

        <hr/>

        <p>
        Perintah <b>setheading()</b> digunakan untuk mengatur arah Bidawang ke sudut tertentu, diukur dalam derajat. Sudut dihitung berlawanan arah jarum jam, dimulai dari arah timur (0 derajat). Dengan menggunakan setheading() dapat mengontrol ke mana bidawang akan menghadap sebelum bergerak.
        </p>

        <ul>
          <li><strong>0°</strong>: Timur (Kanan Layar)</li>
          <li><strong>90°</strong>: Utara (Atas Layar)</li>
          <li><strong>180°</strong>: Barat (Kiri Layar)</li>
          <li><strong>270°</strong>: Selatan (Bawah Layar)</li>
        </ul>

        <h5>Contoh:</h5>
        <p>Mengatur arah pergerakan bidawang dengan <code>setheading()</code>.</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Atur arah turtle menghadap utara (90 derajat)
setheading(90)
forward(100)  # Bergerak maju ke atas
              
# Atur arah turtle menghadap barat (180 derajat)
setheading(180)
forward(100)  # Bergerak maju ke kiri`}
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
        <p><b>Hasil:</b> <code>setheading(90)</code> akan membuat Bidawang menghadap ke utara (atas layar) dan <code>setheading(180)</code> akan membuat bidawang menghadap ke barat (kiri layar).</p>
        
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
            Latihan Menggunakan setheading() 🐢
          </h4>
        <p>
        Untuk lebih mudah memahami cara kerja perintah <code>setheading()</code>, ikuti instruksi dibawah ini
        </p>
        <Row>
          <Col xs={3} style={{ fontSize: 15 }}>
            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
              <AccordionItem eventKey="1a">
                <AccordionHeader>
                  <b>1. Hadap Utara</b>
                  {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Ubah arah bidawang menjadi menghadap ke arah utara dengan menggunakan perintah dibawah ini: </p>
                  <pre><code>setheading(90)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1b">
                <AccordionHeader>
                  <b>2. Maju</b>
                  {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Lalu lanjutkan pada baris baru untuk membuat bidawang maju sejauh 100 langkah dengan perintah dibawah ini: </p>
                  <pre><code>forward(100)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1c">
                <AccordionHeader>
                  <b>3. Hadap Timur </b>
                  {completedSteps.includes('1c') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Lanjutkan lagi dengan mengubah arah bidawang menjadi menghadap ke timur dengan perintah dibawah ini: </p>
                  <pre><code>setheading(0)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1d">
                <AccordionHeader>
                  <b>4. Maju</b>
                  {completedSteps.includes('1d') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Buat bidawang maju sejauh 50 langkah lagi. </p>
                  <pre><code>forward(50)</code></pre>
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
          }}>
            Kesimpulan
          </h4>
        <p>
        Perintah <b>setheading()</b> sangat berguna untuk mengontrol arah objek dengan presisi. Dengan mengatur sudut arah secara langsung, Anda dapat membuat pola yang kompleks dan menggambar dengan lebih terstruktur.
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
                  1. Jika Anda menggunakan perintah <code>setheading(90)</code>, ke arah mana Bidawang akan menghadap?
                </Form.Label>
                <div className="row d-flex">
                {[
                  "Timur",
                  "Barat",
                  "Utara",
                  "Selatan"
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
                  2. Apa fungsi utama dari perintah setheading(<i>derajat</i>)?
                </Form.Label>
                <div className="row d-flex">
                  {["Mengatur posisi turtle ke koordinat (0, 0).", 
                  "Mengatur arah turtle ke sudut tertentu berdasarkan derajat.", 
                  "Menggerakkan turtle ke arah utara.", 
                  "Mengubah warna turtle."].map(
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
      <Accordion.Item eventKey="1">
        <Accordion.Header><h4 style={{ color: "#2DAA9E", fontWeight: "bold" }}>Tantangan</h4></Accordion.Header>
        <Accordion.Body>
          <p>Selesaikan tantangan dengan mengarahkan bidawang ke arah cacing menggunakan <code>setheading()</code>.</p>
          <Button className="mb-2" variant="info" onClick={() => swal("Petunjuk Tantangan", "Gunakan setheading(derajat) sesuai arah cacing yang muncul.\n\n0: Kanan, 90: Atas, 180: Kiri, 270: Bawah", "info")}>Petunjuk</Button>

          <div className="skulpt-container" style={{ border: "3px solid #ccc", borderRadius: "10px", padding: "15px", backgroundColor: "#f9f9f9" }}>
            <div className="editor-section">
              <CodeMirror
                value={pythonCodeChallanges}
                placeholder={'// Ketikan kode disini!'}
                height="290px"
                theme="light"
                extensions={[python()]}
                onChange={(value) => setPythonCodeChallanges(value)}
                style={{ border: "2px solid #2DAA9E", borderRadius: "8px", padding: "5px" }}
              />
              <div style={{ marginTop: '5px', marginBottom: '5px', display: 'flex', gap: '10px' }}>
                <Button variant="success" onClick={() => runitchallanges()}>Run Code</Button>
                <Button variant="secondary" onClick={resetCodeChallanges}><BsArrowClockwise/> Reset</Button>
              </div>
              <pre className="output" style={{ height: "60px", border: "2px solid #ccc", borderRadius: "5px", padding: "5px", backgroundColor: "#fff" }}>{output}</pre>
            </div>
            <div className="canvas-section" style={{ position: "relative", width: "400px", height: "405px", borderRadius: "10px", border: "3px solid #2DAA9E" }}>
              <div id="mycanvas-challanges" style={{ width: 400, height: 400, position: "relative" }}></div>
              <img src={map} alt="Map" style={{ position: "absolute", left: "0px", top: "0px", width: "400px", height: "400px" }} />
              <img src={grid} alt="Grid" style={{ position: "absolute", left: "0px", top: "0px", width: "400px", height: "400px" }} />
              <img src={broccoli} alt="Target Broccoli" style={{ position: "absolute", ...broccoliPositions[step], width: "50px", height: "50px" }} />
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
      </div>
    </div>
  )
}

export default SetHeading
