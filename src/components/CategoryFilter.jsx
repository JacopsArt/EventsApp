import React from "react";
import { Input, Box } from "@chakra-ui/react";

const CategoryFilter = ({ value, onChange, categories }) => {
  if (!categories) {
    return null; 
  }

  return (
    <Box mx="auto" width="10%">
      <Input
        placeholder="Category"
        value={value}
        onChange={onChange}
        mb="4"
      />
    </Box>
  );
};

export default CategoryFilter;
