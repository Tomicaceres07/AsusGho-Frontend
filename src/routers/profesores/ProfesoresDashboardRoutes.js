import { Routes, Route } from 'react-router-dom';

import { ProfesoresHomeScreen } from '../../components/profesores/ProfesoresHomeScreen';
import { ProfesoresNavBar } from '../../components/profesores/ProfesoresNavBar';


export const ProfesoresDashboardRoutes = () => {
  return (
      <>
        <ProfesoresNavBar />
        <Routes>
            {/* <Route path="/asistencia" element={<ProfesoresHomeScreen />} /> */}
            <Route path="/" element={<ProfesoresHomeScreen />} />
            {/* <Route path="/*" element={<ProfesoresDashboardRoutes />} /> */}
        </Routes>
      </>
  );
}
