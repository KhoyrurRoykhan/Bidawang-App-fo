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
import map from './assets/8-dot.png';
import { useNavigate } from "react-router-dom";

const correctCommands = {
  '1a': 'forward(100)',
  '1b': 'right(90)',
  '1c': 'forward(100)',
  '1d': 'left(45)',
  '1e': 'forward(50)'
};

const Dot = () => {
  // hint challanges
  const showHint = () => {
    swal(
      "Petunjuk Tantangan",
      "Bidawang saat ini berada di titik (-200, 0). \n\n" +
      "Tugas kalian adalah Menggerakan bidawang menuju titik (200, 0), namun pada setiap 50 langkah buat bidawang menggambar titik berwarna merah dan hijau secara selang seling dengan ukuran 15.",
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
    question1: "Menggambar titik di posisi saat ini.",
    question2: "Lingkaran biru dengan ukuran 15 piksel digambar di posisi saat ini."
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
  # Menggambar titik dengan ukuran 10 dan warna default
  dot(10)
  forward(200)
  speed(0)
  home()
  reset()
`);

const [pythonCode2, setPythonCode2] = useState(`

for i in range(100):
  speed(1)
  # Menggambar titik dengan ukuran 20 dan warna merah
  dot(20, "red")
              
  # Pindahkan turtle untuk menggambar titik berikutnya
  setposition(50, 50)
             
  # Menggambar titik dengan ukuran 15 dan warna biru
  dot(15, "blue")

  setposition(200, 200)
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
    const imports = "from turtle import *\nreset()\nshape('turtle')\nspeed(0)\npenup()\nsetposition(-200,0)\npendown()\nspeed(1)\n";
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

    const validCode = [
        "forward(50)", 'dot(15,"red")', "forward(50)", 'dot(15,"green")',
        "forward(50)", 'dot(15,"red")', "forward(50)", 'dot(15,"green")',
        "forward(50)", 'dot(15,"red")', "forward(50)", 'dot(15,"green")',
        "forward(50)", 'dot(15,"red")', "forward(50)"
    ];

    const userCodeLines = pythonCodeChallanges.trim().split("\n");

    // Cek apakah kode pengguna merupakan bagian awal dari jawaban yang valid
    const isPartialMatch = validCode.slice(0, userCodeLines.length).every((code, index) => code === userCodeLines[index]);

    // Cek apakah kode pengguna sudah lengkap dan benar
    const isExactMatch = userCodeLines.length === validCode.length && isPartialMatch;

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
    runit2(); // Jalankan kode saat halaman dimuat
    // runitchallanges(); // Jalankan kode saat halaman dimuat
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
        }}>Dot</h2>
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
          Memahami cara menggambar titik menggunakan <code>dot()</code>.
          </li>
        </ol>

        <hr/>

        <p>
        Fungsi <code>dot()</code> digunakan untuk menggambar titik pada posisi Bidawang berada. Titik ini dapat diatur ukuran dan warnanya. Fungsi ini sangat berguna untuk menandai posisi tertentu dalam gambar atau untuk menggambar pola dengan titik.
        </p>
        <p><code>dot(ukuran, warna)</code>: Menggambar titik dengan ukuran dan warna yang ditentukan. Parameter <code>warna</code> opsional dan dapat diisi dengan nama warna atau kode heksadesimal.</p>
        <ul>
          <li><strong>ukuran</strong>: Ukuran titik yang ingin digambar. Nilai default adalah 5.</li>
          <li><strong>warna</strong>: Warna titik yang ingin digambar. Jika tidak ditentukan, warna default adalah warna pena saat ini.</li>
        </ul>

        <br></br>

        <h5>Contoh 1:</h5>
        <p>Menggambar titik dengan ukuran 10 dan warna default:</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Menggambar titik dengan ukuran 10 dan warna default
dot(10)
forward(200)`}
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
        <p><b>Hasil:</b> Fungsi <code>dot(10)</code> akan menggambar titik pada posisi bidawang tersebut dengan ukuran 10 dan warna default.</p>
        
        <br></br>

        <h5>Contoh 2:</h5>
        <p>Menggambar Titik dengan Ukuran dan Warna yang Berbeda:</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Menggambar titik dengan ukuran 20 dan warna merah
dot(20, "red")
              
# Pindahkan turtle untuk menggambar titik berikutnya
setposition(50, 50)
             
# Menggambar titik dengan ukuran 15 dan warna biru
dot(15, "blue")

setposition(200, 200)`}
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
        <p><b>Hasil:</b> Fungsi <code>dot(20,"red")</code> akan membuat Bidawang menggambar titik dengan ukuran 20 dan warna merah, sedangkan <code>dot(15,"blue")</code> akan menggambar titik dengan ukuran 15 dan warna biru.</p>
        
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
          }}
          >
            Latihan Menggunakan dot() 🐢
          </h4>
        <p>
        Untuk lebih mudah memahami cara kerja perintah <code>dot()</code>, ikuti instruksi dibawah ini
        </p>
        <Row>
          <Col xs={3} style={{ fontSize: 15 }}>
            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
              <AccordionItem eventKey="1a">
                <AccordionHeader>
                  <b>1. Gambar Titik</b>
                  {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Gambar titik dengan ukuran 20 pada posisi saat ini:</p>
                  <pre><code>dot(20)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1b">
                <AccordionHeader>
                  <b>2. Maju</b>
                  {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Kemudian lanjutkan lagi pada baris baru dengan perintah dibawah ini untuk menggerakan bidawang ke depan sejauh 50 langkah:</p>
                  <pre><code>forward(50)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1c">
                <AccordionHeader>
                  <b>3. Gambar Titik Merah</b>
                  {completedSteps.includes('1c') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Gambar lagi titik dengan ukuran 50 dan berwarna merah:</p>
                  <pre><code>dot(50,"red")</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1d">
                <AccordionHeader>
                  <b>4. Maju</b>
                  {completedSteps.includes('1d') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Gerakkan lagi bidawang maju sejauh 100 langkah:</p>
                  <pre><code>forward(100)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1e">
                <AccordionHeader>
                  <b>5. Gambar Titik Kuning</b>
                  {completedSteps.includes('1e') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Gambar lagi titik dengan ukuran 100 dan berwarna kuning:</p>
                  <pre><code>dot(100,"yellow")</code></pre>
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
        Perintah <code>dot()</code> berfungsi untuk menggambar titik dengan ukuran dan warna yang dapat disesuaikan. Fungsi ini berguna untuk menandai posisi, membuat pola, atau menambah detail pada gambar yang dibuat.
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
                  1. Apa fungsi dari metode dot()? 
                </Form.Label>
                <div className="row d-flex">
                {[
                  "Menggambar lingkaran penuh.",
                  "Menggambar busur lingkaran.",
                  "Menggambar titik di posisi saat ini.",
                  "Menghapus titik pada kanvas."
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
                  2. Apa yang terjadi jika Anda memanggil dot(15, "blue")? 
                </Form.Label>
                <div className="row d-flex">
                  {["Titik biru dengan ukuran 15 piksel digambar di posisi saat ini.", 
                  "Lingkaran biru dengan ukuran 15 piksel digambar di posisi saat ini.", 
                  "Lingkaran penuh biru dengan jari-jari 15 digambar di posisi saat ini.", 
                  "Tidak ada yang terjadi."].map(
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
  )
}

export default Dot
