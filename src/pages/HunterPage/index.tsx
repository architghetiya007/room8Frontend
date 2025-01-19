import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Step1 from "../../components/HunterPage/Step1";
import Step2 from "../../components/HunterPage/Step2";
interface HunterPageProps {
  activePage: number;
}
const HunterPage: React.FC<HunterPageProps> = ({ activePage }) => {
  const [tabIndex, setTabIndex] = useState<number>(activePage ?? 1);

  useEffect(() => {
    if (activePage === 1) {
      setTabIndex(activePage);
    } else if (activePage === 2) {
      setTabIndex(activePage);
    }
  }, [activePage]); // Dependencies to re-run effect on changes

  const updateTabIndex = () => {
    setTabIndex(tabIndex + 1);
  };
  return (
    <Box>
      <Container sx={{
        px: {
          xs: 2,
          md: "0 !important"
        }
      }}>
        {tabIndex === 1 && <Step1 updateTabIndex={updateTabIndex} />}
        {tabIndex === 2 && <Step2 updateTabIndex={updateTabIndex} />}
      </Container>
    </Box>
  );
};

export default HunterPage;
