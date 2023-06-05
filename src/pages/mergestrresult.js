import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom";
export const MergestrResult = () => {
    const navigate = useNavigate();

    const mergestrA = () => {
        navigate("/tools/mergestr/mergestranalysis");
    };

    const mergestrR = () => {
        navigate("/tools/mergestr/mergestrresult");
    };

    return (
        <>
            <h1>MergeSTR </h1>
            <ButtonGroup size="lg" className="mb-2">
                <Button variant="light" onClick={mergestrA}>New Analysis</Button>
                <Button variant="light" onClick={mergestrR}>Results</Button>
            </ButtonGroup>
        </>
    );
}