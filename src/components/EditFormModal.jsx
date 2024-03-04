import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";

const formatDate = (dateStr) => {
  if (!dateStr || isNaN(new Date(dateStr).getTime())) {
    return "";
  }
  const date = new Date(dateStr);
  return date.toISOString().substring(0, 16);
};

const EditFormModal = ({ isOpen, onClose, event, onSave }) => {
  const [editEvent, setEditEvent] = useState({ ...event });
  const toast = useToast();

  useEffect(() => {
    if (event) {
      setEditEvent({
        ...event,
        startTime: formatDate(event.startTime),
        endTime: formatDate(event.endTime),
      });
    }
  }, [event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditEvent({ ...editEvent, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editEvent),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      onSave(editEvent);
      onClose();
      toast({
        title: "Event Updated",
        description: "The event has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating event.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="event-title">
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={editEvent.title || ""}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="event-description" mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={editEvent.description || ""}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="event-image" mt={4}>
            <FormLabel>Image URL</FormLabel>
            <Input
              name="image"
              value={editEvent.image || ""}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="event-startTime" mt={4}>
            <FormLabel>Start Time</FormLabel>
            <Input
              type="datetime-local"
              name="startTime"
              value={editEvent.startTime || ""}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="event-endTime" mt={4}>
            <FormLabel>End Time</FormLabel>
            <Input
              type="datetime-local"
              name="endTime"
              value={editEvent.endTime || ""}
              onChange={handleInputChange}
            />
          </FormControl>
          {/* Voeg hier aanvullende form controls toe indien nodig */}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Save Changes
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditFormModal;
