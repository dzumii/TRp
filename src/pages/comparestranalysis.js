
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
export const ComparestrAnalysis = () => {
    const navigate = useNavigate();

    const comparestrA = () => {
        navigate("/tools/comparestr/comparestranalysis");
    };

    const comparestrR = () => {
        navigate("/tools/comparestr/comparestrresult");
    };

    return (
        <>
            <h1>CompareSTR </h1>
            <ButtonGroup size="lg" className="mb-2">
                <Button variant="light" onClick={comparestrA}>New Analysis</Button>
                <Button variant="light" onClick={comparestrR}>Results</Button>
            </ButtonGroup>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlTextarea1"> <Form.Label>Email address</Form.Label> <Form.Control type="email" placeholder="name@example.com" /></Form.Group>
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"> <Form.Label>job</Form.Label><Form.Control placeholder="Job1" /></Form.Group>
                    <Form.Group as={Col} controlId="formFile" className="mb-3"><Form.Label>vcf</Form.Label> <Form.Control type="file" /></Form.Group>
                </Row>

                <Form.Check type="switch" id="custom-switch" label="useTest" />

                <Form.Label>vcftype</Form.Label>
                <Form.Select aria-label="Default select example"><option>auto</option><option value="1">advntr</option><option value="2">hipstr</option><option value="3">gangstr</option></Form.Select>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"> <Form.Label>num_records</Form.Label> <Form.Control placeholder="" /></Form.Group>
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>min_locus_rate</Form.Label><Form.Control placeholder="" /> </Form.Group>
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>min_locus_hwep</Form.Label><Form.Control placeholder="" /></Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>min_locus_het</Form.Label><Form.Control placeholder="" /></Form.Group>
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>max_locus_het</Form.Label><Form.Control placeholder="" /></Form.Group>
                    <Form.Group as={Col} controlId="formFile" className="mb-3"><Form.Label>filter_regions</Form.Label> <Form.Control type="file" /></Form.Group>
                </Row>

                <Form.Group controlId="exampleForm.ControlTextarea2"><Form.Label>filter_regions_names</Form.Label><Form.Control placeholder="" /></Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>hipstr_max_call_flank_indel</Form.Label><Form.Control placeholder="" /></Form.Group>
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>hipstr_max_call_stutter</Form.Label><Form.Control placeholder="" /></Form.Group>
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>hipstr_min_supp_reads</Form.Label><Form.Control placeholder="" /></Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>hipstr_min_call_DP</Form.Label><Form.Control placeholder="" /></Form.Group>
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>hipstr_max_call_DP</Form.Label><Form.Control placeholder="" /></Form.Group>
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>hipstr_min_call_Q</Form.Label><Form.Control placeholder="" /></Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>gangstr_min_call_DPl</Form.Label><Form.Control placeholder="" /></Form.Group>
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>gangstr_max_call_D</Form.Label><Form.Control placeholder="" /></Form.Group>
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>gangstr_min_call_Q</Form.Label><Form.Control placeholder="" /></Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>gangstr_expansion_prob_het</Form.Label><Form.Control placeholder="" /></Form.Group>
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>gangstr_expansion_prob_hom</Form.Label><Form.Control placeholder="" /></Form.Group>
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>gangstr_expansion_prob_total</Form.Label><Form.Control placeholder="" /></Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>advntr_min_spanning</Form.Label><Form.Control placeholder="" /></Form.Group>
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>advntr_min_flanking</Form.Label><Form.Control placeholder="" /></Form.Group>
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>advntr_min_ML</Form.Label><Form.Control placeholder="" /></Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>eh_min_call_LC</Form.Label><Form.Control placeholder="" /></Form.Group>
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>eh_max_call_LC</Form.Label><Form.Control placeholder="" /></Form.Group>
                </Row>
                {/* <Form.Group controlId="exampleForm.ControlTextarea2"><Form.Label>popstr_min_call_DP</Form.Label><Form.Control placeholder="Job1" /></Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group controlId="exampleForm.ControlTextarea2"><Form.Label>eh_max_call_LC</Form.Label><Form.Control placeholder="Job1" /></Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea2"><Form.Label>eh_max_call_LC</Form.Label><Form.Control placeholder="Job1" /></Form.Group> */}

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>popstr_min_call_DP</Form.Label><Form.Control placeholder="" /></Form.Group>
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>popstr_max_call_DP</Form.Label><Form.Control placeholder="" /></Form.Group>
                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea2"><Form.Label>popstr_require_support</Form.Label><Form.Control placeholder="" /></Form.Group>
                </Row>

            </Form >
            <h1> </h1>
            <Button variant="light" size="lg" > Submit </Button>
        </>
    );
}
