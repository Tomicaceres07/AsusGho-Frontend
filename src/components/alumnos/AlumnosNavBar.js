import React, { useContext, useState } from 'react'

import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import logo from "assets/logo.png";
import { AuthContext } from 'context';

export const AlumnosNavBar = () => {

  const [dropdown, setDropdown] = useState(true);
  const navigate = useNavigate();

  const openCloseDropdown = () => {
    setDropdown(!dropdown);
    const dropdownMenu = document.getElementById('dropdown-menu');

    (dropdown)
      ? dropdownMenu.classList.add('show-display')
      : dropdownMenu.classList.remove('show-display') 
  }
  
  window.addEventListener('scroll', () => {
    let scroll = window.pageYOffset;
    // console.log(scroll);
    const nav = document.getElementById('nav');

    (scroll > 10)
      ? nav.classList.add('background-rgba')
      : nav.classList.remove('background-rgba')
  });

  const { authState, logout } = useContext( AuthContext );
  const { user } = authState;

  const onLogout = () => {
    logout();
    navigate('/login', {
      replace: true
    });
  }

  return (
    <nav id="nav" className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container-fluid">
      {/* TODO: useContext to save user, and replace the id in to="alumnos/0" */}
        <Link className="navbar-brand" to={`alumnos/0`}>
          <img src={logo} alt="Logo" className="logo"/>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-4">
              {/* TODO: useContext to save user, and replace the id in to="alumnos/0" */}
              <NavLink className={({isActive}) => `nav-link ${ isActive ? 'nav-link-active text-white px-0' : 'text-white px-0'}`} aria-current="page" to={`alumnos/0`}>Home</NavLink>
            </li>
            <li className="nav-item mx-4">
              <NavLink className={({isActive}) => `nav-link ${ isActive ? 'nav-link-active text-white px-0' : 'text-white px-0'}`} to="previas">Previas</NavLink>
            </li>
            <li className="nav-item mx-4">
              <NavLink className={({isActive}) => `nav-link ${ isActive ? 'nav-link-active text-white px-0' : 'text-white px-0'}`} to="actividades">Actividades</NavLink>
            </li>
            <li className="nav-item mx-4">
              <NavLink className={({isActive}) => `nav-link ${ isActive ? 'nav-link-active text-white px-0' : 'text-white px-0'}`} to="examenes">Examenes</NavLink>
            </li>
            <li className="nav-item mx-4">
              <NavLink className={({isActive}) => `nav-link ${ isActive ? 'nav-link-active text-white px-0' : 'text-white px-0'}`} to="faltas">Faltas</NavLink>
            </li>
            <li className="nav-item mx-4">
              <NavLink className={({isActive}) => `nav-link ${ isActive ? 'nav-link-active text-white px-0' : 'text-white px-0'}`} to="formularios">Formularios</NavLink>
            </li>
            <li className="nav-item mx-4 last-link">
              {/* <NavLink className={({isActive}) => `nav-link ${ isActive ? 'nav-link-active text-white px-0' : 'text-white px-0'}`} >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/></svg>
              </NavLink> */}
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded={dropdown} onClick={openCloseDropdown}>
                  Perfil
                </button>
                <ul id="dropdown-menu" className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><NavLink className="dropdown-item" to="perfil">Ver perfil</NavLink></li>
                  <li><button className="dropdown-item" onClick={onLogout}>Cerrar Sesión</button></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
