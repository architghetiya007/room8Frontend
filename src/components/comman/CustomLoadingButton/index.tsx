import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { SxProps, Theme } from "@mui/material/styles";

interface CustomLoadingButtonProps {
  children?: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  sx?: SxProps<Theme>; // Optional additional styles
  disabled?: boolean;
}

const CustomLoadingButton: React.FC<CustomLoadingButtonProps> = ({
  children,
  loading = false,
  onClick,
  type = "button",
  sx = {},
  disabled = false,
}) => {
  return (
    <LoadingButton
      sx={{
        background:
          "linear-gradient(to right, #4AB1F1, #566CEC, #D749AF, #FF7C51)",
        p: 1,
        borderRadius: "8px",
        color: "white",
        textTransform: "none",
        letterSpacing: "1px",
        fontWeight: "600",
        fontSize: "24px",
        "&:hover": {
          background:
            "linear-gradient(to right, #3A91D1, #445BCC, #B6389F, #E36B41)",
        },
        ...sx, // Allow additional custom styles
      }}
      type={type}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
    >
      {children}
    </LoadingButton>
  );
};

export default CustomLoadingButton;
