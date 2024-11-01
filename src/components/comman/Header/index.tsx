import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import { HeaderMenus } from "../../../utils/Header";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Login from "../../auth/Login";
import Register from "../../auth/Register";
import ForgotPassword from "../../auth/ForgotPassword";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import PhoneNumberDialog from "../../auth/PhoneNumberDialog";
import MenuIcon from "@mui/icons-material/Menu";
import { eventEmitter } from "../../../utils/Comman/eventEmitter";
const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const userSlice = useSelector((state: RootState) => state.user);
  const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState<boolean>(false);
  const [openForgotDialog, setOpenForgotDialog] = useState<boolean>(false);
  const [phoneNumberDialog, setPhoneNumberDialog] = useState<boolean>(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLoginDialog = (openDialog: boolean) => {
    setOpenLoginDialog(openDialog);
  };

  const handleRegisterDialog = (openDialog: boolean) => {
    setOpenRegisterDialog(openDialog);
    // setPhoneNumberDialog(openDialog);
  };

  const handleForgotDialog = (openDialog: boolean) => {
    setOpenForgotDialog(openDialog);
  };

  const handleClosePhoneNumberDialog = (open: boolean) => {
    setPhoneNumberDialog(open);
  };

  const handleCloseLoginDialog = (val: string) => {
    setOpenLoginDialog(false);
    if (val) {
      setPhoneNumberDialog(true);
    }
  };

  const handleCloseRegisterDialog = (val: string) => {
    setOpenRegisterDialog(false);
    if (val) {
      setPhoneNumberDialog(true);
    }
  };

  useEffect(() => {
    const handleEvent = (data: string) => {
      if (data === "openLoginDialog") {
        handleLoginDialog(true);
      }
    };

    // Subscribe to the event
    eventEmitter.on("Header", handleEvent);

    // Cleanup listener on unmount
    return () => {
      eventEmitter.off("Header", handleEvent);
    };
  }, []);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {HeaderMenus.map((item) => (
          <ListItem key={item.route} disablePadding>
            <ListItemButton>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        // background: "linear-gradient(to bottom, #FFEBE8, #EDD6F5, #EDF6FD)",
        // background: "linear-gradient(253.04deg, #FF0099 45.78%, #FFD600 123.06%)",
        // background: "linear-gradient(247.62deg, #16CDEA 24.93%, #AD00FF 96.87%)",

        // background: "linear-gradient(to right, rgba(74, 177, 241, 0.2), rgba(86, 108, 236, 0.2), rgba(215, 73, 175, 0.2), rgba(255, 124, 81, 0.2))",        // backgroundBlendMode: "overlay",
        p: 2,
        position: "fixed",
        width: "100%",
        zIndex: 9,
        backgroundSize: "center",
        backgroundPosition: "center",
      }}
    >
      <Container
        sx={{
          p: 2,
          boxShadow: "0 4px 12px 0 #00000026",
          borderRadius: 4,
          backdropFilter: "blur(41.5px)",
        }}
      >
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <IconButton
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                },
              }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
            <Typography
              onClick={() => navigate("/")}
              sx={{
                fontWeight: "700",
                fontSize: "22px",
                cursor: "pointer",
                color: "#373940",
                letterSpacing: "1.1px",
              }}
            >
              Room8
            </Typography>
          </Box>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            {HeaderMenus.map((item) => {
              return (
                <Link
                  sx={{
                    color: "#485368",
                    textDecoration: "none",
                    letterSpacing: "1.1px",
                    fontWeight: "450",
                    fontSize: "14px",
                    lineHeight: "24px",
                  }}
                  padding={"1rem"}
                  component={RouterLink}
                  key={item.route}
                  to={item.route}
                >
                  {item.name}
                </Link>
              );
            })}
          </Box>
          {userSlice.user ? (
            <Box
              display={"flex"}
              alignItems={"center"}
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/profile")}
            >
              <Typography
                sx={{
                  mr: 2,
                  color: "#373940",
                  fontWeight: "700",
                  fontSize: "14px",
                  letterSpacing: "1.1px",
                }}
              >
                {userSlice.user.fullName}
              </Typography>
              {userSlice.user.profilePic ? (
                <Avatar src={userSlice.user.profilePic}></Avatar>
              ) : (
                <Avatar>{userSlice.user.fullName.charAt(0)}</Avatar>
              )}
            </Box>
          ) : (
            <Box>
              <Button
                sx={{
                  color: theme.palette.custom.blackDark,
                  fontWeight: "bold",
                  marginRight: 2,
                }}
                type="button"
                onClick={() => setOpenLoginDialog(true)}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "20px",
                  color: theme.palette.custom.blackDark,
                  borderColor: theme.palette.custom.blackDark,
                  fontWeight: "bold",
                }}
                endIcon={<EastIcon />}
                type="button"
                onClick={() => setOpenRegisterDialog(true)}
              >
                Signup
              </Button>
            </Box>
          )}
        </Box>
      </Container>
      {openLoginDialog && (
        <Login
          openDialog={openLoginDialog}
          handleCloseLoginDialog={handleCloseLoginDialog}
          handleRegisterDialog={handleRegisterDialog}
          handleForgotDialog={handleForgotDialog}
        />
      )}
      {openRegisterDialog && (
        <Register
          openDialog={openRegisterDialog}
          handleCloseRegisterDialog={handleCloseRegisterDialog}
          handleForgotDialog={handleForgotDialog}
          handleLoginDialog={handleLoginDialog}
        />
      )}
      {openForgotDialog && (
        <ForgotPassword
          openDialog={openForgotDialog}
          handleCloseForgotDialog={() => setOpenForgotDialog(false)}
          handleLoginDialog={handleLoginDialog}
        />
      )}
      {phoneNumberDialog && (
        <PhoneNumberDialog
          openDialog={phoneNumberDialog}
          handleClosePhoneNumberDialog={handleClosePhoneNumberDialog}
        />
      )}
    </Box>
  );
};

export default Header;
