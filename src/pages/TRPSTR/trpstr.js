import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';

export const Workflow = () => {
  const navigate = useNavigate();

  const trpstrA = () => {
    navigate("/workflow/newanalysis");
  };

  const trpstrR = () => {
    navigate("/workflow/result");
  };

  return (
    <>
      <Card style={{ padding: '0px' }}>
        <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 className="card-title">TRp</h1>
          <ButtonGroup size="lg" className="mb-2">
            <Button variant="light" onClick={trpstrA} className="card-button">New Job</Button>
            <Button variant="light" onClick={trpstrR} className="card-button">Results</Button>
          </ButtonGroup>

          <div class="Compare">
            <div class="Compare__1hUWQ">
              <div class="MuiPaper-root Home_paper__1euug MuiPaper-outlined MuiPaper-rounded">
                <Card.Img
                  variant="top"
                  src={require("../../images/TRp.png")}
                  alt="banner2"
                  style={{ width: '400px', height: '450px', margin: '0 auto' }} // Adjust the width as per your requirement
                />

                <Card.Text>
                  <p>This pipeline helps users to run four tandem repeat tools at the same time. It consists of hipstr, gangstr, qcstr, dumpstr, and statstr.</p>
                  <ol>
                    <h3 className="card-title">Usage</h3>
                    <p>Users can select from two available genotyping tools which are:</p>
                    <ul>
                      <li>HipSTR</li>
                      <li>GangSTR</li>
                    </ul>
                    <p>The workflow continues with:</p>
                    <ul>
                      <li>QcSTR to generate a plot that will inform quality control thresholds</li>
                      <li>DumpSTR to filter off low-quality calls</li>
                      <li>QcSTR to confirm the remnant dataset is of good quality</li>
                      <li>StatSTR for locus-level statistics</li>
                    </ul>

                    <h3 className="card-title">Parameters:</h3>
                    <p>The parameter for each tool has been extensively discussed on each tool's page.</p>
                  </ol>
                </Card.Text>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
