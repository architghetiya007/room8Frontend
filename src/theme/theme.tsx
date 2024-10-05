import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Maccan", "Arial", sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1.2,
      "@media (max-width:600px)": {
        fontSize: "2.5rem", // Responsive font size for mobile
      },
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
      "@media (max-width:600px)": {
        fontSize: "1.75rem",
      },
    },
    h4: {
      fontSize: "1.75rem",
      fontWeight: 500,
      "@media (max-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 500,
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 500,
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      "@media (max-width:600px)": {
        fontSize: "0.875rem",
      },
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.43,
      "@media (max-width:600px)": {
        fontSize: "0.75rem",
      },
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.75,
      "@media (max-width:600px)": {
        fontSize: "0.875rem",
      },
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57,
      "@media (max-width:600px)": {
        fontSize: "0.75rem",
      },
    },
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
