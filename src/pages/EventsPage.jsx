import React from "react";
import {
  Heading,
  Box,
  Image,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AddEventModal from "../components/AddEventModal";

export const EventsPage = ({ events, categories, users, refreshEvents }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const getCategoryNames = (categoryIds) => {
    if (!categories || !categoryIds) return "";
    return categories
      .filter((category) => categoryIds.includes(category.id))
      .map((category) => category.name)
      .join(", ");
  };

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Anonymous";
  };

  return (
    <>
      <Heading>List of events</Heading>
      {events.map((event) => (
        <Box
          key={event.id}
          border="1px"
          borderColor="gray.200"
          p={4}
          m={4}
          borderRadius="md"
          onClick={() => navigate(`/event/${event.id}`)}
        >
          <Image
            src={event.image || "placeholder-image-url.jpg"}
            alt={event.title}
            borderRadius="md"
          />
          <Text fontSize="xl" fontWeight="bold">
            {event.title}
          </Text>
          <Text>{event.description}</Text>
          <Text color="gray.600">
            Start Time: {new Date(event.startTime).toLocaleString()}
          </Text>
          <Text color="gray.600">
            End Time: {new Date(event.endTime).toLocaleString()}
          </Text>
          <Text color="gray.600">
            Created by: {getUserName(event.createdBy)}
          </Text>
          <Text color="gray.600">
            Categories: {getCategoryNames(event.categoryIds)}
          </Text>
        </Box>
      ))}
      <Button onClick={onOpen} mt="4" mb="4">
        Add Event
      </Button>
      <AddEventModal
        isOpen={isOpen}
        onClose={onClose}
        refreshEvents={refreshEvents}
      />
    </>
  );
};
