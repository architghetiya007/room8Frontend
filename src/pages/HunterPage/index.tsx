import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import Step1 from "../../components/HunterPage/Step1";
import Step2 from "../../components/HunterPage/Step2";

const HunterPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(1);


  const updateTabIndex = () => {
    setTabIndex(tabIndex + 1);
  };
  return (
    <Box>
      <Container>
        {tabIndex === 1 && <Step1 updateTabIndex={updateTabIndex} />}
        {tabIndex === 2 && <Step2 updateTabIndex={updateTabIndex} />}
      </Container>
    </Box>
  );
};

export default HunterPage;
