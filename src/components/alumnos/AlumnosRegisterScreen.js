import React, { useContext } from 'react';

// import { useLocation, useNavigate } from 'react-router-dom';

import logo from "assets/logo.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from 'context';
const axios = require('axios').default;
axios.defaults.baseURL = 'http://localhost:5000'

export const AlumnosRegisterScreen = () => {

  const { login } = useContext( AuthContext );
  const navigate = useNavigate();

  // Here I should useContext to get the method which change the user in the context

  // Here I should recieve in query params the id of user, so I can do the post petition to API. 
  /* 
  Something like this, but with the method which change the user in the context
  useEffect(() => {
    axios.post('/api/getuser', {'id': id})
      .then(({data}) => {
        setUser(data.user);
      })
      .catch((err) => {
        setUser(err);
      })
    }, [id])
  */

  // const onLogin = (year) => {
  const onLogin = () => {
    /* 
    login({
      ...state,
      year: year
    })
    NOTE: I must change the Auth
    */
    login('Tomi Caceres');

    navigate('/alumnos/alumnos/0', {
      replace: true
    });
  }
  
  return (
    <div>
      <img src={logo} alt="Logo" className="login__logo"/>
      
      <form action="#" id="register__form">
        <h1 id="register__title">Seleccione su año</h1>

        <select name="role" id="register__dropdown" className="w-100 mb-2 input">
            <option selected value="1">1er año</option>
            <option value="2">2do año</option>
            <option value="3">3er año</option>
            <option value="4">4to año</option>
            <option value="5">5to año</option>
            <option value="6">6to año</option>
        </select>

        {/* TODO: Put year dinamically */}
        {/* <a href="http://localhost:5000/api/reg_st" id="register__submit">Enviar</a> */}
        <button type="submit" onClick={ onLogin } id="register__submit" className="display-block w-100">Enviar</button>
      </form>
    </div>
  )
}
