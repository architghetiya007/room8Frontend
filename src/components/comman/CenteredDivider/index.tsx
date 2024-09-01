import { Box, Divider, Typography, styled } from "@mui/material";

const DividerWithText = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  margin: theme.spacing(1, 0),
  "& .divider": {
    flexGrow: 1,
  },
  "& .text": {
    margin: theme.spacing(0, 2),
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
  },
}));
interface CenteredDividerProps {
  text: string;
}
const CenteredDivider: React.FC<CenteredDividerProps> = ({ text }) => {
  return (
    <DividerWithText>
      <Divider className="divider" />
      <Typography variant="caption" className="text">
        {text}
      </Typography>
      <Divider className="divider" />
    </DividerWithText>
  );
};

export default CenteredDivider;
