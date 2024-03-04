import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EventsProvider } from "./EventsContext";
import EventsPage from "./pages/EventsPage";
import EventPage from "./pages/EventPage";
import { Root } from "./components/Root";

const Main = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events");
        const eventData = await response.json();
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        const categoryData = await response.json();
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchEvents();
    fetchUsers();
    fetchCategories();
  }, []);

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
              setCategories={setCategories}
            />
          ),
        },
        {
          path: "event/:eventId",
          element: (
            <EventPage
              events={events}
              setEvents={setEvents}
              users={users}
              categories={categories}
            />
          ),
        },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <ChakraProvider>
        <EventsProvider events={events} categories={categories}>
          <RouterProvider router={router} />
        </EventsProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
