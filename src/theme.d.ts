// src/theme.d.ts
import { PaletteOptions } from "@mui/material/styles/createPalette";
import { Theme } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
  interface PaletteOptions {
    custom?: Object
  }
}

declare module "@mui/material/styles" {
  interface Theme {
    palette: Palette;
  }

  interface ThemeOptions {
    palette?: PaletteOptions;
  }
}
