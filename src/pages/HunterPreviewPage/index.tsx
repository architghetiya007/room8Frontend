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
  }, []);
  return (
    <Box>
      <Container>
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12}>
            <ProfileCard />
          </Grid>
          <Grid item xs={12}>
            <HunterDescription updateStatusAPI={() => updateStatusAPI()} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HunterPreviewPage;
