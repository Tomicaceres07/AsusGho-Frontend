import React, { useEffect, useState } from 'react';

// import { useLocation, useNavigate } from 'react-router-dom';

import logo from "assets/logo.png";

const axios = require('axios').default;
axios.defaults.baseURL = 'http://localhost:5000'

export const LoginScreen = () => {

  const [url, setUrl] = useState();

  useEffect(() => {
    axios.get('/api/login')
      .then(({data}) => {
        setUrl(data.url);
      })
      .catch((err) => {
        setUrl(err);
      })
  }, [])

  return (
    <div>
      <img src={logo} alt="Logo" className="login__logo"/>
      <div className="google-btn">
          <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
          </div>
          <a className="btn-text" href={url}>Sign in with google</a>
          {/* <p>{url}</p> */}
      </div>
    </div>
  )
}
