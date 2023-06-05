import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { useNavigate } from "react-router-dom";
export const QcstrResult = () => {
    const navigate = useNavigate();

    const qcstrA = () => {
        navigate("/tools/qcstr/qcstranalysis");
    };

    const qcstrR = () => {
        navigate("/tools/qcstr/qcstrresult");
    };

    return (
        <>
            <h1>QcSTR </h1>
            <ButtonGroup size="lg" className="mb-2">
                <Button variant="light" onClick={qcstrA}>New Analysis</Button>
                <Button variant="light" onClick={qcstrR}>Results</Button>
            </ButtonGroup>
        </>
    );
}