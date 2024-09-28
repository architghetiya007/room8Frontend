import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Maccan", "Arial", sans-serif',
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
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        root: {
          color: 'black', // This sets the rail and track color as default (for track unfilled)
        },
        thumb: {
          color: 'white', // Red outer circle for the thumb
          border: '7px solid red', // White inside the thumb (center)
          width: 25, // Adjust thumb size if needed
          height: 25,
        },
        track: {
          color: 'black', // Track filled part (black)
        },
        rail: {
          color: 'black', // Rail unfilled part (black)
        },
      },
    },
  }
});
export default theme;
