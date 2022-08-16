import { AuthContext } from 'context';
import React, { useContext, useEffect, useState } from 'react';
const axios = require('axios').default;

export const AlumnosFaltasScreen = () => {

    const { authState } = useContext( AuthContext );
    const { user } = authState;
    

    const [abscenses, setAbscenses] = useState();

    useEffect(() => {
        axios.post('/api/get_abs', {'email': user.email})
        .then(({data}) => {
            setAbscenses(data.db);
            console.log(data.db);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    
    return (
        <div>
            <section id="absences__home">
                <h1 id="absences__title">Inasistencias</h1>
                <h2 id="absences__subtitle">{user && user.name}</h2>
            </section>
            <section id="absences__board">
                <h2 id="absences__board-title">Faltas: {abscenses && abscenses.length}</h2>
                <div id="absences__board-week">
                    <div id="absences__board-padding">

                        {
                            abscenses && abscenses.map( item => (
                                <div className={`${(item.justified == 0) ? 'absences__board-container absences__board-unjustified' : 'absences__board-container'}`}>
                                    <p className="absences__board-day" key={ item.id }>
                                        { item.date } <br />
                                        { item.c_abscence }
                                    </p>
                                    <p className="absences__board-absence">{ (item.justified == 0) ? "Injustificada" : "Justificada"  }</p>
                                </div>
                            ))
                        }

                        {/* <h6>{abscenses.id}</h6> */}
                        {/* <div className="absences__board-container absences__board-unjustified">
                            <p className="absences__board-day">23/07</p>
                            <p className="absences__board-absence">Injustificada</p>
                        </div>
                        <div className="absences__board-container">
                            <p className="absences__board-day">15/08</p>
                            <p className="absences__board-absence">Justificada</p>
                        </div>
                        <div className="absences__board-container">
                            <p className="absences__board-day">18/08</p>
                            <p className="absences__board-absence">Justificada</p>
                        </div>
                        <div className="absences__board-container absences__board-unjustified">
                            <p className="absences__board-day">19/08</p>
                            <p className="absences__board-absence">Injustificada</p>
                        </div>
                        <div className="absences__board-container">
                            <p className="absences__board-day">20/08</p>
                            <p className="absences__board-absence">Justificada</p>
                        </div>
                        <div className="absences__board-container">
                            <p className="absences__board-day">07/10</p>
                            <p className="absences__board-absence">Justificada</p>
                        </div> */}
                    </div>
                </div>
            </section>
        </div>
    );
}