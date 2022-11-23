import { Routes, Route, BrowserRouter } from "react-router-dom";

import { LoginScreen } from "pages/login/LoginScreen";
import { VerificarScreen } from "pages/login/VerificarScreen";

import { PrivateRoute } from "routers/PrivateRoute";

import { routes } from "./route";
import { NotFoundScreen } from "pages/NotFound/NotFoundScreen";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LoginScreen />} />
        <Route path="/verificar/:id" element={<VerificarScreen />} />

        <Route>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivateRoute>
                  <route.layout>
                    <route.component />
                  </route.layout>
                </PrivateRoute>
              }
            />
          ))}
        </Route>

        <Route path="/*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
};
