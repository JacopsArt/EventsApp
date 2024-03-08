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

export const EditEventModal = ({ isOpen, onClose, event }) => {
  const [editedEvent, setEditedEvent] = useState(event);
  const { events, setEvents, categories, updateEvent } =
    useContext(EventsContext);
  const toast = useToast();

  useEffect(() => {
    setEditedEvent(event);
  }, [event]);

  const handleInputChange = (e) => {
    setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value) => {
    const categoryNames = value.split(",").map((name) => name.trim());
    const categoryIds = categoryNames
      .map((name) => {
        if (!name) return null;
        const category = categories.find(
          (cat) => cat.name && cat.name.toLowerCase() === name.toLowerCase()
        );
        return category ? category.id : null;
      })
      .filter((id) => id != null);

    setEditedEvent({ ...editedEvent, categoryIds });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEvent(editedEvent);
      setEvents(
        events.map((ev) => (ev.id === editedEvent.id ? editedEvent : ev))
      );
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
              <FormLabel>User Name</FormLabel>
              <Input
                name="userName"
                value={editedEvent.userName || ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>User Image URL</FormLabel>
              <Input
                name="userImage"
                value={editedEvent.userImage || ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Category Names</FormLabel>
              <Input
                value={
                  editedEvent.categoryIds
                    ?.map((id) => categories.find((cat) => cat.id === id)?.name)
                    .join(", ") || ""
                }
                onChange={(e) => handleCategoryChange(e.target.value)}
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
            <Button colorScheme="blue" type="submit">
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
