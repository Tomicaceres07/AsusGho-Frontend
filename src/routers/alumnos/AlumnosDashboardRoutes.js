import { Routes, Route } from 'react-router-dom';

import { AlumnosNavBar } from 'components/alumnos/AlumnosNavBar';
import { AlumnosHomeScreen } from 'components/alumnos/AlumnosHomeScreen';
import { AlumnosPreviasScreen } from 'components/alumnos/AlumnosPreviasScreen';
import { AlumnosFooter } from 'components/alumnos/AlumnosFooter';

export const AlumnosDashboardRoutes = () => {
  return (
    <>
      <AlumnosNavBar />
      <Routes>
        {/* <Route path="/asistencia" element={<AlumnosHomeScreen />} /> */}
        <Route path="/alumnos" element={<AlumnosHomeScreen />} />
        <Route path="/previas" element={<AlumnosPreviasScreen />} />
        {/* <Route path="/login" element={<AlumnosHomeScreen />} /> */}
        {/* <Route path="/*" element={<AlumnosDashboardRoutes />} /> */}

      </Routes>
      <AlumnosFooter />
    </>
  );
}
