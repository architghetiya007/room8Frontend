import { Box, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AdvertisementData } from "../../../types/advertisement";
import { AdvertisementType } from "../../../utils/advertisement";
import RoomCard from "../../Room/RoomCard";
interface SearchResultsProps {
  roomData: AdvertisementData[];
}
const SearchResults: React.FC<SearchResultsProps> = ({ roomData }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Container>
        <Typography variant="h5" my={4}>
          Available search results ({roomData.length})
        </Typography>
        <Grid container spacing={2}>
          {roomData.map((item) => {
            return (
              <Grid
                onClick={() =>
                  item.advertiseType === AdvertisementType.HUNTER
                    ? navigate(`/hunter-preview/${item._id}`)
                    : navigate(`/landlord-preview/${item._id}`)
                }
                key={item._id}
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
              >
                <RoomCard advertisement={item} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchResults;
