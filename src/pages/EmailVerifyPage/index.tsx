import { Stack, Box, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Link, useParams } from "react-router-dom";
import useUserMutations from "../../mutations/user";
import { useEffect } from "react";
import useNotification from "../../hooks/useNotification";

const EmailVerifyPage: React.FC = () => {
  const { id } = useParams(); // Access the 'id' from the URL
  const { emailVerifyMutation } = useUserMutations();
  const { showSnackBar } = useNotification();
  const emailVerifyAPI = () => {
    emailVerifyMutation.mutate(
      { token: id ?? "" },
      {
        onSuccess: (data) => {
          showSnackBar({ message: data!.message });
        },
        onError: (error: Error) => {
          showSnackBar({ message: error.message, variant: "error" });
        },
      }
    );
  };
  useEffect(() => {
    emailVerifyAPI();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #6CC0F4, #8160D7, #F6A2A9)",
        color: "white",
        textAlign: "center",
      }}
    >
      <Stack spacing={2} sx={{ mb: 5, textAlign: "center", width: "100%" }}>
        <Stack
          sx={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          direction="column"
          spacing={0.5}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderRadius={3}
            boxShadow={7}
            sx={{
              p: {
                xs: 2,
                md: 6,
              },
            }}
          >
            <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 60 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              Email Successfully Verified
            </Typography>
            <Typography variant="body1" paragraph>
              Your email has been successfully verified. You can now access all
              the features.
            </Typography>
            <Link to={"/"} replace style={{ color: "white", fontSize: "20px" }}>
              Go to Login
            </Link>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EmailVerifyPage;
