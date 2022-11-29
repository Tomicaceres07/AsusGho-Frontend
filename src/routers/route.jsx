//Layouts

import { LayoutBasic } from "layouts/LayoutBasic/LayoutBasic";
import { LayoutProfes } from "layouts/LayoutProfes/LayoutProfes";
import { LayoutNotFound } from "layouts/LayoutNotFound/LayoutNotFound";

//Paginas

import { AlumnosHomeScreen } from "pages/alumnos/Home/AlumnosHomeScreen";
import { AlumnosActividadesScreen } from "pages/alumnos/Actividades/AlumnosActividadesScreen";
import { AlumnosMateriasScreen } from "pages/alumnos/Materias/AlumnosMateriasScreen";
import { AlumnosFaltasScreen } from "pages/alumnos/Faltas/AlumnosFaltasScreen";
import { AlumnosFormulariosScreen } from "pages/alumnos/Formularios/AlumnosFormulariosScreen";
import { AlumnosInscripcionScreen } from "pages/alumnos/Inscripcion/AlumnosInscripcionScreen";

import { ProfesoresHomeScreen } from "pages/profesores/Home/ProfesoresHomeScreen";
import { ProfesoresActividadesScreen } from "pages/profesores/Actividades/ProfesoresActividadesScreen";
import { ProfesoresCursosScreen } from "pages/profesores/Cursos/ProfesoresCursosScreen";
import { ProfesoresFaltasScreen } from "pages/profesores/Faltas/ProfesoresFaltasScreen";
import { ProfesoresFormulariosScreen } from "pages/profesores/Formularios/ProfesoresFormulariosScreen";
import { ProfesoresInscripcionScreen } from "pages/profesores/Inscripcion/ProfesoresInscripcionScreen";

import { NotFoundScreen } from "pages/NotFound/NotFoundScreen";

const alumnoRoutes = [
  {
    layout: LayoutBasic,
    component: AlumnosHomeScreen,
    path: "/alumnos/alumnos",
  },
  {
    layout: LayoutBasic,
    component: AlumnosActividadesScreen,
    path: "/alumnos/actividades",
  },
  {
    layout: LayoutBasic,
    component: AlumnosMateriasScreen,
    path: "/alumnos/materias",
  },
  {
    layout: LayoutBasic,
    component: AlumnosFaltasScreen,
    path: "/alumnos/faltas",
  },
  {
    layout: LayoutBasic,
    component: AlumnosFormulariosScreen,
    path: "/alumnos/formularios",
  },
  {
    layout: LayoutBasic,
    component: AlumnosInscripcionScreen,
    path: "/alumnos/inscripcion",
  },
  {
    layout: LayoutNotFound,
    component: NotFoundScreen,
    path: "/*",
  },
];

const profesorRoutes = [
  {
    layout: LayoutProfes,
    component: ProfesoresHomeScreen,
    path: "/profesores/profesores",
  },
  {
    layout: LayoutProfes,
    component: ProfesoresActividadesScreen,
    path: "/profesores/actividades",
  },
  {
    layout: LayoutProfes,
    component: ProfesoresCursosScreen,
    path: "/profesores/cursos",
  },
  {
    layout: LayoutProfes,
    component: ProfesoresFaltasScreen,
    path: "/profesores/faltas",
  },
  {
    layout: LayoutProfes,
    component: ProfesoresFormulariosScreen,
    path: "/profesores/formularios",
  },
  {
    layout: LayoutProfes,
    component: ProfesoresInscripcionScreen,
    path: "/profesores/inscripcion",
  },
];

export const routes = [...alumnoRoutes, ...profesorRoutes];
