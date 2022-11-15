import Table from 'react-bootstrap/Table';
import { AuthContext } from 'context';
import React, { useContext, useEffect, useState } from 'react';
const axios = require('axios').default;


export const AlumnosFaltasScreen = () => {

    const { authState } = useContext( AuthContext );
    const { user } = authState;
    

    const [abscenses, setAbscenses] = useState();
    const [totalAbscenses, setTotalAbscenses] = useState();

    useEffect(() => {
        axios.post('/api/get_abs', {'email': user.email})
        .then(({data}) => {
            setAbscenses(data.db);
            setTotalAbscenses(data.abs);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [user.email])

    
    return (
        <div>
            <section id="student__absences__home">
                <h1 id="student__absences__title">Inasistencias</h1>
                <h2 id="student__absences__subtitle">{user && user.name}</h2>
            </section>
            <section id="student__absences__board">
                <h2 id="student__absences__board-title">Faltas: {totalAbscenses && totalAbscenses}</h2>
                <div id="student__absences__board-container-table">
                    <Table responsive striped id="student__absences__board-table">
                        <thead>
                            <tr>
                                <th className='student__absences__board-th'>#</th>
                                <th className='student__absences__board-th'>Fecha</th>
                                <th className='student__absences__board-th'>Cantidad</th>
                                <th className='student__absences__board-th'>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                abscenses && abscenses.map( (item, index) => (
                                    <tr key={ item.id }>
                                        <td>{ index + 1 }</td>
                                        <td>{ item.date }</td>
                                        <td>{ item.c_abscence }</td>
                                        <td className={(item.justified === 0) ? "student__absences__board-unjustified" : ""}>{ (item.justified === 0) ? "Injustificada" : "Justificada" }</td>
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