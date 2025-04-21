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
import udang from './assets/udang.png';
import map from './assets/2-xcor-ycor.png';
import grid from './assets/grid.png';

const correctCommands = {
  '1a': 'print("x : ", xcor())',
  '1b': 'left(90)\nforward(150)',
  '1c': 'print("x setelah: ", xcor())\nprint("y setelah: ", ycor())'
};

const Xykoordinat = () => {
    //accordion task
    const [completedSteps, setCompletedSteps] = useState([]);
    const [activeKey, setActiveKey] = useState('1a');

    const [inputA, setInputA] = useState("");
    const [inputB, setInputB] = useState("");

    // hint challanges
    const showHint = () => {
      swal(
        "Petunjuk Tantangan",
        "Tugas kalian adalah memeriksa koordinat X dan Y objek cacing kemudian masukan hasilnya pada kolom jawaban yg sudah di sediakan",
        "info"
      );
    };

    const checkAnswer = () => {
      const correctAnswersA = ["-100.0", "-100", "-100 "];
      const correctAnswersB = ["100.0", "100", "100 "];
      
      if (correctAnswersA.includes(inputA) && correctAnswersB.includes(inputB)) {
        swal("Benar!", "Jawaban Anda benar.", "success");
      } else {
        swal("Salah!", "Jawaban Anda salah.", "error");
      }
    };
  
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
    question1: "xcor() menampilkan posisi horizontal (sumbu x), sementara ycor() menampilkan posisi vertikal (sumbu y).",
    question2: "30"
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
    # Memindahkan bidawang ke posisi lain
    left(45)
    forward(150)
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
      setOutput1('Posisi x awal: 0.0\nPosisi y awal: 0.0\nPosisi x akhir: 106.0660171779821\nPosisi y akhir: 106.0660171779821');
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
  
  
    const runitchallanges = (code, forceReset = false, skipValidation = false) => {
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
          if (!skipValidation) checkCodeChallanges(); // 👈 Hanya validasi kalau tidak sedang reset
        },
        (err) => setOutput((prev) => prev + err.toString())
      );
    };
  
    const [hasRun, setHasRun] = useState(false);
  
    const checkCodeChallanges = () => {
      if (!hasRun) return;
    
      const expectedSteps = [
        { cmd: "left", val: 180 },
        { cmd: "forward", val: 100 },
        { cmd: "left", val: 90 },
        { cmd: "forward", val: 100 },
        { cmd: "left", val: 90 },
        { cmd: "forward", val: 200 },
        { cmd: "left", val: 90 },
        { cmd: "forward", val: 200 },
        { cmd: "left", val: 90 },
        { cmd: "forward", val: 200 },
        { cmd: "print", val: "xcor()" },
        { cmd: "print", val: "ycor()" }
      ];
    
      const showError = (index, message) => {
        swal("Salah!", `Langkah ke-${index + 1}: ${message}`, "error").then(() => {
          setHasRun(false);
          resetCodeChallanges();
        });
      };
    
      const lines = pythonCodeChallanges
        .trim()
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== ""); // buang baris kosong
    
      const stepsToCheck = Math.min(lines.length, expectedSteps.length);
    
      for (let i = 0; i < stepsToCheck; i++) {
        const step = expectedSteps[i];
        const line = lines[i];
    
        if (!line) return showError(i, "Perintah tidak ditemukan.");
    
        if (step.cmd === "print") {
          if (!line.startsWith("print(")) {
            return showError(i, `Anda harus menggunakan print(${step.val}) pada tahap ini.`);
          }
          const match = line.match(/print\s*\((.*)\)/);
          if (!match || match[1].replace(/\s+/g, "") !== step.val) {
            return showError(i, `Isi print harus print(${step.val}).`);
          }
        } else {
          const match = line.match(/(\w+)\s*\((\d+)\)/);
          if (!match) return showError(i, "Format perintah tidak dikenali.");
    
          const [, cmd, valStr] = match;
          const val = parseInt(valStr);
    
          if (step.cmd === "left") {
            const isLeftCorrect = cmd === "left" && val === step.val;
            const isRightEquivalent = cmd === "right" && val === (360 - step.val);
    
            if (!isLeftCorrect && !isRightEquivalent) {
              return showError(i, `Gunakan left(${step.val}) atau right(${360 - step.val}).`);
            }
          } else {
            if (cmd !== step.cmd) {
              return showError(i, `Anda harus menggunakan perintah ${step.cmd}(${step.val}) pada tahap ini.`);
            }
    
            if (val < step.val) {
              return showError(i, `Nilai ${cmd} kurang dari yang seharusnya (${step.val}).`);
            }
    
            if (val > step.val) {
              return showError(i, `Nilai ${cmd} berlebihan dari yang seharusnya (${step.val}).`);
            }
          }
        }
      }
    
      if (lines.length === expectedSteps.length) {
        swal("Benar!", "Seluruh langkah sudah benar!", "success");
      }
    };
    
  
  
    const resetCode = () => {
      setPythonCode('');
      setOutput('');
      runit('', true);
  };
  
  const resetCodeChallanges = () => {
    setHasRun(false);
    setPythonCodeChallanges('');
    setOutput('');
    runitchallanges('', true, true);
  };
  
  
    useEffect(() => {
      runit();
      runit1(); // Jalankan kode saat halaman dimuat
    //   runit2(); // Jalankan kode saat halaman dimuat
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
            Xcor & Ycor
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
          Mengetahui cara memeriksa posisi horizontal (sumbu x) dan vertikal (sumbu y) dari bidawang.
          </li>
        </ol>

        <hr/>

        <p>
        Fungsi <code>xcor()</code> dan <code>ycor()</code> digunakan untuk mendapatkan koordinat posisi spesifik di sepanjang sumbu horizontal (x) dan vertikal (y). Metode-metode ini ideal untuk memantau posisi terkini, membantu menentukan apakah bidawang telah mencapai batas tertentu, atau digunakan dalam penghitungan pola geometris yang memerlukan pengawasan koordinat. Sama seperti perintah sebelumnya (<i>Position()</i>) Untuk menampilkan hasilnya kita bisa menggunakan fungsi <code>print()</code>.
        </p>
        <ul>
            <li>xcor(): Mengembalikan posisi horizontal (sumbu x) bidawang. </li>
            <li>ycor(): Mengembalikan posisi vertikal (sumbu y) bidawang. </li>
        </ul>

        <br></br>

        <h5>Contoh:</h5>
        <p>Menampilkan posisi horizontal (sumbu x) dan vertikal (sumbu y) dari bidawang sebelum dan sesudah bergerak:</p>
        <Row className="align-items-center">
          <Col md={6}>
            <CodeMirror
              value={`# Menampilkan posisi awal bidawang
print("Posisi x awal:", xcor()) 
print("Posisi y awal:", ycor()) 

# Memindahkan bidawang ke posisi lain
left(45)
forward(150)

# Menampilkan posisi akhir bidawang
print("Posisi x akhir:", xcor()) 
print("Posisi y akhir:", ycor()) `}
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
        <p><b>Hasil:</b> Fungsi <code>xcor()</code> akan menampilkan posisi horizontal (sumbu x) dari bidawang, kemudian <code>ycor()</code> akan menampilkan posisi vertikal (sumbu y) dari bidawang.</p>
        
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
              Latihan Menggunakan xcor() dan ycor() 🐢
            </h4>
        <p>
        Untuk lebih mudah memahami cara kerja perintah <code>xcor()</code> dan <code>ycor()</code>, ikuti instruksi dibawah ini
        </p>
        <Row>
          <Col xs={3} style={{ fontSize: 15 }}>
            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
              <AccordionItem eventKey="1a">
                <AccordionHeader>
                  <b>1. Cek posisi x dan y</b>
                  {completedSteps.includes('1a') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Lakukan pemeriksaan posisi x dan y menggunakan perintah di bawah ini:</p>
                  <pre><code>print("x :", xcor())</code></pre>
                  <pre><code>print("y :", ycor())</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1b">
                <AccordionHeader>
                  <b>2. Pindahkan posisi</b>
                  {completedSteps.includes('1b') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Kemudian lanjutkan lagi pada baris baru untuk menggerakan bidawang dengan perintah di bawah ini:</p>
                  <pre><code>left(90)</code></pre>
                  <pre><code>forward(150)</code></pre>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1c">
                <AccordionHeader>
                  <b>3. Cek posisi x dan y</b>
                  {completedSteps.includes('1c') && <BsCheckCircle style={{ color: 'green', marginLeft: 10 }} />}
                </AccordionHeader>
                <AccordionBody>
                  <p>Lakukan pemeriksaan lagi untuk posisi x dan y menggunakan perintah di bawah ini:</p>
                  <pre><code>print("x :", xcor())</code></pre>
                  <pre><code>print("y :", ycor())</code></pre>
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
            <pre id='output' className="output" style={{height:60}}>{output}</pre>
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
              Kesimpulan</h4>
        <p>
        Perintah <code>xcor()</code> dan <code>ycor()</code> berfungsi untuk mengetahui posisi bidawang secara terpisah pada sumbu x dan y. Perintah ini membantu menentukan apakah turtle telah mencapai batas tertentu, atau digunakan dalam penghitungan pola geometris yang memerlukan pengawasan koordinat.
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
                    1. Apa perbedaan antara xcor() dan ycor()? 
                  </Form.Label>
                  <div className="row d-flex">
                {[
                  "xcor() menampilkan posisi horizontal (sumbu x), sementara ycor() menampilkan posisi vertikal (sumbu y).",
                  "xcor() mengatur posisi horizontal, sementara ycor() mengembalikan posisi vertikal.",
                  "xcor() menghapus posisi pada sumbu x, sementara ycor() membaca posisi awal.",
                  "Tidak ada perbedaan, keduanya menampilkan posisi (x, y)."
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
                    2. Apa hasil dari perintah berikut jika turtle berada di koordinat (30, 20)? <pre>print(xcor())</pre> 
                  </Form.Label>
                  <div className="row d-flex">
                  {["-20", 
                  "30", 
                  "(30, -20)", 
                  "0"].map(
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
            <label className="me-2"><b>X</b> :</label>
            <input type="text" value={inputA} onChange={(e) => setInputA(e.target.value)} />
            <label className="ms-3 me-2"><b>Y</b> :</label>
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
                      src={udang}
                      alt="Target Broccoli"
                      style={{
                        position: "absolute",
                        left: "75px",
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

export default Xykoordinat
