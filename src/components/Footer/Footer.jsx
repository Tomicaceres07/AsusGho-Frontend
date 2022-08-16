import React from 'react'

import logo from "assets/logo.png";


export const Footer = () => {
  return (
    <footer id="footer" className='separator'>
        <div id="footer-div">
            <img src={logo} alt="Logo" id="footer-logo"/>
            <p id="footer-text">Liceo Militar General Paz</p>        
        </div>
    </footer>
  )
}
