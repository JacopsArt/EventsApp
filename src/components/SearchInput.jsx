import React from "react";
import { Input, Box } from "@chakra-ui/react";

const SearchInput = ({ value, onChange }) => {
  return (
    <Box mx="auto" width={{ base: "80%", md: "40%", lg: "20%" }}>
      {" "}
  
      <Input
        placeholder="Search events"
        value={value}
        onChange={onChange}
        mb="4"
      />
    </Box>
  );
};

export default SearchInput;
