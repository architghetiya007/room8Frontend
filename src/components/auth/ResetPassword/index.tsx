import React from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import useNotification from "../../../hooks/useNotification";
import useUserMutations from "../../../mutations/user";
import { useNavigate, useParams } from "react-router-dom";
const validationSchema = Yup.object({
  currentPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});
const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const { showSnackBar } = useNotification();
  const navigate = useNavigate();
  const { resetPasswordUserMutation } = useUserMutations();
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      resetPasswordUserMutation.mutate(
        { newPassword: values.newPassword, token: token ?? "" },
        {
          onSuccess: (data) => {
            showSnackBar({ message: data!.message });
            navigate("/");
          },
          onError: (error: Error) => {
            showSnackBar({ message: error.message, variant: "error" });
          },
        }
      );
    },
  });
  return (
    <Box
      component="div"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          width: "400px",
          p: 4,
          backgroundColor: "white",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h5" fontWeight="bold" align="center" mb={2}>
          Reset Password
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Password</Typography>
            <TextField
              variant="outlined"
              placeholder="Enter Your Current Password"
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  borderRadius: "4px",
                },
              }}
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.currentPassword &&
                Boolean(formik.errors.currentPassword)
              }
              helperText={
                formik.touched.currentPassword && formik.errors.currentPassword
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>New Password</Typography>
            <TextField
              variant="outlined"
              placeholder="Enter Your New Password"
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  borderRadius: "4px",
                },
              }}
              id="newPassword"
              name="newPassword"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Confirm Password</Typography>
            <TextField
              variant="outlined"
              placeholder="Confirm Your New Password"
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  borderRadius: "4px",
                },
              }}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              loading={resetPasswordUserMutation.isPending}
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
                fontSize: "16px",
                mt: 2,
              }}
              type="submit"
            >
              Reset Password
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default ResetPassword;
