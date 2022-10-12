import Spinner from 'react-bootstrap/Spinner';
import moment from 'moment';
import { AuthContext } from "context";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const axios = require('axios').default;


export const ProfesoresActividadesScreen = () => {

    const { authState } = useContext( AuthContext );
    const { user } = authState;

    const { register, handleSubmit } = useForm();
    const [activities, setActivities] = useState();
    const [isLoading, setIsLoading] = useState(true);
    // console.log(moment().format('DD/MM/YYYY'))

    useEffect(() => {
        setIsLoading(true); 
        axios.post('/api/message/read', {'type': user.type})
        .then(({data}) => {
            setActivities(data.element);
            console.log(data.element);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [user.type])


    const onAdd = (data) => {
        console.log(data);
        const date = moment(data.date).format('DD/MM/YYYY')
        axios.post('/api/message/write', {
            'date': date,
            'text': data.text,
            'type': user.type
        })
        .then(({data}) => {
            console.log(data.msj.msj);
            if (data.msj.msj === 'DB correctly') {
                window.location.reload();
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const onDelete = (p_id) => {
        const id = p_id.toString()

        axios.post('/api/message/delete', {'id': id})
        .then(({data}) => {
            if (data.element.msj === 'DB correctly') {
                window.location.reload();
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <section id="teacher__activities__home">
                <h1 id="teacher__activities__title"><span id="teacher__activities__title-p1">Actividades</span><span id="teacher__activities__title-p2">Extracurriculares</span></h1>
            </section>
            <section id="teacher__activities__activities">
                <h2 id="teacher__activities__activities-title"><span id="teacher__activities__activities-title-p1">Calendario</span><span id="teacher__activities__activities-title-p2">De</span><span id="teacher__activities__activities-title-p3">Actividades</span></h2>
                <div id="teacher__activities__activities-container">
                    <ul className="teacher__activities__activities-ul">
                        {
                            !isLoading 
                            ?   (
                                activities && activities.length !== 0
                                ?   (
                                    activities.map( (item, index) => (
                                        <div key={ index } className="d-flex justify-content-between w-50 mx-auto">
                                            <li className="teacher__activities__activities-name-activity">
                                                { item.date } - { item.text }
                                            </li>
                                            <button onClick={() => onDelete(item.id)} className="btn btn-danger h-25 align-self-center">Borrar</button>
                                        </div>
                                    ))
                                    )
                                :   (
                                        <li className="teacher__activities__activities-name-activity">No hay actividades</li>
                                    )
                            )
                            :   (
                                <Spinner animation="border" variant="light" />
                            )
                        }
                    </ul>
                    <hr />
                    <form action="#" className="teacher__activities__form" onSubmit={handleSubmit(onAdd)}>
                        <label htmlFor="input-date">Fecha: </label>
                        <input type="date" {...register('date')} id="input-date" className="mb-3" required/>

                        <label htmlFor="input-text">Actividad: </label>
                        <input type="text" {...register('text')} id="input-text" className="mb-3" required/>

                        <button className="btn btn-success" type="submit">Agregar</button>
                    </form>
                </div>
            </section>
        </div>
    );
}