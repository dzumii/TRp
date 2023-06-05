import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom";
import { DumpstrAnalysis } from './dumpstranalysis';
import React from 'react';
import ReactDOM from "react-dom";

export const DumpstrResult = () => {
    const navigate = useNavigate();

    const dumpstrA = () => {
        navigate("/tools/dumpstr/dumpstranalysis");
    };

    const dumpstrR = () => {
        navigate("/tools/dumpstr/dumpstrresult");
    };

    

    
    return (
        <>
            <h1> DumpSTR </h1>
            <ButtonGroup size="lg" className="mb-2">
                <Button variant="light" onClick={dumpstrA}>New Analysis</Button>
                <Button variant="light" onClick={dumpstrR}>Results</Button>
            </ButtonGroup>

            <h1>  </h1>

            {/* <div >
            <Button
              variant="contained"
              color="primary"
              className={mainClasses.button}
              endIcon={<GetAppRounded />}
              target={"_blank"}
              href={`/results${annotRes.dumpFile}`}
            >
              Download Annotation Results
            </Button>
            </div> */}
            {/* <Button variant="light" onClick={downloadFile} > Download file</Button> */}

        </>
    )
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

