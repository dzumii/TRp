import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Countdown from 'react-countdown';
import axios, { backendURL } from "../../axios-client";

export const TrpstrResult = () => {
    let { jobId } = useParams();
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState({});

    // useEffect(() => {
    //     setLoading(true);
    const updateState = useCallback(async () => {
        axios
            .get(`/trpstr/noauth/jobs/${jobId}`)
            .then((response) => {
                setResult(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error(error.response.data.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        let intervalid = setInterval(updateState, 5000);
    }, [jobId]);
    console.log(result)

    return (
        <>
            <h1>  </h1>
            <h1>  </h1>

            <div className="mb-2 d-flex justifiy-content-center align-items -center" >
                <Link className="btn btn-light" to="/workflow/newanalysis">
                    New Analysis
                </Link>
                <Link
                    className="btn btn-light"
                    to={`/workflow/result/${jobId}`}
                >
                    Results
                </Link>
            </div>

            {/* <h1 className="text-center" > </h1> */}
            <h1 className="text-center" style={{ height: "5vh" }}> </h1>
            {/* <h1 className="text-center">Job Results</h1> */}


            {loading && (
                <div className="w-100 d-flex justify-content-center mt-3">
                    <Spinner className="spinner" animation="border" variant="dark" />
                </div>
            )}
            {!loading && result.status === "queued" && (
                // <div>
                //     Job is currently queued...Please refresh page to recheck status
                // </div>
                <div className="w-100 d-flex justify-content-center mt-3">
                    <Spinner className="spinner" animation="border" variant="dark" /><br />
                    <div>Please wait, your job is running...</div>
                </div>
            )}
            {!loading && result.status === "running" && (
                // <div>
                //     Job is currently running...Please refresh page to recheck status
                // </div>
                <div className="w-100 d-flex justify-content-center mt-3">
                    <Spinner className="spinner" animation="border" variant="dark" /><br />
                    <div>Please wait, your job is running...</div>
                </div>
            )}
            {result.status !== "completed" && (
                <div className='footer-countdown'>
                    <Countdown date={Date.now() + 20000} />
                </div>
            )}
            {!loading && result.status === "completed" && (
                <div className="d-grid gap-2 w-50 p-4" >
                    {/* section A */}
                    <h3> Download HipSTR Results </h3>
                    <Button
                        variant="success"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.trpFile}`}
                    >
                        Download hipstr_calls.vcf.gz
                    </Button>

                    <Button
                        variant="success"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.trpFile2}`}
                    >
                        Download hipstr_calls.viz.gz
                    </Button>


                    {/* section B */}
                    <h1>  </h1>
                    <h3> Download First QCSTR Results </h3>
                    <Button
                        variant="success"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.trpFile3}`}
                    >
                        Download first diffref-bias plot
                    </Button>

                    <Button
                        variant="success"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.trpFile4}`}
                    >
                        Download first diffref-histogram plot
                    </Button>

                    <Button
                        variant="success"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.trpFile5}`}
                    >
                        Download  first quality-locus-stratified plot
                    </Button>

                    <Button
                        variant="success"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.trpFile6}`}
                    >
                        Download  first quality-per-call plot
                    </Button>

                    <Button
                        variant="success"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.trpFile7}`}
                    >
                        Download first  quality-per-locus plot
                    </Button>

                    <Button
                        variant="success"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.trpFile8}`}
                    >
                        Download  first quality-per-sample plot
                    </Button>

                    <Button
                        variant="success"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.trpFile9}`}
                    >
                        Download first  quality-sample-stratified plot
                    </Button>

                    {result.trpFile8 && (
                        <Button
                            variant="success"
                            target={"_blank"}
                            size="lg"
                            href={`${backendURL}/results${result.trpFile10}`}
                        >
                            Download first  sample-callnum plot
                        </Button>
                    )}

                    {result.trpFile9 && (
                        <Button
                            variant="success"
                            target={"_blank"}
                            size="lg"
                            href={`${backendURL}/results${result.trpFile11}`}
                        >
                            Download  first chrom-callnum plot
                        </Button>
                    )}


                    {/* section C */}
                    <h3> Download DumpSTR Results </h3>
                    <h1>  </h1>
                    <Button
                        variant="success"
                        target={"_blank"}
                        size="lg"

                        href={`${backendURL}/results${result.trpFile12}`}
                    >
                        Download VCF
                    </Button>

                    {/* section D */}
                    <h3> Download Second QCSTR Results </h3>
                    <h1>  </h1>
                    <Button
                        variant="success"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.trpFile13}`}
                    >
                        Download second diffref-bias plot
                    </Button>

                    <Button
                        variant="success"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.trpFile14}`}
                    >
                        Download second diffref-histogram plot
                    </Button>

                    <Button
                        variant="success"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.trpFile15}`}
                    >
                        Download  second quality-locus-stratified plot
                    </Button>

                    <Button
                        variant="success"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.trpFile16}`}
                    >
                        Download  second quality-per-call plot
                    </Button>

                    <Button
                        variant="success"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.trpFile17}`}
                    >
                        Download second  quality-per-locus plot
                    </Button>

                    <Button
                        variant="success"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.trpFile18}`}
                    >
                        Download  second quality-per-sample plot
                    </Button>

                    <Button
                        variant="success"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.trpFile19}`}
                    >
                        Download  second quality-sample-stratified plot
                    </Button>

                    {result.trpFile8 && (
                        <Button
                            variant="success"
                            target={"_blank"}
                            size="lg"
                            href={`${backendURL}/results${result.trpFile20}`}
                        >
                            Download  second sample-callnum plot
                        </Button>
                    )}

                    {result.trpFile9 && (
                        <Button
                            variant="success"
                            target={"_blank"}
                            size="lg"
                            href={`${backendURL}/results${result.trpFile21}`}
                        >
                            Download  second chrom-callnum plot
                        </Button>
                    )}


                    {/* section E */}
                    <h3> Download STATSTR Results </h3>
                    <h1>  </h1>
                    <Button
                        variant="success"
                        target={"_blank"}
                        size="lg"

                        href={`${backendURL}/results${result.trpFile22}`}
                    >
                        Download TAB file
                    </Button>




                </div>
            )}
            {!loading && result.status === "failed" && (
                <div>Job failed...Please execute a new analysis</div>
            )}
            <h1 className="text-center" style={{ height: "45vh" }}> </h1>

        </>
    );


    return <h1> Workflow Result</h1>;
};
