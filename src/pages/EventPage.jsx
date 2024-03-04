// src/pages/EventPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import EditFormModal from "../components/EditFormModal";

const EventPage = ({ events, users, categories }) => {
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

  const getCategoryNames = (categoryIds) => {
    return categoryIds
      .map((id) => {
        const category = categories.find((cat) => cat.id === id);
        return category ? category.name : "Unknown";
      })
      .join(", ");
  };

  const handleEdit = (updatedEvent) => {
    setIsEditOpen(false);
    setEvent(updatedEvent);
    onClose();
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
      <Text>Categories: {getCategoryNames(event.categoryIds)}</Text>
      <Button onClick={() => setIsEditOpen(true)}>Edit</Button>

      <EditFormModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        event={event}
        onSave={handleEdit}
      />
    </Box>
  );
};

export default EventPage;
