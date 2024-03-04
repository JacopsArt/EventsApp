import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box borderBottom="1px solid black" py="2" px="3rem">
      <Flex justify="space-between" align="center">
        <Link to="/">
          <Button colorScheme="blue">Events</Button>
        </Link>
      </Flex>
    </Box>
  );
};
