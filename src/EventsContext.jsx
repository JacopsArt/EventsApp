import React, { createContext, useState, useEffect } from "react";

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await fetchEvents();
    await fetchCategories();
    await fetchUsers();
  };

  const fetchEvents = async () => {
    const response = await fetch("http://localhost:3000/events");
    const data = await response.json();
    setEvents(data);
  };

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:3000/categories");
    const data = await response.json();
    setCategories(data);
  };

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    setUsers(data);
  };

  const updateEvent = async (editedEvent) => {
    try {
      const response = await fetch(
        `http://localhost:3000/events/${editedEvent.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedEvent),
        }
      );

      if (!response.ok) {
        throw new Error('Error updating event');
      }

      const updatedEvent = await response.json();
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );

      loadData();
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  };

  const addEvent = async (newEvent) => {
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error('Error adding event');
      }

      const addedEvent = await response.json();
      setEvents((prevEvents) => [...prevEvents, addedEvent]);

      loadData();
    } catch (error) {
      console.error("Error adding event:", error);
      throw error;
    }
  };

  const contextValue = {
    events,
    setEvents,
    users,
    setUsers,
    categories,
    setCategories,
    updateEvent,
    addEvent,
  };

  return (
    <EventsContext.Provider value={contextValue}>
      {children}
    </EventsContext.Provider>
  );
};
