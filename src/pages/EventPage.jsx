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
  ModalFooter, // Importeer ModalFooter
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        const eventData = await response.json();
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, [eventId]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedEvent(event);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedEvent),
      });
      setIsEditing(false);
      setEvent(editedEvent);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });
      onClose(); // Sluit de bevestigingsmodal na verwijderen
      window.location.href = "/"; // Navigeer naar de startpagina na het verwijderen
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <Box>
      {event && (
        <>
          <Heading>{event.title}</Heading>
          <Image src={event.image} alt={event.title} width="300px" />
          <Text>Description: {event.description}</Text>
          <Text>Start Time: {new Date(event.startTime).toLocaleString()}</Text>
          <Text>End Time: {new Date(event.endTime).toLocaleString()}</Text>
          <Button onClick={handleEditClick}>Edit</Button>
          <Button onClick={onOpen}>Delete</Button>{" "}
          {/* Open de bevestigingsmodal */}
        </>
      )}
      {isEditing && (
        <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  value={editedEvent.title}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  name="description"
                  value={editedEvent.description}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input
                  type="text"
                  name="image"
                  value={editedEvent.image}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Start Time</FormLabel>
                <Input
                  type="datetime-local"
                  name="startTime"
                  value={editedEvent.startTime}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>End Time</FormLabel>
                <Input
                  type="datetime-local"
                  name="endTime"
                  value={editedEvent.endTime}
                  onChange={handleInputChange}
                />
              </FormControl>
              <Button onClick={handleSubmit}>Submit</Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      {/* Bevestigingsmodal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalBody>
            <Text>Do you really want to delete this event?</Text>
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
    </Box>
  );
};

export default EventPage;
