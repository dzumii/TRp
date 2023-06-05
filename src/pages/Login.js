

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();

  const home = () => {
    navigate("/");
  };
  const register = () => {
    navigate("/login/register");
  };



  return (
    <>

      <Form>
        <Row className="mb-3">
          <Form.Group controlId="exampleForm.ControlTextarea2"> <Form.Label>username</Form.Label><Form.Control placeholder="Job1" /></Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea2"> <Form.Label>password</Form.Label><Form.Control placeholder="Job1" /></Form.Group>

        </Row>

      </Form >
      <h1> </h1>
      <ButtonGroup size="lg" className="mb-2">
        <Button variant="light" size="lg" onClick={home} > Submit </Button>
        <Button variant="light" size="lg" onClick={register}>Sign Up</Button>
      </ButtonGroup>
      <h1> </h1>
    </>
  );
}

