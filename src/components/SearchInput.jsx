import React from "react";
import { Input, Box } from "@chakra-ui/react";

const SearchInput = ({ value, onChange }) => {
  return (
    <Box mx="auto" width="10%">
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