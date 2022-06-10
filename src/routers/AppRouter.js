import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { AlumnosHomeScreen } from '../components/alumnos/AlumnosHomeScreen';
import { AlumnosAppRouter } from './alumnos/AlumnosAppRouter';
import { ProfesoresAppRouter } from './profesores/ProfesoresAppRouter';


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AlumnosHomeScreen />} />
        <Route exact path="/alumnos/*" element={<AlumnosAppRouter />} />
        <Route exact path="/profesores/*" element={<ProfesoresAppRouter />} />
      </Routes>
    </BrowserRouter>
  );
}