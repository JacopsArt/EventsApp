import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, useToast } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EventsPage } from "./pages/EventsPage";
import { EventPage } from "./pages/EventPage";
import { Root } from "./components/Root";

const Main = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchEvents();
    fetchCategories();
    fetchUsers();
  }, []);

  const fetchEvents = async () => {
    const response = await fetch("http://localhost:3000/events");
    if (response.ok) {
      const data = await response.json();
      setEvents(data);
    }
  };

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:3000/categories");
    if (response.ok) {
      const data = await response.json();
      setCategories(data);
    }
  };

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3000/users");
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  };

  const updateEvent = async (updatedEvent) => {
    try {
      const response = await fetch(
        `http://localhost:3000/events/${updatedEvent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        }
      );

      if (!response.ok) throw new Error("Failed to update event");

      toast({
        title: "Event Updated",
        description: "The event has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      fetchEvents();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete event");

      toast({
        title: "Event Deleted",
        description: "The event has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      fetchEvents();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: (
            <EventsPage
              events={events}
              categories={categories}
              users={users}
              refreshEvents={fetchEvents}
            />
          ),
        },
        {
          path: "/event/:eventId",
          element: (
            <EventPage
              events={events}
              updateEvent={updateEvent}
              deleteEvent={deleteEvent}
              categories={categories}
              users={users}
              refreshEvents={fetchEvents}
            />
          ),
        },
      ],
    },
  ]);

  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
