

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
    <div className="login-page">
      <div class="form">
        <div class="login">
          <div class="login-header">
            <h3>Welcome</h3>
            <p>Please enter your credentials to login.</p>
          </div>
        </div>

        <Form className="login-form">
          <Row className="mb-3">
            <Form.Group controlId="exampleForm.ControlTextarea2">
              <Form.Control placeholder="username" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea2">
              <Form.Control placeholder="password" />
            </Form.Group>
          </Row>

          <ButtonGroup size="lg" className="mb-2">
            <Button variant="light" size="lg" onClick={home}>
              Login
            </Button>
            <Button variant="light" size="lg" onClick={register}>
              Register
            </Button>
          </ButtonGroup>

        </Form>

      </div>
    </div>
  );
}

