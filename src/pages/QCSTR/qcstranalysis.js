import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import React, { useState, useRef } from "react";
import axios from "../../axios-client.js";
import { toast } from "react-toastify";
import { LoadTestData } from "../utils.js";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    job_name: Yup.string().required("Job name is required"),
    // file: Yup.string().required("Please upload a file"),
    useTest: Yup.boolean(),

    period: Yup.number("must be a float value"),
    refbias_binsize: Yup.number("must be a float value"),
    refbias_mingts: Yup.number("must be a float value"),
    refbias_xrange_min: Yup.number("must be a float value"),
    refbias_xrange_max: Yup.number("must be a float value"),
});


export const QcstrAnalysis = () => {
    const [formValues, setFormValues] = useState(null);
    const [file, setfile] = useState("");
    const [filename, setFilename] = useState("");
    const [useTest, setUseTest] = useState(false);
    const fileInput = useRef(null);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const qcstrA = () => {
        navigate("/tools/qcstr/qcstranalysis");
    };

    const qcstrResult = (jobID) => {
        navigate(`/tools/qcstr/qcstrresult/${jobID}`);
    };

    const handlFormSubmit = (values) => {
        console.log("vsaluessssss", values);

        const formdata = new FormData();
        formdata.append("email", values.email);
        formdata.append("file", file);
        formdata.append("job_name", values.job_name);
        formdata.append("vcftype", values.vcftype);
        formdata.append("useTest", values.useTest);
        formdata.append("samples", values.samples);
        formdata.append("sample_prefixes", values.sample_prefixes);
        formdata.append("region", values.region);
        formdata.append("precision", values.precision);
        formdata.append("nalleles_thresh", values.nalleles_thresh);

        //modal
        handleShow();

        axios
            .post("/qcstr/noauth/jobs", formdata, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                console.log("response: ", response);
                const jobId = response.data.jobId;
                qcstrResult(jobId);
            })
            .catch((error) => {
                console.log("error: ", error);
                toast.error(error.response.data.message);
            });

        console.log(values);
    };
    const handleFileChange = (e) => {
        if (e && e.target?.files) {
            setfile(e.target.files[0]);
            setFilename(e.target.files[0].name);
        }
        console.log("ehnnn", e.target.files[0]);
    };

    const testValues = {
        job_name: "Test hipstr",
        email: "",
        file: "",
        useTest: true,
        period: "",
        refbias_binsize: "",
        refbias_mingts: "",
        refbias_xrange_min: "",
        refbias_xrange_max: "",

        // ...(!user?.username && { email: "" }),
    };

    const initialValues = {

        job_name: "Test qcstr",
        email: "",
        file: "",
        useTest: false,
        period: "",
        refbias_binsize: "",
        refbias_mingts: "",
        refbias_xrange_min: "",
        refbias_xrange_max: "",

    };
    const handleUseTest = (event) => {
        // Formik.resetForm();
        setUseTest(true);
        setFormValues(testValues);
        fileInput.current.querySelector("input").disabled = true;
    };

    const handleRemoveUseTest = (event) => {
        setUseTest(false);
        setFormValues(undefined);
        // Formik.setFieldValue("file", "");
        fileInput.current.querySelector("input").value = "";
        fileInput.current.querySelector("input").disabled = false;
        // Formik.resetForm();
    };

    return (
        <>
            <h1>QcSTR  </h1>
            <ButtonGroup size="lg" className="mb-2">
                <Button variant="light" onClick={qcstrA}>
                    New Analysis
                </Button>
                <Button disabled={true} variant="light" onClick={qcstrResult}>
                    Results
                </Button>
            </ButtonGroup>

            <Formik
                initialValues={formValues || initialValues}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handlFormSubmit}
                validateOnMount
            >
                {({ values, handleChange, handleSubmit, isValid }) => (
                    <div>
                        <Form onSubmit={Formik.handleSubmit}>
                            <Row className="mb-3">
                                <Col>
                                    {LoadTestData({
                                        // classes: classes,
                                        useTest: useTest,
                                        handleUseTest: handleUseTest,
                                        handleRemoveUseTest: handleRemoveUseTest,
                                        // onclick: () => setFormValues(testValues)
                                    })}
                                </Col>
                            </Row>
                        </Form>

                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="email">
                                <Form.Label>email</Form.Label>
                                <Field
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={values.email}
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-danger"
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="job_name">
                                <Form.Label>job_name</Form.Label>
                                <Field
                                    type="text"
                                    name="job_name"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={values.job_name}
                                />
                                <ErrorMessage
                                    name="job_name"
                                    component="div"
                                    className="text-danger"
                                />
                            </Form.Group>
                        </Row>

                        <div className="form-control" ref={fileInput}>
                            <label htmlFor="file">vcf</label>
                            <Field type="file" name="file" onChange={handleFileChange} />
                            <div>
                                <p>{filename || ""}</p>
                            </div>
                            <ErrorMessage name="file" />
                        </div>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="vcftype">
                                <Form.Label>vcftype</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={handleChange}
                                    name="vcftype"
                                >
                                    <option>auto</option>
                                    <option value="advntr">advntr</option>
                                    <option value="hipstr">hipstr</option>
                                    <option value="gangstr">gangstr</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="period">
                                <Form.Label>period</Form.Label>
                                <Field
                                    type="number"
                                    name="period"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={values.period}
                                />
                                <ErrorMessage
                                    name="period"
                                    component="div"
                                    className="text-danger"
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="refbias_metric">
                                <Form.Label>refbias_metric</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={handleChange}
                                    name="refbias_metric"
                                >
                                    <option>mean</option>
                                    <option value="advntr">medium</option>

                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="refbias_binsize">
                                <Form.Label>refbias_binsize</Form.Label>
                                <Field
                                    type="number"
                                    name="refbias_binsize"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={values.refbias_binsize}
                                />
                                <ErrorMessage
                                    name="refbias_binsize"
                                    component="div"
                                    className="text-danger"
                                />
                            </Form.Group>
                        </Row>



                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="refbias_mingts">
                                <Form.Label>refbias_mingts</Form.Label>
                                <Field
                                    type="number"
                                    name="refbias_mingts"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={values.refbias_mingts}
                                />
                                <ErrorMessage
                                    name="refbias_mingts"
                                    component="div"
                                    className="text-danger"
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="refbias_xrange_min">
                                <Form.Label>refbias_xrange_min</Form.Label>
                                <Field
                                    type="number"
                                    name="refbias_xrange_min"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={values.refbias_xrange_min}
                                />
                                <ErrorMessage
                                    name="refbias_xrange_min"
                                    component="div"
                                    className="text-danger"
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="refbias_xrange_max">
                                <Form.Label>refbias_xrange_max</Form.Label>
                                <Field
                                    type="number"
                                    name="refbias_xrange_max"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={values.refbias_xrange_max}
                                />
                                <ErrorMessage
                                    name="refbias_xrange_max"
                                    component="div"
                                    className="text-danger"
                                />
                            </Form.Group>
                        </Row>


                        <h1> </h1>
                        <button type="button" disabled={!isValid} onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                )}
            </Formik>
        </>
    );
};