import React, { useState, useEffect } from "react";
import { Accordion, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./assets/tutor-copy.css";
import Pendahuluan from "./Pendahuluan/Pendahuluan.js";
import Canvaspage from "./Pendahuluan/Canvaspage.js";
import LeftRight from "./Turtle-motion/LeftRight.js";
import ForwardBackward from "./Turtle-motion/ForwardBackward.js";
import SetPosition from "./Turtle-motion/SetPosition.js";
import SetXY from "./Turtle-motion/SetXY";
import SetHeading from "./Turtle-motion/SetHeading";
import SetHome from "./Turtle-motion/SetHome";
import Circle from "./Turtle-motion/Circle";
import Dot from "./Turtle-motion/Dot";
import Texteditor from "./Texteditor";
import Position from "./Tell-state/Position";
import Xykoordinat from "./Tell-state/Xykoordinat";
import Heading from "./Tell-state/Heading";
import Distance from "./Tell-state/Distance";
import Pendownpenup from "./Pen-control/Pendownpenup";
import Pensize from "./Pen-control/Pensize";
import Isdown from "./Pen-control/Isdown";
import Color from "./Color-control/PenColor";
import FillColor from "./Color-control/FillColor";
import Reset from "./More_drawing_control/Reset";
import Clear from "./More_drawing_control/Clear";
import Write from "./More_drawing_control/Write";


const Tutorialpage = () => {
  const [content, setContent] = useState(<Pendahuluan />);
  const [activeButton, setActiveButton] = useState("intro-1");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  // Refresh token
  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const handleContentChange = (component, buttonId) => {
    setContent(component);
    setActiveButton(buttonId);
    window.scrollTo(0, 0); // scroll ke atas halaman setiap kali konten berubah
  };
  

  return (
    <>
      <Container fluid className="sidenavigasi mt-5">
        <Row>
          {/* Sidebar */}
          <Col xs={2} className="bg-light border-end vh-100 p-0">
            <Accordion defaultActiveKey="0">
              {/* Accordion untuk Pengenalan */}
              <Accordion.Item eventKey="0">
                <Accordion.Header>Pengenalan</Accordion.Header>
                <Accordion.Body>
                  <div className="d-flex flex-column">
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "intro-1"
                          ? "btn-success"
                          : "btn-outline-success"
                      }`}
                      onClick={() => handleContentChange(<Pendahuluan />, "intro-1")}
                    >
                      Pengenalan
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              {/* Accordion untuk Turtle Motion */}
              <Accordion.Item eventKey="1">
                <Accordion.Header>Turtle Motion</Accordion.Header>
                <Accordion.Body>
                  <div className="d-flex flex-column">
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu1"
                          ? "btn-success"
                          : "btn-outline-success"
                      }`}
                      onClick={() => handleContentChange(<LeftRight />, "menu1")}
                    >
                      Left & Right
                    </button>
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu1.1"
                        ? "btn-success"
                        : "btn-outline-success"
                      }`}
                      onClick={() =>
                        handleContentChange(<ForwardBackward />, "menu1.1")
                      }
                    >
                      Forward & Backward
                    </button>
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu1.2"
                        ? "btn-success"
                        : "btn-outline-success"
                      }`}
                      onClick={() =>
                        handleContentChange(<SetPosition />, "menu1.2")
                      }
                    >
                      Set Position
                    </button>
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu1.3"
                        ? "btn-success"
                        : "btn-outline-success"
                      }`}
                      onClick={() =>
                        handleContentChange(<SetXY />, "menu1.3")
                      }
                    >
                      Setx & sety
                    </button>
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu1.4"
                        ? "btn-success"
                        : "btn-outline-success"
                      }`}
                      onClick={() =>
                        handleContentChange(<SetHeading />, "menu1.4")
                      }
                    >
                      Setheading
                    </button>
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu1.5"
                        ? "btn-success"
                        : "btn-outline-success"
                      }`}
                      onClick={() =>
                        handleContentChange(<SetHome/>, "menu1.5")
                      }
                    >
                      Home
                    </button>
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu1.6"
                        ? "btn-success"
                        : "btn-outline-success"
                      }`}
                      onClick={() =>
                        handleContentChange(<Circle/>, "menu1.6")
                      }
                    >
                      Circle
                    </button>
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu1.7"
                        ? "btn-success"
                        : "btn-outline-success"
                      }`}
                      onClick={() =>
                        handleContentChange(<Dot/>, "menu1.7")
                      }
                    >
                      Dot
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              {/* Accordion*/}
              <Accordion.Item eventKey="2">
                <Accordion.Header>Turtle Tell State</Accordion.Header>
                <Accordion.Body>
                  <div className="d-flex flex-column">
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu2"
                        ? "btn-success"
                        : "btn-outline-success"
                      }`}
                      onClick={() => handleContentChange(<Position/>, "menu2")}
                    >
                      Position
                    </button>
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu2.2"
                        ? "btn-success"
                        : "btn-outline-success"
                      }`}
                      onClick={() => handleContentChange(<Xykoordinat/>, "menu2.2")}
                    >
                      Xcor & Ycor
                    </button>
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu2.3"
                        ? "btn-success"
                        : "btn-outline-success"
                      }`}
                      onClick={() => handleContentChange(<Heading/>, "menu2.3")}
                    >
                      Heading
                    </button>
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu2.4"
                        ? "btn-success"
                        : "btn-outline-success"
                      }`}
                      onClick={() => handleContentChange(<Distance/>, "menu2.4")}
                    >
                      Distance
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>Pen Control</Accordion.Header>
                <Accordion.Body>
                  <div className="d-flex flex-column">
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu3.1"
                        ? "btn-success"
                        : "btn-outline-success"
                      }`}
                      onClick={() => handleContentChange(<Pendownpenup/>, "menu3.1")}
                    >
                      Pendown & Penup
                    </button>
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu3.2"
                        ? "btn-success"
                        : "btn-outline-success"
                      }`}
                      onClick={() => handleContentChange(<Pensize/>, "menu3.2")}
                    >
                      Pensize
                    </button>
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu3.3"
                        ? "btn-success"
                        : "btn-outline-success"
                      }`}
                      onClick={() => handleContentChange(<Isdown/>, "menu3.3")}
                    >
                      Isdown
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header>Color Control</Accordion.Header>
                <Accordion.Body>
                  <div className="d-flex flex-column">
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu4.1"
                        ? "btn-success"
                        : "btn-outline-success"
                      }`}
                      onClick={() => handleContentChange(<Color/>, "menu4.1")}
                    >
                      Pencolor
                    </button>
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu4.2"
                        ? "btn-success"
                        : "btn-outline-success"
                      }`}
                      onClick={() => handleContentChange(<FillColor/>, "menu4.2")}
                    >
                      Pengisian Warna (Fillcolor, Begin_fill, dan End_fill)
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="5">
                <Accordion.Header>More Drawing Control</Accordion.Header>
                <Accordion.Body>
                  <div className="d-flex flex-column">
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu5.1"
                        ? "btn-success"
                        : "btn-outline-success"
                      }`}
                      onClick={() => handleContentChange(<Reset/>, "menu5.1")}
                    >
                      Reset
                    </button>
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu5.2"
                        ? "btn-success"
                        : "btn-outline-success"
                      }`}
                      onClick={() => handleContentChange(<Clear/>, "menu5.2")}
                    >
                      Clear
                    </button>
                    <button
                      className={`btn text-start mb-2 ${
                        activeButton === "menu5.3"
                        ? "btn-success"
                        : "btn-outline-success"
                      }`}
                      onClick={() => handleContentChange(<Write/>, "menu5.3")}
                    >
                      Write
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>

            </Accordion>
          </Col>

          {/* Konten */}
          <Col xs={10} className="p-4">
            <div>{content}</div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Tutorialpage;
