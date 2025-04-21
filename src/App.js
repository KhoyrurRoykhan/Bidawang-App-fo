import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Navigasibar from "./components/navbar/navbar";
import LandingPage from "./components/Landing-page/landingPage";
import Footer from "./components/Footer/footer";
// import KategoriGrid from "./components/Landing-page/KategoriGrid";
// import Pendahuluan from "./components/Tutorial-page/Pendahuluan/Pendahuluan";
import Compile from "./components/Compiler/compile";
// import LeftRight from "./components/Tutorial-page/Turtle-motion/LeftRight";
// import ForwardBackward from "./components/Tutorial-page/Turtle-motion/ForwardBackward";
// import SetPosition from "./components/Tutorial-page/Turtle-motion/SetPosition";
// import SetXY from "./components/Tutorial-page/Turtle-motion/SetXY";
// import SetHeading from "./components/Tutorial-page/Turtle-motion/SetHeading";
// import SetHome from "./components/Tutorial-page/Turtle-motion/SetHome";
// import Circle from "./components/Tutorial-page/Turtle-motion/Circle";
// import Dot from "./components/Tutorial-page/Turtle-motion/Dot";
import UndoSpeed from "./components/Tutorial-page/Turtle-motion/UndoSpeed";
import Challanges from "./components/Challanges-page/Challanges";
// import TantanganSatu from "./components/Challanges-page/all-challanges/TantanganSatu";
import Susursungai from "./components/Susursungai/Susursungai";
import Baritoriver from "./components/Susursungai/all-susursungai/Baritoriver";
// import TantanganDua from "./components/Challanges-page/all-challanges/TantanganDua";
// import ChallangeOne from "./components/Challanges-page/all-challanges/p/ChallangeOne";
import Tutorialpage from "./components/Tutorial-page/Tutorial-page";
// import Texteditor from "./components/Tutorial-page/Texteditor";
import Tampung from "./components/Tutorial-page/Pen-control/Tampung";
import LandingNew from "./components/Landing-page/LandingNew";
import SidebarTutor from "./components/Tutorial-page/SidebarTutor";
import CobaHalaman from "./components/Tutorial-page/CobaHalaman";
import CobaHalamanLeftRight from "./components/Tutorial-page/CobaHalamanLeftRight";
import CobaHalamanForwardBackward from "./components/Tutorial-page/CobaHalamanForwardBackward";

//Belajar
import Pendahuluan from "./components/Belajar/Pengenalan/Pendahuluan";
import LeftRight from "./components/Belajar/Turtle-motion/LeftRight";
import ForwardBackward from "./components/Belajar/Turtle-motion/ForwardBackward";
import SetPosition from "./components/Belajar/Turtle-motion/SetPosition";
import SetXY from "./components/Belajar/Turtle-motion/SetXY";
import SetHeading from "./components/Belajar/Turtle-motion/SetHeading";
import SetHome from "./components/Belajar/Turtle-motion/SetHome";
import Circle from "./components/Belajar/Turtle-motion/Circle";
import Dot from "./components/Belajar/Turtle-motion/Dot";

import Position from "./components/Belajar/Tell-state/Position";
import Xykoordinat from "./components/Belajar/Tell-state/Xykoordinat";
import Heading from "./components/Belajar/Tell-state/Heading";
import Distance from "./components/Belajar/Tell-state/Distance";

import Pendownpenup from "./components/Belajar/Pen-control/Pendownpenup";
import Pensize from "./components/Belajar/Pen-control/Pensize";
import Isdown from "./components/Belajar/Pen-control/Isdown";

import Color from "./components/Belajar/Color-control/PenColor";
import FillColor from "./components/Belajar/Color-control/FillColor";

import Reset from "./components/Belajar/More-drawing-control/Reset";
import Clear from "./components/Belajar/More-drawing-control/Clear";
import Write from "./components/Belajar/More-drawing-control/Write";

import ForLoop from "./components/Belajar/Perulangan/ForLoop";


//Tantangan
import TantanganSatu from "./components/Challanges-page/all-challanges/TantanganSatu";
import TantanganDua from "./components/Challanges-page/all-challanges/TantanganDua";
import TantanganTiga from "./components/Challanges-page/all-challanges/TantanganTiga";
import TantanganEmpat from "./components/Challanges-page/all-challanges/TantanganEmpat";
import TantanganLima from "./components/Challanges-page/all-challanges/TantanganLima";
import TantanganEnam from "./components/Challanges-page/all-challanges/TantanganEnam";
import TantanganTujuh from "./components/Challanges-page/all-challanges/TantanganTujuh";
import TantanganDelapan from "./components/Challanges-page/all-challanges/TantanganDelapan";
import TantanganSembilan from "./components/Challanges-page/all-challanges/TantanganSembilan";
import TantanganSepuluh from "./components/Challanges-page/all-challanges/TantanganSepuluh";
import TantanganSebelas from "./components/Challanges-page/all-challanges/TantanganSebelas";
import TantanganDuabelas from "./components/Challanges-page/all-challanges/TantanganDuabelas";

//Text editor
import TextEditorPage from "./components/Text-editor/TextEditorPage";

//Guru
import Dashboard from "./Guru/dashboard/Dashboard";
import NavbarGuru from "./Guru/navbar/NavbarGuru";
import DataSiswa from "./Guru/dashboard/DataSiswa";
import ProgresBelajar from "./Guru/dashboard/ProgresBelajar";
import ProgresTantangan from "./Guru/dashboard/ProgresTantangan";
import DataNilai from "./Guru/dashboard/DataNilai";
import LoginGuru from "./Guru/Login-guru/LoginGuru";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<><Navigasibar/><Login/></>}/>
      <Route exact path="/register" element={<><Navigasibar/><Register/></>}/>
      <Route path="/" element={<><Navigasibar/><LandingPage/><Footer/></>}/>
      {/* <Route path="/kat" element={<><KategoriGrid/></>}/> */}

      <Route path="/belajarturtle" element={<><Navigasibar/><Tutorialpage/></>}/>


      <Route path="/tutorial" element={<><Navigasibar/><Pendahuluan/></>}/>
      <Route path="/tutorial/leftright" element={<><Navigasibar/><LeftRight/></>}/>
      <Route path="/tutorial/forwardbackward" element={<><Navigasibar/><ForwardBackward/></>}/>
      <Route path="/tutorial/setposition" element={<><Navigasibar/><SetPosition/></>}/>
      <Route path="/tutorial/setxy" element={<><Navigasibar/><SetXY/></>}/>
      <Route path="/tutorial/setheading" element={<><Navigasibar/><SetHeading/></>}/>
      <Route path="/tutorial/home" element={<><Navigasibar/><SetHome/></>}/>
      <Route path="/tutorial/circle" element={<><Navigasibar/><Circle/></>}/>
      <Route path="/tutorial/dot" element={<><Navigasibar/><Dot/></>}/>
      <Route path="/tutorial/undospeed" element={<><Navigasibar/><UndoSpeed/></>}/>

      <Route path="/challanges" element={<><Navigasibar/><Challanges/></>}/>
      {/* <Route path="/challanges/1" element={<><Navigasibar/><TantanganSatu/></>}/> */}
      {/* <Route path="/challanges/2" element={<><Navigasibar/><TantanganDua/></>}/> */}
      {/* <Route path="/challanges/one" element={<><Navigasibar/><ChallangeOne/></>}/> */}
      {/* <Route path="/compile" element={<><Compile/><Footer/></>}/> */}

      <Route path="/susursungai" element={<><Navigasibar/><Susursungai/></>}/>
      <Route path="/susursungai/1" element={<><Navigasibar/><Baritoriver/></>}/>

      {/* <Route path="/texteditor" element={<><Navigasibar/><Texteditor/></>}/> */}
      <Route path="/tampung" element={<Tampung/>}/>

      <Route path="/cobalanding" element={<><LandingNew/></>}/>


      {/* percobaan */}
      <Route path="/cobasidebar/pendahuluan" element={<><Navigasibar/><CobaHalaman/></>}/>
      <Route path="/cobasidebar/leftright" element={<><Navigasibar/><CobaHalamanLeftRight/></>}/>
      <Route path="/cobasidebar/forwardbackward" element={<><Navigasibar/><CobaHalamanForwardBackward/></>}/>

      {/* update */}
      <Route path="/belajar/pendahuluan" element={<><Navigasibar/><Pendahuluan/></>}/>

      <Route path="/belajar/turtlemotion/leftright" element={<><Navigasibar/><LeftRight/></>}/>
      <Route path="/belajar/turtlemotion/forwardbackward" element={<><Navigasibar/><ForwardBackward/></>}/>
      <Route path="/belajar/turtlemotion/setposition" element={<><Navigasibar/><SetPosition/></>}/>
      <Route path="/belajar/turtlemotion/setxy" element={<><Navigasibar/><SetXY/></>}/>
      <Route path="/belajar/turtlemotion/setheading" element={<><Navigasibar/><SetHeading/></>}/>
      <Route path="/belajar/turtlemotion/home" element={<><Navigasibar/><SetHome/></>}/>
      <Route path="/belajar/turtlemotion/circle" element={<><Navigasibar/><Circle/></>}/>
      <Route path="/belajar/turtlemotion/dot" element={<><Navigasibar/><Dot/></>}/>

      <Route path="/belajar/tellstate/position" element={<><Navigasibar/><Position/></>}/>
      <Route path="/belajar/tellstate/xcorycor" element={<><Navigasibar/><Xykoordinat/></>}/>
      <Route path="/belajar/tellstate/heading" element={<><Navigasibar/><Heading/></>}/>
      <Route path="/belajar/tellstate/distance" element={<><Navigasibar/><Distance/></>}/>

      <Route path="/belajar/pencontrol/penuppendown" element={<><Navigasibar/><Pendownpenup/></>}/>
      <Route path="/belajar/pencontrol/pensize" element={<><Navigasibar/><Pensize/></>}/>
      <Route path="/belajar/pencontrol/isdown" element={<><Navigasibar/><Isdown/></>}/>

      <Route path="/belajar/colorcontrol/pencolor" element={<><Navigasibar/><Color/></>}/>
      <Route path="/belajar/colorcontrol/fillcolor" element={<><Navigasibar/><FillColor/></>}/>

      <Route path="/belajar/moredrawingcontrol/reset" element={<><Navigasibar/><Reset/></>}/>
      <Route path="/belajar/moredrawingcontrol/clear" element={<><Navigasibar/><Clear/></>}/>
      <Route path="/belajar/moredrawingcontrol/write" element={<><Navigasibar/><Write/></>}/>

      <Route path="/belajar/perulangan/forloop" element={<><Navigasibar/><ForLoop/></>}/>

      {/* Tantangan */}
      <Route path="/challanges/1" element={<><Navigasibar/><TantanganSatu/></>}/>
      <Route path="/challanges/2" element={<><Navigasibar/><TantanganDua/></>}/>
      <Route path="/challanges/3" element={<><Navigasibar/><TantanganTiga/></>}/>
      <Route path="/challanges/4" element={<><Navigasibar/><TantanganEmpat/></>}/>
      <Route path="/challanges/5" element={<><Navigasibar/><TantanganLima/></>}/>
      <Route path="/challanges/6" element={<><Navigasibar/><TantanganEnam/></>}/>
      <Route path="/challanges/7" element={<><Navigasibar/><TantanganTujuh/></>}/>
      <Route path="/challanges/8" element={<><Navigasibar/><TantanganDelapan/></>}/>
      <Route path="/challanges/9" element={<><Navigasibar/><TantanganSembilan/></>}/>
      <Route path="/challanges/10" element={<><Navigasibar/><TantanganSepuluh/></>}/>
      <Route path="/challanges/11" element={<><Navigasibar/><TantanganSebelas/></>}/>
      <Route path="/challanges/12" element={<><Navigasibar/><TantanganDuabelas/></>}/>

      {/* Text Editor */}
      <Route path="/texteditor" element={<><Navigasibar/><TextEditorPage/></>}/>

      {/* Guru */}
      <Route path="/login-guru" element={<><NavbarGuru/><LoginGuru/></>}/>

      <Route path="/guru/dashboard" element={<><NavbarGuru/><Dashboard/></>}/>
      <Route path="/guru/datasiswa" element={<><NavbarGuru/><DataSiswa/></>}/>
      <Route path="/guru/progres-belajar" element={<><NavbarGuru/><ProgresBelajar/></>}/>
      <Route path="/guru/progres-tantangan" element={<><NavbarGuru/><ProgresTantangan/></>}/>
      <Route path="/guru/data-nilai" element={<><NavbarGuru/><DataNilai/></>}/>



    </Routes>
    </BrowserRouter>
  );
}

export default App;
