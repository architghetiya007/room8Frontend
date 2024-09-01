import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
interface RegisterProps {
  openDialog: boolean;
}
const Register: React.FC<RegisterProps> = ({ openDialog }) => {
  return (
    <Dialog open={openDialog}>
      <DialogTitle></DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};
export default Register;
