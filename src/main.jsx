// src/Main.jsx
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
      const response = await fetch("http://localhost:3000/events");
      const eventData = await response.json();
      setEvents(eventData);
    };

    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/users");
      const userData = await response.json();
      setUsers(userData);
    };

    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3000/categories");
      const categoryData = await response.json();
      setCategories(categoryData);
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
          element: <EventsPage events={events} categories={categories} />,
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
