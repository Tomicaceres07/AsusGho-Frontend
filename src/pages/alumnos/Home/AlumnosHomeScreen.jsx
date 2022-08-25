import { AuthContext } from 'context';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const axios = require('axios').default;



export const AlumnosHomeScreen = () => {
  
  const { authState } = useContext( AuthContext );

  const { user } = authState;

  return (
    <div>
      <section id="home__home">
        <h1 id="home__title"><span id="home__title-p1">Liceo Militar</span><span id="home__title-p2">General Paz</span></h1>
        <h2 id="home__subtitle">Bienvenido, {user && user.name}</h2>
      </section>
      <section id="home__board">
        <h2 id="home__board-title">Tablero</h2>
        <div id="home__board-week">
          <div id="home__board-padding">
            {/* TODO: make this dinamically */}
              <h4 className="home__board-day">Lunes</h4>
              <p className="home__board-task">Examen Matemática</p>
              <h4 className="home__board-day">Martes</h4>
              <p className="home__board-task">Acto de Malvinas</p>
              <h4 className="home__board-day">Miercoles</h4>
              <p className="home__board-task">Feriado</p>
              <h4 className="home__board-day">Jueves</h4>
              <p className="home__board-task">Visita a la UCC</p>
              <h4 className="home__board-day">Viernes</h4>
              <p id="home__last-task">Presentación informática</p>

              {/* <h5>{msj}</h5> */}
          </div>
        </div>
      </section>
      <div className="home__separator"></div>
      <section id="home__menu">
        <h2 id="home__menu-title">Menú</h2>
        <div id="home__menu-week">
          <div id="home__menu-padding">
              <h4 className="home__menu-day">Lunes</h4>
              <p className="home__menu-name">Carne al horno con papas</p>
              <h4 className="home__menu-day">Martes</h4>
              <p className="home__menu-name">Ñoquis con salsa boloñesa</p>
              <h4 className="home__menu-day">Miércoles</h4>
              <p className="home__menu-name">Pastel de papa</p>
              <h4 className="home__menu-day">Jueves</h4>
              <p className="home__menu-name">Pizza</p>
              <h4 className="home__menu-day">Viernes</h4>
              <p id="home__last-name">Milanesa con puré</p>
          </div>
        </div>
      </section>
    </div>
  );
}