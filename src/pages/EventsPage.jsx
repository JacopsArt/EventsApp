// pages/EventsPage.jsx
import React, { useState } from "react";
import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  useDisclosure,
  Grid,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AddEventModal from "../components/AddEventModal";
import SearchInput from "../components/SearchInput";
import CategoryFilter from "../components/CategoryFilter";

export const EventsPage = ({ events, setEvents, categories }) => {
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

  return (
    <Box maxW="1200px" mx="auto" px="2rem">
      {/* Search and Category Filters */}
      <Box mb="2rem" textAlign="center">
        <Heading as="h2" size="lg" mb="2">
          List of Events
        </Heading>
        <Box mb="1rem">
          <SearchInput value={searchTerm} onChange={handleSearchChange} />
        </Box>
        <Box>
          <CategoryFilter
            value={selectedCategory}
            onChange={handleCategoryChange}
            categories={categories}
          />
        </Box>
      </Box>
      {/* Events Grid */}
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={6}
        alignItems="center"
      >
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
              <Flex direction="column" alignItems="center">
                <Heading as="h2" size="lg" mb="2">
                  {event.title}
                </Heading>
                <Image
                  src={event.image}
                  alt={event.title}
                  maxW="100%"
                  h="200px"
                  mb="2"
                />
                <Text fontSize="md" textAlign="center">
                  {event.description}
                </Text>
                <Text fontSize="md">Start Time: {event.startTime}</Text>
                <Text fontSize="md">End Time: {event.endTime}</Text>
                <Text fontSize="md">Created By: {event.createdBy}</Text>
                <Text fontSize="md">
                  Categories:{" "}
                  {event.categoryIds
                    .map(
                      (categoryId) =>
                        categories.find((cat) => cat.id === categoryId)?.name ||
                        "Unknown"
                    )
                    .join(", ")}
                </Text>
              </Flex>
            </Box>
          </Link>
        ))}
      </Grid>
      {/* Add Event Button */}
      <Button colorScheme="blue" mt="4" onClick={onOpen}>
        Add Event
      </Button>
      <AddEventModal
        isOpen={isOpen}
        onClose={onClose}
        setEvents={setEvents}
        categories={categories}
      />
    </Box>
  );
};

export default EventsPage;
