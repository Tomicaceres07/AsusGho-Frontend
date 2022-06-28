// import React, { useEffect, useState } from 'react';
// import { AlumnosNavBar } from './components/alumnos/AlumnosNavBar';
// const axios = require('axios').default;


export const AlumnosHomeScreen = () => {

  /* const [msj, setMsj] = useState();

  useEffect(() => {
    axios.get('/api')
      .then(({data}) => {
        setMsj(data.msj);
      })
      .catch((err) => {
        setMsj(err);
      })
  }, []) */
  
  return (
    <div>
      <section id="home">
        <h1 id="title"><span id="title-p1">Liceo Militar</span><span id="title-p2">General Paz</span></h1>
        <h2 id="subtitle">Sección Alumnos</h2>
      </section>
      <section id="board">
        <h2 id="board-title">Tablero</h2>
        <div id="board-week">
          <div id="board-padding">
              <h4 className="board-name">Lunes</h4>
              <p className="board-task">Examen Matemática</p>
              <h4 className="board-name">Martes</h4>
              <p className="board-task">Acto de Malvinas</p>
              <h4 className="board-name">Miércoles</h4>
              <p className="board-task">Feriado</p>
              <h4 className="board-name">Jueves</h4>
              <p className="board-task">Visita a la UCC</p>
              <h4 className="board-name">Viernes</h4>
              <p id="last-task">Presentación informática</p>
          </div>
        </div>
      </section>
      <div className="separator"></div>
      <section id="board">
        <h2 id="board-title">Tablero</h2>
        <div id="board-week">
          <div id="board-padding">
              <h4 className="board-name">Lunes</h4>
              <p className="board-task">Examen Matemática</p>
              <h4 className="board-name">Martes</h4>
              <p className="board-task">Acto de Malvinas</p>
              <h4 className="board-name">Miércoles</h4>
              <p className="board-task">Feriado</p>
              <h4 className="board-name">Jueves</h4>
              <p className="board-task">Visita a la UCC</p>
              <h4 className="board-name">Viernes</h4>
              <p id="last-task">Presentación informática</p>
          </div>
        </div>
      </section>
    </div>
  );
}