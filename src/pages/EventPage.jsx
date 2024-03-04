// src/pages/EventPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Heading,
  Box,
  Text,
  Image,
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
import EditFormModal from "../components/EditFormModal"; // Zorg ervoor dat dit pad correct is

const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [creator, setCreator] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventResponse = await fetch(
          `http://localhost:3000/events/${eventId}`
        );
        if (!eventResponse.ok) {
          throw new Error("Failed to fetch event");
        }
        const eventData = await eventResponse.json();
        setEvent(eventData);

        if (eventData.createdBy) {
          const usersResponse = await fetch("http://localhost:3000/users");
          if (!usersResponse.ok) {
            throw new Error("Failed to fetch users");
          }
          const usersData = await usersResponse.json();
          const creatorData = usersData.find(
            (user) => user.id === eventData.createdBy
          );
          setCreator(creatorData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [eventId]);

  const handleEditClick = () => {
    onEditOpen();
  };

  const handleEventUpdated = (updatedEvent) => {
    setEvent(updatedEvent);
    onEditClose();
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

  return (
    <Box>
      {event && (
        <>
          <Heading>{event.title}</Heading>
          {creator && (
            <>
              <Text>Created by: {creator.name}</Text>
              <Image src={creator.image} alt={creator.name} width="100px" />
            </>
          )}
          <Image src={event.image} alt={event.title} width="300px" />
          <Text>Description: {event.description}</Text>
          <Text>Start Time: {new Date(event.startTime).toLocaleString()}</Text>
          <Text>End Time: {new Date(event.endTime).toLocaleString()}</Text>
          <Button onClick={handleEditClick}>Edit</Button>
          <Button onClick={onOpen}>Delete</Button>

          <EditFormModal
            isOpen={isEditOpen}
            onClose={onEditClose}
            event={event}
            onSave={handleEventUpdated}
          />

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirm Deletion</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Are you sure you want to delete this event?</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="red" onClick={handleDelete}>
                  Delete
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
};

export default EventPage;
