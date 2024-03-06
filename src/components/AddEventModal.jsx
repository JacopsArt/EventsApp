import React, { useState } from "react";
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
} from "@chakra-ui/react";

const AddEventModal = ({ isOpen, onClose, refreshEvents }) => {
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userId;
    let categoryId;

    try {
      const catResponse = await fetch("http://localhost:3000/categories");
      const categories = await catResponse.json();
      const existingCategory = categories.find(
        (cat) => cat.name === formData.category
      );

      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        const newCatResponse = await fetch("http://localhost:3000/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: formData.category }),
        });
        const newCategory = await newCatResponse.json();
        categoryId = newCategory.id;
      }

      const userResponse = await fetch("http://localhost:3000/users");
      const users = await userResponse.json();
      const existingUser = users.find(
        (user) => user.name === formData.createdBy
      );

      if (existingUser) {
        userId = existingUser.id;
      } else {
        const newUserResponse = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.createdBy,
            image: formData.userImage,
          }),
        });
        const newUser = await newUserResponse.json();
        userId = newUser.id;
      }

      await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          image: formData.image,
          startTime: formData.startTime,
          endTime: formData.endTime,
          location: formData.location,
          createdBy: userId,
          categoryIds: [categoryId],
        }),
      });

      onClose();
      refreshEvents();
    } catch (error) {
      console.error("Error:", error);
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
            <FormControl mt={4}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
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
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Input
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Start Time</FormLabel>
              <Input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>End Time</FormLabel>
              <Input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Location</FormLabel>
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Created By</FormLabel>
              <Input
                name="createdBy"
                value={formData.createdBy}
                onChange={handleInputChange}
                required
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
            <Button colorScheme="blue" type="submit" mr={3}>
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

export default AddEventModal;
