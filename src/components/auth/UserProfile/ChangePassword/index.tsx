import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUserMutations from "../../../../mutations/user";
import useNotification from "../../../../hooks/useNotification";
import { LoadingButton } from "@mui/lab";
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
const ChangePassword: React.FC = () => {
  const { changePasswordUserMutation } = useUserMutations();
  const { showSnackBar } = useNotification();
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      changePasswordUserMutation.mutate(
        {
          newPassword: values.newPassword,
          currentPassword: values.currentPassword,
        },
        {
          onSuccess: (data) => {
            showSnackBar({ message: data!.message });
            formik.resetForm();
          },
          onError: (error: Error) => {
            showSnackBar({ message: error.message, variant: "error" });
          },
        }
      );
    },
  });
  return (
    <Box component={"form"} onSubmit={formik.handleSubmit}>
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
            helperText={formik.touched.newPassword && formik.errors.newPassword}
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
            loading={changePasswordUserMutation.isPending}
            sx={{
              background:
                "linear-gradient(to right, #4AB1F1, #566CEC, #D749AF, #FF7C51)",
              pl: 2,
              pr: 2,
              borderRadius: "16px",
              color: "white",
              textTransform: "none",
              letterSpacing: "1px",
              fontWeight: "700",
              fontSize: {
                xs: "16px",
                md: "22px"
              },
              height: "60px",
              width: "50%",
              mt: 1,
            }}
            type="button"
            onClick={() => formik.handleSubmit()}
          >
            Change Password
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChangePassword;
