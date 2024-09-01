import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import GoogleIcon from "@mui/icons-material/Google"; // You can use any icon for Google
import FacebookIcon from "@mui/icons-material/Facebook"; // Import Facebook icon
const DividerWithText = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  margin: theme.spacing(1, 0),
  "& .divider": {
    flexGrow: 1,
  },
  "& .text": {
    margin: theme.spacing(0, 2),
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
  },
}));

const CenteredDivider: React.FC<{ text: string }> = ({ text }) => {
  return (
    <DividerWithText>
      <Divider className="divider" />
      <Typography variant="caption" className="text">
        {text}
      </Typography>
      <Divider className="divider" />
    </DividerWithText>
  );
};
interface LoginProps {
  openDialog: boolean;
  handleCloseLoginDialog: Function
}
const Login: React.FC<LoginProps> = ({ openDialog, handleCloseLoginDialog }) => {
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
              sx={{
                background:
                  "linear-gradient(to right, #FFEBE8, #EDD6F5, #EDF6FD)",
                width: "100%",
                p: 2,
                borderRadius: "8px",
              }}
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
              // onClick={handleClick}
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
          <Grid item xs={12}>
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
                Don't have an account?{" "}
                <Link href="/signup" underline="hover" color="primary">
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
