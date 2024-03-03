// src/pages/EventsPage.jsx
import React, { useState } from "react";
import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEvents } from "../EventsContext";
import AddEventModal from "../components/AddEventModal";
import SearchInput from "../components/SearchInput";
import CategoryFilter from "../components/CategoryFilter";

export const EventsPage = () => {
  const { events, categories } = useEvents();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredEvents = events.filter((event) => {
    const titleMatch = event.title.toLowerCase().includes(searchTerm);
    const descriptionMatch = event.description
      .toLowerCase()
      .includes(searchTerm);
    const categoryMatch =
      selectedCategory === "All" ||
      event.categoryIds.includes(parseInt(selectedCategory));

    return (titleMatch || descriptionMatch) && categoryMatch;
  });

  const getCategoryNames = (categoryIds) => {
    if (!categories || !categoryIds || !Array.isArray(categoryIds)) {
      return "No categories";
    }
    return categoryIds
      .map((id) => categories.find((cat) => cat.id === id)?.name || "Unknown")
      .join(", ");
  };

  if (!filteredEvents.length) {
    return <Box>No events found</Box>;
  }

  return (
    <Box>
      <Heading as="h1" size="xl" mb="4">
        List of Events
      </Heading>
      <SearchInput value={searchTerm} onChange={handleSearchChange} />
      <CategoryFilter
        value={selectedCategory}
        onChange={handleCategoryChange}
        categories={categories}
      />
      {filteredEvents.map((event) => (
        <Link
          to={`/event/${event.id}`}
          key={event.id}
          style={{ textDecoration: "none" }}
        >
          <Box
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mb="4"
          >
            <Heading as="h2" size="lg">
              {event.title}
            </Heading>
            <Image src={event.image} alt={event.title} mb="2" />
            <Text fontSize="md">Description: {event.description}</Text>
            <Text fontSize="md">Start Time: {event.startTime}</Text>
            <Text fontSize="md">End Time: {event.endTime}</Text>
            <Text fontSize="md">
              Categories: {getCategoryNames(event.categoryIds)}
            </Text>
          </Box>
        </Link>
      ))}
      <Button colorScheme="blue" mt="4" onClick={onOpen}>
        Add Event
      </Button>
      <AddEventModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default EventsPage;
