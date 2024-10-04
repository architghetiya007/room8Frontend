import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification";
import useAdvertisementMutations from "../../mutations/advertisement";
import { AdvertisementData } from "../../types/advertisement";

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
      <Container></Container>
    </Box>
  );
};

export default LanlordPreviewPage;
