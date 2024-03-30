import React, { useState, useContext } from "react";
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

export const AddEventModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    category: "",
    startTime: "",
    endTime: "",
    location: "",
    createdBy: "",
    userImage: "",
  });

  const { addEvent, users, setUsers, categories, setCategories } =
    useContext(EventsContext);
  const toast = useToast();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addCategory = async (name) => {
    try {
      const response = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error("Failed to add category");
      }
      const newCategory = await response.json();
      setCategories([...categories, newCategory]);
      return newCategory.id;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add category.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const addUser = async (userData) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to add user");
      }
      const newUser = await response.json();
      setUsers([...users, newUser]);
      return newUser.id;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add user.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let categoryId = categories.find(
      (cat) => cat.name === formData.category
    )?.id;
    if (!categoryId) {
      categoryId = await addCategory(formData.category);
    }

    let userId = users.find((user) => user.name === formData.createdBy)?.id;
    if (!userId) {
      userId = await addUser({
        name: formData.createdBy,
        image: formData.userImage,
      });
    }

    try {
      await addEvent({
        ...formData,
        createdBy: userId,
        categoryIds: [categoryId],
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add event.",
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
        <ModalHeader>Add a New Event</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl mt={4} isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Category</FormLabel>
              <Input
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Start Time</FormLabel>
              <Input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>End Time</FormLabel>
              <Input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Location</FormLabel>
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Created By</FormLabel>
              <Input
                name="createdBy"
                value={formData.createdBy}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>User Image URL</FormLabel>
              <Input
                name="userImage"
                value={formData.userImage}
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
