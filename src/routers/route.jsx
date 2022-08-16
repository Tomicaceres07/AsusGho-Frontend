//Layouts

import { LayoutBasic } from "layouts/LayoutBasic/LayoutBasic";




//Paginas

import { AlumnosHomeScreen } from 'pages/alumnos/Home/AlumnosHomeScreen';
import { AlumnosPreviasScreen } from 'pages/alumnos/Previas/AlumnosPreviasScreen';
import { AlumnosActividadesScreen } from 'pages/alumnos/Actividades/AlumnosActividadesScreen';
import { AlumnosExamenesScreen } from 'pages/alumnos/Examenes/AlumnosExamenesScreen';
import { AlumnosFaltasScreen } from "pages/alumnos/Faltas/AlumnosFaltasScreen";
import { AlumnosFormulariosScreen } from "pages/alumnos/Formularios/AlumnosFormulariosScreen";
import { AlumnosPerfilScreen } from "pages/alumnos/Perfil/AlumnosPerfilScreen";


const alumnoRoutes = [
    {
        layout: LayoutBasic,
        component: AlumnosHomeScreen,
        path: "/alumnos/alumnos"
    },
    {
        layout: LayoutBasic,
        component: AlumnosPreviasScreen,
        path: "/alumnos/previas"
    },
    {
        layout: LayoutBasic,
        component: AlumnosActividadesScreen,
        path: "/alumnos/actividades"
    },
    {
        layout: LayoutBasic,
        component: AlumnosExamenesScreen,
        path: "/alumnos/examenes"
    },
    {
        layout: LayoutBasic,
        component: AlumnosFaltasScreen,
        path: "/alumnos/faltas"
    },
    {
        layout: LayoutBasic,
        component: AlumnosFormulariosScreen,
        path: "/alumnos/formularios"
    },
    {
        layout: LayoutBasic,
        component: AlumnosPerfilScreen,
        path: "/alumnos/perfil"
    },

];

const profesorRoutes = [
    /* {
        layout: LayoutBasic,
        component: AlumnosHomeScreen,
        path: "/alumnos"
    }, */


];


export const routes = [...alumnoRoutes, ...profesorRoutes];

