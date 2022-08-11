import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import { RedirectScreen } from 'components/redirects/RedirectScreen';
import { AlumnosAppRouter } from './alumnos/AlumnosAppRouter';
import { ProfesoresAppRouter } from './profesores/ProfesoresAppRouter';
import { LoginScreen } from 'components/login/LoginScreen';
import { AlumnosVerificarScreen } from 'components/alumnos/AlumnosVerificarScreen';

import { PrivateRoute } from 'routers/PrivateRoute';


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/redirect/*" element={<RedirectScreen />} />
        
        <Route exact path="/login" element={<LoginScreen />} />
        <Route path="/verificar/:id" element={<AlumnosVerificarScreen />} />

        {/* <Route exact path="/alumnos/*" element={<AlumnosAppRouter />} /> */}
        <Route 
          path="/alumnos/*"
          element={
            <PrivateRoute>
              <AlumnosAppRouter />
            </PrivateRoute>
          } />

        <Route exact path="/profesores/*" element={<ProfesoresAppRouter />} />
        
        {/* <Route 
          path="/alumnos/*"
          element={
            <PrivateRoute>
              <AlumnosAppRouter />
            </PrivateRoute>
          } />
        
        <Route 
          path="/profesores/*"
          element={
            <PrivateRoute>
              <ProfesoresAppRouter />
            </PrivateRoute>
          } /> */}
        

        <Route path="/*" element={<Navigate to="/login" replace={true} />} />
      </Routes>
    </BrowserRouter>
  );
}