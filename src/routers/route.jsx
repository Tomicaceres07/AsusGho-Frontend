//Layouts

import { LayoutBasic } from "layouts/LayoutBasic/LayoutBasic";
import { LayoutProfes } from "layouts/LayoutProfes/LayoutProfes";
import { LayoutNotFound } from "layouts/LayoutNotFound/LayoutNotFound";




//Paginas

import { AlumnosHomeScreen } from 'pages/alumnos/Home/AlumnosHomeScreen';
// import { AlumnosPreviasScreen } from 'pages/alumnos/Previas/AlumnosPreviasScreen';
import { AlumnosActividadesScreen } from 'pages/alumnos/Actividades/AlumnosActividadesScreen';
import { AlumnosMateriasScreen } from 'pages/alumnos/Materias/AlumnosMateriasScreen';
import { AlumnosFaltasScreen } from "pages/alumnos/Faltas/AlumnosFaltasScreen";
import { AlumnosFormulariosScreen } from "pages/alumnos/Formularios/AlumnosFormulariosScreen";
import { AlumnosPerfilScreen } from "pages/alumnos/Perfil/AlumnosPerfilScreen";

import { ProfesoresHomeScreen } from "pages/profesores/Home/ProfesoresHomeScreen";
import { ProfesoresActividadesScreen } from "pages/profesores/Actividades/ProfesoresActividadesScreen";
import { ProfesoresCursosScreen } from "pages/profesores/Cursos/ProfesoresCursosScreen";
import { ProfesoresFaltasScreen } from "pages/profesores/Faltas/ProfesoresFaltasScreen";
import { ProfesoresFormulariosScreen } from "pages/profesores/Formularios/ProfesoresFormulariosScreen";
import { ProfesoresPerfilScreen } from "pages/profesores/Perfil/ProfesoresPerfilScreen";


import { NotFoundScreen } from "pages/NotFound/NotFoundScreen";

const alumnoRoutes = [
    {
        layout: LayoutBasic,
        component: AlumnosHomeScreen,
        path: "/alumnos/alumnos"
    },
    /* {
        layout: LayoutBasic,
        component: AlumnosPreviasScreen,
        path: "/alumnos/previas"
    }, */
    {
        layout: LayoutBasic,
        component: AlumnosActividadesScreen,
        path: "/alumnos/actividades"
    },
    {
        layout: LayoutBasic,
        component: AlumnosMateriasScreen,
        path: "/alumnos/materias"
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
    {
        layout: LayoutNotFound,
        component: NotFoundScreen,
        path: "/*"
    },

];

const profesorRoutes = [
    {
        layout: LayoutProfes,
        component: ProfesoresHomeScreen,
        path: "/profesores/profesores"
    },
    {
        layout: LayoutProfes,
        component: ProfesoresActividadesScreen,
        path: "/profesores/actividades"
    },
    {
        layout: LayoutProfes,
        component: ProfesoresCursosScreen,
        path: "/profesores/cursos"
    },
    {
        layout: LayoutProfes,
        component: ProfesoresFaltasScreen,
        path: "/profesores/faltas"
    },
    {
        layout: LayoutProfes,
        component: ProfesoresFormulariosScreen,
        path: "/profesores/formularios"
    },
    {
        layout: LayoutProfes,
        component: ProfesoresPerfilScreen,
        path: "/profesores/perfil"
    },
];


export const routes = [...alumnoRoutes, ...profesorRoutes];

