import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Tools } from "./pages/Tools";
import { Login } from "./pages/Login";
import { Workflow } from "./pages/Workflow";
import { Navbarr } from "./Navbar";

import { Gangstr } from './pages/Gangstr';
import { GangstrAnalysis } from './pages/gangstranalysis';
import { GangstrResult } from './pages/gangstrresult';

import { Hipstr } from './pages/Hipstr';
import { HipstrAnalysis } from './pages/hipstranalysis';
import { HipstrResult } from './pages/hipstrresult';

import { Mergestr } from './pages/Mergestr';
import { MergestrAnalysis } from './pages/mergestranalysis';
import { MergestrResult } from './pages/mergestrresult';

import { ExHunter } from './pages/Eh';
import { EhAnalysis } from './pages/ehanalysis';
import { EhResult } from './pages/ehresult';

import { Qcstr } from './pages/Qcstr';
import { QcstrAnalysis } from './pages/qcstranalysis';
import { QcstrResult } from './pages/qcstrresult';


import { Statstr } from './pages/Statstr';
import { StatstrAnalysis } from './pages/statstranalysis';
import { StatstrResult } from './pages/statstrresult';

import { Dumpstr } from './pages/Dumpstr';
import { DumpstrAnalysis } from './pages/dumpstranalysis';
import { DumpstrResult } from './pages/dumpstrresult';

import { Comparestr } from './pages/Comparestr';
import { ComparestrAnalysis } from './pages/comparestranalysis';
import { ComparestrResult } from './pages/comparestrresult';
import { Register } from './pages/Register';

import 'bootstrap/dist/css/bootstrap.min.css';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import{ Navbar as NaavvBaaarrr} from 'react-bootstrap/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbarr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/login" element={<Login />} />
          <Route path="/workflow" element={<Workflow />} />
          <Route path="*" element={<h1> PAGE NOT FOUND</h1>} />

          <Route path="/login/register" element={<Register />} />

          <Route path="/tools/gangstr" element={<Gangstr />} />
          <Route path="/tools/gangstr/gangstranalysis" element={<GangstrAnalysis />} />
          <Route path="/tools/gangstr/gangstrresult" element={<GangstrResult />} />

          <Route path="/tools/hipstr" element={<Hipstr />} />
          <Route path="/tools/hipstr/hipstranalysis" element={<HipstrAnalysis />} />
          <Route path="/tools/hipstr/hipstrresult" element={<HipstrResult />} />

          <Route path="/tools/eh" element={<ExHunter />} />
          <Route path="/tools/eh/ehanalysis" element={<EhAnalysis />} />
          <Route path="/tools/eh/ehresult" element={<EhResult />} />

          <Route path="/tools/mergestr" element={<Mergestr />} />
          <Route path="/tools/mergestr/mergestranalysis" element={<MergestrAnalysis />} />
          <Route path="/tools/mergestr/mergestrresult" element={<MergestrResult />} />

          <Route path="/tools/qcstr" element={<Qcstr />} />
          <Route path="/tools/qcstr/qcstranalysis" element={<QcstrAnalysis />} />
          <Route path="/tools/qcstr/qcstrresult" element={<QcstrResult />} />

          <Route path="/tools/statstr" element={<Statstr />} />
          <Route path="/tools/statstr/statstranalysis" element={<StatstrAnalysis />} />
          <Route path="/tools/statstr/statstrresult" element={<StatstrResult />} />

          <Route path="/tools/dumpstr" element={<Dumpstr />} />
          <Route path="/tools/dumpstr/dumpstranalysis" element={<DumpstrAnalysis />} />
          <Route path="/tools/dumpstr/dumpstrresult" element={<DumpstrResult />} />

          <Route path="/tools/comparestr" element={<Comparestr />} />
          <Route path="/tools/comparestr/comparestranalysis" element={<ComparestrAnalysis />} />
          <Route path="/tools/comparestr/comparestrresult" element={<ComparestrResult />} />


        </Routes>
      </Router>
    </div>
  );
}

// function App() {
//   return (
//     <>
//       <Navbar bg="dark" variant="dark">
//         <Container>
//           <Navbar.Brand href="#home">Trp</Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="#features">Tools</Nav.Link>
//             <Nav.Link href="#pricing">Tutorials</Nav.Link>
//             <Nav.Link href="#pricing">Workflows</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>
//       </>
//   );
// }

export default App;
