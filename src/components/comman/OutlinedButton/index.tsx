import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { SxProps, Theme } from "@mui/material/styles";

interface OutlinedButtonProps {
  children?: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  sx?: SxProps<Theme>; // Optional additional styles
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  children,
  loading = false,
  onClick,
  type = "button",
  sx = {},
}) => {
  return (
    <LoadingButton
      sx={{
        background: "transparent",
        width: "100%",
        p: 1,
        borderRadius: "8px",
        color: "black",
        textTransform: "none",
        letterSpacing: "1px",
        fontWeight: "500",
        fontSize: "24px",
        border: "1px solid #3B3D44",
        ...sx, // Allow additional custom styles
      }}
      type={type}
      onClick={onClick}
      loading={loading}
    >
      {children}
    </LoadingButton>
  );
};

export default OutlinedButton;
