
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';

export const Home = () => {
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
      {/* <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={require("./tandem.png")} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>A one-stop platform for tandem repeat analysis</Card.Text>
        </Card.Body>
      </Card>
      <br /> */}
      <Carousel slide={false} variant="dark">
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src={require("../images/dna.jpg")}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("../images/dna2.jpg")}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("../images/dan3.jpeg")}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* );
} */}

      <br />







      <Row xs={2} md={4} className="g-2 p-4" >
        <Col>
          <Card>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title>HipSTR</Card.Title>
              <Card.Text>
                This is the first card, and it contains some unique supporting text that provides additional details about.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="secondary" size="lg" onClick={hipstr}> HipSTR </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title>GangSTR </Card.Title>
              <Card.Text>
                This is the second card, and it has its own distinct supporting text that describes what's inside the card.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="secondary" size="lg" onClick={gangstr}> GangSTR </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title>ExpansionHunter</Card.Title>
              <Card.Text>
                This is the third card, and it has a unique description that tells the reader what they can expect to find inside the card.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="secondary" size="lg" onClick={eh}> ExpansionHunter </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title>dumpSTR </Card.Title>
              <Card.Text>
                This is the fourth and final card, which has its own supporting text that describes the contents of the card in detail.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="secondary" size="lg" onClick={dumpstr}> dumpSTR </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title>mergeSTR</Card.Title>
              <Card.Text>
                This is the fourth and final card, which has its own supporting text that describes the contents of the card in detail.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="secondary" size="lg" onClick={mergestr}> mergeSTR </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title>qcSTR </Card.Title>
              <Card.Text>
                This is the fourth and final card, which has its own supporting text that describes the contents of the card in detail.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="secondary" size="lg" onClick={qcstr}> qcSTR </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title>statSTR</Card.Title>
              <Card.Text>
                This is the fourth and final card, which has its own supporting text that describes the contents of the card in detail.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="secondary" size="lg" onClick={statstr}> statSTR </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title>compareSTR</Card.Title>
              <Card.Text>
                This is the fourth and final card, which has its own supporting text that describes the contents of the card in detail.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="secondary" size="lg" onClick={comparestr}> compareSTR </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <br />
    </>
  );
}