import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom";
export const HipstrResult = () => {
    const navigate = useNavigate();

    const hipstrA = () => {
        navigate("/tools/hipstr/hipstranalysis");
    };

    const hipstrR = () => {
        navigate("/tools/hipstr/hipstrresult");
    };

    return (
        <>
            <h1>HipSTR </h1>
            <ButtonGroup size="lg" className="mb-2">
                <Button variant="light" onClick={hipstrA}>New Analysis</Button>
                <Button variant="light" onClick={hipstrR}>Results</Button>
            </ButtonGroup>
        </>
    );
}