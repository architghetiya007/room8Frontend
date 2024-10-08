import { LoadingButton } from "@mui/lab";
import { Box, Grid, Typography, Stack, OutlinedInput } from "@mui/material";
import CustomLoadingButton from "../comman/CustomLoadingButton";
import OutlinedButton from "../comman/OutlinedButton";
import GoogleMaps from "../GoogleMaps";
import { AdvertisementData } from "../../types/advertisement";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import BALCONY_PROPERTY from "../../assets/hunter/BALCONY_PROPERTY.png";
import BATHROOM from "../../assets/hunter/BATHROOM.png";
import FURNISHED from "../../assets/hunter/FURNISHED.png";
import KITCHEN from "../../assets/hunter/KITCHEN.png";
import LIFT from "../../assets/hunter/LIFT.png";
import MAXIMUM_FLATMATES from "../../assets/hunter/MAXIMUM_FLATMATES.png";
import MINIMUM_PROPERY_SIZE from "../../assets/hunter/MINIMUM_PROPERY_SIZE.png";
import NUMBER_OF_ROOMS from "../../assets/hunter/NUMBER_OF_ROOMS.png";
import PARKING from "../../assets/hunter/PARKING.png";
import useCommonTranslation from "../../hooks/useCommonTranslation";
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
  const { t } = useCommonTranslation();
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
          <Typography
            sx={{
              fontSize: "46px",
              background:
                "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            I'm looking for a flatmate to my apartment
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
          <Box sx={{ p: 1 }}>
            <Typography variant="h6">
              {previewData.landlordData?.descriptionAbout}
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
              {previewData.landlordData?.descriptionOfFlat}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
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
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={MINIMUM_PROPERY_SIZE}
                    ></Box>
                    <Typography
                      sx={{
                        border: "1px solid #FBE0EA",
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      Property size: {previewData.landlordData?.propertySize}{" "}
                      (m²)
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={FURNISHED}
                    ></Box>
                    <Typography
                      sx={{
                        border: "1px solid #FBE0EA",
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      Furnished: {previewData.landlordData?.isRoomFurnished}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={PARKING}
                    ></Box>
                    <Typography
                      sx={{
                        border: "1px solid #FBE0EA",
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      Parking:{" "}
                      {t(`parking.${previewData.landlordData?.parking}`)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      component={"img"}
                      sx={{ width: "25px", height: "25px" }}
                      src={MAXIMUM_FLATMATES}
                    ></Box>
                    <Typography
                      sx={{
                        border: "1px solid #FBE0EA",
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      Floor:{" "}
                      {previewData.landlordData?.floor +
                        "/" +
                        previewData.landlordData?.numberOfFloor}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={LIFT}
                    ></Box>
                    <Typography
                      sx={{
                        border: "1px solid #FBE0EA",
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      Lift in the building:{" "}
                      {previewData.landlordData?.liftInBuilding}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={KITCHEN}
                    ></Box>
                    <Typography
                      sx={{
                        border: "1px solid #FBE0EA",
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      Kitchen:{" "}
                      {t(`kitchen.${previewData.landlordData?.kitchen}`)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={BALCONY_PROPERTY}
                    ></Box>
                    <Typography
                      sx={{
                        border: "1px solid #FBE0EA",
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      Kids in the apartment:{" "}
                      {previewData.landlordData?.doChildrenLiveHere}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={BALCONY_PROPERTY}
                    ></Box>
                    <Typography
                      sx={{
                        border: "1px solid #FBE0EA",
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      Owner lives here:{" "}
                      {previewData.landlordData?.ownerLiveHere}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
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
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={NUMBER_OF_ROOMS}
                    ></Box>
                    <Typography
                      sx={{
                        border: "1px solid #FBE0EA",
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      room: {previewData.landlordData?.roomSize} (m²)
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      component={"img"}
                      sx={{ width: "25px", height: "25px" }}
                      src={MAXIMUM_FLATMATES}
                    ></Box>
                    <Typography
                      sx={{
                        border: "1px solid #FBE0EA",
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      Max people in the room:{" "}
                      {previewData.landlordData?.maximumStay}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={FURNISHED}
                    ></Box>
                    <Typography
                      sx={{
                        border: "1px solid #FBE0EA",
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      Furnished: {previewData.landlordData?.isRoomFurnished}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={FURNISHED}
                    ></Box>
                    <Typography
                      sx={{
                        border: "1px solid #FBE0EA",
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      Bed: {previewData.landlordData?.bed}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={BATHROOM}
                    ></Box>
                    <Typography
                      sx={{
                        border: "1px solid #FBE0EA",
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      {previewData.landlordData?.privateBathroom
                        ? "Private Bathroom"
                        : "Shared Bathroom"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={BALCONY_PROPERTY}
                    ></Box>
                    <Typography
                      sx={{
                        border: "1px solid #FBE0EA",
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      Balcony in the room:{" "}
                      {previewData.landlordData?.balconyInApartment}
                    </Typography>
                  </Box>
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
