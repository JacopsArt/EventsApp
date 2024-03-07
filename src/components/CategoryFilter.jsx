import React from "react";
import { Input, Box } from "@chakra-ui/react";

const CategoryFilter = ({ value, onChange, categories }) => {
  // Controleer of categories beschikbaar is voordat de component rendert
  if (!categories) {
    return null; // of toon een laadindicator, afhankelijk van je ontwerp
  }

  return (
    <Box mx="auto" width="300px">
      <Input
        placeholder="Filter by category"
        value={value}
        onChange={onChange}
        mb="4"
      />
    </Box>
  );
};

export default CategoryFilter;
