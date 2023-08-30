import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const Tools = () => {
  const navigate = useNavigate();

  const gangstr = () => {
    navigate("/tools/gangstr");
  };
  const hipstr = () => {
    navigate("/tools/hipstr");
  };
  const eh = () => {
    navigate("/tools/eh");
  };
  const dumpstr = () => {
    navigate("/tools/dumpstr");
  };
  const mergestr = () => {
    navigate("/tools/mergestr");
  };
  const comparestr = () => {
    navigate("/tools/comparestr");
  };
  const qcstr = () => {
    navigate("/tools/qcstr");
  };
  const statstr = () => {
    navigate("/tools/statstr");
  };
  return (
    <>


      <Row xs={2} md={3} className="g-2 p-4">
        <Col>
          <Card className="h-100 d-flex flex-column justify-content-between">
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title className="card-title">HipSTR</Card.Title>
              <Card.Text>
                HipSTR is the most reliable tool for genotyping STRs from Illumina sequencing data.
              </Card.Text>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" size="lg" onClick={hipstr} className="card-button">HipSTR</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* <Col>
          <Card className="h-100 d-flex flex-column justify-content-between">
         
            <Card.Body>
              <Card.Title>GangSTR </Card.Title>
              <Card.Text>
                GangSTR is a tool for genome-wide profiling tandem repeats from short reads. GangSTR can handle repeats that are longer than the read length.
              </Card.Text>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" size="lg" onClick={gangstr} className="card-button"> GangSTR </Button>
              </div>
            </Card.Body>
          </Card>
        </Col> */}

        {/* <Col>
          <Card className="h-100 d-flex flex-column justify-content-between">
          
            <Card.Body>
              <Card.Title>ExpansionHunter</Card.Title>
              <Card.Text>
                This is the third card, and it has a unique description that tells the reader what they can expect to find inside the card.
              </Card.Text>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" size="lg" onClick={eh} className="card-button"> ExpansionHunter </Button>
              </div>
            </Card.Body>
          </Card>
        </Col> */}

        <Col>
          <Card className="h-100 d-flex flex-column justify-content-between">
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title>DumpSTR </Card.Title>
              <Card.Text>
                DumpSTR filters VCF files with TR genotypes, performing call-level and locus-level filtering, and outputs a filtered VCF file.
              </Card.Text>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" size="lg" onClick={dumpstr} className="card-button"> DumpSTR </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="h-100 d-flex flex-column justify-content-between">
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title>MergeSTR</Card.Title>
              <Card.Text>
                MergeSTR takes as input two or more VCF files with TR genotypes and outputs a combined VCF file.
              </Card.Text>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" size="lg" onClick={mergestr} className="card-button"> MergeSTR </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="h-100 d-flex flex-column justify-content-between">
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title>QcSTR </Card.Title>
              <Card.Text>
                qcSTR takes as input a VCF file and outputs several plots in pdf format.
              </Card.Text>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" size="lg" onClick={qcstr} className="card-button"> QcSTR </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col className="h-100 d-flex flex-column justify-content-between">
          <Card>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title>StatSTR</Card.Title>
              <Card.Text>
                StatSTR takes in a TR genotyping VCF file and outputs per-locus statistics.
              </Card.Text>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" size="lg" onClick={statstr} className="card-button"> StatSTR </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="h-100 d-flex flex-column justify-content-between">
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title>CompareSTR</Card.Title>
              <Card.Text>
                CompareSTR takes two VCF files  and outputs metrics and plots based on comparing calls across the two VCFs.
              </Card.Text>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" size="lg" onClick={comparestr} className="card-button"> CompareSTR </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>

  )
};

