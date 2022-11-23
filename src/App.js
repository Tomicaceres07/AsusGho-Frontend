import React from "react";

import { AuthProvider } from "context";
import { AppRouter } from "./routers/AppRouter";

export const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
