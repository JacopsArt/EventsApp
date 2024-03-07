import React from "react";
import { Box, Container } from "@chakra-ui/react";

const Styling = ({ children }) => {
  return (
    <Box bg="#E5D8C8" minHeight="100vh">
      <Container maxW="80%" pt="6">
        {children}
      </Container>
    </Box>
  );
};

export default Styling;
