import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext } from 'context/AuthContext';

export const PrivateRoute = ({ children }) => {

    console.log(children)

    const { authState } = useContext( AuthContext );
    const { logged } = authState;

    const { pathname } = useLocation();
    localStorage.setItem('pathname', pathname)
    
    return (logged)
        ? children
        : <Navigate to="/login" />
}
