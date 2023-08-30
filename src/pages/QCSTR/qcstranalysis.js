import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Accordion from "react-bootstrap/Accordion";

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
    // file: Yup.string().required("Please upload a vcf file"),
    useTest: Yup.boolean(),
    vcftype: Yup.string("must be a list of comma seperated values"), //string
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
    // const [show, setShow] = useState(false);
    const [setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

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
        formdata.append("period", values.period);
        formdata.append("refbias_binsize", values.refbias_binsize);
        formdata.append("refbias_mingts", values.refbias_mingts);
        formdata.append("refbias_xrange_min", values.refbias_xrange_min);
        formdata.append("refbias_xrange_max", values.refbias_xrange_max);

        //modal
        // handleShow();

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
        vcftype: "gangstr",
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
        vcftype: "auto",
        period: "",
        refbias_binsize: "",
        refbias_mingts: "100",
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
            <div className="login-page">
                <div className="form">
                    <div className="login">
                        <div className="login-header">
                            <h3>QcSTR</h3>
                        </div>
                    </div>

                    <ButtonGroup size="lg" className="mb-2">
                        <Button variant="light" onClick={qcstrA}>
                            Analysis
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
                                        <Form.Label className='card-title'>email</Form.Label>
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
                                        <Form.Label className='card-title'>job name</Form.Label>
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
                                    <label htmlFor="file" className='card-title'>vcf</label>
                                    <input type="file" name="file" onChange={handleFileChange} />
                                    <div>
                                        <p>{filename || ""}</p>
                                    </div>
                                    <ErrorMessage name="file" />
                                </div>

                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Other General Parameters</Accordion.Header>
                                        <Accordion.Body>
                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="vcftype">
                                                    <Form.Label className='card-title'>vcftype</Form.Label>
                                                    <Field
                                                        as="select"
                                                        aria-label="Default select example"
                                                        onChange={handleChange}
                                                        name="vcftype"
                                                    >
                                                        <option>auto</option>
                                                        <option value="advntr">advntr</option>
                                                        <option value="hipstr">hipstr</option>
                                                        <option value="gangstr">gangstr</option>
                                                        <option value="gangstr">popstr</option>
                                                        <option value="eh">eh</option>
                                                    </Field>
                                                </Form.Group>
                                            </Row>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="period">
                                                    <Form.Label className='card-title'>period</Form.Label>
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
                                        </Accordion.Body>
                                    </Accordion.Item>


                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Reference Bias Plot Options</Accordion.Header>
                                        <Accordion.Body>
                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="refbias_metric">
                                                    <Form.Label className='card-title'>refbias_metric</Form.Label>
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
                                                    <Form.Label className='card-title'>refbias_binsize</Form.Label>
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
                                                    <Form.Label className='card-title'>refbias_mingts</Form.Label>
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
                                                    <Form.Label className='card-title'>refbias_xrange_min</Form.Label>
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
                                                    <Form.Label className='card-title'>refbias_xrange_max</Form.Label>
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
                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>


                                <h1> </h1>
                                <button type="button" disabled={!isValid} onClick={handleSubmit}>
                                    Submit
                                </button>
                            </div>
                        )}
                    </Formik>
                </div >
            </div >
        </>
    );
};