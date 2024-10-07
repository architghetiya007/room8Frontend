import { ButtonGroup, Button } from "@mui/material";
import React from "react";

interface Options {
  name: string;
  value: string;
}

interface CustomButtonGroupProps {
  options: Options[];
  optionClick: (selectedOption: string | string[]) => void;
  selectionOption: string | string[]; // Can be a string (single) or array (multi)
  multiSelect?: boolean; // New prop to handle multi-select
}

const CustomButtonGroup: React.FC<CustomButtonGroupProps> = ({
  options,
  optionClick,
  selectionOption,
  multiSelect = false, // Default to single-select mode if not provided
}) => {
  const handleOptionClick = (itemValue: string) => {
    if (multiSelect) {
      // Multi-select mode
      if (Array.isArray(selectionOption)) {
        const isSelected = selectionOption.includes(itemValue);
        const updatedSelection = isSelected
          ? selectionOption.filter((value) => value !== itemValue) // Deselect
          : [...selectionOption, itemValue]; // Select
        optionClick(updatedSelection); // Pass the updated selection array
      }
    } else {
      // Single-select mode
      optionClick(itemValue); // Pass the single selected value
    }
  };

  const isSelected = (itemValue: string) => {
    return multiSelect
      ? Array.isArray(selectionOption) && selectionOption.includes(itemValue)
      : selectionOption === itemValue;
  };

  return (
    <ButtonGroup
      aria-label="outlined primary button group"
      sx={{
        boxShadow: "none",
        flexDirection: {
          xs: "column", // Column direction for small screens (700px and below)
          sm: "row", // Row direction for medium screens and up
        },
        "& .MuiButton-root": {
          width: "100%",
          borderRadius: 1,
        },
        width: "100%",
        gap: 1,
      }}
    >
      {options.map((item) => {
        return (
          <Button
            sx={{
              background: isSelected(item.value)
                ? "linear-gradient(to right, rgba(74, 177, 241, 0.2), rgba(86, 108, 236, 0.2), rgba(215, 73, 175, 0.2), rgba(255, 124, 81, 0.2))"
                : "transparent",
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
            onClick={() => handleOptionClick(item.value)}
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
