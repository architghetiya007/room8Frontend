import { BrowserRouter } from "react-router-dom";
import NotificationProvider from "./components/comman/NotificationProvider";
import Routes from "./routes";
import React from "react";

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </NotificationProvider>
  );
};

export default App;
