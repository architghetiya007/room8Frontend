import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Step1 from "../../components/LanlordPage/Step1";
import Step2 from "../../components/LanlordPage/Step2";
import Step3 from "../../components/LanlordPage/Step3";
import Step31 from "../../components/LanlordPage/Step31";
interface LandlordPageProps {
  activePage: number;
}
const LandlordPage: React.FC<LandlordPageProps> = ({ activePage }) => {
  const [tabIndex, setTabIndex] = useState<number>(1);

  useEffect(() => {
    if (activePage === 1) {
      setTabIndex(activePage);
    } else if (activePage === 2) {
      setTabIndex(activePage);
    } else if (activePage === 3) {
      setTabIndex(activePage);
    } else if (activePage === 31) {
      setTabIndex(activePage);
    }
  }, [activePage]); // Dependencies to re-run effect on changes

  const updateTabIndex = () => {
    setTabIndex(tabIndex + 1);
  };
  return (
    <Box>
      <Container>
        {tabIndex === 1 && <Step1 updateTabIndex={updateTabIndex} />}
        {tabIndex === 2 && <Step2 updateTabIndex={updateTabIndex} />}
        {tabIndex === 3 && <Step3 updateTabIndex={updateTabIndex} />}
        {tabIndex === 31 && <Step31 updateTabIndex={updateTabIndex} />}
      </Container>
    </Box>
  );
};

export default LandlordPage;
