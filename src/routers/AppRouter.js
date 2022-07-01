import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { RedirectScreen } from 'components/redirects/RedirectScreen';
import { AlumnosAppRouter } from './alumnos/AlumnosAppRouter';
import { ProfesoresAppRouter } from './profesores/ProfesoresAppRouter';


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/redirect/*" element={<RedirectScreen />} />
        <Route exact path="/alumnos/*" element={<AlumnosAppRouter />} />
        <Route exact path="/profesores/*" element={<ProfesoresAppRouter />} />
      </Routes>
    </BrowserRouter>
  );
}