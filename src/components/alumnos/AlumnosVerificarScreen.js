import { AuthContext } from 'context';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const axios = require('axios').default;



export const AlumnosVerificarScreen = () => {
  
//   const [ user, setUser ] = useState();
  const { login } = useContext( AuthContext );
  const navigate = useNavigate();

  // Get id from url
  const { id } = useParams();

  
  useEffect(() => {
    axios.post('/api/getuser', {'id': id})
      .then(({data}) => {
        // Save user data in context
        if(data) {
            login(data);
            navigate('/alumnos/alumnos', {
                replace: true
            });  
        } 

        // login(data.user[0], data.user[1], data.user[2], data.user[3], data.user[4]);
        // setUser(data);
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
     {/* <p>{user}</p> */}
    </div>
  );
}