import { Routes, Route } from 'react-router-dom';

import { AlumnosHomeScreen } from 'components/alumnos/AlumnosHomeScreen';
import { AlumnosNavBar } from 'components/alumnos/AlumnosNavBar';
import { AlumnosFooter } from 'components/alumnos/AlumnosFooter';

export const AlumnosDashboardRoutes = () => {
  return (
    <>
      <AlumnosNavBar />
      <Routes>
        {/* <Route path="/asistencia" element={<AlumnosHomeScreen />} /> */}
        <Route path="/alumnos" element={<AlumnosHomeScreen />} />
        {/* <Route path="/login" element={<AlumnosHomeScreen />} /> */}
        {/* <Route path="/*" element={<AlumnosDashboardRoutes />} /> */}

      </Routes>
      <AlumnosFooter />
    </>
  );
}
