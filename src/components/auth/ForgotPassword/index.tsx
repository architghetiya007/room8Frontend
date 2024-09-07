import React from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import useNotification from "../../../hooks/useNotification";
import useUserMutations from "../../../mutations/user";
import { apiMessages } from "../../../utils/Comman/apiMessages";
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});
interface ForgotPasswordProps {
  openDialog: boolean;
  handleCloseForgotDialog: Function;
  handleLoginDialog: Function;
}
const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  openDialog,
  handleCloseForgotDialog,
  handleLoginDialog,
}) => {
  const { showSnackBar } = useNotification();
  const { forgotPasswordUserMutation } = useUserMutations();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      forgotPasswordUserMutation.mutate(values, {
        onSuccess: (data) => {
          showSnackBar({ message: data?.message ?? apiMessages.USER.forgotPassword });
          handleCloseForgotDialog();
        },
        onError: (error: Error) => {
          showSnackBar({ message: error.message, variant: "error" });
        },
      });
    },
  });
  return (
    <Dialog
      open={openDialog}
      onClose={() => handleCloseForgotDialog()}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 8, // Adjust border radius here
          px: {
            md: 6,
          }, // Padding inside the dialog
          py: 1,
        },
      }}
    >
      <Box component={"form"} onSubmit={formik.handleSubmit}>
        <DialogTitle align="center">
          <Typography variant="h5" fontWeight={"bold"}>
            Forgot Password
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>Email Address</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                placeholder="Enter Your Email"
                sx={{
                  width: "100%", // Adjust width as needed
                  "& .MuiInputBase-root": {
                    borderRadius: "4px", // Adjust border radius as needed
                  },
                }}
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} mt={2}>
              <LoadingButton
                loading={forgotPasswordUserMutation.isPending}
                sx={{
                  background:
                    "linear-gradient(to right, #4AB1F1, #566CEC, #D749AF, #FF7C51)",
                  width: "100%",
                  p: 1,
                  borderRadius: "8px",
                  color: "white",
                  textTransform: "none",
                  letterSpacing: "1px",
                  fontWeight: "600",
                  fontSize: "24px",
                }}
                type="button"
                onClick={() => formik.handleSubmit()}
              >
                Forgot Password
              </LoadingButton>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{" "}
                  <Button
                    sx={{
                      textTransform: "none",
                      color: "custom.darkRed",
                      fontWeight: "600",
                      p: 0,
                      minWidth: "unset",
                    }}
                    type="button"
                    onClick={() => {
                      handleCloseForgotDialog();
                      handleLoginDialog(true);
                    }}
                  >
                    Login
                  </Button>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default ForgotPassword;
