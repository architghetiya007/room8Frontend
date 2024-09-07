import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGoogleLogin } from "@react-oauth/google";
import useUserMutations from "../../../mutations/user";
import useNotification from "../../../hooks/useNotification";
import { storeTokenDetails } from "../../../utils/Comman/auth";
import { AuthStorageDTO } from "../../../types/comman/Auth";
import { useAppDispatch } from "../../../store";
import { setUserInfo } from "../../../store/slices/userSlice";
import GoogleLoginButton from "../../comman/GoogleLoginButton";
const validationSchema = Yup.object({
  fullName: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
});
interface RegisterProps {
  openDialog: boolean;
  handleCloseRegisterDialog: Function;
  handleForgotDialog: Function;
  handleLoginDialog: Function;
}
const Register: React.FC<RegisterProps> = ({
  openDialog,
  handleCloseRegisterDialog,
  handleForgotDialog,
  handleLoginDialog,
}) => {
  const dispatch = useAppDispatch();
  const { showSnackBar } = useNotification();
  const { registerUserMutation, googleLoginUserMutation } = useUserMutations();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      keepSignedIn: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      registerUserMutation.mutate(values, {
        onSuccess: (data) => {
          showSnackBar({ message: data!.message });
          let user: AuthStorageDTO = {
            token: data!.data.token,
            refreshToken: data!.data.user.refreshToken,
            user: data!.data.user,
          };
          storeTokenDetails(user);
          dispatch(setUserInfo(user));
          handleCloseRegisterDialog();
        },
        onError: (error: Error) => {
          showSnackBar({ message: error.message, variant: "error" });
        },
      });
    },
  });

  const login = useGoogleLogin({
    prompt: "select_account",
    onSuccess: (codeResponse) => {
      googleLoginUserMutation.mutate(
        { token: codeResponse.access_token },
        {
          onSuccess: (data) => {
            showSnackBar({ message: data!.message });
            let user: AuthStorageDTO = {
              token: data!.data.token,
              refreshToken: data!.data.user.refreshToken,
              user: data!.data.user,
            };
            storeTokenDetails(user);
            dispatch(setUserInfo(user));
            handleCloseRegisterDialog();
          },
          onError: (error: Error) => {
            showSnackBar({ message: error.message, variant: "error" });
          },
        }
      );
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <Dialog
      open={openDialog}
      onClose={() => handleCloseRegisterDialog()}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 8, // Adjust border radius here
          px: {
            md: 6,
          }, // Padding inside the dialog
          py: 1,
          height: "95vh", // Adjust the height here
          maxHeight: "95vh", // Optional: Set a maximum height
          scrollbarWidth: "none",
        },
      }}
    >
      <Box component={"form"} onSubmit={formik.handleSubmit}>
        <DialogTitle align="left">
          <Typography variant="h5" fontWeight={"bold"}>
            Register
          </Typography>
          <Typography variant="subtitle2" fontWeight={"400"}>
            ...and start a new chapter in a place you’ll love!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>Name</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                placeholder="Enter Your Name"
                sx={{
                  width: "100%", // Adjust width as needed
                  "& .MuiInputBase-root": {
                    borderRadius: "4px", // Adjust border radius as needed
                  },
                }}
                id="fullName"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </Grid>
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
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <FormControlLabel
                  control={<Checkbox />}
                  label="Keep me signed in"
                />
                <Button
                  sx={{
                    textTransform: "none",
                    color: "custom.darkRed",
                    fontWeight: "600",
                  }}
                  type="button"
                  onClick={() => {
                    handleCloseRegisterDialog();
                    handleForgotDialog(true);
                  }}
                >
                  Forgot Password?
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                By using this website you are agreeing to our Terms &
                Conditions and Privacy Policy.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                loading={registerUserMutation.isPending}
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
                type="submit"
                onClick={() => formik.handleSubmit()}
              >
                Create Account
              </LoadingButton>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 0,
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
                      handleCloseRegisterDialog();
                      handleLoginDialog(true);
                    }}
                    color="primary"
                  >
                    Login
                  </Button>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <GoogleLoginButton
                isLoading={googleLoginUserMutation.isPending}
                googleLoginClick={() => login()}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  );
};
export default Register;
