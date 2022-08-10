import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from 'context/AuthContext';

export const PrivateRoute = ({ children }) => {

    const { authState } = useContext( AuthContext );
    const { logged } = authState;
    
    return (logged)
        ? children
        : <Navigate to="/login" />
}
