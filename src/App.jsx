import { BrowserRouter } from "react-router-dom";

import { Toaster } from "sonner";

import AppRoutes from "./routes/AppRoutes";

import AuthInitializer from "./components/AuthInitializer";

import { useEffect } from "react";

import {
  initializeTheme,
} from "./utils/theme";

function App() {

  useEffect(() => {
    initializeTheme();
  }, []);
  return (
    <BrowserRouter>

      <Toaster position="top-right" />

      <AuthInitializer>
        <AppRoutes />
      </AuthInitializer>

    </BrowserRouter>
  );
}

export default App;