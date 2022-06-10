import React, { useEffect, useState } from 'react';
// import { AlumnosNavBar } from './components/alumnos/AlumnosNavBar';
const axios = require('axios').default;


export const ProfesoresHomeScreen = () => {

  const [msj, setMsj] = useState();

  useEffect(() => {
    axios.get('/api')
      .then(({data}) => {
        setMsj(data.msj);
      })
      .catch((err) => {
        setMsj(err);
      })
  }, [])
  
  return (
    <div>
      <h1>ProfesoresHomeScreen</h1>
      <p>{msj}</p>
    </div>
  );
}