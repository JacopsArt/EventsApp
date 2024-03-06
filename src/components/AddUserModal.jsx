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

const AddUserModal = ({ isOpen, onClose }) => {
  const [userData, setUserData] = useState({
    name: '',
    image: ''
  });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setUserData({ name: '', image: '' });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Voeg een Nieuwe Gebruiker Toe</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl>
              <FormLabel>Naam</FormLabel>
              <Input 
                type="text" 
                name="name" 
                value={userData.name} 
                onChange={handleInputChange} 
                required 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Afbeeldings-URL</FormLabel>
              <Input 
                type="text" 
                name="image" 
                value={userData.image} 
                onChange={handleInputChange} 
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Opslaan
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Annuleren
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddUserModal;
