// pages/EventPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import EditFormModal from "../components/EditFormModal";

const EventPage = ({ events, users, categories, onUpdateEvent }) => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [creator, setCreator] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    const selectedEvent = events.find((e) => e.id.toString() === eventId);
    if (selectedEvent) {
      setEvent(selectedEvent);
      const eventCreator = users.find(
        (user) => user.id === selectedEvent.createdBy
      );
      setCreator(eventCreator);
    }
  }, [events, users, eventId]);

  const handleEdit = async (updatedEvent) => {
    setIsEditOpen(false);
    setEvent(updatedEvent);
    onClose();
    // Pass the updated event to the parent component
    onUpdateEvent(updatedEvent);
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });
      onClose();
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (!event) {
    return <Box>Loading event...</Box>;
  }

  return (
    <Box>
      <Heading as="h1">{event.title}</Heading>
      {creator && (
        <Box>
          <Text>Created by: {creator.name}</Text>
          <Image src={creator.image} alt={creator.name} />
        </Box>
      )}
      <Image src={event.image} alt={event.title} />
      <Text>Description: {event.description}</Text>
      <Text>Start Time: {event.startTime}</Text>
      <Text>End Time: {event.endTime}</Text>
      <Button onClick={() => setIsEditOpen(true)}>Edit</Button>
      <Button colorScheme="red" onClick={onOpen}>
        Delete
      </Button>
      <EditFormModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        event={event}
        onSave={handleEdit}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this event?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EventPage;
