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

    samples: Yup.string("must be a list of comma seperated values"),
    sample_prefixes: Yup.string("must be a list of comma seperated values"),
    region: Yup.string("must be a list of comma seperated values"),
    precision: Yup.number("must be a float value"),
    nalleles_thresh: Yup.string("must be a list of comma seperated values"),
});


export const StatstrAnalysis = () => {
    const [formValues, setFormValues] = useState(null);
    const [file, setfile] = useState("");
    const [filename, setFilename] = useState("");
    const [useTest, setUseTest] = useState(false);
    const fileInput = useRef(null);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const statstrA = () => {
        navigate("/tools/statstr/statstranalysis");
    };

    const statstrResult = (jobID) => {
        navigate(`/tools/statstr/statstrresult/${jobID}`);
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
            .post("/statstr/noauth/jobs", formdata, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                console.log("response: ", response);
                const jobId = response.data.jobId;
                statstrResult(jobId);
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

        // ...(!user?.username && { email: "" }),
    };

    const initialValues = {

        job_name: "Test hipstr",
        email: "",
        file: "",
        useTest: false,
        samples: "",
        sample_prefixes: "",
        region: "",
        precision: "",
        nalleles_thresh: "",

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
            <h1>StatSTR </h1>
            <ButtonGroup size="lg" className="mb-2">
                <Button variant="light" onClick={statstrA}>
                    New Analysis
                </Button>
                <Button disabled={true} variant="light"
                    onClick={statstrResult}>
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
                            <Form.Group as={Col} controlId="samples">
                                <Form.Label>samples</Form.Label>
                                <Field
                                    type="text"
                                    name="samples"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={values.samples}
                                />
                                <ErrorMessage
                                    name="samples"
                                    component="div"
                                    className="text-danger"
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="sample_prefixes">
                                <Form.Label>sample_prefixes</Form.Label>
                                <Field
                                    type="text"
                                    name="sample_prefixes"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="sample_prefixes"
                                    component="div"
                                    className="text-danger"
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="region">
                                <Form.Label>region</Form.Label>
                                <Field
                                    type="text"
                                    name="region"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={values.region}
                                />
                                <ErrorMessage
                                    name="region"
                                    component="div"
                                    className="text-danger"
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="precision">
                                <Form.Label>precision</Form.Label>
                                <Field
                                    type="number"
                                    name="precision"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="precision"
                                    component="div"
                                    className="text-danger"
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="nalleles_thresh">
                                <Form.Label>nalleles_thresh</Form.Label>
                                <Field
                                    type="text"
                                    name="nalleles_thresh"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="nalleles_thresh"
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
}