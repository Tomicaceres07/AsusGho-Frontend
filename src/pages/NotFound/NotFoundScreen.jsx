import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { AuthContext } from 'context';



export const NotFoundScreen = () => {
    
    const navigate = useNavigate();

    const { authState } = useContext( AuthContext );
    const { user, logged } = authState;
    console.log(user, logged);

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
        <div>
            <h1>Error 404</h1>
            <Button onClick={ handleClick } className="">Volver</Button>
        </div>
    );
    }