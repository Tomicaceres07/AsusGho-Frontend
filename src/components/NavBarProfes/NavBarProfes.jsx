import React, { useContext, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import logo from "assets/logo.png";
import { AuthContext } from "context";

export const NavBarProfes = () => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  const onLinkClicked = () => {
    setExpanded(false);

    document.getElementById("body")?.classList.remove("no-scroll-y");
  };

  window.addEventListener("scroll", () => {
    let scroll = window.pageYOffset;
    const nav = document.getElementById("nav");

    scroll > 10
      ? nav.classList.add("background-rgba")
      : nav.classList.remove("background-rgba");
  });

  const { authState, logout } = useContext(AuthContext);
  const { user } = authState;

  const onLogout = () => {
    logout();
    navigate("/login", {
      replace: true,
    });
  };

  const onToggle = () => {
    setExpanded(expanded ? false : "expanded");
    const nav = document.getElementById("nav");
    const body = document.getElementById("body");
    let scroll = window.pageYOffset;

    if (expanded !== "expanded") {
      body.classList.add("no-scroll-y");
      if (scroll < 10) {
        nav.classList.add("background-rgba");
      }
    } else {
      body.classList.remove("no-scroll-y");
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      expanded={expanded}
      variant="dark"
      id="nav"
      className="sticky-top text-center"
    >
      <Container>
        <Navbar.Brand href="#home" className="navbar-brand">
          <img src={logo} alt="Logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={onToggle}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav id="nav-collapse" className="ms-auto">
            <Nav.Link
              as={NavLink}
              to={"/profesores/profesores"}
              className="navlink mx-2 text-uppercase"
              onClick={onLinkClicked}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={"/profesores/actividades"}
              className="navlink mx-2 text-uppercase"
              onClick={onLinkClicked}
            >
              Actividades
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={"/profesores/cursos"}
              className="navlink mx-2 text-uppercase"
              onClick={onLinkClicked}
            >
              Cursos
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={"/profesores/faltas"}
              className="navlink mx-2 text-uppercase"
              onClick={onLinkClicked}
            >
              Faltas
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={"/profesores/formularios"}
              className="navlink mx-2 text-uppercase"
              onClick={onLinkClicked}
            >
              Formularios
            </Nav.Link>
            <NavDropdown
              title={user && user.name}
              id="collasible-nav-dropdown"
              className="mx-4"
            >
              <Nav.Link
                as={NavLink}
                to={"/profesores/inscripcion"}
                className="navlink-dropdown text-uppercase"
                onClick={onLinkClicked}
              >
                Inscribirse a Materias
              </Nav.Link>
              <NavDropdown.Divider />
              <Button
                onClick={onLogout}
                id="logout-button"
                className="w-100 text-uppercase"
              >
                Cerrar Sesión
              </Button>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
