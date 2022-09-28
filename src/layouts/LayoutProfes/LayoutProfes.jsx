import React from "react";

import { NavBarProfes } from "components/NavBarProfes/NavBarProfes";
import { Footer } from "components/Footer/Footer";

export const LayoutProfes = ( {children} ) => {

    const body = document.querySelector('body');
    (!body.classList.contains('login__body')) && body.classList.add('login__body')
    
    return(
        <>
            <NavBarProfes></NavBarProfes>
                { children }
            <Footer></Footer>
        </>
    )
}
