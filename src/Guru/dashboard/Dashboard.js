import React, { useState, useEffect } from 'react';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom'; // Tambah ini di atas
import { Card, Row, Col } from 'react-bootstrap';
import {
  BsGrid,
  BsPeople,
  BsBook,
  BsLightning,
  BsBarChart,
  BsPeopleFill,
  BsBookFill,
  BsLightningFill,
  BsBarChartFill,
  BsKeyFill,
} from 'react-icons/bs';


const menuItems = [
    { name: 'Dashboard', icon: <BsGrid />, path: '/guru/dashboard' },
    { name: 'Data Siswa', icon: <BsPeople />, path: '/guru/datasiswa' },
    { name: 'Progres Belajar', icon: <BsBook />, path: '/guru/progres-belajar' },
    { name: 'Progres Tantangan', icon: <BsLightning />, path: '/guru/progres-tantangan' },
    { name: 'Data Nilai', icon: <BsBarChart />, path: '/guru/data-nilai' },
  ];
  
const Dashboard = () => {
    const navigate = useNavigate();
    
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  const location = useLocation(); // Tambah ini di dalam component Dashboard

  const [token, setTokenKelas] = useState("");

  const [jumlahSiswa, setJumlahSiswa] = useState(0);
  const [jumlahSelesaiBelajar, setJumlahSelesaiBelajar] = useState(0);
  const [jumlahSelesaiTantangan, setJumlahSelesaiTantangan] = useState(0);
  const [dataNilai, setDataNilai] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token-guru');
      const decoded = jwtDecode(response.data.accessToken);
      const tokenKelas = decoded.token;
      setTokenKelas(tokenKelas);
  
      // Ambil data statistik
      const total = await axios.get(`http://localhost:5000/count-users?token_kelas=${tokenKelas}`);
      const selesai = await axios.get(`http://localhost:5000/count-selesai-belajar?token_kelas=${tokenKelas}`);
      const tantangan = await axios.get(`http://localhost:5000/count-selesai-tantangan?token_kelas=${tokenKelas}`);
      const nilaiRes = await axios.get(`http://localhost:5000/nilai/by-token?token_kelas=${tokenKelas}`);
  
      setJumlahSiswa(total.data.count);
      setJumlahSelesaiBelajar(selesai.data.count);
      setJumlahSelesaiTantangan(tantangan.data.count);
      setDataNilai(nilaiRes.data);
    } catch (error) {
      if (error.response) {
        navigate('/login-guru');
      }
    }
  };
  
  
  fetchData();
}, []);

const hitungRataRata = () => {
  let totalNilai = 0;
  let jumlahNilai = 0;

  dataNilai.forEach((nilai) => {
    for (let i = 1; i <= 6; i++) {
      const kuisKey = `kuis_${i}`;
      const nilaiKuis = nilai[kuisKey];
      if (nilaiKuis !== null && nilaiKuis !== undefined) {
        totalNilai += nilaiKuis;
        jumlahNilai++;
      }
    }
  });

  if (jumlahNilai === 0) return 0;
  return (totalNilai / jumlahNilai).toFixed(2); // misalnya 87.33
};

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          height: '100vh',
          backgroundColor: '#212529',
          color: 'white',
          padding: '20px',
          position: 'fixed',
          left: 0,
          top: 0,
          transition: 'all 0.3s',
        }}
      >
        <h5 className="mb-4 text-center" style={{ color: 'white', fontSize: '1.3rem', fontWeight: 'bold', marginTop: 65 }}>
          DAFTAR MENU
        </h5>
        <div className="sidebar-menu">
        {menuItems.map((item, index) => (
            <Link
            key={index}
            to={item.path}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
            >
            <span style={{ marginRight: '10px' }}>{item.icon}</span>
            {item.name}
            </Link>
        ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ marginLeft: '250px', padding: '30px', width: '100%', marginTop: 50 }}>
        <h2 className='mb-3'>{activeMenu}</h2>

        {/* Token Card */}
        <Card className="mb-4 shadow-sm">
          <Card.Body style={{ padding: '25px 30px' }}>
            <div className="d-flex align-items-center">
              <BsKeyFill size={36} style={{ marginRight: '20px', color: '#0d6efd' }} />
              <div>
                <h5 style={{ fontWeight: 'bold' }}>Token Guru untuk Siswa Masuk Kelas:</h5>
                <h3 style={{ letterSpacing: '4px', marginTop: '10px', color: '#0d6efd' }}>{token}</h3>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Statistik Cards */}
        <Row>
          <Col md={3}>
            <Card bg="primary" text="white" className="mb-3 shadow-sm">
              <Card.Body style={{ padding: '30px' }}>
                <div className="d-flex align-items-center">
                  <BsPeopleFill size={34} style={{ marginRight: '15px' }} />
                  <div>
                    <Card.Title style={{ fontSize: '1.1rem' }}>Total Siswa</Card.Title>
                    <Card.Text style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{jumlahSiswa}</Card.Text>

                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card bg="success" text="white" className="mb-3 shadow-sm">
              <Card.Body style={{ padding: '30px' }}>
                <div className="d-flex align-items-center">
                  <BsBookFill size={34} style={{ marginRight: '15px' }} />
                  <div>
                    <Card.Title style={{ fontSize: '1.1rem' }}>Selesai Belajar</Card.Title>
                    <Card.Text style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                      {jumlahSelesaiBelajar}/{jumlahSiswa}
                    </Card.Text>

                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card bg="warning" text="white" className="mb-3 shadow-sm">
              <Card.Body style={{ padding: '30px' }}>
                <div className="d-flex align-items-center">
                  <BsLightningFill size={34} style={{ marginRight: '15px' }} />
                  <div>
                    <Card.Title style={{ fontSize: '1.1rem' }}>Tantangan Selesai</Card.Title>
                    <Card.Text style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                      {jumlahSelesaiTantangan}/{jumlahSiswa}
                    </Card.Text>

                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card bg="info" text="white" className="mb-3 shadow-sm">
              <Card.Body style={{ padding: '30px' }}>
                <div className="d-flex align-items-center">
                  <BsBarChartFill size={34} style={{ marginRight: '15px' }} />
                  <div>
                    <Card.Title style={{ fontSize: '1.1rem' }}>Nilai Rata-rata</Card.Title>
                    <Card.Text style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{hitungRataRata()}</Card.Text>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Sidebar styles */}
      <style>{`
        .sidebar-menu {
          display: flex;
          flex-direction: column;
        }
        .sidebar-item {
          padding: 12px 15px;
          margin-bottom: 8px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          font-size: 16px;
          transition: background-color 0.2s ease;
        }
        .sidebar-item:hover {
          background-color: #343a40;
        }
        .sidebar-item.active {
          background-color: #0d6efd;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
