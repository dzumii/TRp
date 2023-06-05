import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom";
export const ComparestrResult = () => {
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
        </>
    );
}