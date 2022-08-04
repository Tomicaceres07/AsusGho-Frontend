import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useLocation } from 'react-router-dom';

const axios = require('axios').default;
// axios.defaults.baseURL = 'http://localhost:5000'

export const RedirectScreen = () => {

  const [msj, setMsj] = useState();

  const {pathname, search} = useLocation();

  const location = '127.0.0.1:3000' + pathname + search
  console.log(location);
  // const navigate = useNavigate();

  useEffect(() => {
    axios.post('/callback', {
      url: location
    })
      .then((data) => {
        console.log(data)
        setMsj(data.msj);
      })
      .catch((err) => {
        setMsj(err);
      })
  }, [location])
  
  return (
    <div className="redirect__container">
        <h2>¿A dónde queres ir?</h2>
        <Link to="/alumnos/alumnos">Alumnos</Link>
        <Link to="/profesores">Profesores</Link>
        <p>(esta página no se va a implementar, solo desarrollo)</p>
        <p>{msj}</p>
    </div>
  )
}
