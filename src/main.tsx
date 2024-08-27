import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme/theme.tsx";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
