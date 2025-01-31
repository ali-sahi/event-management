import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { customTheme } from "./theme/customTheme.js";
import AxiosInterceptorProvider from "./providers/AxiosInterceptorProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AxiosInterceptorProvider>
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </AxiosInterceptorProvider>
    </AuthProvider>
  </StrictMode>
);
