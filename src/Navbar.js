//import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



export const Navbarr = () => {
  return (

    // <Nav fill variant="tabs" >
    //   <Nav.Item>
    //     <Nav.Link href="/">Home</Nav.Link>
    //   </Nav.Item>
    //   <Nav.Item>
    //     <Nav.Link href="/tools">Tools</Nav.Link>
    //   </Nav.Item>
    //   <Nav.Item>
    //     <Nav.Link href="/tutorials">Tutorials</Nav.Link>
    //   </Nav.Item>
    //   <Nav.Item>
    //     <Nav.Link href="/workflow">Workflows</Nav.Link>
    //   </Nav.Item>
    // </Nav>

    <Navbar bg="secondary" variant="dark">
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
