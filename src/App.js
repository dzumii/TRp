import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Tools } from "./pages/Tools";
import { Login } from "./pages/Login";
import { Workflow } from "./pages/WORKFLOW/Workflow";
import { Navbarr } from "./Navbar";

import { Gangstr } from './pages/GANGSTR/Gangstr';
import { GangstrAnalysis } from './pages/GANGSTR/gangstranalysis';
import { GangstrResult } from './pages/GANGSTR/gangstrresult';

import { Hipstr } from './pages/HIPSTR/Hipstr';
import { HipstrAnalysis } from './pages/HIPSTR/hipstranalysis';
import { HipstrResult } from './pages/HIPSTR/hipstrresult';

import { Mergestr } from './pages/MERGESTR/Mergestr';
import { MergestrAnalysis } from './pages/MERGESTR/mergestranalysis';
import { MergestrResult } from './pages/MERGESTR/mergestrresult';

import { ExHunter } from './pages/EXPANSIONHUNTER/Eh';
import { EhAnalysis } from './pages/EXPANSIONHUNTER/ehanalysis';
import { EhResult } from './pages/EXPANSIONHUNTER/ehresult';

import { Qcstr } from './pages/QCSTR/Qcstr';
import { QcstrAnalysis } from './pages/QCSTR/qcstranalysis';
import { QcstrResult } from './pages/QCSTR/qcstrresult';


import { Statstr } from './pages/STATSTR/Statstr';
import { StatstrAnalysis } from './pages/STATSTR/statstranalysis';
import { StatstrResult } from './pages/STATSTR/statstrresult';

import { Dumpstr } from './pages/DUMPSTR/Dumpstr';
import { DumpstrAnalysis } from './pages/DUMPSTR/dumpstranalysis';
import { DumpstrResult } from './pages/DUMPSTR/dumpstrresult';

import { Comparestr } from './pages/COMPARESTR/Comparestr';
import { ComparestrAnalysis } from './pages/COMPARESTR/comparestranalysis';
import { ComparestrResult } from './pages/COMPARESTR/comparestrresult';
import { Register } from './pages/Register';

// import { Workflow } from './pages/Workflow';
import { WorkflowAnalysis } from './pages/WORKFLOW/Workflowanalysis';
import { WorkflowResult } from './pages/WORKFLOW/Workflowresult';

import { ToastContainer } from 'react-toastify';


import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbarr className="Navbarr" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/login" element={<Login />} />
          <Route path="/workflow" element={<Workflow />} />

          <Route path="/workflow/newanalysis" element={<WorkflowAnalysis />} />
          <Route
            path="/workflow/result"
            element={<WorkflowResult />}
          />

          <Route path="/login/register" element={<Register />} />

          <Route path="/tools/gangstr" element={<Gangstr />} />
          <Route
            path="/tools/gangstr/gangstranalysis"
            element={<GangstrAnalysis />}
          />
          <Route
            path="/tools/gangstr/gangstrresult/:jobId"
            element={<GangstrResult />}
          />

          <Route path="/tools/hipstr" element={<Hipstr />} />
          <Route
            path="/tools/hipstr/hipstranalysis"
            element={<HipstrAnalysis />}
          />
          <Route path="/tools/hipstr/hipstrresult/:jobId" element={<HipstrResult />} />

          <Route path="/tools/eh" element={<ExHunter />} />
          <Route path="/tools/eh/ehanalysis" element={<EhAnalysis />} />
          <Route path="/tools/eh/ehresult" element={<EhResult />} />

          <Route path="/tools/mergestr" element={<Mergestr />} />
          <Route
            path="/tools/mergestr/mergestranalysis"
            element={<MergestrAnalysis />}
          />
          <Route
            path="/tools/mergestr/mergestrresult/:jobId"
            element={<MergestrResult />}
          />

          <Route path="/tools/qcstr" element={<Qcstr />} />
          <Route
            path="/tools/qcstr/qcstranalysis"
            element={<QcstrAnalysis />}
          />
          <Route
            path="/tools/qcstr/qcstrresult/:jobId"
            element={<QcstrResult />} />

          <Route path="/tools/statstr" element={<Statstr />} />
          <Route
            path="/tools/statstr/statstranalysis"
            element={<StatstrAnalysis />}
          />
          <Route
            path="/tools/statstr/statstrresult/:jobId"
            element={<StatstrResult />}
          />

          <Route path="/tools/dumpstr" element={<Dumpstr />} />
          <Route
            path="/tools/dumpstr/dumpstranalysis"
            element={<DumpstrAnalysis />}
          />
          {/* Change */}
          <Route
            path="/tools/dumpstr/dumpstrresult/:jobId"
            element={<DumpstrResult />}
          />

          <Route path="/tools/comparestr" element={<Comparestr />} />
          <Route
            path="/tools/comparestr/comparestranalysis"
            element={<ComparestrAnalysis />}
          />
          <Route
            path="/tools/comparestr/comparestrresult/:jobId"
            element={<ComparestrResult />}
          />

          <Route path="*" element={<h1> PAGE NOT FOUND</h1>} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-left"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;