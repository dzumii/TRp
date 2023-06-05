import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom";
export const GangstrResult = () => {
    const navigate = useNavigate();

    const gangstrA = () => {
        navigate("/tools/gangstr/gangstranalysis");
    };

    const gangstrR = () => {
        navigate("/tools/gangstr/gangstrresult");
    };

    return (
        <>
            <h1>GangSTR </h1>
            <ButtonGroup size="lg" className="mb-2">
                <Button variant="light" onClick={gangstrA}>New Analysis</Button>
                <Button variant="light" onClick={gangstrR}>Results</Button>
            </ButtonGroup>
        </>
    );
}