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
  const [editedEvent, setEditedEvent] = useState(() => {
    const savedEvent = localStorage.getItem("editedEvent");
    return savedEvent ? JSON.parse(savedEvent) : event;
  });
  const { events, setEvents, users, setUsers, categories, setCategories } =
    useContext(EventsContext);
  const toast = useToast();

  useEffect(() => {
    localStorage.setItem("editedEvent", JSON.stringify(editedEvent));
  }, [editedEvent]);

  const handleInputChange = (e) => {
    setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let categoryId = categories.find(
      (cat) => cat.name === editedEvent.categoryName
    )?.id;
    if (!categoryId) {
      categoryId = await createCategory(editedEvent.categoryName);
    }

    let userId = users.find((user) => user.name === editedEvent.userName)?.id;
    if (!userId) {
      userId = await createUser(editedEvent.userName, editedEvent.userImage);
    }

    const updatedEvent = {
      ...editedEvent,
      categoryIds: [categoryId],
      createdBy: userId,
    };

   
    const updatedEvents = events.map((ev) =>
      ev.id === updatedEvent.id ? updatedEvent : ev
    );
    setEvents(updatedEvents);

    toast({
      title: "Event Updated",
      description: "The event has been successfully updated.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    onClose();
  };

  const createCategory = async (name) => {
    const response = await fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const newCategory = await response.json();
    setCategories([...categories, newCategory]);
    return newCategory.id;
  };

  const createUser = async (name, image) => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image }),
    });
    const newUser = await response.json();
    setUsers([...users, newUser]);
    return newUser.id;
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
            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Input
                name="categoryName"
                value={editedEvent.categoryName || ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>User</FormLabel>
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

export default EditEventModal;
