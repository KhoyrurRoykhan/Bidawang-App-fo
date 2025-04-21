import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import './assets/tutor.css';
import './asset_skulpt/SkulptTurtleRunner.css';
import { Button } from 'react-bootstrap';
import { BsArrowClockwise } from 'react-icons/bs'; // Import ikon Bootstrap

const Texteditor = () => {
    const [pythonCode, setPythonCode] = useState('');
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

    const resetCode = () => {
        setPythonCode('');
        setOutput('');
        runit('', true);
    };

    useEffect(() => {
        runit('', true);
    }, []);

    return (
        <div className='mt-3'>
            <div className='content mt-5' style={{ paddingLeft: 50, paddingRight: 50 }}>
                <br />
                <div className="skulpt-container" style={{ border: "2px solid #ccc" }}>
                    <div className="editor-section">
                        <CodeMirror
                            placeholder={'//Tuliskan kode anda disini!'}
                            value={pythonCode}
                            height="300px"
                            theme="light"
                            extensions={[python()]}
                            onChange={(value) => setPythonCode(value)}
                        />
                        <div style={{ marginTop: '5px', marginBottom: '5px', display: 'flex', gap: '10px' }}>
                            <Button variant="success" onClick={() => runit()}>Run Code</Button>
                            <Button variant="secondary" onClick={resetCode}>
                                <BsArrowClockwise /> Reset
                            </Button>
                        </div>
                        <pre className="output" style={{ height: 60 }}>{output}</pre>
                    </div>
                    <div className="canvas-section">
                        <div id="mycanvas"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Texteditor;
