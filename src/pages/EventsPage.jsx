import React, { useState, useMemo, useContext } from "react";
import {
  Heading,
  Box,
  Image,
  Text,
  Button,
  useDisclosure,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AddEventModal } from "../components/AddEventModal";
import { EventsContext } from "../EventsContext";
import CategoryFilter from "../components/CategoryFilter";
import SearchInput from "../components/SearchInput";

export const EventsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { events, categories } = useContext(EventsContext);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const getCategoryNames = (categoryIds) => {
    return categoryIds
      .map((id) => categories.find((cat) => cat.id === Number(id))?.name)
      .filter(Boolean)
      .join(", ");
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title && event.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        (categories && categoryFilter === "") ||
        (categories &&
          categories
            .filter(
              (category) =>
                category &&
                category.name &&
                category.name
                  .toLowerCase()
                  .includes(categoryFilter.toLowerCase())
            )
            .some((category) => {
              if (Array.isArray(event.categoryIds)) {
                return event.categoryIds.includes(category.id);
              } else {
                return event.categoryIds === category.id;
              }
            }));

      return matchesSearch && matchesCategory;
    });
  }, [search, categoryFilter, events, categories]);

  return (
    <>
      <Heading textAlign="center" my="8">
        List of Events
      </Heading>
      <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
      <CategoryFilter
        value={categoryFilter}
        onChange={(value) => setCategoryFilter(value)}
        categories={categories}
      />
      <Container maxW="80%" mt="6" mb="12">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
          {filteredEvents.map((event) => (
            <Box
              key={event.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              onClick={() => navigate(`/event/${event.id}`)}
              cursor="pointer"
            >
              <Image
                src={event.image || "placeholder-image-url.jpg"}
                alt={event.title}
                objectFit="cover"
                width="100%"
                height="200px"
              />
              <Box p={4}>
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  {event.title}
                </Text>
                <Text noOfLines={2} mb={2}>
                  {event.description}
                </Text>
                <Text color="gray.600" mb={1}>
                  Start Time: {new Date(event.startTime).toLocaleString()}
                </Text>
                <Text color="gray.600" mb={1}>
                  End Time: {new Date(event.endTime).toLocaleString()}
                </Text>
                <Text color="gray.600" mb={1}>
                  Categories: {getCategoryNames(event.categoryIds)}
                </Text>
              </Box>
            </Box>
          ))}
          <Box
            as="section"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            minH="200px"
          >
            <Button onClick={onOpen} size="lg">
              + Add Event
            </Button>
          </Box>
        </SimpleGrid>
      </Container>
      <AddEventModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};