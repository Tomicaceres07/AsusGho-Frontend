import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'context';
import React, { useContext, useEffect, useState } from 'react';
const axios = require('axios').default;


export const ProfesoresCursosScreen = () => {

    const { authState } = useContext( AuthContext );
    const { user } = authState;

    const [years, setYears] = useState([]);
    const [classes, setClasses] = useState();
    
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('/api/read/person_roll', {'id_p': user.id})
        .then(({data}) => {
            setYears(Object.keys(data.class))
            setClasses(Object.values(data.class));
        })
        .catch((err) => {
            console.log(err);
        })
    }, [user.id])

    const redirect = () => {
        navigate('/profesores/perfil', {
            replace: true
        });
    }

    const getPdfClass = (p_id) => {
        const id = p_id.toString();
        
        axios.post('/api/id/course', {'id_c': id})
        .then(({data}) => {
            if (data.activities.length >= 1) {
                console.log("tiene algo")
                data.activities.map((item, index) => {

                    console.log(item.pdf_id, ' ', item.title);
                })
            }
            console.log(data)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <section id="teacher__subjects__home">
                <h1 id="teacher__subjects__title">Materias</h1>
            </section>
            <section id="teacher__subjects__board">
                <div id="teacher__subjects__board-week">
                    <div id="teacher__subjects__board-padding" className='d-flex'>
                        {
                            years && years.length !== 0
                            ?   (
                                    years.map( (item, index) => (
                                        <div key={ index }  className="w-25 mx-auto">

                                            <h4 className='text-uppercase my-4'>{ item }</h4>
                                            <Accordion>
                                                {
                                                    classes[index].map((item, index) => (
                                                        <Accordion.Item key={index} eventKey={index} onClick={() => getPdfClass(item.id)}>
                                                            <Accordion.Header>{item.name}</Accordion.Header>
                                                            <Accordion.Body>
                                                                <button className="btn btn-success mt-5">Agregar</button>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    ))
                                                }
                                            </Accordion>
                                        </div>
                                    ))
                                )
                            :   (
                                    <div>
                                        <h4 className="teacher__subjects__board-subject">No estás inscripto a ninguna materia</h4>
                                        <button onClick={ redirect }>Inscribirse</button>
                                    </div>
                                )
                        }
                        {/*
                        <div className="teacher__subjects__board-subject-container">
                            <h4 className="teacher__subjects__board-subject">Historia</h4>
                            <p className="teacher__subjects__board-exam">EXAMEN 23/07 - Rev. Industrial</p>
                        </div>
                       */}
                    </div>
                </div>
            </section>
        </div>
    );
}