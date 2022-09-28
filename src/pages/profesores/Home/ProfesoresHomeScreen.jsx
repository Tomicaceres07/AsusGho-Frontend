import Table from 'react-bootstrap/Table';
import { AuthContext } from 'context';
import React, { useContext, useEffect, useState } from 'react';
const axios = require('axios').default;



export const ProfesoresHomeScreen = () => {
  
  const { authState } = useContext( AuthContext );

  const { user } = authState;

  const [ menu, setMenu ] = useState();


  useEffect(() => {
      axios.get('/api/menu')
      .then(({data}) => {
          setMenu(data.menu.menu);
          console.log(data.menu.menu);
      })
      .catch((err) => {
          console.log(err);
      })
  }, [])
  
  return (
    <div>
      <section id="teacher__home__home">
        <h1 id="teacher__home__title"><span id="teacher__home__title-p1">Liceo Militar</span><span id="teacher__home__title-p2">General Paz</span></h1>
        <h2 id="teacher__home__subtitle">Bienvenido, {user && user.name}</h2>
      </section>
      <section id="teacher__home__board">
        <h2 id="teacher__home__board-title">Tablero</h2>
        <div id="teacher__home__board-week">
          <div id="teacher__home__board-padding">
            {/* TODO: make this dinamically */}
              <h4 className="teacher__home__board-day">Lunes</h4>
              <p className="teacher__home__board-task">Examen Matemática</p>
              <h4 className="teacher__home__board-day">Martes</h4>
              <p className="teacher__home__board-task">Acto de Malvinas</p>
              <h4 className="teacher__home__board-day">Miercoles</h4>
              <p className="teacher__home__board-task">Feriado</p>
              <h4 className="teacher__home__board-day">Jueves</h4>
              <p className="teacher__home__board-task">Visita a la UCC</p>
              <h4 className="teacher__home__board-day">Viernes</h4>
              <p id="teacher__home__last-task">Presentación informática</p>
          </div>
        </div>
      </section>
      <div className="teacher__home__separator"></div>
      <section id="teacher__home__menu">
        <h2 id="teacher__home__menu-title">Menú</h2>
        <div id="teacher__home__menu-week">
          <Table responsive striped id="teacher__home__menu-table">
              <thead>
                  <tr>
                      <th className='teacher__home__menu-th'>Semana</th>
                      <th className='teacher__home__menu-th'>Lunes</th>
                      <th className='teacher__home__menu-th'>Martes</th>
                      <th className='teacher__home__menu-th'>Miercoles</th>
                      <th className='teacher__home__menu-th'>Jueves</th>
                      <th className='teacher__home__menu-th'>Viernes</th>
                  </tr>
              </thead>
              <tbody>
                    <tr className='teacher__home__menu-tr'>
                        <td>1</td>
                        <td>{ menu && menu.LUNES[0] }</td>
                        <td>{ menu && menu.MARTES[0] }</td>
                        <td>{ menu && menu.MIERCOLES[0] }</td>
                        <td>{ menu && menu.JUEVES[0] }</td>
                        <td>{ menu && menu.VIERNES[0] }</td>
                    </tr>
                    <tr className='teacher__home__menu-tr'>
                        <td>2</td>
                        <td>{ menu && menu.LUNES[1] }</td>
                        <td>{ menu && menu.MARTES[1] }</td>
                        <td>{ menu && menu.MIERCOLES[1] }</td>
                        <td>{ menu && menu.JUEVES[1] }</td>
                        <td>{ menu && menu.VIERNES[1] }</td>
                    </tr>
                    <tr className='teacher__home__menu-tr'>
                        <td>3</td>
                        <td>{ menu && menu.LUNES[2] }</td>
                        <td>{ menu && menu.MARTES[2] }</td>
                        <td>{ menu && menu.MIERCOLES[2] }</td>
                        <td>{ menu && menu.JUEVES[2] }</td>
                        <td>{ menu && menu.VIERNES[2] }</td>
                    </tr>
                    <tr className='teacher__home__menu-tr'>
                        <td>4</td>
                        <td>{ menu && menu.LUNES[3] }</td>
                        <td>{ menu && menu.MARTES[3] }</td>
                        <td>{ menu && menu.MIERCOLES[3] }</td>
                        <td>{ menu && menu.JUEVES[3] }</td>
                        <td>{ menu && menu.VIERNES[3] }</td>
                    </tr>
              </tbody>
          </Table>
        </div>
      </section>
    </div>
  );
}