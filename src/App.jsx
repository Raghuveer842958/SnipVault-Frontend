import { BrowserRouter } from "react-router-dom";

import { Toaster } from "sonner";

import AppRoutes from "./routes/AppRoutes";

import AuthInitializer from "./components/AuthInitializer";

function App() {
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