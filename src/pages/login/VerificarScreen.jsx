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
            // Save user data in context
            if(data) {
                login(data);
                navigate(pathname, {
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
    }, [])
    

    return (
        <div>
        <h1>Cargando...</h1>
        </div>
    );
    }