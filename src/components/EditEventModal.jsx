import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { EventsContext } from "../EventsContext";

export const EditEventModal = ({
  isOpen,
  onClose,
  event,
  eventId,
  onEventUpdated,
}) => {
  const [editedEvent, setEditedEvent] = useState(event);
  const { updateEvent } = useContext(EventsContext);
  const toast = useToast();

  useEffect(() => {
    setEditedEvent(event);
  }, [event]);

  const handleInputChange = (e) => {
    setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updatedEvent = { ...editedEvent, id: eventId };
    try {
      await updateEvent(updatedEvent);
      if (onEventUpdated) {
        onEventUpdated(updatedEvent);
      }
      toast({
        title: "Event Updated",
        description: "The event has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating the event.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (!isOpen) {
      // Refresh event page after modal is closed
      if (onEventUpdated) {
        onEventUpdated(editedEvent);
      }
    }
  }, [isOpen, onEventUpdated, editedEvent]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Event</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleFormSubmit}>
          <ModalBody>
            <FormControl mt={4}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={editedEvent.title || ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={editedEvent.description || ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="image"
                value={editedEvent.image || ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Start Time</FormLabel>
              <Input
                type="datetime-local"
                name="startTime"
                value={editedEvent.startTime || ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>End Time</FormLabel>
              <Input
                type="datetime-local"
                name="endTime"
                value={editedEvent.endTime || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
