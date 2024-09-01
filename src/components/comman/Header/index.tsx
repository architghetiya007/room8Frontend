import {
  Box,
  Button,
  Container,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import EastIcon from "@mui/icons-material/East";
import { HeaderMenus } from "../../../utils/Header";
import { Link as RouterLink } from "react-router-dom";
import Login from "../../auth/Login";
const Header: React.FC = () => {
  const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #FFEBE8, #EDD6F5, #EDF6FD)",
        p: 2,
        position: "fixed",
        width: "100%",
        zIndex: 9,
      }}
    >
      <Container
        sx={{
          p: 2,
          boxShadow: "0 4px 12px 0 #00000026",
          borderRadius: 4,
        }}
      >
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
            Room8
          </Typography>
          <Box>
            {HeaderMenus.map((item) => {
              return (
                <Link
                  sx={{
                    color: theme.palette.custom.blackDark,
                    textDecoration: "none",
                    letterSpacing: "1px",
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
            >
              Signup
            </Button>
          </Box>
        </Box>
      </Container>
      {openLoginDialog && (
        <Login
          openDialog={openLoginDialog}
          handleCloseLoginDialog={() => setOpenLoginDialog(false)}
        />
      )}
    </Box>
  );
};

export default Header;
