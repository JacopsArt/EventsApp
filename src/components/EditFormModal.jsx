// src/components/AddEventModal.jsx
import React, { useState } from "react";
import {
  useToast,
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
} from "@chakra-ui/react";

const AddEventModal = ({ isOpen, onClose, fetchEvents }) => {
  const toast = useToast();
  const [newEvent, setNewEvent] = useState({
    createdBy: "",
    title: "",
    description: "",
    image: "",
    categoryIds: "",
    location: "",
    startTime: "",
    endTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = async () => {
    newEvent.categoryIds = newEvent.categoryIds.split(",").map(Number);

    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast({
        title: "Event Added",
        description: "The new event has been successfully added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      await fetchEvents(); // Update events list
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to add event: ${error.message}`,
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
        <ModalHeader>Add New Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="event-createdBy">
            <FormLabel>Created By</FormLabel>
            <Input name="createdBy" onChange={handleInputChange} />
          </FormControl>
          <FormControl id="event-title" mt={4}>
            <FormLabel>Title</FormLabel>
            <Input name="title" onChange={handleInputChange} />
          </FormControl>
          <FormControl id="event-description" mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" onChange={handleInputChange} />
          </FormControl>
          <FormControl id="event-image" mt={4}>
            <FormLabel>Image URL</FormLabel>
            <Input name="image" onChange={handleInputChange} />
          </FormControl>
          <FormControl id="event-categoryIds" mt={4}>
            <FormLabel>Category IDs</FormLabel>
            <Input
              name="categoryIds"
              placeholder="Enter comma-separated IDs"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="event-location" mt={4}>
            <FormLabel>Location</FormLabel>
            <Input name="location" onChange={handleInputChange} />
          </FormControl>
          <FormControl id="event-startTime" mt={4}>
            <FormLabel>Start Time</FormLabel>
            <Input
              name="startTime"
              type="datetime-local"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="event-endTime" mt={4}>
            <FormLabel>End Time</FormLabel>
            <Input
              name="endTime"
              type="datetime-local"
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddEvent}>
            Add Event
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEventModal;
