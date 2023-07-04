import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom";
export const EhResult = () => {
    const navigate = useNavigate();

    const ehA = () => {
        navigate("/tools/eh/ehanalysis");
    };

    const ehR = () => {
        navigate("/tools/eh/ehresult");
    };

    return (
        <>
            <h1>ExpansionHunter </h1>
            <ButtonGroup size="lg" className="mb-2">
                <Button variant="light" onClick={ehA}>New Analysis</Button>
                <Button variant="light" onClick={ehR}>Results</Button>
            </ButtonGroup>
        </>
    );
}