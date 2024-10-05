import {
  Avatar,
  Box,
  Container,
  Grid,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

const ChatsPage: React.FC = () => {
  return (
    <Box>
      <Container>
        <Typography
          sx={{
            fontSize: "50px",
            background:
              "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          mb={2}
        >
          Chats
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <OutlinedInput
                  fullWidth
                  size="small"
                  placeholder="Search By Name"
                />
              </Grid>
              {[1, 2, 3, 4, 5].map((item) => {
                return (
                  <Grid key={item} item xs={12} px={2} py={1}>
                    <Stack direction={"row"} spacing={3}>
                      <Avatar></Avatar>
                      <Stack direction={"column"} flex={1}>
                        <Typography variant="h6">Kira Izzabella</Typography>
                        <Typography variant="subtitle1">
                          Yes, I’d love to hangout in the balcony...
                        </Typography>
                      </Stack>
                      <Stack direction={"column"} alignItems={"flex-end"}>
                        <Typography variant="subtitle1">4:00 PM</Typography>
                        <Avatar
                          sx={{
                            width: "20px",
                            height: "20px",
                            bgcolor: "red",
                            color: "white",
                            fontSize: "10px",
                          }}
                        >
                          2
                        </Avatar>
                      </Stack>
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ChatsPage;
