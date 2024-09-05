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
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import GoogleIcon from "@mui/icons-material/Google"; // You can use any icon for Google
import CenteredDivider from "../../comman/CenteredDivider";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGoogleLogin } from "@react-oauth/google";
import useUserMutations from "../../../mutations/user";
import useNotification from "../../../hooks/useNotification";
const validationSchema = Yup.object({
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
interface LoginProps {
  openDialog: boolean;
  handleCloseLoginDialog: Function;
}
const Login: React.FC<LoginProps> = ({
  openDialog,
  handleCloseLoginDialog,
}) => {
  const { showSnackBar } = useNotification();
  const { loginUserMutation, googleLoginUserMutation } = useUserMutations();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      keepSignedIn: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form Data", values);
      loginUserMutation.mutate(values, {
        onSuccess: (data) => {
          console.log("User created successfully:", data);
          showSnackBar({ message: data.message });
          // Handle success (e.g., show a success message or redirect)
        },
        onError: (error: Error) => {
          console.log(error.message);
          showSnackBar({ message: error.message, variant: "error" });
        },
      });
      // Handle form submission here
    },
  });

  const login = useGoogleLogin({
    prompt: "select_account",
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      googleLoginUserMutation.mutate(
        { token: codeResponse.access_token },
        {
          onSuccess: (data) => {
            console.log("Google Login:", data);
            // Handle success (e.g., show a success message or redirect)
          },
          onError: (error: Error) => {
            console.log(error.message);
            // Handle error (e.g., show an error message)
          },
        }
      );
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <Dialog
      open={openDialog}
      onClose={() => handleCloseLoginDialog()}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 8, // Adjust border radius here
          px: 6, // Padding inside the dialog
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
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <FormControlLabel
                  control={<Checkbox />}
                  label="Keep me signed in"
                />
                <Typography>Forgot Password?</Typography>
              </Stack>
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
            <Grid item xs={12}>
              <CenteredDivider text="or use one of this options" />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => login()}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  borderColor: "black",
                  backgroundColor: "#fff", // Google blue
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                  px: 2,
                  py: 1.5,
                  width: "100%",
                }}
              >
                <GoogleIcon sx={{ mr: 1 }} /> {/* Google Icon */}
                <Typography variant="button" sx={{ color: "black" }}>
                  Continue with Google
                </Typography>
              </Button>
            </Grid>
            {/* <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                backgroundColor: "#1877F2", // Facebook blue
                "&:hover": {
                  backgroundColor: "#166FE5",
                },
                px: 2,
                py: 1.5,
                width: "100%",
              }}
            >
              <FacebookIcon sx={{ mr: 1, color: "white" }} />{" "}
              <Typography variant="button" sx={{ color: "white" }}>
                Continue with Facebook
              </Typography>
            </Button>
          </Grid> */}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{" "}
                  <Link href="/signup" underline="hover" color="primary">
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default Login;
