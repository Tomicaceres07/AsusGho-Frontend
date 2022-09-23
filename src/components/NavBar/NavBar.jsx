import React, { useContext, useState } from 'react'

import { NavLink, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from "assets/logo.png";
import { AuthContext } from 'context';


export const NavBar = () => {

  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  
  const onLinkClicked = () => {
    setExpanded(false);

    document.getElementById('body')?.classList.remove('no-scroll-y');
  }
  
  window.addEventListener('scroll', () => {
    let scroll = window.pageYOffset;
    const nav = document.getElementById('nav');

    (scroll > 10)
      ? nav.classList.add('background-rgba')
      : nav.classList.remove('background-rgba')
  });

  const { logout } = useContext( AuthContext );

  const onLogout = () => {
    logout();
    navigate('/login', {
      replace: true
    });
  }

  const onToggle = () => {
    setExpanded(expanded ? false : "expanded")
    const nav = document.getElementById('nav');
    const body = document.getElementById('body');
    let scroll = window.pageYOffset;


    if(expanded !== "expanded") {
      body.classList.add('no-scroll-y')
      if(scroll < 10) {
        nav.classList.add('background-rgba')
      }
    } else {
      body.classList.remove('no-scroll-y')
    }
  }

  return (
    <Navbar collapseOnSelect expand="lg" expanded={expanded} variant="dark" id="nav" className="sticky-top text-center">
      <Container>
        <Navbar.Brand href="#home" className="navbar-brand">
          <img src={logo} alt="Logo" className="logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={onToggle}/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav id="nav-collapse" className="ms-auto">
            <Nav.Link as={NavLink} to={"/alumnos/alumnos"} className="navlink mx-2 text-uppercase" onClick={ onLinkClicked }>Home</Nav.Link>
            <Nav.Link as={NavLink} to={"/alumnos/previas"} className="navlink mx-2 text-uppercase" onClick={ onLinkClicked }>Previas</Nav.Link>
            <Nav.Link as={NavLink} to={"/alumnos/actividades"} className="navlink mx-2 text-uppercase" onClick={ onLinkClicked }>Actividades</Nav.Link>
            <Nav.Link as={NavLink} to={"/alumnos/examenes"} className="navlink mx-2 text-uppercase" onClick={ onLinkClicked }>Examenes</Nav.Link>
            <Nav.Link as={NavLink} to={"/alumnos/faltas"} className="navlink mx-2 text-uppercase" onClick={ onLinkClicked }>Faltas</Nav.Link>
            <Nav.Link as={NavLink} to={"/alumnos/formularios"} className="navlink mx-2 text-uppercase" onClick={ onLinkClicked }>Formularios</Nav.Link>
            <NavDropdown title="PERFIL" id="collasible-nav-dropdown" className="mx-4">
              <Nav.Link as={NavLink} to={"/alumnos/perfil"} className="navlink-dropdown text-uppercase" onClick={ onLinkClicked }>Ver Perfil</Nav.Link>
              <NavDropdown.Divider />
              <Button onClick={onLogout} id="logout-button" className="w-100 text-uppercase">Cerrar Sesión</Button>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )

  
  /* return (
    <nav id="nav" className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/alumnos/alumnos">
          <img src={logo} alt="Logo" className="logo"/>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-4">
              <NavLink className={({isActive}) => `nav-link ${ isActive ? 'nav-link-active text-white px-0' : 'text-white px-0'}`} aria-current="page" to="/alumnos/alumnos">Home</NavLink>
            </li>
            <li className="nav-item mx-4">
              <NavLink className={({isActive}) => `nav-link ${ isActive ? 'nav-link-active text-white px-0' : 'text-white px-0'}`} to="/alumnos/previas">Previas</NavLink>
            </li>
            <li className="nav-item mx-4">
              <NavLink className={({isActive}) => `nav-link ${ isActive ? 'nav-link-active text-white px-0' : 'text-white px-0'}`} to="/alumnos/actividades">Actividades</NavLink>
              </li>
              <li className="nav-item mx-4">
              <NavLink className={({isActive}) => `nav-link ${ isActive ? 'nav-link-active text-white px-0' : 'text-white px-0'}`} to="/alumnos/examenes">Examenes</NavLink>
              </li>
            <li className="nav-item mx-4">
              <NavLink className={({isActive}) => `nav-link ${ isActive ? 'nav-link-active text-white px-0' : 'text-white px-0'}`} to="/alumnos/faltas">Faltas</NavLink>
            </li>
            <li className="nav-item mx-4">
              <NavLink className={({isActive}) => `nav-link ${ isActive ? 'nav-link-active text-white px-0' : 'text-white px-0'}`} to="/alumnos/formularios">Formularios</NavLink>
            </li>
            <li className="nav-item mx-4 last-link">
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded={dropdown} onClick={openCloseDropdown}>
                  Perfil
                </button>
                <ul id="dropdown-menu" className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><NavLink className="dropdown-item" to="/alumnos/perfil">Ver perfil</NavLink></li>
                  <li><button className="dropdown-item" onClick={onLogout}>Cerrar Sesión</button></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  ) */
}
