import { Typography } from "@mui/material";

interface CommanTypographyProps {
  title: string;
}

const CommanTypography: React.FC<CommanTypographyProps> = ({ title }) => {
  return (
    <Typography
      sx={{ fontWeight: 600, color: "#3B3D44", fontSize: "28px" }}
    >
      {title}
    </Typography>
  );
};

export default CommanTypography;
