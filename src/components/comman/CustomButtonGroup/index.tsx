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
              position: "relative",
              background: isSelected(item.value)
                ? "linear-gradient(to right, rgba(74, 177, 241, 0.2), rgba(86, 108, 236, 0.2), rgba(215, 73, 175, 0.2), rgba(255, 124, 81, 0.2))"
                : "transparent",
              // Remove the regular border
              border: "none",
              // Add padding to account for pseudo-element border
              padding: "11px 21px", // 1px more than original to account for border
              color: isSelected(item.value) ? "#000000" : "#6D778A",
              letterSpacing: "0.5px",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "500",
              // Add positioning context for pseudo-element
              isolation: "isolate",
              // Add gradient border using pseudo-element
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "8px",
                padding: "1px", // Border width
                background:
                  "linear-gradient(to right, #4AB1F1, #566CEC, #D749AF, #FF7C51)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                pointerEvents: "none",
                zIndex: 1,
              },
              "&:hover": {
                borderRadius: "8px",
                background:
                  "linear-gradient(to right, rgba(74, 177, 241, 0.2), rgba(86, 108, 236, 0.2), rgba(215, 73, 175, 0.2), rgba(255, 124, 81, 0.2))",
                // No need for borderImage on hover
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
