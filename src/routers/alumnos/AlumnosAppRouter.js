import { Routes, Route } from 'react-router-dom';

// import { AlumnosLoginScreen } from 'components/alumnos/AlumnosLoginScreen';
import { AlumnosRegisterScreen } from 'components/alumnos/AlumnosRegisterScreen';
import { AlumnosDashboardRoutes } from './AlumnosDashboardRoutes';


export const AlumnosAppRouter = () => {
  return (
    <Routes>
      {/* <Route path="/login" element={<AlumnosLoginScreen />} /> */}
      <Route path="/register" element={<AlumnosRegisterScreen />} />
      <Route path="/*" element={<AlumnosDashboardRoutes />} />
    </Routes>
  );
}
