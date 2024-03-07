import React, { useState, useMemo } from "react";
import {
  Heading,
  Box,
  Image,
  Text,
  Button,
  useDisclosure,
  SimpleGrid,
  Container,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AddEventModal from "../components/AddEventModal";

const SearchInput = ({ value, onChange }) => {
  return (
    <Box mx="auto" width="300px">
      <Input
        placeholder="Search events"
        value={value}
        onChange={onChange}
        mb="4"
      />
    </Box>
  );
};

const CategoryFilter = ({ value, onChange }) => {
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

export const EventsPage = ({ events, categories, refreshEvents }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "" ||
        categories.some(
          (category) =>
            event.categoryIds.includes(category.id) &&
            category.name.toLowerCase().includes(categoryFilter.toLowerCase())
        );

      return matchesSearch && matchesCategory;
    });
  }, [search, categoryFilter, events, categories]);

  return (
    <>
      <Heading textAlign="center" my="8">
        List of events
      </Heading>
      <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
      <CategoryFilter
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      />
      <Container maxW="80%" mt="6">
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
                  Categories:{" "}
                  {event.categoryIds
                    .map(
                      (id) =>
                        categories.find((category) => category.id === id)?.name
                    )
                    .join(", ")}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
        <Button onClick={onOpen} my="6">
          Add Event
        </Button>
      </Container>
      <AddEventModal
        isOpen={isOpen}
        onClose={onClose}
        refreshEvents={refreshEvents}
      />
    </>
  );
};
