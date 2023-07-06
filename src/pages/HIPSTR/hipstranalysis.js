
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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
    file: Yup.string().required("Please upload a bam file"),
    file2: Yup.string().required("Please upload a fasta file"),
    file3: Yup.string().required("Please upload a bed file"),
    useTest: Yup.boolean(),

    bam_samps: Yup.string("must be a string"),
    bam_libs: Yup.string("must be a string"),
    period: Yup.string("must be a string"),

});

export const HipstrAnalysis = () => {
    const [formValues, setFormValues] = useState(null);
    const [file, setfile] = useState("");
    const [file2, setFile2] = useState("");
    const [file3, setFile3] = useState("");
    const [filename, setFilename] = useState("");
    const [filename2, setFilename2] = useState("");
    const [filename3, setFilename3] = useState("");
    const [useTest, setUseTest] = useState(false);
    const fileInput = useRef(null);
    const fileInput2 = useRef(null);
    const fileInput3 = useRef(null);
    const navigate = useNavigate();
    // const [show, setShow] = useState(false);
    const [setShow] = useState(false);
    // const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const hipstrA = () => {
        navigate("/tools/hipstr/hipstranalysis");
    };

    const hipstrResult = (jobID) => {
        navigate(`/tools/hipstr/hipstrresult/${jobID}`);
    };

    const handlFormSubmit = (values) => {
        console.log("vsaluessssss", values);

        const formdata = new FormData();
        formdata.append("email", values.email);
        formdata.append("file", file);
        formdata.append("file2", file2);
        formdata.append("file3", file3);
        formdata.append("job_name", values.job_name);
        formdata.append("haploid_chrs", values.haploid_chrs);
        formdata.append("bam_samps", values.bam_samps);
        formdata.append("useTest", values.useTest);
        formdata.append("use_unpaired", values.use_unpaired);
        formdata.append("bam_libs", values.bam_libs);
        formdata.append("min_reads", values.min_reads);




        //modal
        handleShow();

        axios
            .post("/hipstr/noauth/jobs", formdata, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                console.log("response: ", response);
                const jobId = response.data.jobId;
                hipstrResult(jobId);
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

    const handleFileChange2 = (e) => {
        if (e && e.target?.files) {
            setFile2(e.target.files[0]);
            setFilename2(e.target.files[0].name);
        }
    };

    const handleFileChange3 = (e) => {
        if (e && e.target?.files) {
            setFile3(e.target.files[0]);
            setFilename3(e.target.files[0].name);
        }
    };

    const testValues = {
        job_name: "Test hipstr",
        email: "",
        file: "",
        file2: "",
        file3: "",
        useTest: true,
        bam_samps: "",
        bam_libs: "",
        min_reads: "",




        // ...(!user?.username && { email: "" }),
    };

    const initialValues = {

        job_name: "Test hipstr",
        email: "",
        file: "",
        file2: "",
        useTest: false,

        bam_samps: "",
        bam_libs: "",
        min_reads: "100",


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
            <h1>HipSTR </h1>
            <ButtonGroup size="lg" className="mb-2">
                <Button variant="light" onClick={hipstrA}>
                    New Analysis
                </Button>
                <Button disabled={true} variant="light" onClick={hipstrResult}>
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

                        <h6>Required parameters</h6>
                        <div className="form-control" ref={fileInput}>
                            <label htmlFor="file">bams</label>
                            <Field type="file" name="file" onChange={handleFileChange} />
                            <div>
                                <p>{filename || ""}</p>
                            </div>
                            <ErrorMessage name="file" />
                        </div>


                        <div className="form-control" ref={fileInput2}>
                            <label htmlFor="file">fasta</label>
                            <Field type="file" name="file2" onChange={handleFileChange2} />
                            <div>
                                <p>{filename2 || ""}</p>
                            </div>
                            <ErrorMessage name="file2" />
                        </div>


                        <div className="form-control" ref={fileInput3}>
                            <label htmlFor="file">regions</label>
                            <Field type="file" name="file3" onChange={handleFileChange3} />
                            <div>
                                <p>{filename3 || ""}</p>
                            </div>
                            <ErrorMessage name="file3" />
                        </div>


                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Additional general options:</Accordion.Header>
                                <Accordion.Body>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="haploid_chrs">
                                            <Form.Label>haploid_chrs</Form.Label>
                                            <Form.Select
                                                aria-label="Default select example"
                                                onChange={handleChange}
                                                name="haploid_chrs"
                                            >
                                                <option value="all">all</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>

                                            </Form.Select>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="use_unpaired">
                                            <Form.Label>use_unpaired</Form.Label>
                                            <Form.Select
                                                aria-label="Default select example"
                                                onChange={handleChange}
                                                name="use_unpaired"
                                            >

                                                <option value="False">False</option>
                                                <option value="True">True</option>


                                            </Form.Select>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="bam_samps">
                                            <Form.Label>bam_samps</Form.Label>
                                            <Field
                                                type="text"
                                                name="bam_samps"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.bam_samps}
                                            />
                                            <ErrorMessage
                                                name="bam_samps"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="bam_libs">
                                            <Form.Label>bam_libs</Form.Label>
                                            <Field
                                                type="number"
                                                name="bam_libs"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.bam_libs}
                                            />
                                            <ErrorMessage
                                                name="bam_libs"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="min_reads">
                                            <Form.Label>min_reads</Form.Label>
                                            <Field
                                                type="number"
                                                name="min_reads"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.min_reads}
                                            />
                                            <ErrorMessage
                                                name="min_reads"
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
        </>
    );
};