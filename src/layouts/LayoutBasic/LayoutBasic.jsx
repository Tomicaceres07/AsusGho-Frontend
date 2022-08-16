import React from "react";

import { NavBar } from "components/NavBar/NavBar";
import { Footer } from "components/Footer/Footer";

export const LayoutBasic = ( {children} ) => {


    return(
        <>
            <NavBar></NavBar>
            { children }
            <Footer></Footer>
        </>
    )
}
