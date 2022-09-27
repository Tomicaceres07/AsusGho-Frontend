import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'context';
import React, { useContext, useEffect, useState } from 'react';
const axios = require('axios').default;


export const AlumnosMateriasScreen = () => {

    const { authState } = useContext( AuthContext );
    const { user } = authState;

    const [classes, setClasses] = useState();
    
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('/api/read/student_roll', {'id_s': user.id})
        .then(({data}) => {
            setClasses(data.clases);
            console.log(data.clases);
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
            <section id="subjects__home">
                <h1 id="subjects__title">Materias</h1>
            </section>
            <section id="subjects__board">
                <div id="subjects__board-week">
                    <div id="subjects__board-padding">
                        {
                            classes 
                            ?   (
                                classes.map( (item, index) => (
                                <div key={ index } className="subjects__board-subject-container">
                                    <h4 className="subjects__board-subject">{ item.course.name } - { item.course.grade }°{ item.course.division }</h4>
                                </div>
                                ))
                                )
                            :   (
                                    <div>
                                        <h4 className="subjects__board-subject">No estás inscripto a ninguna materia</h4>
                                        <button onClick={ redirect }>Inscribirse</button>
                                    </div>
                                )
                        }
                        {/*
                        <div className="subjects__board-subject-container">
                            <h4 className="subjects__board-subject">Historia</h4>
                            <p className="subjects__board-exam">EXAMEN 23/07 - Rev. Industrial</p>
                        </div>
                       */}
                    </div>
                </div>
            </section>
        </div>
    );
}