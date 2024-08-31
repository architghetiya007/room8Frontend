import { SnackbarProvider } from "notistack";
import React from "react";
interface NotificationProviderProps {
  children: React.ReactNode;
}
const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  return (
    <SnackbarProvider maxSnack={5} autoHideDuration={3000}>
      {children}
    </SnackbarProvider>
  );
};

export default NotificationProvider;
