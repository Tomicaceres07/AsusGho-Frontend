import React from "react";

import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { Navigate } from 'react-router-dom';

import { NavBarProfes } from "components/NavBarProfes/NavBarProfes";
import { Footer } from "components/Footer/Footer";

export const LayoutProfes = ( {children} ) => {

    const body = document.querySelector('body');
    (!body.classList.contains('login__body')) && body.classList.add('login__body')

    const { authState } = useContext( AuthContext );
    const { user } = authState;
    
    return (!user.type)
    ? (
        <>
            <NavBarProfes></NavBarProfes>
                { children }
            <Footer></Footer>
        </>
    )
    : (
        <Navigate to="/notfound" />
    )
}
