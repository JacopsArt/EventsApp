import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
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
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { updateEvent } = useContext(EventsContext);
  const toast = useToast();

  useEffect(() => {
    if (event) {
      Object.keys(event).forEach(key => {
        setValue(key, event[key]);
      });
    }
  }, [event, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateEvent(data);
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
        description: "An error occurred while updating the event.",
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl mt={4} isInvalid={errors.title}>
              <FormLabel>Title</FormLabel>
              <Input {...register("title")} />
            </FormControl>
            <FormControl mt={4} isInvalid={errors.description}>
              <FormLabel>Description</FormLabel>
              <Input {...register("description")} />
            </FormControl>
            <FormControl mt={4} isInvalid={errors.location}>
              <FormLabel>Location</FormLabel>
              <Input {...register("location")} />
            </FormControl>
            <FormControl mt={4} isInvalid={errors.image}>
              <FormLabel>Image URL</FormLabel>
              <Input {...register("image")} />
            </FormControl>
            <FormControl mt={4} isInvalid={errors.startTime}>
              <FormLabel>Start Time</FormLabel>
              <Input {...register("startTime")} type="datetime-local" />
            </FormControl>
            <FormControl mt={4} isInvalid={errors.endTime}>
              <FormLabel>End Time</FormLabel>
              <Input {...register("endTime")} type="datetime-local" />
            </FormControl>
            <FormControl mt={4} isInvalid={errors.categoryName}>
              <FormLabel>Category</FormLabel>
              <Input {...register("categoryName")} />
            </FormControl>
            <FormControl mt={4} isInvalid={errors.userName}>
              <FormLabel>User Name</FormLabel>
              <Input {...register("userName")} />
            </FormControl>
            <FormControl mt={4} isInvalid={errors.userImage}>
              <FormLabel>User Image URL</FormLabel>
              <Input {...register("userImage")} />
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
