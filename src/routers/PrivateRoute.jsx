import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext } from 'context/AuthContext';
import { routes } from './route';

export const PrivateRoute = ({ children }) => {

    console.log(routes)

    const { authState } = useContext( AuthContext );
    console.log(authState)
    const { logged } = authState;

    const { pathname } = useLocation();
    localStorage.setItem('pathname', pathname)
    
    
    return (logged)
        ? children
        : <Navigate to="/login" />
}
