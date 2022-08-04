import { AuthContext } from 'context';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
const axios = require('axios').default;

export const AlumnosPerfilScreen = () => {

    const { register, handleSubmit } = useForm();

    const { authState, login } = useContext( AuthContext );
    const { user } = authState;

    const [newUser, setNewUser] = useState();
    const [success, setSuccess] = useState(false);

    const handleChange = event => {
        setNewUser({
            ...user,
            year: event.target.value
        });
    };  

    const onSubmit = (data) => {

        login({
            ...user,
            year: data.year
        });
        
        
        axios.post('/api/user/set_year', newUser)
        .then(() => {
            setSuccess(true);
        })
        .catch((err) => {
            setSuccess(false);
            console.log(err);
        })
    }
    
    return (
        <div className="perfil__container">
            <h2>Hola, {user && user.name}</h2>
            <form id="perfil__form" onSubmit={handleSubmit(onSubmit)}>
                <h1 id="perfil__title">Seleccione su año</h1>
                { (success) && <p className='text-white mb-1'>Año actualizado correctamente</p> }
                <select name="year" {...register('year')} onChange={handleChange} id="perfil__dropdown" className="w-100 mb-2 input">
                    <option value="0">-- Seleccione su año --</option>
                    <option value="1">1er año</option>
                    <option value="2">2do año</option>
                    <option value="3">3er año</option>
                    <option value="4">4to año</option>
                    <option value="5">5to año</option>
                    <option value="6">6to año</option>
                </select>

                <button type="submit" id="register__submit" className="display-block w-100">Enviar</button>
            </form>
        </div>
    )
}
