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
      variant="contained"
      aria-label="outlined primary button group"
      sx={{
        boxShadow: "none",
        "& > *": { margin: "0 8px" },
        "& .MuiButton-root": {
          margin: 1, // Adjust spacing here
          width: "100%",
          p: 1,
          borderRadius: 1,
        },
        width: "100%",
      }} // Adjust spacing here
    >
      {options.map((item) => {
        return (
          <Button
            sx={{
              backgroundColor:
                selectionOption === item.value ? "black" : "blue",
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
