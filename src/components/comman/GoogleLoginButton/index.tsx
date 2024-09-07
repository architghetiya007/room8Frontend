import React from "react";
import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import GoogleIcon from "../../icons/GoogleIcon";
interface GoogleLoginButtonProps {
  isLoading: boolean;
  googleLoginClick: Function;
}
const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  isLoading,
  googleLoginClick,
}) => {
  return (
    <LoadingButton
      loading={isLoading}
      variant="contained"
      color="primary"
      type="button"
      onClick={() => googleLoginClick()}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        borderColor: "black",
        backgroundColor: "custom.white", // Google blue
        "&:hover": {
          backgroundColor: "custom.white",
        },
        px: 2,
        py: 1.5,
        width: "100%",
        minHeight: "50px",
      }}
    >
      {!isLoading && (
        <>
          <GoogleIcon /> {/* Google Icon */}
          <Typography variant="button" sx={{ color: "black" }}>
            Continue with Google
          </Typography>
        </>
      )}
    </LoadingButton>
  );
};

export default GoogleLoginButton;
