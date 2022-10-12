import Spinner from 'react-bootstrap/Spinner';
import { AuthContext } from 'context';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const axios = require('axios').default;



export const VerificarScreen = () => {
    
    //   const [ user, setUser ] = useState();
    const { login } = useContext( AuthContext );
    const navigate = useNavigate();

    // Get id from url
    const { id } = useParams();

    const pathname = localStorage.getItem('pathname') || '/alumnos/alumnos';
    
    useEffect(() => {
        axios.post('/api/getuser', {'id': id})
        .then(({data}) => {
            console.log(data);
            console.log(data.type)
            // Save user data in context
            if(data && data.msj !== 'invalid id') {
                login(data);
                if (data.type) {
                    navigate('/alumnos/alumnos', {
                        replace: true
                    });  
                } else {
                    navigate('/profesores/profesores', {
                        replace: true
                    });
                }
            } else {
                navigate('/login', {
                    replace: true
                });
            }

        })
        .catch((err) => {
            console.log(err);
            navigate('/login', {
            replace: true
            });
        })
    }, [id, login, navigate, pathname])
    

    return (
        <div className='verificate__spinner-div'>
            <Spinner animation="border" variant="light" className='verificate__spinner'/>
        </div>
    );
    }