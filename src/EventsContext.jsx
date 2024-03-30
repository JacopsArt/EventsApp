import React, { createContext, useState, useEffect } from "react";

export const EventsContext = createContext({
  events: [],
  setEvents: () => {},
  users: [],
  setUsers: () => {},
  categories: [],
  setCategories: () => {},
  updateEvent: async () => {},
  deleteEvent: async () => {},
  addEvent: async () => {},
});

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
        throw new Error("Error updating event");
      }

      const updatedEvent = await response.json();
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });

      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  };

  const addEvent = async (newEvent) => {
    try {
      const response = await fetch(`http://localhost:3000/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error("Error adding new event");
      }

      const addedEvent = await response.json();
      setEvents((prevEvents) => [...prevEvents, addedEvent]);
    } catch (error) {
      console.error("Error adding new event:", error);
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
    deleteEvent,
    addEvent,
  };

  return (
    <EventsContext.Provider value={contextValue}>
      {children}
    </EventsContext.Provider>
  );
};
