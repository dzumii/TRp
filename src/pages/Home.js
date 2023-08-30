
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';

export const Home = () => {
  const navigate = useNavigate();

  const tools = () => {
    navigate("/tools");
  };
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

      {/* <Carousel slide={false} variant="dark">
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src={require("../images/dna green.jpg")}
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
            src={require("../images/dna green.jpg")}
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
            src={require("../images/dna green.jpg")}
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

      <br />

      <Row xs={2} md={4} className="g-2 p-4" >
        <Col>
          <Card>

            <Card.Body>
              <Card.Title>HipSTR</Card.Title>
              <Card.Text>
                This is the first card, and it contains some unique supporting text that provides additional details about.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" size="lg" onClick={hipstr}> HipSTR </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card>

            <Card.Body>
              <Card.Title>GangSTR </Card.Title>
              <Card.Text>
                This is the second card, and it has its own distinct supporting text that describes what's inside the card.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" size="lg" onClick={gangstr}> GangSTR </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card>

            <Card.Body>
              <Card.Title>ExpansionHunter</Card.Title>
              <Card.Text>
                This is the third card, and it has a unique description that tells the reader what they can expect to find inside the card.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" size="lg" onClick={eh}> ExpansionHunter </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card>

            <Card.Body>
              <Card.Title>dumpSTR </Card.Title>
              <Card.Text>
                This is the fourth and final card, which has its own supporting text that describes the contents of the card in detail.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" size="lg" onClick={dumpstr}> dumpSTR </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card>

            <Card.Body>
              <Card.Title>mergeSTR</Card.Title>
              <Card.Text>
                This is the fourth and final card, which has its own supporting text that describes the contents of the card in detail.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" size="lg" onClick={mergestr}> mergeSTR </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card>

            <Card.Body>
              <Card.Title>qcSTR </Card.Title>
              <Card.Text>
                This is the fourth and final card, which has its own supporting text that describes the contents of the card in detail.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" size="lg" onClick={qcstr}> qcSTR </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card>

            <Card.Body>
              <Card.Title>statSTR</Card.Title>
              <Card.Text>
                This is the fourth and final card, which has its own supporting text that describes the contents of the card in detail.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" size="lg" onClick={statstr}> statSTR </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card>

            <Card.Body>
              <Card.Title>compareSTR</Card.Title>
              <Card.Text>
                This is the fourth and final card, which has its own supporting text that describes the contents of the card in detail.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" size="lg" onClick={comparestr}> compareSTR </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <br /> */}

      <div class="Hero_Hero__3IUGZ">
        <div class="Hero_container__nTWTD">
          <div class="Hero_Col1__hei_w">
            <p class="Hero_main_header__qSRC0">TRp</p>
            <p class="Hero_sub_content__1zOEH">TRp is a web based application developed to make analysis of tandem repeat easier. It host Genotyping tools as well as several other tools for downstream analysis of tandem repeats.</p>
            {/* <div class="Hero_buttons__2u9Q0">
              <button class="MuiButtonBase-root MuiButton-root MuiButton-outlined Hero_tool_button__3EPwZ MuiButton-outlinedPrimary" tabindex="0" type="button">
                <span class="MuiButton-label">
                  <a class="Hero_link__3PPD6" href="/tools" onClick={hipstr} >Tools</a>
                 

                </span>
                <span class="MuiTouchRipple-root"></span>
              </button>
              <button class="MuiButtonBase-root MuiButton-root MuiButton-contained Hero_workflow_button__2GL2G MuiButton-containedSecondary" tabindex="0" type="button">
                <span class="MuiButton-label">
                  <a class="Hero_link__3PPD6" href="/workflows">Run Workflow</a>
                </span>
                <span class="MuiTouchRipple-root"></span>
              </button>
            </div> */}

            <Button variant="success" size="lg" onClick={tools}> Tools </Button>
          </div>
          <div class="Hero_Col2__1wzl5">
            <div class="BoxImage_BoxImages__1jAHk">
              <div class="BoxImage_Image__2g921 BoxImage_ImageOne__2DbDr">
                <img src={require("../images/dna green.jpg")} alt="banner1"></img>
              </div>
              <div class="BoxImage_Image__2g921 BoxImage_ImageTwo__-DB6r">
                <img src={require("../images/dna2.jpg")} alt="metabolism"></img>
              </div>
              <div class="BoxImage_Image__2g921 BoxImage_ImageThree__18KRo">
                <img src={require("../images/TRp.png")} alt="banner2"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}





