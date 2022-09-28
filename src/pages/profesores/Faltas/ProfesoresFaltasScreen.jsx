import Table from 'react-bootstrap/Table';
import { AuthContext } from 'context';
import React, { useContext, useEffect, useState } from 'react';
const axios = require('axios').default;


export const ProfesoresFaltasScreen = () => {

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
    }, [user.email])

    
    return (
        <div>
            <section id="teacher__absences__home">
                <h1 id="teacher__absences__title">Inasistencias</h1>
                <h2 id="teacher__absences__subtitle">{user && user.name}</h2>
            </section>
            <section id="teacher__absences__board">
                <h2 id="teacher__absences__board-title">Faltas: {abscenses && abscenses.length}</h2>
                <div id="teacher__absences__board-container-table">
                    <Table responsive striped id="teacher__absences__board-table">
                        <thead>
                            <tr>
                                <th className='teacher__absences__board-th'>#</th>
                                <th className='teacher__absences__board-th'>Fecha</th>
                                <th className='teacher__absences__board-th'>Cantidad</th>
                                <th className='teacher__absences__board-th'>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                abscenses && abscenses.map( (item, index) => (
                                    <tr key={ item.id }>
                                        <td>{ index + 1 }</td>
                                        <td>{ item.date }</td>
                                        <td>{ item.c_abscence }</td>
                                        <td  className={(item.justified === 0) && 'teacher__absences__board-unjustified'}>{ (item.justified === 0) ? "Injustificada" : "Justificada"  }</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
                {/* <div id="absences__board-week">
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
                    </div>
                </div> */}
            </section>
        </div>
    );
}