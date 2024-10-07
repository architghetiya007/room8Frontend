import { LoadingButton } from "@mui/lab";
import { Box, Grid, OutlinedInput, Stack, Typography } from "@mui/material";
import React from "react";
import OutlinedButton from "../../comman/OutlinedButton";
import CustomLoadingButton from "../../comman/CustomLoadingButton";
import { AdvertisementData } from "../../../types/advertisement";
import ANIMAL from "../../../assets/hunter/ANIMAL.png";
import BALCONY_PROPERTY from "../../../assets/hunter/BALCONY_PROPERTY.png";
import BATHROOM from "../../../assets/hunter/BATHROOM.png";
import FURNISHED from "../../../assets/hunter/FURNISHED.png";
// import HYBRID_WORK from "../../../assets/hunter/HYBRID_WORK.png";
import KITCHEN from "../../../assets/hunter/KITCHEN.png";
import LIFT from "../../../assets/hunter/LIFT.png";
import LIVING_WITH_OWNER from "../../../assets/hunter/LIVING_WITH_OWNER.png";
import MAXIMUM_FLATMATES from "../../../assets/hunter/MAXIMUM_FLATMATES.png";
import MINIMUM_PROPERY_SIZE from "../../../assets/hunter/MINIMUM_PROPERY_SIZE.png";
import NUMBER_OF_ROOMS from "../../../assets/hunter/NUMBER_OF_ROOMS.png";
import PARKING from "../../../assets/hunter/PARKING.png";
import SMOKER from "../../../assets/hunter/SMOKER.png";
import WITH_CHILDREN from "../../../assets/hunter/WITH_CHILDREN.png";
import WOMAN_MAN from "../../../assets/hunter/WOMAN_MAN.png";
import useCommonTranslation from "../../../hooks/useCommonTranslation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";
interface HunterDescriptionProps {
  updateStatusAPI: () => void;
  loading: boolean;
  previewData: AdvertisementData;
}
const HunterDescription: React.FC<HunterDescriptionProps> = ({
  updateStatusAPI,
  loading,
  previewData,
}) => {
  const userSlice = useSelector((state: RootState) => state.user);
  const { t } = useCommonTranslation();
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
        {previewData!.hunterData!.anotherPerson!.length > 0 && (
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
        )}
        {previewData!.hunterData!.anotherPerson!.map((item) => {
          return (
            <Box key={item.name} pl={1}>
              <Grid item xs={12}>
                <Typography variant="h5" fontWeight={"bold"}>
                  {item.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">
                  {item.age} years old, {item.gender}
                </Typography>
              </Grid>
            </Box>
          );
        })}

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
        <Grid item xs={12} md={7}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">
              {previewData.hunterData?.describeYourSelf}
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
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
                    Property preferences
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box component={"img"} src={MINIMUM_PROPERY_SIZE}></Box>
                    <Typography>
                      Minimum property size:{" "}
                      {previewData.hunterData?.minimumPropertySize} (m²)
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      component={"img"}
                      width={"30px"}
                      src={MAXIMUM_FLATMATES}
                    ></Box>
                    <Typography>
                      Maximum flatmates:{" "}
                      {previewData.hunterData?.minimumNumberOfTenants}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box component={"img"} src={NUMBER_OF_ROOMS}></Box>
                    <Typography>
                      Minimum number of rooms:{" "}
                      {previewData.hunterData?.minimumRoomSize}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box component={"img"} src={FURNISHED}></Box>
                    <Typography>
                      Furnished: {previewData.hunterData?.furnished}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box component={"img"} src={PARKING}></Box>
                    <Typography>
                      Parking: {t(`parking.${previewData.hunterData?.parking}`)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box component={"img"} src={KITCHEN}></Box>
                    <Typography>
                      Kitchen: {t(`kitchen.${previewData.hunterData?.kitchen}`)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box component={"img"} src={LIFT}></Box>
                    <Typography>
                      Lift: {previewData.hunterData?.minimumNumberOfTenants}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box component={"img"} src={BALCONY_PROPERTY}></Box>
                    <Typography>
                      Balcony in the property: {previewData.hunterData?.balcony}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
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
                    Room preferences
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box component={"img"} src={NUMBER_OF_ROOMS}></Box>
                    <Typography>
                      Minimum room size:{" "}
                      {previewData.hunterData?.minimumRoomSize} (m²)
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      component={"img"}
                      width={"30px"}
                      src={MAXIMUM_FLATMATES}
                    ></Box>
                    <Typography>
                      Maximum number of tenants:{" "}
                      {previewData.hunterData?.minimumNumberOfTenants}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box component={"img"} src={FURNISHED}></Box>
                    <Typography>
                      Furnished: {previewData.hunterData?.furnishedRoom}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box component={"img"} src={BALCONY_PROPERTY}></Box>
                    <Typography>
                      Balcony in the room:{" "}
                      {previewData.hunterData?.balconyInRoom}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box component={"img"} src={BATHROOM}></Box>
                    <Typography>
                      {previewData.hunterData?.privateBathroom
                        ? "Private Bathroom"
                        : "Shared Bathroom"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} mt={2}>
          <Typography
            sx={{
              fontSize: "46px",
              background:
                "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Flatemate preferences
          </Typography>
        </Grid>
        <Grid item xs={12} mb={1}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box component={"img"} width={"30px"} src={WOMAN_MAN}></Box>
            <Typography>
              {t(`accommodation.${previewData!.hunterData!.accommodation}`)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} mb={1}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box component={"img"} width={"30px"} src={LIVING_WITH_OWNER}></Box>
            <Typography>
              Living with owner?: {previewData.hunterData?.livingWithOwner}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} mb={1}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box component={"img"} width={"30px"} src={WITH_CHILDREN}></Box>
            <Typography>
              {previewData.hunterData?.withChild
                ? "With Children"
                : "Without children"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} mb={1}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box component={"img"} width={"30px"} src={SMOKER}></Box>
            <Typography>
              {previewData.hunterData?.areYouSmoking
                ? "Smoker"
                : "Not a smoker"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box component={"img"} width={"30px"} src={ANIMAL}></Box>
            <Typography>
              {previewData.hunterData?.acceptPet
                ? "Pets accepted"
                : "Pets not accepted"}
            </Typography>
          </Box>
        </Grid>
        {previewData?.userId && userSlice?.user?._id === previewData.userId && (
          <Grid item xs={12} mt={2} mb={2}>
            <Box sx={{ borderBottom: "1px solid lightgray" }}></Box>
          </Grid>
        )}

        {previewData?.userId && userSlice?.user?._id === previewData.userId && (
          <Grid item xs={12} md={6}>
            <OutlinedButton type="button" onClick={() => navigate('/')}>Back</OutlinedButton>
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

export default HunterDescription;
