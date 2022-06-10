import React, { useEffect, useState } from 'react';
// import { AlumnosNavBar } from './components/alumnos/AlumnosNavBar';
const axios = require('axios').default;


export const AlumnosHomeScreen = () => {

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
      <h1>AlumnosHomeScreen</h1>
      <p>{msj}</p>
      <p>This is for Notion documentation about Git. Don't mind</p>
    </div>
  );
}