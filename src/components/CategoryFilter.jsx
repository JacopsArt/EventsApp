import React from "react";
import { Input, Box } from "@chakra-ui/react";

const CategoryFilter = ({ value, onChange, categories }) => {
  const handleChange = (e) => {
    if (e.target && onChange) {
      onChange(e.target.value);
    }
  };

  if (!categories) {
    return null;
  }

  return (
    <Box mx="auto" width={{ base: "80%", md: "40%", lg: "20%" }}>
      <Input
        id="category-filter"
        name="category-filter"
        placeholder="Category"
        value={value}
        onChange={handleChange}
        mb="4"
      />
    </Box>
  );
};


export default CategoryFilter;
