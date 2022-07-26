import React from 'react'

import { Link, NavLink } from 'react-router-dom';

import logo from "assets/logo.png";

export const AlumnosNavBar = () => {

  
  window.addEventListener('scroll', () => {
    let scroll = window.pageYOffset;
    // console.log(scroll);
    const nav = document.getElementById('nav');

    (scroll > 10)
      ? nav.classList.add('background-rgba')
      : nav.classList.remove('background-rgba')
  });

  return (
    <nav id="nav" className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container-fluid">
      {/* TODO: useContext to save user, and replace the id in to="alumnos/0" */}
        <Link className="navbar-brand" to="alumnos/0">
          <img src={logo} alt="Logo" className="logo"/>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-4">
              {/* TODO: useContext to save user, and replace the id in to="alumnos/0" */}
              <NavLink className={({isActive}) => `nav-link ${ isActive ? 'nav-link-active text-white px-0' : 'text-white px-0'}`} aria-current="page" to="alumnos/0">Home</NavLink>
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
            <li className="nav-item mx-4 last-link">
              <NavLink className={({isActive}) => `nav-link ${ isActive ? 'nav-link-active text-white px-0' : 'text-white px-0'}`} to="formularios">Formularios</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
