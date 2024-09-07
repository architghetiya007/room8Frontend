import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout"; // Import the Logout icon
import { useAppDispatch } from "../../../store";
import { clearUserInfo } from "../../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logoutButton = () => {
    dispatch(clearUserInfo());
    navigate("/");
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      minHeight="100vh"
    >
      <Card
        sx={{
          width: "100%", // Full width for smaller screens
          maxWidth: "600px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
        }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight="bold" align="center" mb={2}>
            Account Management
          </Typography>

          {/* Accordion: Your Listings */}
          <Accordion elevation={0} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Your Listings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {/* Add content for Your Listings here */}
                Manage your active listings, view past listings, or add new
                listings.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Accordion: Account Settings */}
          <Accordion elevation={0} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Account Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {/* Add content for Account Settings here */}
                Update your personal information, email, and notification
                preferences.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Accordion: Change Password */}
          <Accordion elevation={0} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Change Password</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {/* Add content for Change Password here */}
                Change your account password to keep your account secure.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Accordion: Manage Account */}
          <Accordion elevation={0} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Manage Account</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {/* Add content for Manage Account here */}
                Deactivate or delete your account, or transfer your data.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Box display="flex" justifyContent="center" mt={2} mb={2}>
            <Button
              type="button"
              variant="contained"
              startIcon={<LogoutIcon />}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: "600",
                fontSize: "16px",
                width: "50%",
                backgroundColor: "custom.blackDark",
                color: "custom.white",
              }}
              onClick={() => {
                logoutButton();
              }}
            >
              Logout
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;
