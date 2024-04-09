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
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [userName, setUserName] = useState(""); // State voor de gebruikersnaam
  const { updateEvent, categories, setCategories, addCategory, updateUser, users } = useContext(EventsContext);
  const toast = useToast();

  useEffect(() => {
    if (event) {
      setEditedEvent(event);
      setSelectedCategories(event.categoryIds || []);

      // Initialiseren van userName met de huidige gebruikersnaam
      const currentUser = users.find((u) => u.id === event.createdBy);
      setUserName(currentUser ? currentUser.name : '');
    }
  }, [event, users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const addedCategory = await addCategory({ name: newCategoryName });
      if (addedCategory && addedCategory.id) {
        setCategories([...categories, addedCategory]);
        setSelectedCategories([...selectedCategories, addedCategory.id]);
        setNewCategoryName("");
      }
    } catch (error) {
      console.error("Error adding new category:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedEvent = {
      ...editedEvent,
      id: eventId,
      categoryIds: selectedCategories,
    };

    try {
      await updateEvent(updatedEvent);

      // Update user name if it has changed
      if (userName !== event.createdBy) {
        const currentUser = users.find((u) => u.id === event.createdBy);
        await updateUser(event.createdBy, { name: userName, image: currentUser.image });
      }

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
              <FormLabel>Categories</FormLabel>
              <HStack spacing={2}>
                {selectedCategories.map((categoryId) => {
                  const category = categories.find(
                    (cat) => cat.id === categoryId
                  );
                  return category ? (
                    <Tag key={categoryId} borderRadius="full">
                      <TagLabel>{category.name}</TagLabel>
                      <TagCloseButton
                        onClick={() => handleCategoryChange(categoryId)}
                      />
                    </Tag>
                  ) : null;
                })}
              </HStack>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>New Category</FormLabel>
              <Input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter new category"
              />
              <Button mt={2} colorScheme="blue" onClick={handleAddCategory}>
                Add
              </Button>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>User Name</FormLabel>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="User Name"
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
