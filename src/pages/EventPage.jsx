import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Divider,
  Flex,
  Stack,
  Avatar,
} from "@chakra-ui/react";
import { EditEventModal } from "../components/EditEventModal";
import { EventsContext } from "../EventsContext";

export const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { events, users, categories, deleteEvent } = useContext(EventsContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const foundEvent = events.find((e) => e.id.toString() === eventId);
    setEvent(foundEvent);
  }, [events, eventId]);

  const formatDateTime = (datetime) => {
    return new Date(datetime).toLocaleString("nl-NL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getCategoryNames = (categoryIds) => {
    return categoryIds
      .map(
        (id) =>
          categories.find((cat) => cat.id.toString() === id.toString())?.name
      )
      .filter(Boolean)
      .join(", ");
  };

  const user = event ? users.find((u) => u.id === event.createdBy) : null;

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    setIsAlertOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEvent(event.id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const onEventUpdated = (updatedEvent) => {
    setEvent(updatedEvent);
  };

  if (!event) {
    return <Heading>Event not found</Heading>;
  }

  return (
    <Box
      maxW="2xl"
      mx="auto"
      mt={5}
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      {event.image && (
        <Image src={event.image} alt={event.title} borderRadius="lg" />
      )}
      <Stack mt={6} spacing={3}>
        <Heading size="lg">{event.title}</Heading>
        <Text fontSize="md">{event.description}</Text>
        <Text>Location: {event.location}</Text>
        <Text>Start Time: {formatDateTime(event.startTime)}</Text>
        <Text>End Time: {formatDateTime(event.endTime)}</Text>
        <Text>Categories: {getCategoryNames(event.categoryIds)}</Text>
        {user && (
          <Flex align="center">
            <Avatar size="sm" src={user.image} name={user.name || ""} mr={2} />
            <Text fontSize="md">{user.name}</Text>
          </Flex>
        )}
      </Stack>
      <Divider my={4} />
      <Flex justifyContent="center" gap="4">
        <Button size="md" colorScheme="blue" onClick={handleEdit}>
          Edit
        </Button>
        <Button size="md" colorScheme="red" onClick={handleDelete}>
          Delete
        </Button>
      </Flex>
      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        event={event}
        eventId={eventId}
        onEventUpdated={onEventUpdated}
      />
      <AlertDialog isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Event
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this event? This action cannot be
            undone.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={() => setIsAlertOpen(false)}>Cancel</Button>
            <Button colorScheme="red" onClick={confirmDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};
