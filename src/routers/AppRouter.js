import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { RedirectScreen } from 'components/redirects/RedirectScreen';
import { AlumnosAppRouter } from './alumnos/AlumnosAppRouter';
import { ProfesoresAppRouter } from './profesores/ProfesoresAppRouter';
import { LoginScreen } from 'components/login/LoginScreen';


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/redirect/*" element={<RedirectScreen />} />
        <Route exact path="/login" element={<LoginScreen />} />
        <Route exact path="/alumnos/*" element={<AlumnosAppRouter />} />
        <Route exact path="/profesores/*" element={<ProfesoresAppRouter />} />

        {/* <Route path="/*" element={<LoginScreen />} /> */}
      </Routes>
    </BrowserRouter>
  );
}