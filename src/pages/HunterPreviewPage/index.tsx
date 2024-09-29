import { Box, Container, Grid } from "@mui/material";
import ProfileCard from "../../components/HunterPreviewPage/ProfileCard";
import HunterDescription from "../../components/HunterPreviewPage/HunterDescription";
const HunterPreviewPage: React.FC = () => {
  return (
    <Box>
      <Container>
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12}>
            <ProfileCard />
          </Grid>
          <Grid item xs={12}>
            <HunterDescription />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HunterPreviewPage;
