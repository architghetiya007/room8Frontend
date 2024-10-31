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
      <Container>
        <Grid container spacing={2} mt={2} mb={10}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                border: "2px solid #44ABEB",
                boxShadow: 3, // Predefined MUI box shadow (3 is moderate depth)
                width: "100%",
                flexWrap: {
                  xs: "wrap",
                  md: "nowrap",
                },
              }}
            >
              <Stack direction={"column"} spacing={2} p={2}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Looking For a Roomate?
                </Typography>
                <Typography sx={{ fontSize: "16px" }}>
                  Post your listing and find the perfect roommate for your
                  place.
                </Typography>
                <Button
                  type="button"
                  onClick={() => {
                    if (userSlice.user) {
                      navigate("/landlord/1");
                    } else {
                      eventEmitter.emit("Header", "openLoginDialog");
                    }
                  }}
                  startIcon={<AddIcon />}
                  sx={{
                    backgroundColor: "#44ABEB",
                    color: "white",
                    borderRadius: 10,
                    px: 2,
                    py: 1,
                    width: "auto",
                    height: "55px",
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                  variant="contained"
                >
                  Add Room/Apartment
                </Button>
              </Stack>
              <Stack>
                <Box
                  component={"img"}
                  sx={{
                    maxWidth: {
                      xs: "100%",
                      md: "300px",
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
                boxShadow: 3, // Predefined MUI box shadow (3 is moderate depth)
                width: "100%",
                flexWrap: {
                  xs: "wrap",
                  md: "nowrap",
                },
              }}
            >
              <Stack direction={"column"} spacing={2} p={2}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", fontSize: "24px" }}
                >
                  Looking for a room or apartment?
                </Typography>
                <Typography sx={{ fontSize: "16px" }}>
                  Fill out a quick form, meet potential roommates, and find your
                  ideal place.
                </Typography>
                <Button
                  type="button"
                  onClick={() => {
                    if (userSlice.user) {
                      navigate("/hunter/1");
                    } else {
                      eventEmitter.emit("Header", "openLoginDialog");
                    }
                  }}
                  startIcon={<AddIcon />}
                  sx={{
                    backgroundColor: "#E152B9",
                    color: "white",
                    borderRadius: 10,
                    px: 2,
                    py: 1,
                    width: "auto",
                    height: "55px",
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                  variant="contained"
                >
                  Add an Announcement
                </Button>
              </Stack>
              <Stack sx={{ width: "100%" }}>
                <Box
                  component={"img"}
                  sx={{
                    maxWidth: {
                      xs: "100%",
                      md: "298px",
                    },
                    height: "282px",
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
