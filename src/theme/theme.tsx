import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Maccan", "Arial", sans-serif',
    // h1: {
    //   fontSize: "50px", // H1 desktop font size
    //   fontWeight: 400, // Regular by default, change to Medium, SemiBold, Bold if needed
    // },
    // h2: {
    //   fontSize: "42px", // H2 desktop font size
    //   fontWeight: 400,
    // },
    // h3: {
    //   fontSize: "30px", // H3 desktop font size
    //   fontWeight: 400,
    // },
    // h4: {
    //   fontSize: "24px", // H4 desktop font size
    //   fontWeight: 400,
    // },
    // h5: {
    //   fontSize: "22px", // H5 desktop font size
    //   fontWeight: 400,
    // },
    // h6: {
    //   fontSize: "20px", // H6 desktop font size
    //   fontWeight: 400,
    // },
    // body1: {
    //   fontSize: "22px", // Body text large size
    //   fontWeight: 400,
    // },
    // body2: {
    //   fontSize: "18px", // Body text medium size
    //   fontWeight: 400,
    // },
    // subtitle1: {
    //   fontSize: "16px", // Subtitle or small body text
    //   fontWeight: 400,
    // },
    // subtitle2: {
    //   fontSize: "15px", // Even smaller body text
    //   fontWeight: 400,
    // },
    // caption: {
    //   fontSize: "14px", // Smallest body text
    //   fontWeight: 400,
    // },
  },
  palette: {
    primary: {
      main: "#44ABEB",
    },
    secondary: {
      main: "#E152B9",
    },
    custom: {
      blackDark: "#373940",
      blackDarkGray: "#6D778A",
      white: "#ffffff",
      darkRed: "#FF445E",
    },
    text: {
      primary: "#3B3D44",
    },
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        root: {
          color: "black", // This sets the rail and track color as default (for track unfilled)
        },
        thumb: {
          color: "white", // Red outer circle for the thumb
          border: "7px solid red", // White inside the thumb (center)
          width: 25, // Adjust thumb size if needed
          height: 25,
        },
        track: {
          color: "black", // Track filled part (black)
        },
        rail: {
          color: "black", // Rail unfilled part (black)
        },
      },
    },
  },
});
export default theme;
