import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios, { backendURL } from "../../axios-client";

export const QcstrResult = () => {
    let { jobId } = useParams();
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/qcstr/noauth/jobs/${jobId}`)
            .then((response) => {
                setResult(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error(error.response.data.message);
                setLoading(false);
            });
    }, [jobId]);
    console.log(result)


    return (
        <>
            <h1>  </h1>
            <h1>  </h1>
            <div className="mb-2 d-flex justifiy-content-center align-items -center" >
                <Link className="btn btn-light" to="/tools/qcstr/qcstranalysis">
                    New Analysis
                </Link>
                <Link
                    className="btn btn-light"
                    to={`/tools/qcstr/qcstrresult/${jobId}`}
                >
                    Results
                </Link>
            </div>

            {/* <h1 className="text-center" > </h1> */}
            <h1 className="text-center" style={{ height: "20vh" }}> </h1>
            <h1 className="text-center">Job Results</h1>


            {loading && (
                <div className="w-100 d-flex justify-content-center mt-3">
                    <Spinner className="spinner" animation="border" variant="dark" />
                </div>
            )}
            {!loading && result.status === "queued" && (
                <div>
                    Job is currently queued...Please refresh page to recheck status
                </div>
            )}
            {!loading && result.status === "running" && (
                <div>
                    Job is currently running...Please refresh page to recheck status
                </div>
            )}
            {!loading && result.status === "completed" && (
                <div className="d-grid gap-2 w-50 p-4" >
                    <Button
                        variant="secondary"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.qcFile}`}
                    >
                        Download diffref-bias plot
                    </Button>

                    <Button
                        variant="secondary"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.qcFile2}`}
                    >
                        Download diffref-histogram plot
                    </Button>

                    <Button
                        variant="secondary"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.qcFile3}`}
                    >
                        Download quality-locus-stratified plot
                    </Button>

                    <Button
                        variant="secondary"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.qcFile4}`}
                    >
                        Download quality-per-call plot
                    </Button>

                    <Button
                        variant="secondary"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.qcFile5}`}
                    >
                        Download quality-per-locus plot
                    </Button>

                    <Button
                        variant="secondary"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.qcFile6}`}
                    >
                        Download quality-per-sample plot
                    </Button>

                    <Button
                        variant="secondary"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.qcFile7}`}
                    >
                        Download quality-sample-stratified plot
                    </Button>

                    {result.qcFile8 && (
                        <Button
                            variant="secondary"
                            target={"_blank"}
                            size="lg"
                            href={`${backendURL}/results${result.qcFile8}`}
                        >
                            Download sample-callnum plot
                        </Button>
                    )}

                    {result.qcFile9 && (
                        <Button
                            variant="secondary"
                            target={"_blank"}
                            size="lg"
                            href={`${backendURL}/results${result.qcFile9}`}
                        >
                            Download chrom-callnum plot
                        </Button>
                    )}

                </div>
            )}
            {!loading && result.status === "failed" && (
                <div>Job failed...Please execute a new analysis</div>
            )}
            <h1 className="text-center" style={{ height: "45vh" }}> </h1>

        </>
    );
};