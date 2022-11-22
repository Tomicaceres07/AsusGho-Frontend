import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { AuthContext } from 'context';
import React, { useContext, useEffect, useState } from 'react';
import { weekDayMapper } from 'utils/alumnos/weekDayMapper';
const axios = require('axios').default;



export const AlumnosHomeScreen = () => {
  
  const { authState } = useContext( AuthContext );

  const { user } = authState;

  const [ activities, setActivities ] = useState();
  const [ menu, setMenu ] = useState();

  const getActivities = async() => {
    await axios.post('/api/message_week/read', {"type": true})
      .then(({data}) => {
          setActivities(data.element);
      })
      .catch((err) => {
          console.log(err);
      })

  }

  const getMenu = async() => {
    await axios.get('/api/menu')
    .then(({data}) => {
        setMenu(data.menu.menu);
    })
    .catch((err) => {
        console.log(err);
    })
  }

  
  useEffect(() => {
      getActivities();
      
      getMenu();
  }, [])
  
  return (
    <div>
      <section className="student__home__home">
        <h1 className="student__home__title"><span className="student__home__title-p1">Liceo Militar</span><span className="student__home__title-p2">General Paz</span></h1>
        <h2 className="student__home__subtitle">Bienvenido, {user && user.name}</h2>
      </section>
      <section className="student__home__board">
        <h2 className="student__home__board-title">Tablero</h2>
        <div className="student__home__board-week">
          <div className="student__home__board-padding">
              {
                activities && activities.length !== 0
                ?   (
                      activities.map((item, activityIndex) => (
                        <div key={activityIndex}>
                          <h4 className="student__home__board-day">
                            {
                              (item.name === "Friday")
                                ? "Viernes"
                                : (item.name === "Saturday") 
                                    ? "Sabado"
                                    : (item.name === "Sunday") 
                                      ? "Domingo"
                                      : (item.name === "Monday")
                                          ? "Lunes"
                                          : (item.name === "Tuesday") 
                                              ? "Martes"
                                              : (item.name === "Wednesday") 
                                                  ? "Miercoles"
                                                  : (item.name === "Thursday") && "Jueves"
                            }
                          </h4>
                          {
                            item.messages && item.messages.length !== 0
                            ?   (
                                  item.messages.map( (item, messageIndex) => (
                                    <p key={messageIndex} className="student__home__board-task">{item.text}</p>
                                  ))
                                )
                            :   (
                                  <p className="student__home__board-task"></p>
                                )
                          }
                        </div>
                      ))
                    )
                :   (
                      <Spinner animation="border" variant="light" />
                    )
              }
          </div>
        </div>
      </section>
      <div className="student__home__separator"></div>
      <section className="student__home__menu">
        <h2 className="student__home__menu-title">Menú</h2>
        <div className="student__home__menu-week">
          <Table responsive striped className="student__home__menu-table">
              <thead>
                  <tr>
                      <th className='student__home__menu-th'>Semana</th>
                      <th className='student__home__menu-th'>Lunes</th>
                      <th className='student__home__menu-th'>Martes</th>
                      <th className='student__home__menu-th'>Miercoles</th>
                      <th className='student__home__menu-th'>Jueves</th>
                      <th className='student__home__menu-th'>Viernes</th>
                  </tr>
              </thead>
              <tbody>
                  {
                    [0, 1, 2, 3].map((week, weekIndex) => (
                      <tr className='student__home__menu-tr' key={weekIndex}>
                          <td>{week+1}</td>
                          <td>{ menu && menu.LUNES[week] }</td>
                          <td>{ menu && menu.MARTES[week] }</td>
                          <td>{ menu && menu.MIERCOLES[week] }</td>
                          <td>{ menu && menu.JUEVES[week] }</td>
                          <td>{ menu && menu.VIERNES[week] }</td>
                      </tr>
                    ))
                  }
              </tbody>
          </Table>
        </div>
      </section>
    </div>
  );
}