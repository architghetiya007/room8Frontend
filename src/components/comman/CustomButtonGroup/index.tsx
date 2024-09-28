import { ButtonGroup, Button } from "@mui/material";
import React from "react";
interface Options {
  name: string;
  value: string;
}
interface CustomButtonGroupProps {
  options: Options[];
  optionClick: Function;
  selectionOption: string;
}
const CustomButtonGroup: React.FC<CustomButtonGroupProps> = ({
  options,
  optionClick,
  selectionOption,
}) => {
  return (
    <ButtonGroup
      // variant="contained"
      aria-label="outlined primary button group"
      sx={{
        boxShadow: "none",
        flexDirection: {
          xs: "column", // Column direction for small screens (700px and below)
          sm: "row",    // Row direction for medium screens and up
        },
        // "& > *": { margin: "0 8px" },
        "& .MuiButton-root": {
          // margin: 1, // Adjust spacing here
          width: "100%",
          // p: 1,
          borderRadius: 1,
        },
        width: "100%",
        gap: 1,
      }} // Adjust spacing here
    >
      {options.map((item) => {
        return (
          <Button
            sx={{
              background:
                selectionOption === item.value ? "linear-gradient(to right, rgba(74, 177, 241, 0.2), rgba(86, 108, 236, 0.2), rgba(215, 73, 175, 0.2), rgba(255, 124, 81, 0.2))" : 'transparent',
              border: "2px solid",
              borderImage:
                "linear-gradient(to right, #4AB1F1, #566CEC, #D749AF, #FF7C51) 1",
              color: "#000",
              borderRadius: "8px",
              padding: "10px 20px",
              "&:hover": {
                background:
                  "linear-gradient(to right, rgba(74, 177, 241, 0.2), rgba(86, 108, 236, 0.2), rgba(215, 73, 175, 0.2), rgba(255, 124, 81, 0.2))",
                borderImage:
                  "linear-gradient(to right, #4AB1F1, #566CEC, #D749AF, #FF7C51) 1",
              },
            }}
            onClick={() => optionClick(item)}
            key={item.value}
          >
            {item.name}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
export default CustomButtonGroup;
