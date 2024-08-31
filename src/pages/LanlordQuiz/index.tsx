import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import Step1 from "../../components/LanlordPage/Step1";
import Step2 from "../../components/LanlordPage/Step2";
import Step3 from "../../components/LanlordPage/Step3";
const LandlordQuiz: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(1);

  const updateTabIndex = () => {
    setTabIndex(tabIndex + 1);
  };
  return (
    <Box>
      <Container>
        {tabIndex === 1 && <Step1 updateTabIndex={updateTabIndex} />}
        {tabIndex === 2 && <Step2 updateTabIndex={updateTabIndex} />}
        {tabIndex === 3 && <Step3 updateTabIndex={updateTabIndex} />}
      </Container>
    </Box>
  );
};

export default LandlordQuiz;
