import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
// import Modal from "react-bootstrap/Modal";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import { LoadTestData } from "../utils";
import axios from "../../axios-client.js";
import { toast } from "react-toastify";
//import { LoadTestData, handleFileUploadChangedCommon } from "./utils";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    job_name: Yup.string().required("Job name is required"),
    file: Yup.string().required("Please upload a vcf file"),
    useTest: Yup.boolean(),
    num_records: Yup.number("num_records must be an integer value"),
    min_locus_callrate: Yup.number("must be a float value"), //float
    min_locus_hwep: Yup.number("must be a float value"), //float
    min_locus_het: Yup.number("must be a float value"), //float
    max_locus_het: Yup.number("must be a float value"), //float
    filter_regions_names: Yup.string("must be a list of comma seperated values"), //string
    hipstr_max_call_flank_indel: Yup.number("must be a float value"), //float
    hipstr_max_call_stutter: Yup.number("must be a float value"), //float
    hipstr_min_supp_reads: Yup.number("must be an integer value"), //integer
    hipstr_min_call_DP: Yup.number("must be an integer value"), //integer
    hipstr_max_call_DP: Yup.number("must be an integer value"), //integer
    hipstr_min_call_Q: Yup.number("must be a float value"), //float
    gangstr_min_call_DPl: Yup.number("must be an integer value"), //integer
    gangstr_max_call_DP: Yup.number("must be an integer value"), //integer
    gangstr_min_call_Q: Yup.number("must be a float value"), //float
    gangstr_expansion_prob_het: Yup.number("must be a float value"), //float
    gangstr_expansion_prob_hom: Yup.number("must be a float value"), //float
    gangstr_expansion_prob_total: Yup.number("must be a float value"), //float
    advntr_min_call_DP: Yup.number("must be an integer value"), //integer
    advntr_max_call_DP: Yup.number("must be an integer value"), //integer
    advntr_min_spanning: Yup.number("must be an integer value"), //integer
    advntr_min_flanking: Yup.number("must be an integer value"), //integer
    advntr_min_ML: Yup.number("must be a float value"), //float
    eh_min_call_LC: Yup.number("must be an integer value"), //integer
    eh_max_call_LC: Yup.number("must be an integer value"), //integer
    popstr_min_call_DP: Yup.number("must be an integer value"), //integer
    popstr_max_call_DP: Yup.number("must be an integer value"), //integer
    popstr_require_support: Yup.number("must be an integer value"), //integer
});

export const DumpstrAnalysis = () => {
    const [formValues, setFormValues] = useState(null);
    const [file, setfile] = useState("");
    const [filename, setFilename] = useState("");
    const [useTest, setUseTest] = useState(false);
    const fileInput = useRef(null);
    const navigate = useNavigate();
    // const [show, setShow] = useState(false);
    const [setShow] = useState(false);
    // const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dumpstrA = () => {
        navigate("/tools/dumpstr/dumpstranalysis");
    };

    const dumpstrResult = (jobID) => {
        navigate(`/tools/dumpstr/dumpstrresult/${jobID}`);
    };

    const handlFormSubmit = (values) => {
        console.log("vsaluessssss", values);

        const formdata = new FormData();
        formdata.append("email", values.email);
        formdata.append("file", file);
        formdata.append("job_name", values.job_name);
        formdata.append("vcftype", values.vcftype);
        formdata.append("useTest", values.useTest);
        formdata.append("min_locus_callrate", values.min_locus_callrate);
        formdata.append("min_locus_hwep", values.min_locus_hwep);
        formdata.append("min_locus_het", values.min_locus_het);
        formdata.append("max_locus_het", values.max_locus_het);
        // formdata.append("filter_regions", values.filter_regions);
        formdata.append("filter_regions_names", values.filter_regions_names);
        formdata.append(
            "hipstr_max_call_flank_indel",
            values.hipstr_max_call_flank_indel
        );
        formdata.append("hipstr_max_call_stutter", values.hipstr_max_call_stutter);
        formdata.append("hipstr_min_supp_reads", values.hipstr_min_supp_reads);
        formdata.append("hipstr_min_call_DP", values.hipstr_min_call_DP);
        formdata.append("hipstr_max_call_DP", values.hipstr_max_call_DP);
        formdata.append("hipstr_min_call_Q", values.hipstr_min_call_Q);
        formdata.append("gangstr_min_call_DPl", values.gangstr_min_call_DPl);
        formdata.append("gangstr_max_call_DP", values.gangstr_max_call_DP);
        formdata.append("gangstr_min_call_Q", values.gangstr_min_call_Q);
        formdata.append(
            "gangstr_expansion_prob_het",
            values.gangstr_expansion_prob_het
        );
        formdata.append(
            "gangstr_expansion_prob_hom",
            values.gangstr_expansion_prob_hom
        );
        formdata.append(
            "gangstr_expansion_prob_total",
            values.gangstr_expansion_prob_total
        );
        formdata.append("advntr_min_call_DP", values.advntr_min_call_DP);
        formdata.append("advntr_max_call_DP", values.advntr_max_call_DP);
        formdata.append("advntr_min_spanning", values.advntr_min_spanning);
        formdata.append("advntr_min_flanking", values.advntr_min_flanking);
        formdata.append("advntr_min_ML", values.advntr_min_ML);
        formdata.append("eh_min_call_LC", values.eh_min_call_LC);
        formdata.append("eh_max_call_LC", values.eh_max_call_LC);
        formdata.append("popstr_min_call_DP", values.popstr_min_call_DP);
        formdata.append("popstr_max_call_DP", values.popstr_max_call_DP);
        formdata.append("popstr_require_support", values.popstr_require_support);
        formdata.append("num_records", values.num_records);

        //modal
        handleShow();

        axios
            .post("/dumpstr/noauth/jobs", formdata, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                console.log("response: ", response);
                const jobId = response.data.jobId;
                dumpstrResult(jobId);
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
        num_records: "",
        min_locus_callrate: "",
        min_locus_hwep: "",
        min_locus_het: "",
        max_locus_het: "",
        filter_regions_names: "",
        hipstr_max_call_flank_indel: "",
        hipstr_max_call_stutter: "",
        hipstr_min_supp_reads: "",
        hipstr_min_call_DP: "",
        hipstr_max_call_DP: "",
        hipstr_min_call_Q: "",
        gangstr_min_call_DPl: "",
        gangstr_max_call_DP: "",
        gangstr_min_call_Q: "",
        gangstr_expansion_prob_het: "",
        gangstr_expansion_prob_hom: "",
        gangstr_expansion_prob_total: "",
        advntr_min_call_DP: "",
        advntr_max_call_DP: "",
        advntr_min_spanning: "",
        advntr_min_flanking: "",
        advntr_min_ML: "",
        eh_min_call_LC: "",
        eh_max_call_LC: "",
        popstr_min_call_DP: "",
        popstr_max_call_DP: "",
        popstr_require_support: "",

        // ...(!user?.username && { email: "" }),
    };

    const initialValues = {
        email: "",
        job_name: "",
        file: "",
        useTest: false,
        vcftype: "auto",
        num_records: "",
        min_locus_callrate: "",
        min_locus_hwep: "",
        min_locus_het: "",
        max_locus_het: "",
        filter_regions_names: "",
        hipstr_max_call_flank_indel: "",
        hipstr_max_call_stutter: "",
        hipstr_min_supp_reads: "",
        hipstr_min_call_DP: "",
        hipstr_max_call_DP: "",
        hipstr_min_call_Q: "",
        gangstr_min_call_DPl: "",
        gangstr_max_call_DP: "",
        gangstr_min_call_Q: "",
        gangstr_expansion_prob_het: "",
        gangstr_expansion_prob_hom: "",
        gangstr_expansion_prob_total: "",
        advntr_min_call_DP: "",
        advntr_max_call_DP: "",
        advntr_min_spanning: "",
        advntr_min_flanking: "",
        advntr_min_ML: "",
        eh_min_call_LC: "",
        eh_max_call_LC: "",
        popstr_min_call_DP: "",
        popstr_max_call_DP: "",
        popstr_require_support: "",
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
            <h1>DumpSTR </h1>
            <ButtonGroup size="lg" className="mb-2">
                <Button variant="light" onClick={dumpstrA}>
                    New Analysis
                </Button>
                <Button disabled={true} variant="light" onClick={dumpstrResult}>
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

                        <h1> </h1>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Other General Parameters</Accordion.Header>
                                <Accordion.Body>
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
                                                <option value="gangstr">popstr</option>
                                                <option value="eh">eh</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="num_records">
                                            <Form.Label>num_records</Form.Label>
                                            <Field
                                                type="number"
                                                name="num_record"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={values.num_records}
                                            />
                                            <ErrorMessage
                                                name="num_records"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>



                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Locus Level Filters</Accordion.Header>
                                <Accordion.Body>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="min_locus_callrate">
                                            <Form.Label>min_locus_callrate</Form.Label>
                                            <Field
                                                type="text"
                                                name="min_locus_callrate"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="min_locus_callrate"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="min_locus_hwep">
                                            <Form.Label>min_locus_hwep</Form.Label>
                                            <Field
                                                type="text"
                                                name="min_locus_hwep"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="min_locus_hwep"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="min_locus_het">
                                            <Form.Label>min_locus_het</Form.Label>
                                            <Field
                                                type="text"
                                                name="min_locus_het"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="min_locus_het"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="max_locus_het">
                                            <Form.Label>max_locus_het</Form.Label>
                                            <Field
                                                type="text"
                                                name="max_locus_het"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="max_locus_het"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formFile" className="mb-3">
                                            <Form.Label>filter_regions</Form.Label>{" "}
                                            <Field
                                                // type="file"
                                                type="text"
                                                name="filter_regions"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="filter_regions"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="filter_regions_names">
                                            <Form.Label>filter_regions_names</Form.Label>
                                            <Field
                                                type="text"
                                                name="filter_regions_names"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="filter_regions_names"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                                <Accordion.Header>HipSTR Call-level Filters</Accordion.Header>
                                <Accordion.Body>
                                    <Row className="mb-3">
                                        <Form.Group
                                            as={Col}
                                            controlId="hipstr_max_call_flank_indel"
                                        >
                                            <Form.Label>hipstr_max_call_flank_indel</Form.Label>
                                            <Field
                                                type="text"
                                                name="hipstr_max_call_flank_indel"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="hipstr_max_call_flank_indel"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="hipstr_max_call_stutter">
                                            <Form.Label>hipstr_max_call_stutter</Form.Label>
                                            <Field
                                                type="text"
                                                name="hipstr_max_call_stutter"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="hipstr_max_call_stutter"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="hipstr_min_supp_reads">
                                            <Form.Label>hipstr_min_supp_reads</Form.Label>
                                            <Field
                                                type="text"
                                                name="hipstr_min_supp_reads"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="hipstr_min_supp_reads"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="hipstr_min_call_DP">
                                            <Form.Label>hipstr_min_call_DP</Form.Label>
                                            <Field
                                                type="text"
                                                name="hipstr_min_call_DP"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="hipstr_min_call_DP"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="hipstr_max_call_DP">
                                            <Form.Label>hipstr_max_call_DP</Form.Label>
                                            <Field
                                                type="text"
                                                name="hipstr_max_call_DP"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="hipstr_max_call_DP"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="hipstr_min_call_Q">
                                            <Form.Label>hipstr_min_call_Q</Form.Label>
                                            <Field
                                                type="text"
                                                name="hipstr_min_call_Q"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="hipstr_min_call_Q"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="3">
                                <Accordion.Header>GangSTR Call-level Filters</Accordion.Header>
                                <Accordion.Body>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="gangstr_min_call_DPl">
                                            <Form.Label>gangstr_min_call_DPl</Form.Label>
                                            <Field
                                                type="text"
                                                name="gangstr_min_call_DPl"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="gangstr_min_call_DPl"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="gangstr_max_call_DP">
                                            <Form.Label>gangstr_max_call_DP</Form.Label>
                                            <Field
                                                type="text"
                                                name="gangstr_max_call_DP"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="gangstr_max_call_DP"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="gangstr_min_call_Q">
                                            <Form.Label>gangstr_min_call_Q</Form.Label>
                                            <Field
                                                type="text"
                                                name="gangstr_min_call_Q"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="gangstr_min_call_Q"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="gangstr_expansion_prob_het">
                                            <Form.Label>gangstr_expansion_prob_het</Form.Label>
                                            <Field
                                                type="text"
                                                name="gangstr_expansion_prob_het"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="gangstr_expansion_prob_het"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="gangstr_expansion_prob_hom">
                                            <Form.Label>gangstr_expansion_prob_hom</Form.Label>
                                            <Field
                                                type="text"
                                                name="gangstr_expansion_prob_hom"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="gangstr_expansion_prob_hom"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            controlId="gangstr_expansion_prob_total"
                                        >
                                            <Form.Label>gangstr_expansion_prob_total</Form.Label>
                                            <Field
                                                type="text"
                                                name="gangstr_expansion_prob_total"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="gangstr_expansion_prob_total"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="4">
                                <Accordion.Header>adVNTR Call-level Filters</Accordion.Header>
                                <Accordion.Body>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="advntr_min_spanning">
                                            <Form.Label>advntr_min_spanning</Form.Label>
                                            <Field
                                                type="text"
                                                name="advntr_min_spanning"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="advntr_min_spanning"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="advntr_min_flanking">
                                            <Form.Label>advntr_min_flanking</Form.Label>
                                            <Field
                                                type="text"
                                                name="advntr_min_flanking"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="advntr_min_flanking"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="advntr_min_ML">
                                            <Form.Label>advntr_min_ML</Form.Label>
                                            <Field
                                                type="text"
                                                name="advntr_min_ML"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="advntr_min_ML"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="5">
                                <Accordion.Header>
                                    ExpansionHunter Call-level Filters
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="eh_min_call_LC">
                                            <Form.Label>eh_min_call_LC</Form.Label>
                                            <Field
                                                type="text"
                                                name="eh_min_call_LC"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="eh_min_call_LC"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="eh_max_call_LC">
                                            <Form.Label>eh_max_call_LC</Form.Label>
                                            <Field
                                                type="text"
                                                name="eh_max_call_LC"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="eh_max_call_LC"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="6">
                                <Accordion.Header>PopSTR Call-level Filters</Accordion.Header>
                                <Accordion.Body>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="popstr_min_call_DP">
                                            <Form.Label>popstr_min_call_DP</Form.Label>
                                            <Field
                                                type="text"
                                                name="popstr_min_call_DP"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="popstr_min_call_DP"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="popstr_max_call_DP">
                                            <Form.Label>popstr_max_call_DP</Form.Label>
                                            <Field
                                                type="text"
                                                name="popstr_max_call_DP"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="popstr_max_call_DP"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="popstr_require_support">
                                            <Form.Label>popstr_require_support</Form.Label>
                                            <Field
                                                type="text"
                                                name="popstr_require_support"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="popstr_require_support"
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


