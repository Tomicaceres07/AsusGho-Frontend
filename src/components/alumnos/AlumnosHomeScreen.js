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
      <section id='home'>
        <h1 id="title"><span id="title-p1">Liceo Militar</span><span id="title-p2">General Paz</span></h1>
        <h2 id="subtitle">Sección Alumnos</h2>
      </section>
      <section id='board'>
        <h2 id="board-title">Tablero</h2>
      </section>
    </div>
  );
}