import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { useNavigate } from "react-router-dom";
export const StatstrResult = () => {
    const navigate = useNavigate();

    const statstrA = () => {
        navigate("/tools/statstr/statstranalysis");
    };

    const statstrR = () => {
        navigate("/tools/statstr/statstrresult");
    };

    return (
        <>
            <h1>StatSTR</h1>
            <ButtonGroup size="lg" className="mb-2">
                <Button variant="light" onClick={statstrA}>New Analysis</Button>
                <Button variant="light" onClick={statstrR}>Results</Button>
            </ButtonGroup>
        </>
    );
}