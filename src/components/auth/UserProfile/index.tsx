import React, { useState } from "react";
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
import useNotification from "../../../hooks/useNotification";
import { apiMessages } from "../../../utils/Comman/apiMessages";
import DeleteAccount from "./DeleteAccount";
import ChangePassword from "./ChangePassword";
import ConfirmationDialog from "../../comman/ConfirmationDialog";
import useUserMutations from "../../../mutations/user";
import PersonalInfo from "./PersonalInfo";
import ProfileListing from "./ProfileListing";
const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showSnackBar } = useNotification();
  const { logoutUserMutation } = useUserMutations();
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const logoutButton = () => {
    logoutUserMutation.mutate(undefined, {
      onSuccess: (data) => {
        showSnackBar({ message: data!.message ?? apiMessages.USER.logout });
        dispatch(clearUserInfo());
        navigate("/");
      },
      onError: (error: Error) => {
        showSnackBar({ message: error.message, variant: "error" });
      },
    });
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
              <Typography variant="h6" fontWeight={"bold"}>
                Your Listings
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ProfileListing />
            </AccordionDetails>
          </Accordion>

          {/* Accordion: Account Settings */}
          <Accordion elevation={0} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={"bold"}>
                Account Settings
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <PersonalInfo />
            </AccordionDetails>
          </Accordion>

          {/* Accordion: Change Password */}
          <Accordion elevation={0} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={"bold"}>
                Change Password
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ChangePassword />
            </AccordionDetails>
          </Accordion>

          {/* Accordion: Manage Account */}
          <Accordion elevation={0} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={"bold"}>
                Manage Account
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DeleteAccount />
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
                handleOpenDialog();
              }}
            >
              Logout
            </Button>
          </Box>
        </CardContent>
      </Card>
      {isDialogOpen && (
        <ConfirmationDialog
          open={isDialogOpen}
          title="Logout"
          message="Are you sure you want to logout?"
          onConfirm={() => logoutButton()}
          onCancel={handleCloseDialog}
          confirmText="Yes"
          cancelText="No"
          isLoading={logoutUserMutation.isPending}
        />
      )}
    </Box>
  );
};

export default UserProfile;
