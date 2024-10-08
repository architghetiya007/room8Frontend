import { Box, Grid, Typography } from "@mui/material";
import { AdvertisementData } from "../../types/advertisement";
import ANIMAL from "../../assets/hunter/ANIMAL.png";
import HYBRID_WORK from "../../assets/hunter/HYBRID_WORK.png";
import WITH_CHILDREN from "../../assets/hunter/WITH_CHILDREN.png";
import SMOKER from "../../assets/hunter/SMOKER.png";
import useCommonTranslation from "../../hooks/useCommonTranslation";
interface LandlordPreviewDescriptionProps {
  previewData: AdvertisementData;
}
const LandloardPreviewSubCard: React.FC<LandlordPreviewDescriptionProps> = ({
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
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                component={"img"}
                sx={{ width: "25px", height: "25px" }}
                src={HYBRID_WORK}
              ></Box>
              <Typography
                sx={{ border: "1px solid #FBE0EA", borderRadius: 2, p: 1 }}
              >
                {t(
                  `typeofEmployment.${previewData?.landlordData?.typeOfEmployment}`
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                component={"img"}
                sx={{ width: "25px", height: "25px" }}
                src={WITH_CHILDREN}
              ></Box>
              <Typography
                sx={{ border: "1px solid #FBE0EA", borderRadius: 2, p: 1 }}
              >
                {previewData?.landlordData?.haveAnyChildren
                  ? "With Children"
                  : "No Children"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                component={"img"}
                sx={{ width: "25px", height: "25px" }}
                src={SMOKER}
              ></Box>
              <Typography
                sx={{ border: "1px solid #FBE0EA", borderRadius: 2, p: 1 }}
              >
                {previewData?.landlordData?.acceptSmoking
                  ? "Smoker"
                  : "Not a Smoker"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                component={"img"}
                sx={{ width: "25px", height: "25px" }}
                src={ANIMAL}
              ></Box>
              <Typography
                sx={{ border: "1px solid #FBE0EA", borderRadius: 2, p: 1 }}
              >
                {previewData?.landlordData?.acceptPets
                  ? "Animal"
                  : "Not a Animal"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandloardPreviewSubCard;
