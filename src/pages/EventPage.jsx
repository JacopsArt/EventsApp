import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import EditEventModal from "../components/EditEventModal";

export const EventPage = ({
  events,
  updateEvent,
  deleteEvent,
  users,
  categories,
  refreshEvents,
}) => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const event = events.find((e) => e.id.toString() === eventId);
  const user = users.find((u) => u.id === event?.createdBy);

  const formatDateTime = (datetime) => {
    return new Date(datetime).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const getCategoryNames = (categoryIds) => {
    if (!Array.isArray(categoryIds)) return "";
    return categories
      .filter((category) => categoryIds.includes(category.id))
      .map((category) => category.name)
      .join(", ");
  };

  if (!event) {
    return <Heading>Event not found</Heading>;
  }

  const handleSave = async (editedEvent) => {
    await updateEvent(editedEvent);
    setIsEditModalOpen(false);
    refreshEvents();
  };

  const handleDelete = () => {
    setIsAlertOpen(true);
  };

  const confirmDelete = async () => {
    await deleteEvent(eventId);
    refreshEvents();
    navigate("/");
  };

  return (
    <Box p={4}>
      <Heading mb={4}>{event.title || "No Title"}</Heading>
      {event.image && <Image src={event.image} alt={event.title} mb={4} />}
      <Text fontSize="lg" mb={4}>
        {event.description || "No Description"}
      </Text>
      <Text color="gray.600">
        Start Time: {formatDateTime(event.startTime)}
      </Text>
      <Text color="gray.600">End Time: {formatDateTime(event.endTime)}</Text>
      <Text color="gray.600">
        Categories: {getCategoryNames(event.categoryIds)}
      </Text>
      {user && (
        <Box mb={4}>
          <Text fontSize="md">Created by: {user.name}</Text>
          {user.image && <Image src={user.image} alt={user.name} />}
        </Box>
      )}
      <Button mr={4} onClick={() => setIsEditModalOpen(true)}>
        Edit
      </Button>
      <Button colorScheme="red" onClick={handleDelete}>
        Delete
      </Button>
      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        event={event}
        onSave={handleSave}
        categories={categories}
        users={users}
        refreshEvents={refreshEvents}
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
