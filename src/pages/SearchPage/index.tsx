import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import SearchHunter from "../../components/SearchPage/SearchHunter";
import CustomLoadingButton from "../../components/comman/CustomLoadingButton";
import SearchLandlord from "../../components/SearchPage/SearchLandlord";
import { AdvertisementType } from "../../utils/advertisement";
import SearchResults from "../../components/SearchPage/SearchResults";
import useAdvertisementMutations from "../../mutations/advertisement";
import { AdvertisementData } from "../../types/advertisement";

const SearchPage: React.FC = () => {
  const [roomData, setRoomData] = useState<AdvertisementData[]>([]);
  const [typeOfSearch, setTypeOfSearch] = useState<string>(
    AdvertisementType.LANDLORD
  );
  const { getAllAdvertisementMutation } = useAdvertisementMutations();
  const getAllAdvertisementAPI = (data: any) => {
    getAllAdvertisementMutation.mutate(
      { ...data, advertiseType: typeOfSearch },
      {
        onSuccess: (data) => {
          setRoomData(data!.data.page);
        },
      }
    );
  };

  const searchAPI = (data: any) => {
    getAllAdvertisementAPI(data);
  };

  return (
    <Box>
      <Container sx={{ my: 4 }}>
        <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
          <CustomLoadingButton
            sx={{
              width: "100%",
              color:
                typeOfSearch === AdvertisementType.LANDLORD ? "#fff" : "#000",
              background:
                typeOfSearch === AdvertisementType.LANDLORD
                  ? "#44ABEB"
                  : "#ffffff",
              border:
                typeOfSearch !== AdvertisementType.LANDLORD
                  ? "1px solid #44ABEB"
                  : "none",
              "&:hover": {
                background:
                  typeOfSearch === AdvertisementType.LANDLORD
                    ? "#44ABEB"
                    : "#ffffff",
              },
            }}
            onClick={() => setTypeOfSearch(AdvertisementType.LANDLORD)}
          >
            I'm Looking for a Roommate
          </CustomLoadingButton>
          <CustomLoadingButton
            sx={{
              width: "100%",
              color:
                typeOfSearch === AdvertisementType.HUNTER ? "#fff" : "#000",
              background:
                typeOfSearch === AdvertisementType.HUNTER
                  ? "#E152B9"
                  : "#ffffff",
              border:
                typeOfSearch !== AdvertisementType.HUNTER
                  ? "1px solid #E152B9"
                  : "none",
              "&:hover": {
                background:
                  typeOfSearch === AdvertisementType.HUNTER
                    ? "#E152B9"
                    : "#ffffff",
              },
            }}
            onClick={() => setTypeOfSearch(AdvertisementType.HUNTER)}
          >
            I'm Looking for a Place
          </CustomLoadingButton>
        </Box>
        {typeOfSearch === AdvertisementType.HUNTER && (
          <SearchHunter searchAPI={searchAPI} />
        )}
        {typeOfSearch === AdvertisementType.LANDLORD && (
          <SearchLandlord searchAPI={searchAPI} />
        )}
        <SearchResults roomData={roomData} />
      </Container>
    </Box>
  );
};

export default SearchPage;
