import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios, { backendURL } from "../axios-client";

export const ComparestrResult = () => {
    let { jobId } = useParams();
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState({});

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/comparestr/noauth/jobs/${jobId}`)
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
                <Link className="btn btn-light" to="/tools/comparestr/comparestranalysis">
                    New Analysis
                </Link>
                <Link
                    className="btn btn-light"
                    to={`/tools/comparestr/comparestrresult/${jobId}`}
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
                        href={`${backendURL}/results${result.compareFile}`}
                    >
                        Download compare-samplecompare.tab
                    </Button>

                    <Button
                        variant="secondary"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.compareFile2}`}
                    >
                        Download compare-samplecompare plot
                    </Button>

                    <Button
                        variant="secondary"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.compareFile3}`}
                    >
                        Download compare-overall.tab
                    </Button>

                    <Button
                        variant="secondary"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.compareFile4}`}
                    >
                        Download compare-locuscompare.tab
                    </Button>

                    <Button
                        variant="secondary"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.compareFile5}`}
                    >
                        Download compare-locuscompare plot
                    </Button>

                    <Button
                        variant="secondary"
                        target={"_blank"}
                        size="lg"
                        href={`${backendURL}/results${result.compareFile6}`}
                    >
                        Download quality-per-sample plot
                    </Button>






                </div>
            )}
            {!loading && result.status === "failed" && (
                <div>Job failed...Please execute a new analysis</div>
            )}
            <h1 className="text-center" style={{ height: "45vh" }}> </h1>

        </>
    );
};