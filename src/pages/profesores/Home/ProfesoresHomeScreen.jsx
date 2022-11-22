import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { AuthContext } from 'context';
import React, { useContext, useEffect, useState } from 'react';
const axios = require('axios').default;



export const ProfesoresHomeScreen = () => {
  
  const { authState } = useContext( AuthContext );

  const { user } = authState;

  const [ activities, setActivities ] = useState();
  const [ menu, setMenu ] = useState();

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [error, setError] = useState(false);

  const getActivities = async() => {
    await axios.post('/api/message_week/read', {"type": user.type})
      .then((data) => {
          setActivities(data.data.element);
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
  

  // This is for add Menu
  const changeHandler = (event) => {
    setError(false);
    if (event.target.files[0] !== undefined) {
      // Check if it's an excel format
      if (event.target.files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || event.target.files[0].type === 'application/vnd.ms-excel') {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
      } else {
        setError(true);
        setSelectedFile();
        setIsFilePicked();
      }
    }
  };

  const addMenu = () => {
    const formData = new FormData();

    formData.append('file', selectedFile);

    axios.post('/api/add_menu', formData)
        .then((res) => {
          console.log(res);
          getMenu();
        })
        .catch((err) => {
            console.log(err);
        });
  };
  
  return (
    <div>
      <section className="teacher__home__home">
        <h1 className="teacher__home__title"><span className="teacher__home__title-p1">Liceo Militar</span><span className="teacher__home__title-p2">General Paz</span></h1>
        <h2 className="teacher__home__subtitle">Bienvenido, {user && user.name}</h2>
      </section>
      <section className="teacher__home__board">
        <h2 className="teacher__home__board-title">Tablero</h2>
        <div className="teacher__home__board-week">
          <div className="teacher__home__board-padding">
            {
                activities && activities.length !== 0
                ?   (
                      activities.map((item, index) => (
                        <div key={index}>
                          <h4 className="teacher__home__board-day">
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
                                  item.messages.map( (item, index) => (
                                    <p key={index} className="teacher__home__board-task">{item.text}</p>
                                  ))
                                )
                            :   (
                                  <p className="teacher__home__board-task"></p>
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
      <div className="teacher__home__separator"></div>
      <section className="teacher__home__menu">
        <h2 className="teacher__home__menu-title">Menú</h2>
        <div className="teacher__home__menu-week">
          <Table responsive striped className="teacher__home__menu-table">
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
                  {
                    [0, 1, 2, 3].map((week, weekIndex) => (
                      <tr className='teacher__home__menu-tr' key={weekIndex}>
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
        {
          user.p_type === 1 && (
            <div className='text-center mt-5'>
              <hr />
              <h2>Agregar Menú</h2>
              <label className="btn btn-primary my-2" htmlFor="teacher__forms__input-file">Seleccionar Archivo</label>
              <input type="file" name="file" onChange={changeHandler} id="teacher__forms__input-file" className='mw-100' hidden/>
              {
                error && (
                  <h5 className='text-danger'>Formatos aceptados: .xslx y .xsl</h5>
                )
              }
              {isFilePicked && selectedFile?.name && (
                <div>
                  <p>Nombre del archivo: {selectedFile?.name && selectedFile?.name}</p>
                </div>
              )}
              {
                isFilePicked && (
                  <div>
                    <button className="btn btn-success mb-3" onClick={addMenu}>Agregar</button>
                  </div>
                )
              }
            </div>
          )
        }
      </section>
    </div>
  );
}