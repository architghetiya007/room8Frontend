import { Box, Grid, Stack, Typography } from "@mui/material";
import { AdvertisementData } from "../../types/advertisement";
import MONTHiMG from "../../assets/hunter/6_MONTH.png";
import AvailableImg from "../../assets/hunter/AVAILABLE.png";
import dayjs from "dayjs";
import useCommonTranslation from "../../hooks/useCommonTranslation";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import ImageSlider from "./ImageSlider";
interface LandlordProfileCardProps {
  previewData: AdvertisementData;
}
const LandlordProfileCard: React.FC<LandlordProfileCardProps> = ({
  previewData,
}) => {
  const { t } = useCommonTranslation();
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
          <Grid container spacing={1}>
            <Grid item xs={12} md={5}>
              <Stack direction={"column"}>
                <Typography
                  sx={{
                    background:
                      "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "700",
                    fontSize: "45px",
                  }}
                >
                  {previewData.landlordData?.address?.city +
                    "  ,  " +
                    previewData.landlordData?.address?.state}
                </Typography>
                <Typography variant="h5" fontWeight={"bold"}>
                  {t(
                    `landlord.propertyOfferOptions.${previewData.landlordData?.propertyOffer}`
                  )}{" "}
                  in a {previewData.landlordData?.typeofProperty}
                </Typography>
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              display={"flex"}
              alignItems={"flex-end"}
              justifyContent={"flex-start"}
              direction={"column"}
              spacing={2}
              ml={"auto"}
              gap={2}
              mt={2}
            >
              <Box
                sx={{
                  borderRadius: 10,
                  backgroundColor: "#EDF4FE",
                  py: 1,
                  px: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Typography>
                  {previewData?.landlordData?.isAvailableNow
                    ? "Available Immediately"
                    : previewData?.landlordData?.dateAvailable
                    ? dayjs(previewData.landlordData?.dateAvailable).format(
                        "MM/DD/YYYY"
                      )
                    : ""}
                </Typography>
                <Box
                  sx={{ width: "25px", height: "25px" }}
                  component={"img"}
                  src={AvailableImg}
                ></Box>
              </Box>
              <Box
                sx={{
                  borderRadius: 10,
                  backgroundColor: "#EDF4FE",
                  py: 1,
                  px: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Typography>
                  Deposit: {previewData.landlordData?.deposit} zl
                </Typography>
                <Box
                  sx={{ width: "25px", height: "25px" }}
                  component={"img"}
                  src={MONTHiMG}
                ></Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {previewData?.landlordData!.photosOfPlace!.length > 0 && (
          <Grid item xs={12}>
            <ImageSlider
              images={previewData.landlordData?.photosOfPlace ?? []}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Grid container spacing={1} mt={1}>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <AddLocationAltOutlinedIcon />
                <Typography
                  onClick={() =>
                    window.top?.open(
                      `https://www.google.com/maps?q=${previewData.landlordData?.address?.coordinates?.at(
                        1
                      )},${previewData.landlordData?.address?.coordinates?.at(
                        0
                      )}`
                    )
                  }
                  variant="h6"
                  sx={{ borderBottom: "1px solid black", cursor: "pointer" }}
                >
                  CHECK ON MAP
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              display={"flex"}
              alignItems={"flex-end"}
              justifyContent={"flex-start"}
              direction={"column"}
              spacing={2}
              ml={"auto"}
              gap={2}
              mt={0}
            >
              <Box
                sx={{
                  borderRadius: 10,
                  backgroundColor: "#EDF4FE",
                  py: 1,
                  px: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Typography>
                  Minimum Stay:{" "}
                  {t(`duration.${previewData?.landlordData?.minimumStay}`)}{" "}
                  months
                </Typography>
                <Box
                  sx={{ width: "25px", height: "25px" }}
                  component={"img"}
                  src={AvailableImg}
                ></Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandlordProfileCard;
