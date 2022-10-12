import React from "react";
import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { Navigate } from 'react-router-dom';

import { NavBar } from "components/NavBar/NavBar";
import { Footer } from "components/Footer/Footer";

export const LayoutBasic = ( {children} ) => {

    const body = document.querySelector('body');
    (body.classList.contains('login__body')) && body.classList.remove('login__body')

    const { authState } = useContext( AuthContext );
    const { user } = authState;


    return (user.type)
    ? (
        <>
            <NavBar></NavBar>
            { children }
            <Footer></Footer>
        </>
    )
    : (
        <Navigate to="/notfound" />
    )
}
