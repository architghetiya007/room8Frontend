import { Typography } from "@mui/material";

interface CommanTypographyProps {
  title: string;
}

const CommanTypography: React.FC<CommanTypographyProps> = ({ title }) => {
  return <Typography variant="h5">{title}</Typography>;
};

export default CommanTypography;
