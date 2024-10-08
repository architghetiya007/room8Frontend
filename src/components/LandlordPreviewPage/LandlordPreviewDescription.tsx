import { LoadingButton } from "@mui/lab";
import { Box, Grid, Typography, Stack, OutlinedInput } from "@mui/material";
import CustomLoadingButton from "../comman/CustomLoadingButton";
import OutlinedButton from "../comman/OutlinedButton";
import GoogleMaps from "../GoogleMaps";
import { AdvertisementData } from "../../types/advertisement";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
interface LandlordPreviewDescriptionProps {
  updateStatusAPI: () => void;
  loading: boolean;
  previewData: AdvertisementData;
}
const LandlordPreviewDescription: React.FC<LandlordPreviewDescriptionProps> = ({
  previewData,
  loading,
  updateStatusAPI,
}) => {
  const userSlice = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        boxShadow: 3, // Predefined MUI box shadow (3 is moderate depth)
        width: "100%",
        flexWrap: {
          xs: "wrap",
          md: "nowrap",
        },
        p: 3,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: "46px",
              background:
                "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            A few facts about me
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">
            Hybrid work Without children Not a smoker No animal
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: "46px",
              background:
                "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            I am looking for a place with my friend
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight={"bold"}>
            Diane
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">25 years old, Female</Typography>
        </Grid>
        <Grid item xs={12} mt={2} mb={2}>
          <Box sx={{ borderBottom: "1px solid lightgray" }}></Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit
              amet ornare urna, id rhoncus nulla. Ut non dui sed quam tincidunt
              semper sit amet eget nibh. Duis a felis vitae mauris egestas
              feugiat. Donec enim neque, faucibus quis elit a, auctor porttitor
              mi. Sed non porttitor leo. Ut in urna hendrerit, vehicula ex a,
              sagittis urna. Read more...
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack
            sx={{
              borderRadius: 5,
              display: "flex",
              boxShadow: 3, // Predefined MUI box shadow (3 is moderate depth)
              width: "100%",
              p: 3,
            }}
            spacing={2}
          >
            <Typography variant="h4">Write a Message</Typography>
            <OutlinedInput placeholder="Your Message" multiline minRows={4} />
            <LoadingButton
              sx={{
                background:
                  "linear-gradient(to right, #4AB1F1, #566CEC, #D749AF, #FF7C51)",
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
            >
              Send a Message
            </LoadingButton>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack
            sx={{
              borderRadius: 5,
              display: "flex",
              boxShadow: 3, // Predefined MUI box shadow (3 is moderate depth)
              width: "100%",
              p: 3,
              mt: 4,
              mb: 4,
            }}
            spacing={2}
          >
            <Typography
              sx={{
                fontSize: "46px",
                background:
                  "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              A few words about the apartment
            </Typography>
            <Typography variant="body1">
              Huge 2 bedroom apartment, walking distance to shops, cafes etc.
              (only 10 min walk to Galeria shopping mall and about 10 min walk
              to Śródmieście train station). All bills are included in the rent.
              Ready to move in ASAP.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: "46px",
                      background:
                        "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Property Features
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Minimum property size: 40 (m²)</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Maximum flatmates: 4</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Minimum number of rooms: 1</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Furnished: YES</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Parking: DEDICATED/ON STREET</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Kitchen: SEPERATE</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Lift: NO PREFERENCE</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Balcony in the property: NO</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: "46px",
                      background:
                        "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Room Features
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Minimum room size: 10 (m²)</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Maximum number of tenants: 2</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Furnished: YES</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Balcony in the room: NO</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Shared bathroom</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <GoogleMaps
                {...(previewData.landlordData?.address?.coordinates && {
                  lat: previewData.landlordData.address.coordinates[1],
                  lng: previewData.landlordData.address.coordinates[0],
                })}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Stack
            sx={{
              borderRadius: 5,
              display: "flex",
              width: "100%",
              p: 1,
            }}
            spacing={2}
          >
            <Typography variant="h4">Write a Message</Typography>
            <OutlinedInput placeholder="Your Message" multiline minRows={4} />
            <LoadingButton
              sx={{
                background:
                  "linear-gradient(to right, #4AB1F1, #566CEC, #D749AF, #FF7C51)",
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
            >
              Send a Message
            </LoadingButton>
          </Stack>
        </Grid>
        {previewData?.userId && userSlice?.user?._id === previewData.userId && (
          <Grid item xs={12} mt={2} mb={2}>
            <Box sx={{ borderBottom: "1px solid lightgray" }}></Box>
          </Grid>
        )}

        {previewData?.userId && userSlice?.user?._id === previewData.userId && (
          <Grid item xs={12} md={6}>
            <OutlinedButton type="button" onClick={() => navigate("/")}>
              Back
            </OutlinedButton>
          </Grid>
        )}
        {previewData?.userId &&
          userSlice?.user?._id === previewData?.userId && (
            <Grid item xs={12} md={6}>
              <CustomLoadingButton
                loading={loading}
                onClick={() => updateStatusAPI()}
                type="button"
                sx={{ width: "100%" }}
              >
                {previewData.isActive ? "Unpublish" : "Publish"}
              </CustomLoadingButton>
            </Grid>
          )}
      </Grid>
    </Box>
  );
};

export default LandlordPreviewDescription;
