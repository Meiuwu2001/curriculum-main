import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, Outlet } from "react-router-dom";
import "../si.css";
import gsap from "gsap";
import React, { useEffect } from "react";

function BarraSuperior() {
  useEffect(() => {
    let textAnimation = gsap.timeline();
    textAnimation.from(".word", {
      x: 600,
      stagger: {
        each: 0.05,
      },
    });
  });
  return (
    <>
      <Navbar expand="lg" className="barra">
        <Container>
          <Navbar.Brand as={Link} to="/" className="word">
            CV-Maker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="word">
                Inicio
              </Nav.Link>
              <NavDropdown
                title="Curriculums"
                id="basic-nav-dropdown"
                className="word"
              >
                <NavDropdown.Item as={Link} to="cv">
                  Lista Personas
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="cv/agregar">
                  Agregar
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="idiomas">
                  Lista Idiomas
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
