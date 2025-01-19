import { Box, Container, Grid } from "@mui/material";
import ProfileCard from "../../components/HunterPreviewPage/ProfileCard";
import HunterDescription from "../../components/HunterPreviewPage/HunterDescription";
import { useEffect, useState } from "react";
import { AdvertisementData } from "../../types/advertisement";
import useAdvertisementMutations from "../../mutations/advertisement";
import { useNavigate, useParams } from "react-router-dom";
import useNotification from "../../hooks/useNotification";
const HunterPreviewPage: React.FC = () => {
  const params = useParams();
  const { showSnackBar } = useNotification();
  const navigate = useNavigate();
  const [previewData, setPreviewData] = useState<AdvertisementData>();
  const { getAdvertisementMutation, updateStatusAdvertisementMutation } =
    useAdvertisementMutations();

  const updateStatusAPI = () => {
    updateStatusAdvertisementMutation.mutate(
      {
        id: params.id ?? "",
        isActive: previewData?.isActive ? false : true,
      },
      {
        onSuccess: (data) => {
          showSnackBar({ message: data!.message });
          navigate(`/`);
        },
      }
    );
  };

  const getAdvertisementAPI = () => {
    getAdvertisementMutation.mutate(params?.id ?? "", {
      onSuccess: (data) => {
        setPreviewData(data?.data);
      },
      onError: (error: Error) => {
        showSnackBar({ message: error.message, variant: "error" });
        navigate("/");
      },
    });
  };

  useEffect(() => {
    getAdvertisementAPI();
  }, []);
  return (
    <Box>
      <Container sx={{px: {
          xs: 2,
          md: "0 !important"
        }}}>
        <Grid container spacing={3} mb={8}>
          {previewData && (
            <Grid item xs={12}>
              <ProfileCard previewData={previewData} />
            </Grid>
          )}
          {previewData && (
            <Grid item xs={12}>
              <HunterDescription
                previewData={previewData}
                updateStatusAPI={() => updateStatusAPI()}
                loading={updateStatusAdvertisementMutation.isPending}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default HunterPreviewPage;
