//import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const Navbarr = () => {
  return (


    <Navbar bg="success" variant="dark">
      <Container>
        <Navbar.Brand href="/">TRp</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/tools">Tools</Nav.Link>
          <Nav.Link href="/workflow">Workflows</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>

        </Nav>
      </Container>
    </Navbar>

  );
};
