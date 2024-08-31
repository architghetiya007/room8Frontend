import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme/theme.tsx";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotificationProvider from "./components/comman/NotificationProvider/index.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NotificationProvider>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </NotificationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
