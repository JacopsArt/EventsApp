import React from "react";
import { Input, Box } from "@chakra-ui/react";

const CategoryFilter = ({ value, onChange, categories }) => {
  if (!categories) {
    return null;
  }

  return (
    <Box mx="auto" width={{ base: "80%", md: "40%", lg: "20%" }}>
      {" "}
      <Input placeholder="Category" value={value} onChange={onChange} mb="4" />
    </Box>
  );
};

export default CategoryFilter;
