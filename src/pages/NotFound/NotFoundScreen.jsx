import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { AuthContext } from 'context';



export const NotFoundScreen = () => {
    
    const navigate = useNavigate();

    const { authState } = useContext( AuthContext );
    const { user, logged } = authState;

    const handleClick = () => {
        if (logged && user.type) {
            navigate('/alumnos/alumnos', {
                replace: true
            });
        } else if (logged && !user.type) {
            navigate('/profesores/profesores', {
                replace: true
            });
        }

    } 

    return (
        <div className='notfound__first-div'>
            <div className='notfound__div-message'>
                <h1>Página no encontrada</h1>
                <Button onClick={ handleClick } className="">Volver</Button>
            </div>
        </div>
    );
    }