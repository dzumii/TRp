import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "./axios-client";

export const DumpstrResult = () => {
  let { jobId } = useParams();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({});

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/dumpstr/noauth/jobs/${jobId}`)
      .then((response) => {
        setResult(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(error.response.data.message);
        setLoading(false);
      });
  }, [jobId]);

  return (
    <>
      <h1> DumpSTR </h1>
      <div className="mb-2 d-flex justifiy-content-center align-items -center">
        <Link className="btn btn-secondary" to="/tools/dumpstr/dumpstranalysis">
          New Analysis
        </Link>
        <Link
          className="btn btn-secondary"
          to={`/tools/dumpstr/dumpstrresult/${jobId}`}
        >
          Results
        </Link>
      </div>

      <h1 className="text-center">Job Results</h1>

      {loading && (
        <div className="w-100 d-flex justify-content-center mt-3">
          <Spinner className="spinner" animation="border" variant="dark" />
        </div>
      )}
      {!loading && result.status === "running" && (
        <div>
          Job is currently running...Please refresh page to recheck status
        </div>
      )}
      {!loading && result.status === "completed" && (
        <div>
          <Button
            variant="primary"
            target={"_blank"}
            href={`/results${result.outputFile}`}
          >
            Download Results
          </Button>
        </div>
      )}
      {!loading && result.status === "failed" && (
        <div>Job failed...Please execute a new analysis</div>
      )}
    </>
  );
};

//646e2f10e127959424de06c6

// export const DumpstrResult = () => {
//     const navigate = useNavigate();

//     const dumpstrA = () => {
//         navigate("/tools/dumpstr/dumpstranalysis");
//     };

//     const dumpstrR = () => {
//         navigate("/tools/dumpstr/dumpstrresult");
//     };

//     const downloadFile=()=>{
//         fetch('http://localhost:5029/api/v1/dumpstr/noauth/jobs/646e2f10e127959424de06c6')
//         .then(response => response.json())
//         .then(data => {
//           const dumpFileUrl = data.data.dumpFile;
//           window.open(dumpFileUrl);
//         })
//         .catch(error => {
//           console.error('Error:', error);
//         });
//     };
//     return (
//         <>
//             <h1> DumpSTR </h1>
//             <ButtonGroup size="lg" className="mb-2">
//                 <Button variant="light" onClick={dumpstrA}>New Analysis</Button>
//                 <Button variant="light" onClick={dumpstrR}>Results</Button>
//             </ButtonGroup>

//             <h1>  </h1>

//             <Button variant="light" onClick={downloadFile} > Download file</Button>

//         </>
//     )
//     };

// export const DumpstrResult = () => {
//     const navigate = useNavigate();

//     const dumpstrA = () => {
//         navigate("/tools/dumpstr/dumpstranalysis");
//     };

//     const dumpstrR = () => {
//         navigate("/tools/dumpstr/dumpstrresult");
//     };

//     const filePath = "/home/dzumi/trFiles/2a0fbbcd-45c1-485b-99a4-ba8348f07653/dumpstr/output/dump.vcf.gz"

//     const downloadFile = (
//         filePath,
//         fileName = 'dump.vcf.gz',
//     ) => {
//         fetch(filePath)
//             .then(response => response.blob())
//             .then(blob => {
//                 const url = window.URL.createObjectURL(blob);

//                 const link = document.createElement('a');
//                 link.href = url;
//                 link.download = fileName;

//                 document.body.appendChild(link);

//                 setTimeout(() => {
//                     link.click();

//                     document.body.removeChild(link);

//                     window.URL.revokeObjectURL(url);
//                 }, 100);
//             });
//     };

//     return (
//         <>
//             <h1> DumpSTR </h1>
//             <ButtonGroup size="lg" className="mb-2">
//                 <Button variant="light" onClick={dumpstrA}>New Analysis</Button>
//                 <Button variant="light" onClick={dumpstrR}>Results</Button>
//             </ButtonGroup>

//             <h1>  </h1>

//             <Button variant="light" onClick={() => downloadFile('filePath')} > Download file</Button>

//         </>
//     );

// }
