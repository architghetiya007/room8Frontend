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
});
export default theme;
