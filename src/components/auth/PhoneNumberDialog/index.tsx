import React from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
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
const validationSchema = Yup.object({
  phoneNumber: Yup.string().required("PhoneNumber is required"),
});
interface PhoneNumberProps {
  openDialog: boolean;
  handleClosePhoneNumberDialog: Function;
}
const PhoneNumberDialog: React.FC<PhoneNumberProps> = ({
  openDialog,
  handleClosePhoneNumberDialog,
}) => {
  const { showSnackBar } = useNotification();
  const { loginUserMutation } = useUserMutations();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      keepSignedIn: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      loginUserMutation.mutate(values, {
        onSuccess: (data) => {
          showSnackBar({ message: data!.message });
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
      onClose={() => handleClosePhoneNumberDialog()}
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
            Login
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
            <Grid item xs={12}>
              <Typography>Password</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                placeholder="Enter Your Password"
                sx={{
                  width: "100%", // Adjust width as needed
                  "& .MuiInputBase-root": {
                    borderRadius: "4px", // Adjust border radius as needed
                  },
                }}
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                loading={loginUserMutation.isPending}
                sx={{
                  background:
                    "linear-gradient(to right, #6CC0F4, #8160D7, #F6A2A9)",
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
                Login
              </LoadingButton>
            </Grid>
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default PhoneNumberDialog;
