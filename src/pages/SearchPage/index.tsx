import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import SearchHunter from "../../components/SearchPage/SearchHunter";
import CustomLoadingButton from "../../components/comman/CustomLoadingButton";
import SearchLandlord from "../../components/SearchPage/SearchLandlord";
import { LookingForEnum } from "../../utils/advertisement";
import SearchResults from "../../components/SearchPage/SearchResults";
import useAdvertisementMutations from "../../mutations/advertisement";
import { AdvertisementData } from "../../types/advertisement";

const SearchPage: React.FC = () => {
  const [roomData, setRoomData] = useState<AdvertisementData[]>([]);
  const [typeOfSearch, setTypeOfSearch] = useState<string>(
    LookingForEnum.LookingForRoomMates
  );
  const { getAllAdvertisementMutation } = useAdvertisementMutations();
  const getAllAdvertisementAPI = (data: any) => {
    const obj: any = {
      advertiseType: typeOfSearch,
    };
    if (obj.advertiseType === LookingForEnum.LookingForPlace) {
      obj[LookingForEnum.LookingForPlace] = data;
    } else {
      obj[LookingForEnum.LookingForRoomMates] = data;
    }
    console.log(obj);
    getAllAdvertisementMutation.mutate(
      { ...obj },
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
      <Container sx={{ my: 4,px: {
          xs: 2,
          md: "0 !important"
        } }}>
        <Box sx={{ width: "100%", display: "flex", gap: 1, flexWrap: {
          xs: 'wrap',
          md: "nowrap"
        } }}>
          <CustomLoadingButton
            sx={{
              width: "100%",
              height: "72px",
              color:
                typeOfSearch === LookingForEnum.LookingForRoomMates
                  ? "#fff"
                  : "#000",
              background:
                typeOfSearch === LookingForEnum.LookingForRoomMates
                  ? "#44ABEB"
                  : "#ffffff",
              border:
                typeOfSearch !== LookingForEnum.LookingForRoomMates
                  ? "1px solid #44ABEB"
                  : "none",
              "&:hover": {
                background:
                  typeOfSearch === LookingForEnum.LookingForRoomMates
                    ? "#44ABEB"
                    : "#ffffff",
              },
            }}
            onClick={() => setTypeOfSearch(LookingForEnum.LookingForRoomMates)}
          >
            I'm Looking for a Roommate
          </CustomLoadingButton>
          <CustomLoadingButton
            sx={{
              width: "100%",
              height: "72px",
              color:
                typeOfSearch === LookingForEnum.LookingForPlace
                  ? "#fff"
                  : "#000",
              background:
                typeOfSearch === LookingForEnum.LookingForPlace
                  ? "#E152B9"
                  : "#ffffff",
              border:
                typeOfSearch !== LookingForEnum.LookingForPlace
                  ? "1px solid #E152B9"
                  : "none",
              "&:hover": {
                background:
                  typeOfSearch === LookingForEnum.LookingForPlace
                    ? "#E152B9"
                    : "#ffffff",
              },
            }}
            onClick={() => setTypeOfSearch(LookingForEnum.LookingForPlace)}
          >
            I'm Looking for a Place
          </CustomLoadingButton>
        </Box>
        {typeOfSearch === LookingForEnum.LookingForPlace && (
          <SearchHunter searchAPI={searchAPI} />
        )}
        {typeOfSearch === LookingForEnum.LookingForRoomMates && (
          <SearchLandlord searchAPI={searchAPI} />
        )}
        <SearchResults roomData={roomData} />
      </Container>
    </Box>
  );
};

export default SearchPage;
