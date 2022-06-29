import { Routes, Route } from 'react-router-dom';

import { AlumnosNavBar } from 'components/alumnos/AlumnosNavBar';
import { AlumnosHomeScreen } from 'components/alumnos/AlumnosHomeScreen';
import { AlumnosPreviasScreen } from 'components/alumnos/AlumnosPreviasScreen';
import { AlumnosActividadesScreen } from 'components/alumnos/AlumnosActividadesScreen';
import { AlumnosExamenesScreen } from 'components/alumnos/AlumnosExamenesScreen';
import { AlumnosFooter } from 'components/alumnos/AlumnosFooter';

export const AlumnosDashboardRoutes = () => {
  return (
    <>
      <AlumnosNavBar />
      <Routes>
        {/* <Route path="/asistencia" element={<AlumnosHomeScreen />} /> */}
        <Route path="/alumnos" element={<AlumnosHomeScreen />} />
        <Route path="/previas" element={<AlumnosPreviasScreen />} />
        <Route path="/actividades" element={<AlumnosActividadesScreen />} />
        <Route path="/examenes" element={<AlumnosExamenesScreen />} />
        {/* <Route path="/login" element={<AlumnosHomeScreen />} /> */}
        {/* <Route path="/*" element={<AlumnosDashboardRoutes />} /> */}

      </Routes>
      <AlumnosFooter />
    </>
  );
}
