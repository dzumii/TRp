import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { ComparestrAnalysis } from './comparestranalysis';
import { MergestrAnalysis } from './mergestranalysis';
import 'bootstrap/dist/css/bootstrap.min.css';

export const WorkflowAnalysis = () => {
    return (
        <>
            <h1>hey! </h1>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            CompareSTR Analysis
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <ComparestrAnalysis />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            MergeSTR Analysis
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <MergestrAnalysis />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    );
};