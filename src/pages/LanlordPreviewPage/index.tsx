import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification";
import useAdvertisementMutations from "../../mutations/advertisement";
import { AdvertisementData } from "../../types/advertisement";
import LandlordPreviewDescription from "../../components/LandlordPreviewPage/LandlordPreviewDescription";
import LandloardPreviewSubCard from "../../components/LandlordPreviewPage/LandloardPreviewSubCard";
import LandlordProfileCard from "../../components/LandlordPreviewPage/LandlordProfileCard";

const LanlordPreviewPage: React.FC = () => {
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
              <LandlordProfileCard previewData={previewData} />
            </Grid>
          )}

          {previewData && (
            <Grid item xs={12}>
              <LandloardPreviewSubCard previewData={previewData} />
            </Grid>
          )}

          {previewData && (
            <Grid item xs={12}>
              <LandlordPreviewDescription
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

export default LanlordPreviewPage;
