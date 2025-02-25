import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RoomMatePng from "../../../assets/images/roommate.png";
import ApartmentPng from "../../../assets/images/apartment1.png";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { eventEmitter } from "../../../utils/Comman/eventEmitter";

const ApartmentSection: React.FC = () => {
  const userSlice = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  return (
    <Box>
      <Container sx={{ px: {
          xs: 1,
          md: "0 !important"
        }}}>
        <Grid container spacing={2} mt={2} mb={10} gap={0}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                border: "2px solid #44ABEB",
                boxShadow: "31px 39px 88.17px 0px #5165AB42",
                width: "100%",
                height: "300px",
                flexWrap: {
                  xs: "wrap",
                  md: "nowrap",
                },
                position: "relative",
                cursor: "pointer"
              }}
              onClick={() => {
                if (userSlice.user) {
                  navigate("/landlord/1");
                } else {
                  eventEmitter.emit("Header", "openLoginDialog");
                }
              }}
            >
              <Stack
                direction={"column"}
                spacing={1}
                p={1}
                pl={3}
                sx={{ maxWidth: "270px", zIndex: 99 }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", lineHeight: "40px",fontSize: "30px" }}
                >
                  Looking For a Roomate?
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "16px", color: "#6D778A" }}>
                  Post your listing and find the perfect roommate for your
                  place.
                </Typography>
                <Button
                  type="button"
                  // onClick={() => {
                  //   if (userSlice.user) {
                  //     navigate("/landlord/1");
                  //   } else {
                  //     eventEmitter.emit("Header", "openLoginDialog");
                  //   }
                  // }}
                  startIcon={<AddIcon />}
                  sx={{
                    backgroundColor: "#44ABEB",
                    color: "white",
                    borderRadius: 10,
                    px: 2,
                    py: 0,
                    mt: "16px !important",
                    width: "auto",
                    height: "52px",
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "16px",
                    minWidth: "278px"
                  }}
                  variant="contained"
                >
                  Add Room/Apartment
                </Button>
              </Stack>
              <Stack
                sx={{ position: "absolute", right: 0, bottom: 0, zIndex: 9 }}
              >
                <Box
                  component={"img"}
                  sx={{
                    maxWidth: {
                      xs: "100%",
                      md: "338px",
                    },
                    height: "285px",
                  }}
                  src={RoomMatePng}
                ></Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                border: "2px solid #E152B9",
                width: "100%",
                flexWrap: {
                  xs: "wrap",
                  md: "nowrap",
                },
                position: "relative",
                height: "300px",
                boxShadow: "31px 39px 88.17px 0px #5165AB42",
                cursor: "pointer"
              }}
              onClick={() => {
                if (userSlice.user) {
                  navigate("/hunter/1");
                } else {
                  eventEmitter.emit("Header", "openLoginDialog");
                }
              }}
            >
              <Stack
                direction={"column"}
                sx={{ maxWidth: "310px", zIndex: 99 }}
                spacing={1}
                p={1}
                pl={3}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", lineHeight: "40px",fontSize: "30px" }}
                >
                  Looking for a room or{" "}
                  {/* <Typography
                    component={"span"}
                    sx={{
                      background: "#E152B9",
                      backdropFilter: "blur(28.2px)",
                      fontWeight: "bold"
                    }}
                  >
                    
                  </Typography> */}
                  apartment?
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "16px", color: "#6D778A" }}>
                  Fill out a quick form, meet potential roommates, and find your
                  ideal place.
                </Typography>
                <Button
                  type="button"
                  // onClick={() => {
                  //   if (userSlice.user) {
                  //     navigate("/hunter/1");
                  //   } else {
                  //     eventEmitter.emit("Header", "openLoginDialog");
                  //   }
                  // }}
                  startIcon={<AddIcon />}
                  sx={{
                    backgroundColor: "#E152B9",
                    color: "white",
                    borderRadius: 10,
                    px: 2,
                    py: 0,
                    width: "auto",
                    height: "52px",
                    mt: "16px !important",
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "16px",
                    minWidth: "278px",
                    "&:hover" : {
                      backgroundColor: "#E152B9",
                    }
                  }}
                  variant="contained"
                >
                  Add an Announcement
                </Button>
              </Stack>
              <Stack
                sx={{ position: "absolute", right: 0, bottom: 0, zIndex: 9 }}
              >
                <Box
                  component={"img"}
                  sx={{
                    maxWidth: {
                      xs: "100%",
                      md: "338px",
                    },
                    height: "285px",
                  }}
                  src={ApartmentPng}
                ></Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ApartmentSection;
