import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import React, { ChangeEvent, useState, useRef } from "react";
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
});

export const MergestrAnalysis = () => {
    const [formValues, setFormValues] = useState(null);
    // const [file, setfile] = useState("");
    // const [filename, setFilename] = useState("");
    // changes here

    const [files, setFiles] = useState(null);
    const [filenames, setFilenames] = useState([]);


    const [useTest, setUseTest] = useState(false);
    const fileInput = useRef(null);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const mergestrA = () => {
        navigate("/tools/mergestr/mergestranalysis");
    };

    const mergestrResult = (jobID) => {
        navigate(`/tools/mergestr/mergestrresult/${jobID}`);
    };

    // const handlFormSubmit = (values) => {
    //     console.log("vsaluessssss", values);

    // changes here
    const handlFormSubmit = (values) => {
        console.log("values: ", values);

        let joinedFiles = [];
        console.log('fileeeeesss,', files);
        Object.keys(files).map(file => {
            joinedFiles.push(files[file]?.name)
        })
        console.log('files join', joinedFiles.join(','));

        // const formdata = new FormData();
        // formdata.append("email", values.email);
        // formdata.append("file", file);
        // formdata.append("job_name", values.job_name);
        // formdata.append("vcftype", values.vcftype);
        // formdata.append("useTest", values.useTest);
        // // formdata.append("filter_regions", values.filter_regions);

        // changes here
        const formdata = new FormData();
        formdata.append("email", values.email);
        if (files) {
            Array.from(files).forEach((file, i) => {
                console.log(file);
                formdata.append(`file`, file, file.name);

            });
        }


        formdata.append("job_name", values.job_name);
        formdata.append("vcftype", values.vcftype);
        formdata.append("useTest", values.useTest);

        console.log("Files:", formdata.getAll('file'));


        //modal
        handleShow();

        axios
            .post("/mergestr/noauth/jobs", formdata, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                console.log("response: ", response);
                const jobId = response.data.jobId;
                mergestrResult(jobId);
            })
            .catch((error) => {
                console.log("error: ", error);
                toast.error(error.response.data.message);
            });

        console.log(values);
    };

    // const handleFileChange = (e) => {
    //     if (e && e.target?.files) {
    //         setfile(e.target.files[0]);
    //         setFilename(e.target.files[0].name);
    //     }
    //     console.log("ehnnn", e.target.files[0]);
    // };

    // changes here
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const fileList = e.target.files;
            const fileNames = Array.from(fileList).map((file) => file.name);
            setFiles(fileList);
            setFilenames(fileNames);
        }
    };

    const testValues = {
        job_name: "Test hipstr",
        email: "",
        file: "",
        useTest: true,

        // ...(!user?.username && { email: "" }),
    };

    const initialValues = {
        email: "",
        job_name: "",
        file: "",
        useTest: false,
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
            <h1>MergeSTR </h1>
            <ButtonGroup size="lg" className="mb-2">
                <Button variant="light" onClick={mergestrA}>
                    New Analysis
                </Button>
                <Button disabled={true} variant="light"
                    onClick={mergestrResult}>
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
                        {/* <Form onSubmit={Formik.handleSubmit}> */}
                        <Form onSubmit={handleSubmit}>
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

                        {/* <div className="form-control" ref={fileInput}>
                            <label htmlFor="file">vcfs</label>
                            <Field type="file" name="file" onChange={handleFileChange} multiple />
                            <div>
                                <p>{filename || ""}</p>
                            </div>
                            <ErrorMessage name="file" />
                        </div> */}

                        {/* changes here */}
                        <div className="form-control" ref={fileInput}>
                            <label htmlFor="file">vcfs</label>
                            <input type="file" name="file" onChange={handleFileChange} multiple ref={fileInput} />
                            <div>
                                <p>{filenames.join(",")}</p>
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