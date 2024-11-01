import { Typography } from "@mui/material";
interface PreviewTypographyProps {
  title: String;
  desc?: string;
}
const PreviewTypography: React.FC<PreviewTypographyProps> = ({
  title,
  desc,
}) => {
  return (
    <Typography
      sx={{
        fontWeight: 500,
        color: "#3B3D44",
        fontSize: "20px",
        border: "1px solid #FBE0EA",
        borderRadius: 2,
        p: 1,
      }}
    >
      {title}
      {desc && (
        <Typography
          component={"span"}
          sx={{ fontWeight: 500, color: "#3B3D44", fontSize: "20px" }}
        >
          {desc}
        </Typography>
      )}
    </Typography>
  );
};

export default PreviewTypography;
