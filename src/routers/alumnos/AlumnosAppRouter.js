import { Routes, Route } from 'react-router-dom';

import { AlumnosLoginScreen } from '../../components/alumnos/AlumnosLoginScreen';
import { AlumnosDashboardRoutes } from './AlumnosDashboardRoutes';


export const AlumnosAppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<AlumnosLoginScreen />} />
      <Route path="/*" element={<AlumnosDashboardRoutes />} />
    </Routes>
  );
}
