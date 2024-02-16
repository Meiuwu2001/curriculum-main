import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, Outlet } from "react-router-dom";
import "../si.css";

function BarraSuperior() {
  return (
    <>
      <Navbar expand="lg" className="barra">
        <Container>
          <Navbar.Brand as={Link} to="/" className="logo">
            CV/Maker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Inicio
              </Nav.Link>
              <NavDropdown title="Curriculums" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="cv">
                  Lista Personas
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="cv/agregar">
                  Agregar
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="idiomas">
                  Lista Idiomas
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="experiencia">
                  Lista Experiencias profesionales
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="habilidades">
                  Lista Habilidades
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="preparacion">
                  Lista Preparacion 
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default BarraSuperior;
