import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import useAdvertisementMutations from "../../../../mutations/advertisement";
import { useEffect, useState } from "react";
import { AdvertisementData } from "../../../../types/advertisement";
import { AdvertisementType } from "../../../../utils/advertisement";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
const ProfileListing: React.FC = () => {
  const [hunterData, setHunterData] = useState<AdvertisementData[]>([]);
  const [landlordData, setLandlordData] = useState<AdvertisementData[]>([]);
  const { getUserAdvertisementMutation } = useAdvertisementMutations();

  const fetchUserAdvertisement = () => {
    getUserAdvertisementMutation.mutate(undefined, {
      onSuccess: (data) => {
        setHunterData(
          data!.data.filter(
            (item) => item.advertiseType === AdvertisementType.HUNTER
          )
        );
        setLandlordData(
          data!.data.filter(
            (item) => item.advertiseType === AdvertisementType.LANDLORD
          )
        );
      },
    });
  };

  useEffect(() => {
    fetchUserAdvertisement();
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <AddHomeOutlinedIcon sx={{ color: "#4AB1F1" }} />
          <Typography variant="h6">Looking For A Roommate?</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: "1px solid #4AB1F1" }}></Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {hunterData.map((item) => {
            return (
              <Grid item xs={12} key={item._id}>
                <Stack
                  direction={"row"}
                  spacing={2}
                  bgcolor={"rgba(74, 177, 241, 0.20)"}
                  p={2}
                  borderRadius={2}
                >
                  <BorderColorOutlinedIcon sx={{ color: "black" }} />
                  <Typography variant="body1" sx={{ color: "black" }}>
                    {item.hunterData?.address?.formattedAddress}
                  </Typography>
                  <Chip
                    sx={{
                      ml: "auto !important",
                      backgroundColor: item.isActive ? "green" : "red",
                      color: "white",
                    }}
                    color={item.isActive ? "primary" : "error"}
                    label={item.isActive ? "Active" : "Inactive"}
                  />
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Person2OutlinedIcon sx={{ color: "#D749AF" }} />
          <Typography variant="h6">Looking for a room/apartment?</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: "1px solid #D92727" }}></Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {landlordData.map((item) => {
            return (
              <Grid item xs={12} key={item._id}>
                <Stack
                  direction={"row"}
                  spacing={2}
                  bgcolor={"rgba(215, 73, 175, 0.20)"}
                  p={2}
                  borderRadius={2}
                >
                  <BorderColorOutlinedIcon sx={{ color: "black" }} />
                  <Typography variant="body1" sx={{ color: "black" }}>
                    {item.landlordData?.address?.formattedAddress}
                  </Typography>
                  <Chip
                    sx={{
                      ml: "auto !important",
                      backgroundColor: item.isActive ? "green" : "red",
                      color: "white",
                    }}
                    label={item.isActive ? "Active" : "Inactive"}
                  />
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileListing;
