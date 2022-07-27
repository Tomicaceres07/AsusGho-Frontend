import { Routes, Route } from 'react-router-dom';

// import { ProfesoresLoginScreen } from 'components/profesores/ProfesoresLoginScreen';
import { ProfesoresDashboardRoutes } from './ProfesoresDashboardRoutes';


export const ProfesoresAppRouter = () => {
  return (
    <Routes>
        {/* <Route path="/login" element={<ProfesoresLoginScreen />} /> */}
        <Route path="/*" element={<ProfesoresDashboardRoutes />} />
    </Routes>
  );
}
