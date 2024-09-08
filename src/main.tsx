import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme/theme.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./i18n.ts"; // Import the i18n configuration
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="495214669306-sjmhj0vt82ommhj28ms02hmfpn1qcjt2.apps.googleusercontent.com">
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </StrictMode>
  </GoogleOAuthProvider>
);
