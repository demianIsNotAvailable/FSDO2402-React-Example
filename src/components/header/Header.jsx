import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Header.css"
import { useAuth } from '../../contexts/auth-context/AuthContext';

function Header() {
  const {userData, isLoggedIn, logout} = useAuth()

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="bootstrap-flex-row">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">About Us</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              { isLoggedIn ? (
                <>
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item>
                  <NavDropdown.Divider />
                  { userData.decoded.role === "ADMIN" && <NavDropdown.Item href="/admin">?????</NavDropdown.Item> }

                </>
              ) : (
                <>
                  <NavDropdown.Item href="/register">Register now!</NavDropdown.Item>
                  <NavDropdown.Item href="/login">Log in</NavDropdown.Item>
                </>
              )

              }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;




