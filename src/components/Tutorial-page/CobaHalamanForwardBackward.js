import React, { useEffect, useState } from "react";
import { Accordion, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./assets/tutor-copy.css";

const CobaHalamanForwardBackward = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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

  // Tentukan accordion aktif berdasarkan URL
  const activeAccordionKey = location.pathname.includes("/turtlemotion") || location.pathname.includes("/cobasidebar/forwardbackward")
    ? "1"
    : "0";

  // Class untuk tombol aktif
  const getButtonClass = (path) =>
    location.pathname === path ? "btn text-start mb-2 btn-success" : "btn text-start mb-2 btn-outline-success";

  return (
    <Container fluid className="sidenavigasi mt-5">
      <Row>
        <Col xs={2} className="bg-light border-end vh-100 p-0">
          <Accordion defaultActiveKey={activeAccordionKey}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Pengenalan</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column">
                  <button
                    className={getButtonClass("/cobasidebar/pendahuluan")}
                    onClick={() => navigate("/cobasidebar/pendahuluan")}
                  >
                    Pengenalan
                  </button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Turtle Motion</Accordion.Header>
              <Accordion.Body>
                <div className="d-flex flex-column">
                  <button
                    className={getButtonClass("/cobasidebar/leftright")}
                    onClick={() => navigate("/cobasidebar/leftright")}
                  >
                    Left & Right
                  </button>
                  <button
                    className={getButtonClass("/cobasidebar/forwardbackward")}
                    onClick={() => navigate("/cobasidebar/forwardbackward")}
                  >
                    Forward & Backward
                  </button>
                  <button
                    className={getButtonClass("/turtlemotion/setposition")}
                    onClick={() => navigate("/turtlemotion/setposition")}
                  >
                    Set Position
                  </button>
                  <button
                    className={getButtonClass("/turtlemotion/setxy")}
                    onClick={() => navigate("/turtlemotion/setxy")}
                  >
                    Setx & sety
                  </button>
                  <button
                    className={getButtonClass("/turtlemotion/setheading")}
                    onClick={() => navigate("/turtlemotion/setheading")}
                  >
                    Setheading
                  </button>
                  <button
                    className={getButtonClass("/turtlemotion/sethome")}
                    onClick={() => navigate("/turtlemotion/sethome")}
                  >
                    Home
                  </button>
                  <button
                    className={getButtonClass("/turtlemotion/circle")}
                    onClick={() => navigate("/turtlemotion/circle")}
                  >
                    Circle
                  </button>
                  <button
                    className={getButtonClass("/turtlemotion/dot")}
                    onClick={() => navigate("/turtlemotion/dot")}
                  >
                    Dot
                  </button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>

        <Col xs={10} className="p-4">
          <div className="content" style={{ paddingLeft: 50, paddingRight: 50 }}>
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
                borderLeft: '10px solid orange',
              }}
            >
              Forward dan Backward
            </h2>

            <hr />
            <br />

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
                Memahami konsep canvas sebagai ruang pergerakan Bidawang.
              </li>
              <li>
                Mengenali tampilan lingkungan kerja dan perintah dasar untuk menggerakan
                Bidawang pada canvas.
              </li>
            </ol>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CobaHalamanForwardBackward;
