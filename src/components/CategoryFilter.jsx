import React from "react";
import { Select, Box } from "@chakra-ui/react";

const CategoryFilter = ({ value, onChange, categories }) => {
  return (
    <Box mx="auto" width="10%">
      <Select value={value} onChange={onChange} mb="4">
        <option value="All">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default CategoryFilter;
