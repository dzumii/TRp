
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import React, { useState, useRef } from "react";
import axios from "../axios-client.js";
import { toast } from "react-toastify";
import { LoadTestData } from "./utils";


const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    job_name: Yup.string().required("Job name is required"),
    // file: Yup.string().required("Please upload a file"),
    useTest: Yup.boolean(),

    samples: Yup.string("must be a string"),
    regions: Yup.string("must be a string"),
    stratify_fields: Yup.string("must be a string"),
    stratify_binsizes: Yup.string("must be a string"),
    stratify_file: Yup.number("must be a float value"),
    bubble_min: Yup.number("must be a float value"),
    bubble_max: Yup.number("must be a float value"),
});

export const ComparestrAnalysis = () => {
    const [formValues, setFormValues] = useState(null);
    const [file, setfile] = useState("");
    const [filename, setFilename] = useState("");
    const [useTest, setUseTest] = useState(false);
    const fileInput = useRef(null);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const comparestrA = () => {
        navigate("/tools/comparestr/comparestranalysis");
    };

    const comparestrResult = (jobID) => {
        navigate(`/tools/comparestr/comparestrresult/${jobID}`);
    };

    const handlFormSubmit = (values) => {
        console.log("vsaluessssss", values);

        const formdata = new FormData();
        formdata.append("email", values.email);
        formdata.append("file", file);
        formdata.append("job_name", values.job_name);
        formdata.append("vcftype1", values.vcftype1);
        formdata.append("vcftype2", values.vcftype2);
        formdata.append("useTest", values.useTest);
        formdata.append("samples", values.samples);
        formdata.append("regions", values.regions);
        formdata.append("stratify_fields", values.stratify_fields);
        formdata.append("stratify_binsizes", values.stratify_binsizes);
        formdata.append("stratify_file", values.stratify_file);
        formdata.append("bubble_min", values.bubble_min);
        formdata.append("bubble_max", values.bubble_max);


        //modal
        handleShow();

        axios
            .post("/comparestr/noauth/jobs", formdata, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                console.log("response: ", response);
                const jobId = response.data.jobId;
                comparestrResult(jobId);
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
        job_name: "Test comparestr",
        email: "",
        file: "",
        useTest: true,
        samples: "",
        regions: "",
        stratify_fields: "",
        stratify_binsizes: "",
        stratify_file: "",
        bubble_min: "",
        bubble_max: "",

        // ...(!user?.username && { email: "" }),
    };

    const initialValues = {

        job_name: "Test comparestr",
        email: "",
        file: "",
        useTest: false,
        samples: "",
        regions: "",
        stratify_fields: "",
        stratify_binsizes: "",
        stratify_file: "",
        bubble_min: "",
        bubble_max: "",

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
            <h1>CompareSTR </h1>
            <ButtonGroup size="lg" className="mb-2">
                <Button variant="light" onClick={comparestrA}>
                    New Analysis
                </Button>
                <Button disabled={true} variant="light" onClick={comparestrResult}>
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
                            <label htmlFor="file">vcf1</label>
                            <Field type="file" name="file" onChange={handleFileChange} />
                            <div>
                                <p>{filename || ""}</p>
                            </div>
                            <ErrorMessage name="file" />
                        </div>

                        <div className="form-control" ref={fileInput}>
                            <label htmlFor="file">vcf2</label>
                            <Field type="file" name="file" onChange={handleFileChange} />
                            <div>
                                <p>{filename || ""}</p>
                            </div>
                            <ErrorMessage name="file" />
                        </div>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="vcftype1">
                                <Form.Label>vcftype1</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={handleChange}
                                    name="vcftype1"
                                >
                                    <option>auto</option>
                                    <option value="advntr">advntr</option>
                                    <option value="hipstr">hipstr</option>
                                    <option value="gangstr">gangstr</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="vcftype2">
                                <Form.Label>vcftype2</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={handleChange}
                                    name="vcftype2"
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
                            <Form.Group as={Col} controlId="regions">
                                <Form.Label>regions</Form.Label>
                                <Field
                                    type="text"
                                    name="regions"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={values.regions}
                                />
                                <ErrorMessage
                                    name="regions"
                                    component="div"
                                    className="text-danger"
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="stratify_fields">
                                <Form.Label>stratify_fields</Form.Label>
                                <Field
                                    type="text"
                                    name="stratify_fields"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={values.stratify_fields}
                                />
                                <ErrorMessage
                                    name="stratify_fields"
                                    component="div"
                                    className="text-danger"
                                />
                            </Form.Group>
                        </Row>



                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="stratify_binsizes">
                                <Form.Label>stratify_binsizes</Form.Label>
                                <Field
                                    type="text"
                                    name="stratify_binsizes"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={values.stratify_binsizes}
                                />
                                <ErrorMessage
                                    name="stratify_binsizes"
                                    component="div"
                                    className="text-danger"
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="stratify_file">
                                <Form.Label>stratify_file</Form.Label>
                                <Field
                                    type="number"
                                    name="stratify_file"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={values.stratify_file}
                                />
                                <ErrorMessage
                                    name="stratify_file"
                                    component="div"
                                    className="text-danger"
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="bubble_min">
                                <Form.Label>bubble_min</Form.Label>
                                <Field
                                    type="number"
                                    name="bubble_min"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={values.bubble_min}
                                />
                                <ErrorMessage
                                    name="bubble_min"
                                    component="div"
                                    className="text-danger"
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="bubble_max">
                                <Form.Label>bubble_max</Form.Label>
                                <Field
                                    type="number"
                                    name="bubble_max"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={values.bubble_max}
                                />
                                <ErrorMessage
                                    name="bubble_max"
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