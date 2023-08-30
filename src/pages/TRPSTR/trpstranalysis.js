
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
    // file: Yup.string().required("Please upload a bam file"),
    // file2: Yup.string().required("Please upload a fasta file"),
    // file3: Yup.string().required("Please upload a bed file"),
    useTest: Yup.boolean(),
    haploid_chrs: Yup.string("must be a list of comma seperated values"),
    fasta: Yup.string("must be a string"),
    // use_unpaired: Yup.string("must be a string"),
    bam_samps: Yup.string("must be a string"),
    bam_libs: Yup.string("must be a string"),
    period: Yup.string("must be a string"),

    period_qcstrA: Yup.number("must be a float value"),
    refbias_binsize_qcstrA: Yup.number("must be a float value"),
    refbias_mingts_qcstrA: Yup.number("must be a float value"),
    refbias_xrange_min_qcstrA: Yup.number("must be a float value"),
    refbias_xrange_max_qcstrA: Yup.number("must be a float value"),


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



    period_qcstrB: Yup.number("must be a float value"),
    refbias_binsize_qcstrB: Yup.number("must be a float value"),
    refbias_mingts_qcstrB: Yup.number("must be a float value"),
    refbias_xrange_min_qcstrB: Yup.number("must be a float value"),
    refbias_xrange_max_qcstrB: Yup.number("must be a float value"),


    samples: Yup.string("must be a list of comma seperated values"),
    sample_prefixes: Yup.string("must be a list of comma seperated values"),
    region: Yup.string("must be a list of comma seperated values"),
    precision: Yup.number("must be a float value"),
    nalleles_thresh: Yup.string("must be a list of comma seperated values"),
});

export const TrpstrAnalysis = () => {
    const [formValues, setFormValues] = useState(null);
    const [files, setFiles] = useState(null);
    const [file2, setFile2] = useState("");
    const [filenames, setFilenames] = useState([]);
    const [filename2, setFilename2] = useState("");
    const [useTest, setUseTest] = useState(false);
    const fileInput = useRef(null);
    const fileInput2 = useRef(null);
    const navigate = useNavigate();
    // const [show, setShow] = useState(false);
    const [setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const trpstrA = () => {
        navigate("/workflow/newanalysis");
    };

    const trpstrResult = (jobID) => {
        navigate(`/workflow/result/${jobID}`);
    };
    const handlFormSubmit = (values) => {
        console.log("vsaluessssss", values);

        let joinedFiles = [];
        console.log('fileeeeesss,', files);
        Object.keys(files).map(file => {
            joinedFiles.push(files[file]?.name)
        })
        console.log('files join', joinedFiles.join(','));

        const formdata = new FormData();
        formdata.append("email", values.email);

        if (files) {
            Array.from(files).forEach((file, i) => {
                console.log(file);
                formdata.append(`file`, file, file.name);

            });
        }


        formdata.append("file2", file2);
        formdata.append("fasta", values.fasta);
        formdata.append("job_name", values.job_name);
        formdata.append("haploid_chrs", values.haploid_chrs);
        formdata.append("bam_samps", values.bam_samps);
        formdata.append("useTest", values.useTest);
        // formdata.append("use_unpaired", values.use_unpaired);
        formdata.append("bam_libs", values.bam_libs);
        formdata.append("min_reads", values.min_reads);


        formdata.append("period_qcstrA", values.period_qcstrA);
        formdata.append("refbias_binsize_qcstrA", values.refbias_binsize_qcstrA);
        formdata.append("refbias_mingts_qcstrA", values.refbias_mingts_qcstrA);
        formdata.append("refbias_xrange_min_qcstrA", values.refbias_xrange_min_qcstrA);
        formdata.append("refbias_xrange_max_qcstrA", values.refbias_xrange_max_qcstrA);


        formdata.append("min_locus_callrate", values.min_locus_callrate);
        formdata.append("min_locus_hwep", values.min_locus_hwep);
        formdata.append("min_locus_het", values.min_locus_het);
        formdata.append("max_locus_het", values.max_locus_het);
        // formdata.append("filter_regions", values.filter_regions);
        formdata.append("filter_regions_names", values.filter_regions_names);
        formdata.append("hipstr_max_call_flank_indel", values.hipstr_max_call_flank_indel);
        formdata.append("hipstr_max_call_stutter", values.hipstr_max_call_stutter);
        formdata.append("hipstr_min_supp_reads", values.hipstr_min_supp_reads);
        formdata.append("hipstr_min_call_DP", values.hipstr_min_call_DP);
        formdata.append("hipstr_max_call_DP", values.hipstr_max_call_DP);
        formdata.append("hipstr_min_call_Q", values.hipstr_min_call_Q);


        formdata.append("period_qcstrB", values.period_qcstrB);
        formdata.append("refbias_binsize_qcstrB", values.refbias_binsize_qcstrB);
        formdata.append("refbias_mingts_qcstrB", values.refbias_mingts_qcstrB);
        formdata.append("refbias_xrange_min_qcstrB", values.refbias_xrange_min_qcstrB);
        formdata.append("refbias_xrange_max_qcstrB", values.refbias_xrange_max_qcstrB);


        formdata.append("samples", values.samples);
        formdata.append("sample_prefixes", values.sample_prefixes);
        formdata.append("region", values.region);
        formdata.append("precision", values.precision);
        formdata.append("nalleles_thresh", values.nalleles_thresh);


        console.log("Files:", formdata.getAll('file'));




        //modal
        // handleShow();

        axios
            .post("/trpstr/noauth/jobs", formdata, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                console.log("response: ", response);
                const jobId = response.data.jobId;
                trpstrResult(jobId);
            })
            .catch((error) => {
                console.log("error: ", error);
                toast.error(error.response.data.message);
            });

        console.log(values);
    };
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const fileList = e.target.files;
            const fileNames = Array.from(fileList).map((file) => file.name);
            setFiles(fileList);
            setFilenames(fileNames);
        }
    };

    const handleFileChange2 = (e) => {
        if (e && e.target?.files) {
            setFile2(e.target.files[0]);
            setFilename2(e.target.files[0].name);
        }
    };


    const testValues = {
        job_name: "Test trpstr",
        email: "",
        file: "",
        file2: "",
        haploid_chrs: "",
        fasta: "",
        useTest: true,
        // use_unpaired: "",
        bam_samps: "",
        bam_libs: "",
        min_reads: "",


        period_qcstrA: "",
        refbias_binsize_qcstrA: "5",
        refbias_mingts_qcstrA: "100",
        refbias_xrange_min_qcstrA: "",
        refbias_xrange_max_qcstrA: "",


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

        period_qcstrB: "",
        refbias_binsize_qcstrB: "5",
        refbias_mingts_qcstrB: "100",
        refbias_xrange_min_qcstrB: "",
        refbias_xrange_max_qcstrB: "",

        samples: "",
        sample_prefixes: "",
        region: "",
        precision: "3",
        nalleles_thresh: "",

        // ...(!user?.username && { email: "" }),
    };

    const initialValues = {

        job_name: "Test trpstr",
        email: "",
        file: "",
        file2: "",
        haploid_chrs: "all",
        fasta: "hg19",
        useTest: false,
        // use_unpaired: "",
        bam_samps: "",
        bam_libs: "",
        min_reads: "100",


        period_qcstrA: "",
        refbias_binsize_qcstrA: "5",
        refbias_mingts_qcstrA: "100",
        refbias_xrange_min_qcstrA: "",
        refbias_xrange_max_qcstrA: "",


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

        period_qcstrB: "",
        refbias_binsize_qcstrB: "5",
        refbias_mingts_qcstrB: "100",
        refbias_xrange_min_qcstrB: "",
        refbias_xrange_max_qcstrB: "",

        samples: "",
        sample_prefixes: "",
        region: "",
        precision: "3",
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
            <div className="login-page">
                <div className="form">
                    <div className="login">
                        <div className="login-header">
                            <h3>TRp</h3>
                        </div>
                    </div>

                    <ButtonGroup size="lg" className="mb-2">
                        <Button variant="light" onClick={trpstrA} >
                            Analysis
                        </Button>
                        <Button disabled={true} variant="light" onClick={trpstrResult}>
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
                                            {/* {LoadTestData({
                                              
                                                useTest: useTest,
                                                handleUseTest: handleUseTest,
                                                handleRemoveUseTest: handleRemoveUseTest,
                                           
                                            })} */}
                                        </Col>
                                    </Row>
                                </Form>

                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>hipSTR</Accordion.Header>
                                        <Accordion.Body>
                                            <Row className="mb-3">
                                                <Form.Group as={Col} className="mb-3" controlId="email">
                                                    <Form.Label className='card-title'>email</Form.Label>
                                                    <Field
                                                        type="email"
                                                        name="email"
                                                        placeholder="email@gmail.com"
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

                                            <h6 className='card-title'>Required parameters</h6>

                                            <div className="form-control" ref={fileInput}>
                                                <label htmlFor="file" className='card-title'>bams</label>
                                                <input type="file" name="file" onChange={handleFileChange} multiple ref={fileInput} />
                                                <div>
                                                    <p>{filenames.join(",")}</p>
                                                </div>
                                                <ErrorMessage name="file" />
                                            </div>

                                            <h1></h1>

                                            <Form.Group as={Col} controlId="fasta">
                                                <Form.Label className='card-title'>fasta</Form.Label>
                                                <Field
                                                    as="select"
                                                    aria-label="Default select example"
                                                    onChange={handleChange}
                                                    name="fasta"
                                                >
                                                    <option value="hg19">hg19</option>
                                                    <option value="hg38">hg38</option>

                                                </Field>
                                            </Form.Group>

                                            <h1></h1>


                                            <div className="form-control" ref={fileInput2}>
                                                <label htmlFor="file" className='card-title'>regions</label>
                                                <input type="file" name="file2" onChange={handleFileChange2} />
                                                <div>
                                                    <p>{filename2 || ""}</p>
                                                </div>
                                                <ErrorMessage name="file2" />
                                            </div>



                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="haploid_chrs">
                                                    <Form.Label className='card-title'>haploid_chrs</Form.Label>
                                                    <Field
                                                        as="select"
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

                                                    </Field>

                                                </Form.Group>
                                            </Row>

                                            {/* <Row className="mb-3">
                                                <Form.Group as={Col} controlId="use_unpaired">
                                                    <Form.Label className='card-title'>use_unpaired</Form.Label>
                                                    <Field
                                                        as="select"
                                                        aria-label="Default select example"
                                                        onChange={handleChange}
                                                        name="use_unpaired"
                                                    >

                                                        <option value="False">False</option>
                                                        <option value="True">True</option>


                                                    </Field>
                                                </Form.Group>
                                            </Row> */}

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="bam_samps">
                                                    <Form.Label className='card-title'>bam_samps</Form.Label>
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
                                                    <Form.Label className='card-title'>bam_libs</Form.Label>
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
                                                    <Form.Label className='card-title'>min_reads</Form.Label>
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

                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>qcSTR</Accordion.Header>
                                        <Accordion.Body>

                                            {/* 
                                            <div className="form-control" ref={fileInput}>
                                                <label htmlFor="file" className='card-title'>vcf</label>
                                                <Field type="file" name="file" onChange={handleFileChange} />
                                                <div>
                                                    <p>{filename || ""}</p>
                                                </div>
                                                <ErrorMessage name="file" />
                                            </div> */}


                                            {/* <Row className="mb-3">
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
                                            </Row> */}

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="period_qcstrA">
                                                    <Form.Label className='card-title'>period</Form.Label>
                                                    <Field
                                                        type="number"
                                                        name="period_qcstrA"
                                                        className="form-control"
                                                        onChange={handleChange}
                                                        value={values.period}
                                                    />
                                                    <ErrorMessage
                                                        name="period_qcstrA"
                                                        component="div"
                                                        className="text-danger"
                                                    />
                                                </Form.Group>
                                            </Row>



                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="refbias_metric_qcstrA">
                                                    <Form.Label className='card-title'>refbias_metric</Form.Label>
                                                    <Form.Select
                                                        aria-label="Default select example"
                                                        onChange={handleChange}
                                                        name="refbias_metric_qcstrA"
                                                    >
                                                        <option>mean</option>
                                                        <option value="advntr">medium</option>

                                                    </Form.Select>
                                                </Form.Group>
                                            </Row>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="refbias_binsize_qcstrA">
                                                    <Form.Label className='card-title'>refbias_binsize</Form.Label>
                                                    <Field
                                                        type="number"
                                                        name="refbias_binsize_qcstrA"
                                                        className="form-control"
                                                        onChange={handleChange}
                                                        value={values.refbias_binsize}
                                                    />
                                                    <ErrorMessage
                                                        name="refbias_binsize_qcstrA"
                                                        component="div"
                                                        className="text-danger"
                                                    />
                                                </Form.Group>
                                            </Row>



                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="refbias_mingts_qcstrA">
                                                    <Form.Label className='card-title'>refbias_mingts</Form.Label>
                                                    <Field
                                                        type="number"
                                                        name="refbias_mingts_qcstrA"
                                                        className="form-control"
                                                        onChange={handleChange}
                                                        value={values.refbias_mingts}
                                                    />
                                                    <ErrorMessage
                                                        name="refbias_mingts_qcstrA"
                                                        component="div"
                                                        className="text-danger"
                                                    />
                                                </Form.Group>
                                            </Row>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="refbias_xrange_min_qcstrA">
                                                    <Form.Label className='card-title'>refbias_xrange_min</Form.Label>
                                                    <Field
                                                        type="number"
                                                        name="refbias_xrange_min_qcstrA"
                                                        className="form-control"
                                                        onChange={handleChange}
                                                        value={values.refbias_xrange_min}
                                                    />
                                                    <ErrorMessage
                                                        name="refbias_xrange_min_qcstrA"
                                                        component="div"
                                                        className="text-danger"
                                                    />
                                                </Form.Group>
                                            </Row>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="refbias_xrange_max_qcstrA">
                                                    <Form.Label className='card-title'>refbias_xrange_max</Form.Label>
                                                    <Field
                                                        type="number"
                                                        name="refbias_xrange_max_qcstrA"
                                                        className="form-control"
                                                        onChange={handleChange}
                                                        value={values.refbias_xrange_max}
                                                    />
                                                    <ErrorMessage
                                                        name="refbias_xrange_max_qcstrA"
                                                        component="div"
                                                        className="text-danger"
                                                    />
                                                </Form.Group>
                                            </Row>

                                        </Accordion.Body>
                                    </Accordion.Item>




                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>dumpSTR</Accordion.Header>
                                        <Accordion.Body>


                                            {/* <div className="form-control" ref={fileInput}>
                                                <label htmlFor="file" className='card-title'>vcf</label>
                                                <Field type="file" name="file" onChange={handleFileChange} />
                                                <div>
                                                    <p>{filename || ""}</p>
                                                </div>
                                                <ErrorMessage name="file" />
                                            </div> */}

                                            <h1> </h1>


                                            {/* <Row className="mb-3">
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
                                            </Row> */}

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="num_records">
                                                    <Form.Label className='card-title'>num_records</Form.Label>
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



                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="min_locus_callrate">
                                                    <Form.Label className='card-title'>min_locus_callrate</Form.Label>
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
                                                    <Form.Label className='card-title'>min_locus_hwep</Form.Label>
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
                                                    <Form.Label className='card-title'>min_locus_het</Form.Label>
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
                                                    <Form.Label className='card-title'>max_locus_het</Form.Label>
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
                                                    <Form.Label className='card-title'>filter_regions</Form.Label>{" "}
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
                                                    <Form.Label className='card-title'>filter_regions_names</Form.Label>
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

                                            <Row className="mb-3">
                                                <Form.Group
                                                    as={Col}
                                                    controlId="hipstr_max_call_flank_indel"
                                                >
                                                    <Form.Label className='card-title'>hipstr_max_call_flank_indel</Form.Label>
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
                                                    <Form.Label className='card-title'>hipstr_max_call_stutter</Form.Label>
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
                                                    <Form.Label className='card-title'>hipstr_min_supp_reads</Form.Label>
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
                                                    <Form.Label className='card-title'>hipstr_min_call_DP</Form.Label>
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
                                                    <Form.Label className='card-title'>hipstr_max_call_DP</Form.Label>
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
                                                    <Form.Label className='card-title'>hipstr_min_call_Q</Form.Label>
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

                                            {/* <Row className="mb-3">
                                                <Form.Group as={Col} controlId="gangstr_min_call_DPl">
                                                    <Form.Label className='card-title'>gangstr_min_call_DPl</Form.Label>
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
                                                    <Form.Label className='card-title'>gangstr_max_call_DP</Form.Label>
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
                                                    <Form.Label className='card-title'>gangstr_min_call_Q</Form.Label>
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
                                                    <Form.Label className='card-title'>gangstr_expansion_prob_het</Form.Label>
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
                                                    <Form.Label className='card-title'>gangstr_expansion_prob_hom</Form.Label>
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
                                                    <Form.Label className='card-title'>gangstr_expansion_prob_total</Form.Label>
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

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="advntr_min_spanning">
                                                    <Form.Label className='card-title'>advntr_min_spanning</Form.Label>
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
                                                    <Form.Label className='card-title'>advntr_min_flanking</Form.Label>
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
                                                    <Form.Label className='card-title'>advntr_min_ML</Form.Label>
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

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="eh_min_call_LC">
                                                    <Form.Label className='card-title'>eh_min_call_LC</Form.Label>
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
                                                    <Form.Label className='card-title'>eh_max_call_LC</Form.Label>
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

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="popstr_min_call_DP">
                                                    <Form.Label className='card-title'>popstr_min_call_DP</Form.Label>
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
                                                    <Form.Label className='card-title'>popstr_max_call_DP</Form.Label>
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
                                                    <Form.Label className='card-title'>popstr_require_support</Form.Label>
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
                                            </Row> */}
                                        </Accordion.Body>
                                    </Accordion.Item>




                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>qcSTR</Accordion.Header>
                                        <Accordion.Body>


                                            {/* <div className="form-control" ref={fileInput}>
                                                <label htmlFor="file" className='card-title'>vcf</label>
                                                <Field type="file" name="file" onChange={handleFileChange} />
                                                <div>
                                                    <p>{filename || ""}</p>
                                                </div>
                                                <ErrorMessage name="file" />
                                            </div> */}


                                            {/* <Row className="mb-3">
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
                                            </Row> */}

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="period_qcstrB">
                                                    <Form.Label className='card-title'>period</Form.Label>
                                                    <Field
                                                        type="number"
                                                        name="period_qcstrB"
                                                        className="form-control"
                                                        onChange={handleChange}
                                                        value={values.period}
                                                    />
                                                    <ErrorMessage
                                                        name="period_qcstrB"
                                                        component="div"
                                                        className="text-danger"
                                                    />
                                                </Form.Group>
                                            </Row>



                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="refbias_metric_qcstrB">
                                                    <Form.Label className='card-title'>refbias_metric</Form.Label>
                                                    <Form.Select
                                                        aria-label="Default select example"
                                                        onChange={handleChange}
                                                        name="refbias_metric_qcstrB"
                                                    >
                                                        <option>mean</option>
                                                        <option value="advntr">medium</option>

                                                    </Form.Select>
                                                </Form.Group>
                                            </Row>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="refbias_binsize_qcstrB">
                                                    <Form.Label className='card-title'>refbias_binsize</Form.Label>
                                                    <Field
                                                        type="number"
                                                        name="refbias_binsize_qcstrB"
                                                        className="form-control"
                                                        onChange={handleChange}
                                                        value={values.refbias_binsize}
                                                    />
                                                    <ErrorMessage
                                                        name="refbias_binsize_qcstrB"
                                                        component="div"
                                                        className="text-danger"
                                                    />
                                                </Form.Group>
                                            </Row>



                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="refbias_mingts_qcstrB">
                                                    <Form.Label className='card-title'>refbias_mingts</Form.Label>
                                                    <Field
                                                        type="number"
                                                        name="refbias_mingts_qcstrB"
                                                        className="form-control"
                                                        onChange={handleChange}
                                                        value={values.refbias_mingts}
                                                    />
                                                    <ErrorMessage
                                                        name="refbias_mingts_qcstrB"
                                                        component="div"
                                                        className="text-danger"
                                                    />
                                                </Form.Group>
                                            </Row>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="refbias_xrange_min_qcstrB">
                                                    <Form.Label className='card-title'>refbias_xrange_min</Form.Label>
                                                    <Field
                                                        type="number"
                                                        name="refbias_xrange_min_qcstrB"
                                                        className="form-control"
                                                        onChange={handleChange}
                                                        value={values.refbias_xrange_min}
                                                    />
                                                    <ErrorMessage
                                                        name="refbias_xrange_min_qcstrB"
                                                        component="div"
                                                        className="text-danger"
                                                    />
                                                </Form.Group>
                                            </Row>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="refbias_xrange_max_qcstrB">
                                                    <Form.Label className='card-title'>refbias_xrange_max</Form.Label>
                                                    <Field
                                                        type="number"
                                                        name="refbias_xrange_max_qcstrB"
                                                        className="form-control"
                                                        onChange={handleChange}
                                                        value={values.refbias_xrange_max}
                                                    />
                                                    <ErrorMessage
                                                        name="refbias_xrange_max_qcstrB"
                                                        component="div"
                                                        className="text-danger"
                                                    />
                                                </Form.Group>
                                            </Row>

                                        </Accordion.Body>
                                    </Accordion.Item>



                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>statSTR</Accordion.Header>
                                        <Accordion.Body>

                                            {/* <div className="form-control" ref={fileInput}>
                                                <label htmlFor="file" className='card-title'>vcf</label>
                                                <Field type="file" name="file" onChange={handleFileChange} />
                                                <div>
                                                    <p>{filename || ""}</p>
                                                </div>
                                                <ErrorMessage name="file" />
                                            </div>




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
                                            </Row> */}

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="samples">
                                                    <Form.Label className='card-title'>samples</Form.Label>
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
                                                    <Form.Label className='card-title'>sample_prefixes</Form.Label>
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
                                                    <Form.Label className='card-title'>region</Form.Label>
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
                                                    <Form.Label className='card-title'>precision</Form.Label>
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
                                                    <Form.Label className='card-title'>nalleles_thresh</Form.Label>
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

                </div>
            </div>

        </>
    );
};