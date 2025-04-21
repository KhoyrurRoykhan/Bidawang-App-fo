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
import teratai from './assets/teratai.png';
import map from './assets/1-penup-pendown.png';
import grid from './assets/grid.png';

const KuisAccordion = () => {
   // hint challanges
   const showHint = () => {
    swal(
      "Petunjuk Tantangan",
      "1. Periksa jarak antara bidawang dan peti harta karun.\n2. Setelah mengetahui jaraknya arahkan bidawang menghadap ke peti harta karun lalu gerakan jauh jarak yang sudah didapatkan.",
      "info"
    );
  };


  const [pythonCodeChallanges, setPythonCodeChallanges] = useState('');
  const [outputChallanges, setOutputChallanges] = useState('');
  const [output, setOutput] = useState('');

  const [hasRun, setHasRun] = useState(false);

  const outfchallanges = (text) => {
    setOutputChallanges((prev) => prev + text);
  };

  const builtinReadChallanges = (x) => {
    if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles['files'][x] === undefined) {
      throw `File not found: '${x}'`;
    }
    return window.Sk.builtinFiles['files'][x];
  };

  const runitchallanges = (code, forceReset = false, skipValidation = false) => {
    setOutputChallanges('');
    const imports = "from turtle import *\nreset()\nshape('turtle')\nspeed(0)\npenup()\nsetposition(-150,0)\npendown()\nspeed(1)\n";
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
        if (!skipValidation) {
          checkCodeChallanges(); // validasi hanya jika skipValidation === false
        }
      },
      (err) => setOutput((prev) => prev + err.toString())
    );
  };
  
  

  const resetCodeChallanges = () => {
    setPythonCodeChallanges('');
    setOutput('');
    runitchallanges('', true);
  };


  const alertShownRef = useRef(false); // Tambahkan ini di bagian atas komponen

  const checkCodeChallanges = () => {
    if (!pythonCodeChallanges.trim()) return;
  
    const validCodeSteps = [
      "penup()",
      "setposition(-150,50)",
      "pendown()",
    
      "fillcolor(\"green\")",
      "begin_fill()",
      "forward(100)",
      "left(90)",
      "forward(100)",
      "left(90)",
      "forward(100)",
      "left(90)",
      "forward(100)",
      "end_fill()",
    
      "penup()",
      "setposition(50,50)",
      "pendown()",
    
      "fillcolor(\"red\")",
      "begin_fill()",
      "setposition(150,50)",
      "setposition(100,150)",
      "setposition(50,50)",
      "end_fill()",
    
      "penup()",
      "setposition(-50,-100)",
      "pendown()",
    
      "fillcolor(\"yellow\")",
      "begin_fill()",
      "setposition(-100,-150)",
      "setposition(-150,-100)",
      "setposition(-100,-50)",
      "setposition(-50,-100)",
      "end_fill()",
    
      "penup()",
      "setposition(50,-100)",
      "pendown()",
    
      "fillcolor(\"blue\")",
      "begin_fill()",
      "circle(50)",
      "end_fill()"
    ];
    
  
    const normalizeLine = (line) => {
      return line
        .replace(/\s+/g, '')            // hapus semua spasi/tab
        .replace(/,\s*/g, ',');         // pastikan koma tidak diikuti spasi
    };
  
    const userCodeLines = pythonCodeChallanges
      .split("\n")
      .map(line => line.trim())
      .filter(line => line !== "")      // hilangkan baris kosong
      .map(normalizeLine);
  
    for (let i = 0; i < userCodeLines.length; i++) {
      if (normalizeLine(validCodeSteps[i]) !== userCodeLines[i]) {
        if (!alertShownRef.current) {
          alertShownRef.current = true;
          swal("Ups, ada yang salah!", `Baris ke-${i + 1} salah.\n\n✅ Seharusnya: ${validCodeSteps[i]}\n❌ Kamu menulis: ${pythonCodeChallanges.split("\n")[i]}`, "error")
            .then(() => {
              runitchallanges('', true, true); // skip validasi
              alertShownRef.current = false;
            });
        }
        setHasRun(false);
        return;
      }
    }
  
    if (userCodeLines.length === validCodeSteps.length) {
      if (!alertShownRef.current) {
        alertShownRef.current = true;
        swal("Mantap!", "Semua langkah benar, kamu berhasil!", "success").then(() => {
          alertShownRef.current = false;
        });
      }
      setHasRun(false);
    }
  };
  
  
  useEffect(() => {
    setHasRun(false);
    runitchallanges('', true, true); // skip validasi di load awal
  }, []);
  
  

  return (
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
                  <Button variant="success" onClick={() => { runitchallanges(); }}>Run Code</Button>
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
                {/* <img
                      src={teratai}
                      alt="Target Broccoli"
                      style={{
                        position: "absolute",
                        left: "320px",
                        top: "75px",
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
  );
};

export default KuisAccordion;
