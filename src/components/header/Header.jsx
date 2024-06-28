import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Header.css"
function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="bootstrap-flex-row">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">About Us</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="/register">Sign up!</NavDropdown.Item>
              <NavDropdown.Item href="/login">
                Sign in!
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/profile">
                Profile
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;