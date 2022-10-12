import Spinner from 'react-bootstrap/Spinner';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'context';
import React, { useContext, useEffect, useState } from 'react';
const axios = require('axios').default;

export const AlumnosMateriasScreen = () => {

    const { authState } = useContext( AuthContext );
    const { user } = authState;

    const [years, setYears] = useState([]);
    const [classes, setClasses] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true); 
        axios.post('/api/read/student_roll', {'id_s': user.id})
        .then(({data}) => {
            setYears(Object.keys(data.class))
            setClasses(Object.values(data.class));
            setIsLoading(false); 
        })
        .catch((err) => {
            console.log(err);
        })
    }, [user.id])

    const redirect = () => {
        navigate('/alumnos/perfil', {
            replace: true
        });
    }

    return (
        <div>
            <section id="student__subjects__home">
                <h1 id="student__subjects__title">Materias</h1>
            </section>
            <section id="student__subjects__board">
                <div id="student__subjects__board-week">
                    <div id="student__subjects__board-padding" className='d-flex'>
                    
                        {
                            !isLoading
                            ?   (
                                years && years.length !== 0
                                ?   (
                                        years.map( (item, index) => (
                                            <div key={ index }  className="w-25 mx-auto">

                                                <h4 className='text-uppercase my-4'>{ item }</h4>
                                                <Accordion>
                                                    {
                                                        classes[index].map((item, index) => (
                                                            <Accordion.Item key={index} eventKey={index}>
                                                                <Accordion.Header>{item.name}</Accordion.Header>
                                                                <Accordion.Body>
                                                                    Contenido
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
                                            <h4 className="student__subjects__board-subject">No estás inscripto a ninguna materia</h4>
                                            <button onClick={ redirect }>Inscribirse</button>
                                        </div>
                                    )
                            )
                            :   (
                                <Spinner animation="border" variant="light" />
                            )
                        }
                        {/* {
                            classes && classes.length !== 0
                            ?   (
                                classes.map( (item, index) => (
                                <div key={ index } className="student__subjects__board-subject-container">
                                    <h4 className="student__subjects__board-subject"></h4>
                                </div>
                                ))
                                )
                            :   (
                                    <div>
                                        <h4 className="student__subjects__board-subject">No estás inscripto a ninguna materia</h4>
                                        <button onClick={ redirect }>Inscribirse</button>
                                    </div>
                                )
                        } */}
                        {/* {
                            classes && classes.length !== 0
                            ?   (
                                classes.map( (item, index) => (
                                    <div key={index}>

                                        {
                                            Object.values(item).map((item, index) => {
                                                <div key={index}>
                                                    {
                                                        item.map( (item, index) => (
                                                            <div key={index}>
                                                            {
                                                                item.name.length >= 1 && <h4 className="student__subjects__board-subject">{item.name && item.name}</h4>
                                                            }

                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            })
                                        }
                                    </div>
                                ))
                                )
                            :   (
                                    <div>
                                        <h4 className="student__subjects__board-subject">No estás inscripto a ninguna materia</h4>
                                        <button onClick={ redirect }>Inscribirse</button>
                                    </div>
                                )
                        } */}

                        {/* {
                            classes && classes.length !== 0
                            ?   (
                                    grades.map((item, index) => (
                                    <div>
                                    <h5>{item}</h5>
                                        {
                                            
                                        divisions.map((item, index) => (
                                            <div>
                                            <h5>{item}</h5>
                                            <Accordion key={index}>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>Accordion Item #1</Accordion.Header>
                                                    <Accordion.Body>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                                    culpa qui officia deserunt mollit anim id est laborum.
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            </div>
                                        ))
                                        }
                                    </div>
                                    ))
                                )
                            :   (
                                    <div>
                                        <h4 className="student__subjects__board-subject">No estás inscripto a ninguna materia</h4>
                                        <button onClick={ redirect }>Inscribirse</button>
                                    </div>
                                )
                        } */}
                    </div>
                </div>
            </section>
        </div>
    );
}