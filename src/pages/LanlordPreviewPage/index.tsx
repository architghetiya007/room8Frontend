import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification";
import useAdvertisementMutations from "../../mutations/advertisement";
import { AdvertisementData } from "../../types/advertisement";
import LandlordPreviewDescription from "../../components/LandlordPreviewPage/LandlordPreviewDescription";

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
        onSuccess: () => {},
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
    updateStatusAPI();
  }, []);
  return (
    <Box>
      <Container>
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12}>
            {" "}
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={3}>
                <Typography>room: 13 (m²)</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography>property: 50 (m²)</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography>3 rooms</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography>04+ flatmates</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <LandlordPreviewDescription />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LanlordPreviewPage;
