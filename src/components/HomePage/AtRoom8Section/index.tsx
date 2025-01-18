import { Box, Container, Typography } from "@mui/material";
import RoomBackImage from "../../../assets/images/atroom8.png";
import GradientMark from "../../comman/GradientMark";
const AtRoom8Section: React.FC = () => {
  return (
    <Box
      sx={{
        px: {
          xs: 1,
          md: 4,
        },
        py: {
          xs: 10,
          md: 10,
        },
      }}
    >
      <Container sx={{
        px: {
          xs: 1,
          md: "0 !important"
        }
      }}>
        <Box
          sx={{
            backgroundColor: "white",
            backgroundImage: `url(${RoomBackImage})`, // URL to your image
            backgroundSize: "cover",
            width: "100%",
            height: { xs: "auto", md: "265px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            // boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)", // White shadow
            transition: "box-shadow 0.3s ease-in-out",
            boxShadow: "31px 39px 88.17px 0px #5165AB42",
            borderRadius: "20px",
            px: {
              xs: 1,
              md: 4,
            },
            py: {
              xs: 1,
              md: 10,
            },
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "42px",
              background:
                "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              fontWeight: "bold",
            }}
            variant="h2"
          >
            <GradientMark />
            &nbsp;At Room8,
          </Typography>
          <Typography
            sx={{
              mt: 2,
              fontSize: "22px",
              lineHeight: '33px',
              color: "#6D778A",
              fontWeight: 600
            }}
            variant="subtitle1"
          >
            We believe that looking for a roommate and a new apartment should
            not be a nightmare. With our tools, we will make it an adventure -
            easy, fast and, most importantly, effective. Join our community and
            find a place you will love!"
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
export default AtRoom8Section;
