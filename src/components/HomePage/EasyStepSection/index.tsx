import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import Step1 from "../../../assets/images/Step1.png";
import Step2 from "../../../assets/images/Step2.png";
import Step3 from "../../../assets/images/Step3.png";
const EasyStepSection: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const Line = (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: { xs: "20px", md: "0%" },
        transform: { xs: "none", md: "translateX(-50%)" },
        width: { xs: "2px", md: "4px" },
        height: "100%",
        backgroundColor: "#DCE6F5",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: `${33.33 + 16}%`, // Adjust circles position for each step
          left: "50%",
          transform: "translateX(-50%)",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background:
            "linear-gradient(to right, #4AB1F1, #566CEC, #D749AF, #FF7C51)",
        }}
      />
    </Box>
  );

  const LineWithoutDot = (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: { xs: "20px", md: "0%" },
        transform: { xs: "none", md: "translateX(-50%)" },
        width: { xs: "2px", md: "4px" },
        height: "100%",
        backgroundColor: "#DCE6F5",
        zIndex: 1,
      }}
    ></Box>
  );
  return (
    <Box py={4}>
      <Container sx={{
        px: {
          xs: 3,
          md: "0 !important"
        }
      }}>
        <Grid container spacing={4} p={0}>
          <Grid item xs={12} mb={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row", // Arrange items in a row
                alignItems: "center", // Align items vertically in the center
                justifyContent: "center", // Center items horizontally
                textAlign: "center", // Center text
                flexWrap: "wrap", // Wrap items if necessary
                maxWidth: "1000px",
                ml: "auto",
                mr: "auto",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  marginRight: 2,
                  fontSize: "40px",
                  fontWeight: "bold",
                  lineHeight: {
                    xs: "42px",
                    md: "53px",
                  },
                }}
              >
                Find the
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "40px",
                  background:
                    "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginRight: 2, // Space between the text
                  fontWeight: "bold",
                  lineHeight: {
                    xs: "42px",
                    md: "53px",
                  },
                }}
              >
                Perfect Roommate,
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  marginRight: 2,
                  fontSize: "40px",
                  fontWeight: "bold",
                  lineHeight: {
                    xs: "42px",
                    md: "53px",
                  },
                }}
              >
                Room or
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  marginRight: 2,
                  fontSize: "40px",
                  fontWeight: "bold",
                  lineHeight: {
                    xs: "42px",
                    md: "53px",
                  },
                }}
              >
                Apartment in
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "40px",
                  background:
                    "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                  lineHeight: {
                    xs: "42px",
                    md: "53px",
                  },
                }}
              >
                3 Easy Steps
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display={"flex"}
            gap={2}
            flexDirection={"column"}
            position={"relative"}
            p={2}
          >
            <Box
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                },
              }}
            >
              {Line}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                pl: {
                  xs: 1,
                  md: 0,
                },
                pr: {
                  xs: 0,
                  md: 4,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  background:
                    "linear-gradient( #4AB1F1 0.58%, #566CEC 37.22%, #D749AF 73.87%, #FF7C51 112.26%);",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textAlign: "start",
                  WebkitBackgroundClip: "text", // For WebKit browsers (Chrome, Safari)
                  fontWeight: "bold",
                  marginTop: "45px",
                }}
              >
                STEP 1
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#3B3D44" }}
              >
                Create a Profile and specify your preferences
              </Typography>
              <Typography sx={{ color: "#6D778A", mb: { xs: 8, md: 0 } }}>
                Create your Room8 account and immerse yourself in the ocean of
                possibilities by adding your preferences regarding accommodation
                and flatmate.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} position={"relative"}>
            {/* {Line} */}
            {isSmallScreen ? LineWithoutDot : Line}
              <Box
                component={"img"}
                sx={{
                  // maxWidth: {
                  //   xs: "100%",
                  //   md: "266px",
                  // },
                  ml: "auto",
                  mr: "auto",
                  marginTop: "-35px",
                  height: "385px",
                  pl: {
                    xs: 0,
                    md: 4,
                  },
                }}
                src={Step1}
              ></Box>
          </Grid>
          {isSmallScreen ? (
            <>
              <Grid
                item
                xs={12}
                md={6}
                display={"flex"}
                gap={2}
                flexDirection={"column"}
                position={"relative"}
                p={2}
              >
                {Line}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    pl: {
                      xs: 1,
                      md: 4,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "24px",
                      background:
                        "linear-gradient( #4AB1F1 0.58%, #566CEC 37.22%, #D749AF 73.87%, #FF7C51 112.26%);",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textAlign: "start",
                      WebkitBackgroundClip: "text", // For WebKit browsers (Chrome, Safari)
                      fontWeight: "bold",
                      marginTop: "84px",
                    }}
                  >
                    STEP 2
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "#3B3D44" }}
                  >
                    Discover Matches - Don't waste time searching
                  </Typography>
                  <Typography sx={{ color: "#6D778A" }}>
                    Find or be found. Thanks to the intelligent matching system,
                    we will quickly match you with a place or roommate that
                    perfectly suits your preferences.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} position={"relative"}>
                <Box
                  sx={{
                    display: {
                      xs: "block",
                      md: "none",
                    },
                  }}
                >
                  {/* {Line} */}
                  {isSmallScreen ? LineWithoutDot : Line}
                </Box>
                <Stack>
                  <Box
                    component={"img"}
                    sx={{
                      // maxWidth: {
                      //   xs: "100%",
                      //   md: "266px",
                      // },
                      ml: "auto",
                      mr: "auto",
                      height: "385px",
                      width: "100%",
                      pl: {
                        xs: 1,
                        md: 0,
                      },
                    }}
                    src={Step2}
                  ></Box>
                </Stack>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} md={6} position={"relative"}>
                <Box
                  sx={{
                    display: {
                      xs: "block",
                      md: "none",
                    },
                  }}
                >
                  {Line}
                </Box>
                <Stack
                  sx={{
                    pr: {
                      xs: 0,
                      md: 10,
                    },
                  }}
                >
                  <Box
                    component={"img"}
                    sx={{
                      // maxWidth: {
                      //   xs: "100%",
                      //   md: "266px",
                      // },
                      ml: "auto",
                      mr: "auto",
                      height: "385px",
                      width: "100%",
                    }}
                    src={Step2}
                  ></Box>
                </Stack>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                display={"flex"}
                gap={2}
                flexDirection={"column"}
                position={"relative"}
                p={2}
              >
                {Line}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    pl: 4,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "24px",
                      background:
                        "linear-gradient( #4AB1F1 0.58%, #566CEC 37.22%, #D749AF 73.87%, #FF7C51 112.26%);",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textAlign: "start",
                      WebkitBackgroundClip: "text", // For WebKit browsers (Chrome, Safari)
                      fontWeight: "bold",
                      marginTop: "84px",
                    }}
                  >
                    STEP 2
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "#3B3D44" }}
                  >
                    Discover Matches - Don't waste time searching
                  </Typography>
                  <Typography sx={{ color: "#6D778A" }}>
                    Find or be found. Thanks to the intelligent matching system,
                    we will quickly match you with a place or roommate that
                    perfectly suits your preferences.
                  </Typography>
                </Box>
              </Grid>
            </>
          )}

          <Grid
            item
            xs={12}
            md={6}
            display={"flex"}
            gap={2}
            flexDirection={"column"}
            position={"relative"}
            p={2}
          >
            <Box
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                },
                pr: {
                  xs: 0,
                  md: 4,
                },
              }}
            >
              {Line}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                pl: {
                  xs: 1,
                  md: 0,
                },
                pr: {
                  xs: 0,
                  md: 4,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  background:
                    "linear-gradient( #4AB1F1 0.58%, #566CEC 37.22%, #D749AF 73.87%, #FF7C51 112.26%);",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textAlign: "start",
                  WebkitBackgroundClip: "text", // For WebKit browsers (Chrome, Safari)
                  fontWeight: "bold",
                  marginTop: "35px",
                }}
              >
                STEP 3
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#3B3D44" }}
              >
                Contact and Build a Harmonious Community
              </Typography>
              <Typography sx={{ color: "#6D778A" }}>
                Communicate with the person or property of your choice to
                arrange details and support a harmonious living experience for
                both parties.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} position={"relative"}>
            {isSmallScreen ? LineWithoutDot : Line}
            <Stack
              sx={{
                pl: {
                  xs: 0,
                  md: 4,
                },
              }}
            >
              <Box
                component={"img"}
                sx={{
                  // maxWidth: {
                  //   xs: "100%",
                  //   md: "266px",
                  // },
                  width: "100%",
                  ml: "auto",
                  mr: "auto",
                  height: {
                    xs: "240px",
                    md: "280px",
                  },
                  pl: {
                    xs: 4,
                    md: 0,
                  },
                }}
                src={Step3}
              ></Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EasyStepSection;
