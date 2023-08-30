

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
export const Register = () => {
  const navigate = useNavigate();

  const register = () => {
    navigate("/login");
  };




  // return (
  //   <>

  //     <Form>
  //       <Row className="mb-3">
  //         <Form.Group controlId="exampleForm.ControlTextarea2"> <Form.Label>username</Form.Label><Form.Control placeholder="Job1" /></Form.Group>
  //         <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1"> <Form.Label>email</Form.Label> <Form.Control type="email" placeholder="name@example.com" /></Form.Group>
  //         <Form.Group controlId="exampleForm.ControlTextarea2"> <Form.Label>password</Form.Label><Form.Control placeholder="Job1" /></Form.Group>

  //       </Row>

  //     </Form >
  //     <h1> </h1>

  //     <Button variant="light" size="lg" onClick={register}>Submit</Button>
  //     <h1> </h1>
  //   </>
  // );

  return (
    <div className="login-page"> 
      <div class="form">
        <div class="login">
          <div class="login-header">
            <h3>Sign Up</h3>
          </div>
        </div>

        <Form className="login-form">
        <Row className="mb-3">
          <Form.Group controlId="exampleForm.ControlTextarea2"> <Form.Control placeholder="username" /></Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1"> <Form.Control type="email" placeholder="email" /></Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea2"> <Form.Control placeholder="password" /></Form.Group>

        </Row>
        
        <Button variant="light" size="lg" onClick={register}>Submit</Button>
        </Form>

      </div>
    </div>
  );
}
