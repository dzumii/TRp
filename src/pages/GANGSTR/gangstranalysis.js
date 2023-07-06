
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
    samp_sex: Yup.string("must be a string"),
    period: Yup.string("must be a string"),
    readlength: Yup.number("must be a float value"),
    coverage: Yup.number("must be a float value"),
    insertmean: Yup.number("must be a float value"),
    insertsdev: Yup.number("must be a float value"),
    min_sample_reads: Yup.number("must be a float value"),
    frrweight: Yup.number("must be a float value"),
    spanweight: Yup.number("must be a float value"),
    enclweight: Yup.number("must be a float value"),
    flankweight: Yup.number("must be a float value"),
    rescue_count: Yup.number("must be a float value"),
    max_proc_read: Yup.number("must be a float value"),
    minscore: Yup.number("must be a float value"),
    minmatch: Yup.number("must be a float value"),
    stutterup: Yup.number("must be a float value"),
    stutterdown: Yup.number("must be a float value"),
});

export const GangstrAnalysis = () => {
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
    const [setShow] = useState(false);
    // const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const gangstrA = () => {
        navigate("/tools/gangstr/gangstranalysis");
    };

    const gangstrResult = (jobID) => {
        navigate(`/tools/gangstr/gangstrresult/${jobID}`);
    };

    const handlFormSubmit = (values) => {
        console.log("vsaluessssss", values);

        const formdata = new FormData();
        formdata.append("email", values.email);
        formdata.append("file", file);
        formdata.append("file2", file2);
        formdata.append("file3", file3);
        formdata.append("job_name", values.job_name);

        formdata.append("chrom", values.chrom);
        formdata.append("bam_samps", values.bam_samps);
        formdata.append("useTest", values.useTest);
        formdata.append("samp_sex", values.samp_sex);
        formdata.append("period", values.period);
        formdata.append("readlength", values.readlength);
        formdata.append("coverage", values.coverage);
        formdata.append("insertmean", values.insertmean);
        formdata.append("insertsdev", values.insertsdev);
        formdata.append("min_sample_reads", values.min_sample_reads);
        formdata.append("frrweight", values.frrweight);
        formdata.append("spanweight", values.spanweight);
        formdata.append("enclweight", values.enclweight);
        formdata.append("flankweight", values.flankweight);
        formdata.append("ploidy", values.ploidy);
        formdata.append("numbstrap", values.numbstrap);
        formdata.append("grid_theshold", values.grid_theshold);
        formdata.append("rescue_count", values.rescue_count);
        formdata.append("max_proc_read", values.max_proc_read);
        formdata.append("minscore", values.minscore);
        formdata.append("minmatch", values.minmatch);
        formdata.append("stutterup", values.stutterup);
        formdata.append("stutterdown", values.stutterdown);
        formdata.append("stutterprob", values.stutterprob);


        //modal
        handleShow();

        axios
            .post("/gangstr/noauth/jobs", formdata, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                console.log("response: ", response);
                const jobId = response.data.jobId;
                gangstrResult(jobId);
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
        job_name: "Test gangstr",
        email: "",
        file: "",
        file2: "",
        file3: "",
        useTest: true,
        bam_samps: "",
        samp_sex: "",
        period: "",
        readlength: "",
        coverage: "",
        insertmean: "",
        insertsdev: "",
        min_sample_reads: "",
        frrweight: "",
        spanweight: "",
        enclweight: "",
        flankweight: "",
        ploidy: "",
        numbstrap: "",
        grid_theshold: "",
        rescue_count: "",
        max_proc_read: "",
        minscore: "",
        minmatch: "",
        stutterup: "",
        stutterdown: "",
        stutterprob: "",



        // ...(!user?.username && { email: "" }),
    };

    const initialValues = {

        job_name: "Test gangstr",
        email: "",
        file: "",
        file2: "",
        useTest: false,

        bam_samps: "",
        samp_sex: "",
        period: "",
        readlength: "",
        coverage: "",
        insertmean: "",
        insertsdev: "",
        min_sample_reads: "",
        frrweight: "1.0",
        spanweight: "1.0",
        enclweight: "1.0",
        flankweight: "1.0",
        ploidy: "2",
        numbstrap: "100",
        grid_theshold: "10000",
        rescue_count: "0",
        max_proc_read: "",
        minscore: "75",
        minmatch: "5",
        stutterup: "0.05",
        stutterdown: "0.05",
        stutterprob: "0.05",

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
            <h1>GangSTR </h1>
            <ButtonGroup size="lg" className="mb-2">
                <Button variant="light" onClick={gangstrA}>
                    New Analysis
                </Button>
                <Button disabled={true} variant="light" onClick={gangstrResult}>
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
                            <label htmlFor="file">bam</label>
                            <Field type="file" name="file" onChange={handleFileChange} />
                            <div>
                                <p>{filename || ""}</p>
                            </div>
                            <ErrorMessage name="file" />
                        </div>

                        <div className="form-control" ref={fileInput2}>
                            <label htmlFor="file">ref</label>
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
                                        <Form.Group as={Col} controlId="chrom">
                                            <Form.Label>chrom</Form.Label>
                                            <Form.Select
                                                aria-label="Default select example"
                                                onChange={handleChange}
                                                name="chrom"
                                            >
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
                                        <Form.Group as={Col} controlId="samp_sex">
                                            <Form.Label>samp_sex</Form.Label>
                                            <Field
                                                type="text"
                                                name="samp_sex"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.samp_sex}
                                            />
                                            <ErrorMessage
                                                name="samp_sex"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="period">
                                            <Form.Label>period</Form.Label>
                                            <Field
                                                type="text"
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
                                <Accordion.Header>Options for different sequencing settings</Accordion.Header>
                                <Accordion.Body>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="readlength">
                                            <Form.Label>readlength</Form.Label>
                                            <Field
                                                type="number"
                                                name="readlength"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.readlength}
                                            />
                                            <ErrorMessage
                                                name="readlength"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="coverage">
                                            <Form.Label>coverage</Form.Label>
                                            <Field
                                                type="number"
                                                name="coverage"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.coverage}
                                            />
                                            <ErrorMessage
                                                name="coverage"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="insertmean">
                                            <Form.Label>insertmean</Form.Label>
                                            <Field
                                                type="number"
                                                name="insertmean"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.insertmean}
                                            />
                                            <ErrorMessage
                                                name="insertmean"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="insertsdev">
                                            <Form.Label>insertsdev</Form.Label>
                                            <Field
                                                type="number"
                                                name="insertsdev"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.insertsdev}
                                            />
                                            <ErrorMessage
                                                name="insertsdev"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="min_sample_reads">
                                            <Form.Label>min_sample_reads</Form.Label>
                                            <Field
                                                type="number"
                                                name="min_sample_reads"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.min_sample_reads}
                                            />
                                            <ErrorMessage
                                                name="min_sample_reads"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Advanced parameters for likelihood model:</Accordion.Header>
                                <Accordion.Body>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="frrweight">
                                            <Form.Label>frrweight</Form.Label>
                                            <Field
                                                type="number"
                                                name="frrweight"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.frrweight}
                                            />
                                            <ErrorMessage
                                                name="frrweight"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="spanweight">
                                            <Form.Label>spanweight</Form.Label>
                                            <Field
                                                type="number"
                                                name="spanweight"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.spanweight}
                                            />
                                            <ErrorMessage
                                                name="spanweight"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="enclweight">
                                            <Form.Label>enclweight</Form.Label>
                                            <Field
                                                type="number"
                                                name="enclweight"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.enclweight}
                                            />
                                            <ErrorMessage
                                                name="enclweight"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="flankweight">
                                            <Form.Label>flankweight</Form.Label>
                                            <Field
                                                type="number"
                                                name="flankweight"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.flankweight}
                                            />
                                            <ErrorMessage
                                                name="flankweight"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>



                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="ploidy">
                                            <Form.Label>ploidy</Form.Label>
                                            <Form.Select
                                                aria-label="Default select example"
                                                onChange={handleChange}
                                                name="ploidy"
                                            >

                                                <option value="2">2</option>
                                                <option value="1">1</option>

                                            </Form.Select>
                                        </Form.Group>
                                    </Row>


                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="numbstrap">
                                            <Form.Label>numbstrap</Form.Label>
                                            <Field
                                                type="number"
                                                name="numbstrap"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.numbstrap}
                                            />
                                            <ErrorMessage
                                                name="numbstrap"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="grid_theshold">
                                            <Form.Label>grid_theshold</Form.Label>
                                            <Field
                                                type="number"
                                                name="grid_theshold"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.grid_theshold}
                                            />
                                            <ErrorMessage
                                                name="grid_theshold"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="rescue_count">
                                            <Form.Label>rescue_count</Form.Label>
                                            <Field
                                                type="number"
                                                name="rescue_count"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.rescue_count}
                                            />
                                            <ErrorMessage
                                                name="rescue_count"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="max_proc_read">
                                            <Form.Label>max_proc_read</Form.Label>
                                            <Field
                                                type="number"
                                                name="max_proc_read"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.max_proc_read}
                                            />
                                            <ErrorMessage
                                                name="max_proc_read"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Parameters for local realignment:</Accordion.Header>
                                <Accordion.Body>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="minscore">
                                            <Form.Label>minscore</Form.Label>
                                            <Field
                                                type="number"
                                                name="minscore"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.minscore}
                                            />
                                            <ErrorMessage
                                                name="minscore"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="minmatch">
                                            <Form.Label>minmatch</Form.Label>
                                            <Field
                                                type="number"
                                                name="minmatch"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.minmatch}
                                            />
                                            <ErrorMessage
                                                name="minmatch"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="4">
                                <Accordion.Header>Stutter model parameters:</Accordion.Header>
                                <Accordion.Body>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="stutterup">
                                            <Form.Label>stutterup</Form.Label>
                                            <Field
                                                type="number"
                                                name="stutterup"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.stutterup}
                                            />
                                            <ErrorMessage
                                                name="stutterup"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="stutterdown">
                                            <Form.Label>stutterdown</Form.Label>
                                            <Field
                                                type="number"
                                                name="stutterdown"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.stutterdown}
                                            />
                                            <ErrorMessage
                                                name="stutterdown"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="stutterprob">
                                            <Form.Label>stutterprob</Form.Label>
                                            <Field
                                                type="number"
                                                name="stutterprob"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.stutterprob}
                                            />
                                            <ErrorMessage
                                                name="stutterprob"
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